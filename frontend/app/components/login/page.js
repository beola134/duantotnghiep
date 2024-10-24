"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import styles from "./login.module.css";

// Định nghĩa schema với yup
// Kiêm tra email và password
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .matches(/^[^_\s]+@[^_\s]+\.[^_\s]+$/, "Email không hợp lệ")
    .required("Vui lòng nhập email"),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
    )
    .required("Vui lòng nhập mật khẩu"),
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      // Gửi request đăng nhập
      try {
        const res = await fetch("http://localhost:5000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email, mat_khau: values.password }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Đăng nhập thất bại");
        }
        // Lưu token vào cookie
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;
        // Chuyển trang theo role
        const token = data.token;
        const payload = jwtDecode(token);
        if (payload.quyen === 2) {
          //chuyển hướng user
          // window.location.href = "http://localhost:3001";
          alert("Đăng nhập thành công đây là tài khoản user");
        } else if (payload.quyen === 1) {
          //chuyển hướng admin
          // window.location.href = "/admin";
          alert("Đăng nhập thành công đây là tài khoản admin");
        } else {
          alert("Đăng nhập thất bại ");
        }
      } catch (error) {
        if (error.message.includes("Mật khẩu")) {
          setFieldError("password", error.message);
        } else if (error.message.includes("email")) {
          setFieldError("email", error.message);
        } else {
          // Xử lý lỗi khác
          alert(`Lỗi đăng nhập: ${errorData.message}`);
        }

        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.heading}>Sign In</div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
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

          <span className={styles.forgotPassword}>
            <Link href="#">Forgot password</Link>
          </span>

          <input type="submit" className={styles.loginButton} value="Sign In" />
        </form>

        <div className={styles.socialAccountContainer}>
          <span className={styles.title}>Or Sign in with</span>
          <div className={styles.socialAccounts}>
            <button className={styles.socialButton}>
              <img src="/image/item/icon-gg-login.png" alt="" />
            </button>
          </div>
        </div>

        <div className={styles.signUpNow}>
          <span className={styles.dontHaveAnAccount}>
            Don't have an account?
            <Link href="/components/register" id="gotoSignup">
              Sign up now
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
