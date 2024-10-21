"use client";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import styles from "./register.module.css";
import OTP from "../OTP/page";

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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
    )
    .required("Vui lòng nhập mật khẩu"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),

  image: Yup.mixed()
    .required("Vui lòng chọn file hình ảnh")
    .test("fileSize", "File quá lớn, vui lòng chọn file nhỏ hơn 2MB", (value) => {
      return value && value.size <= 2000000; // 2MB
    })
    .test("fileType", "Định dạng file không hợp lệ", (value) => {
      return value && ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/gif"].includes(value.type);
    }),
});

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const formData = new FormData();
        formData.append("ten_dang_nhap", values.name);
        formData.append("email", values.email);
        formData.append("mat_khau", values.password);
        formData.append("nhap_lai_mat_khau", values.confirmPassword);
        formData.append("hinh_anh", values.image);

        const res = await fetch("http://localhost:5000/users/register", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email đã tồn tại") {
            setFieldError("email", "Email đã tồn tại");
          } else {
            throw new Error(errorData.message || "Đăng ký thất bại");
          }
        } else {
          Swal.fire({
            icon: "success",
            title: "Đăng ký thành công",
            text: "Vui lòng kiểm tra email để xác nhận mã OTP",
          }).then(() => {
            setIsModalOpen(true); // mở modal xác thực OTP khi xác thực thành công
          });
        }
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
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

      Swal.fire({
        title: "Đăng nhập thành công",
        text: "Chào mừng bạn đến với Website!",
        icon: "success",
        showConfirmButton: true,
      }).then(() => {
        window.location.href = "http://localhost:3001";
      });
    } catch (error) {
      Swal.fire({
        title: "Đăng nhập thất bại",
        text: error.message || "Vui lòng thử lại.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  const handleLoginFailure = () => {
    Swal.fire({
      title: "Đăng nhập thất bại",
      text: "Có lỗi xảy ra vui lòng thử lại.",
      icon: "error",
      showConfirmButton: true,
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.heading}>Sign Up</div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input
            type="text"
            className={`${styles.input} ${formik.errors.name ? styles.inputError : ""}`}
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Name"
          />
          {formik.errors.name && <p className={styles.error}>{formik.errors.name}</p>}

          <input
            type="email"
            className={`${styles.input} ${formik.errors.email ? styles.inputError : ""}`}
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="E-mail"
          />
          {formik.errors.email && <p className={styles.error}>{formik.errors.email}</p>}

          <input
            type="password"
            className={`${styles.input} ${formik.errors.password ? styles.inputError : ""}`}
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
          {formik.errors.password && <p className={styles.error}>{formik.errors.password}</p>}

          <input
            type="password"
            className={`${styles.input} ${formik.errors.confirmPassword ? styles.inputError : ""}`}
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            placeholder="Xác nhận Mật khẩu"
          />
          {formik.errors.confirmPassword && <p className={styles.error}>{formik.errors.confirmPassword}</p>}

          <input
            type="file"
            className={`${styles.input} ${formik.errors.image ? styles.inputError : ""}`}
            id="image"
            name="image"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
          />
          {formik.errors.image && <p className={styles.error}>{formik.errors.image}</p>}

          <span className={styles.forgotPassword}>
            <Link href="#">Forgot password</Link>
          </span>
          <input type="submit" className={styles.loginButton} value="Sign Up" />
          <OTP isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
        </form>

        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <div className={styles.socialAccountContainer}>
            <span className={styles.title}>Or Sign in with</span>

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

        <div className={styles.signUpNow}>
          <span className={styles.dontHaveAnAccount}>
            Have an account?
            <Link href="../components/login" id="gotoSignup">
              Sign up now
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
