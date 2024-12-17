"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import styles from "./login.module.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Định nghĩa schema với yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .matches(/^[^_\s]+@[^_\s]+\.[^_\s]+$/, "Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?])[A-Za-z\d@#$%^&*!?]{8,}$/,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
    )
    .required("Vui lòng nhập mật khẩu"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch("http://localhost:5000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            mat_khau: values.password,
          }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Đăng nhập thất bại");
        }
        const data = await res.json();
        const { token, avatar } = data;
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;
        localStorage.setItem("avatar", avatar);

        const payload = jwtDecode(token);
        const welcomeMessage = payload.quyen === 1 ? "Chào mừng quản trị viên" : "Chào mừng bạn đến với Website!";

        Swal.fire({
          title: "Đăng nhập thành công",
          text: welcomeMessage,
          icon: "success",
          showConfirmButton: true,
        }).then(() => {
          if (typeof window !== "undefined") {
            const queryParam = new URLSearchParams(window.location.search);
            const redirect = queryParam.get("redirect");
            if (payload.quyen === 1) {
              window.location.href = "/admin";
            } else if (redirect && redirect.startsWith("/")) {
              window.location.href = redirect;
            } else if (redirect === "thanhtoan") {
              window.location.href = "/components/components-giaodich/thanhtoan";
            } else {
              window.location.href = "/";
            }
          }
        });
      } catch (error) {
        setSubmitting(false);
        Swal.fire({
          title: "Lỗi đăng nhập",
          text: error.message || "Có lỗi xảy ra vui lòng thử lại",
          icon: "error",
          showConfirmButton: true,
        });
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
        window.location.href = "/";
      });
    } catch (error) {
      Swal.fire({
        title: "Đăng nhập thất bại",
        text: "Tài khoản của bạn đã tồn tại.",
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

  // Hàm để đổi trạng thái ẩn/hiện mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${styles.mainContainer} flex justify-center items-center h-screen opacity-0 `}>
      <div className={`${styles.container} max-w-[350px] w-[350px] h-auto px-[25px] py-[25px]`}>
        <div className="text-center font-semibold text-[30px] sm:text-30px text-[#333] mb-5">Đăng nhập</div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input
            type="email"
            className={`${styles.input} w-full px-5 py-[15px] ${formik.errors.email ? styles.inputError : ""}`}
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.errors.email && <p className={styles.error}>{formik.errors.email}</p>}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`${styles.input} w-full px-5 py-[15px]  ${formik.errors.password ? styles.inputError : ""}`}
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Mật khẩu"
            />
            <div className={`${styles.togglePasswordIcon} absolute`} onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {formik.errors.password && <p className={styles.error}>{formik.errors.password}</p>}

          <span className={`${styles.forgotPassword} block`}>
            <Link href="./forgot-password">Quên mật khẩu</Link>
          </span>

          <input
            type="submit"
            className={`${styles.loginButton} block w-full py-[15px] my-5 mx-auto`}
            value="Đăng nhập"
          />
        </form>

        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <div className={`${styles.socialAccountContainer} flex flex-col items-center mt-[25px]`}>
            <span className={`${styles.title} block`}>Đăng nhập với</span>

            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              render={(renderProps) => (
                <div className={`${styles.socialAccounts} w-10 h-10`}>
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

        <div className={`${styles.signUpNow} block`}>
          <span className={styles.dontHaveAnAccount}>
            Bạn chưa có tài khoản? &nbsp;
            <Link href="/components/components-login/register" id="gotoSignup">
              Đăng ký ngay
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
