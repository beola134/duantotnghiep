"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import styles from "./register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự")
    .matches(/^[a-zA-Z0-9_]+$/, "Tên đăng nhập không hợp lệ")
    .required("Vui lòng nhập tên đăng nhập"),

  email: Yup.string()
    .email("Email không hợp lệ")
    .matches(/^[^_\s]+@[^_\s]+\.[^_\s]+$/, "Email không hợp lệ")
    .required("Vui lòng nhập email"),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?])[A-Za-z\d@#$%^&*!?]{8,}$/,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
    )
    .required("Vui lòng nhập mật khẩu"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),

  otp: Yup.string()
    .length(6, "OTP phải có 6 chữ số")
    .required("Vui lòng nhập OTP"),
});

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      if (!isOtpSent) {
        setFieldError("email", "Vui lòng gửi OTP trước khi đăng ký.");
        setSubmitting(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ten_dang_nhap: values.name,
            email: values.email,
            mat_khau: values.password,
            xac_nhan_mat_khau: values.confirmPassword,
            otp: values.otp,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setFieldError("general", data.message || "Vui lòng thử lại.");
        } else {
          Swal.fire("Thành công", "Đăng ký thành công!", "success");
          window.location.href = "http://localhost:3001/components/components-login/login";
        }
      } catch (error) {
        setFieldError("general", error.message || "Có lỗi xảy ra khi đăng ký.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSendOtp = async () => {
    if (loading || isOtpSent) return;
    if (!formik.values.email) {
      formik.setFieldError("email", "Vui lòng nhập email trước khi gửi OTP.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/users/sendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formik.values.email }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsOtpSent(true);
        setTimeLeft(180);
        Swal.fire("Thành công", "Gửi OTP thành công!", "success");
        // 3 minutes in seconds
      } else {
        formik.setFieldError("email", data.message || "Vui lòng thử lại.");
      }
    } catch (error) {
      formik.setFieldError("email", error.message || "Có lỗi xảy ra khi gửi OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await fetch("http://localhost:5000/users/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;

      window.location.href = "http://localhost:3001";
    } catch (error) {
      formik.setFieldError("general", error.message || "Vui lòng thử lại.");
    }
  };

  const handleLoginFailure = () => {
    formik.setFieldError("general", "Có lỗi xảy ra vui lòng thử lại.");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!isOtpSent) return;

    if (timeLeft === 0) {
      setIsOtpSent(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOtpSent, timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.heading}>Đăng ký</div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input
            type="text"
            className={`${styles.input} ${formik.errors.name ? styles.inputError : ""}`}
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Tên đăng nhập"
          />
          {formik.errors.name && <p className={styles.error}>{formik.errors.name}</p>}

          <input
            type="email"
            className={`${styles.input} ${formik.errors.email ? styles.inputError : ""}`}
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.errors.email && <p className={styles.error}>{formik.errors.email}</p>}

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={`${styles.input} ${formik.errors.password ? styles.inputError : ""}`}
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Mật khẩu"
            />
            <div className={styles.togglePasswordIcon} onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {formik.errors.password && <p className={styles.error}>{formik.errors.password}</p>}

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={`${styles.input} ${formik.errors.confirmPassword ? styles.inputError : ""}`}
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              placeholder="Nhập lại mật khẩu"
            />
            <div className={styles.togglePasswordIcon} onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {formik.errors.confirmPassword && <p className={styles.error}>{formik.errors.confirmPassword}</p>}

          <div className={styles.otpContainer}>
            <input
              type="text"
              className={`${styles.input} ${
                formik.errors.otp && formik.touched.otp ? styles.inputError : ""
              }`}
              id="otp"
              name="otp"
              onChange={formik.handleChange}
              value={formik.values.otp}
              placeholder="OTP"
              disabled={!isOtpSent}
            />
            <button
              type="button"
              className={styles.sendOtpButton}
              onClick={handleSendOtp}
              disabled={loading || isOtpSent}
            >
              {isOtpSent
                ? `OTP đã gửi (${formatTime(timeLeft)})`
                : "Gửi OTP"}
            </button>
          </div>
          {formik.errors.otp && formik.touched.otp && (
            <p className={styles.error}>{formik.errors.otp}</p>
          )}

          {formik.errors.general && <p className={styles.error}>{formik.errors.general}</p>}

          <input
            type="submit"
            className={styles.loginButton}
            value={formik.isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
            disabled={formik.isSubmitting}
          />
        </form>
        {!isModalOpen && (
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <div className={styles.socialAccountContainer}>
              <span className={styles.title}>Đăng nhập với</span>

              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                render={(renderProps) => (
                  <div className={styles.socialAccounts}>
                    <button
                      className={styles.socialButton}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    ></button>
                  </div>
                )}
              />
            </div>
          </GoogleOAuthProvider>
        )}
        <div className={styles.signUpNow}>
          <span className={styles.dontHaveAnAccount}>
            Đã có tài khoản? &nbsp;
            <Link href="/components/components-login/login" id="gotoSignup">
              Đăng nhập ngay
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}