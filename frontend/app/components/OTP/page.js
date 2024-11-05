import { useState, useEffect } from "react";
import styles from "./otp.module.css";
import Swal from "sweetalert2";

function OtpModal({ isOpen, onRequestClose }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangeOtp = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return; // chỉ nhận ký tự số
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // chỉ cho phép nhập 1 ký tự
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo hoặc quay lại ô trước đó
    if (index < otp.length - 1 && value) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    // xoá ô nếu nhấn backspace
    if (index > 0 && !value) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Vui lòng nhập đủ 6 ký tự");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/users/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpValue }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Xác thực OTP thất bại");
      }

      Swal.fire({
        icon: "success",
        title: "Xác thực thành công",
        text: "Chuyển hướng đến trang đăng nhập",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        onRequestClose();
        window.location.href = "../components/login";
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Xác thực OTP</h3>
        <p className={styles.description}>Vui lòng nhập mã OTP vừa gửi tới gmail</p>
        <div className={styles.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChangeOtp(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[index]) {
                  document.getElementById(`otp-input-${index - 1}`).focus();
                }
              }}
              className={styles.otpInput}
            />
          ))}
        </div>
        <div className={styles.timerContainer}>
          <span>
            Mã sẽ hết hạn: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
          </span>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onRequestClose}>
            Hủy Bỏ
          </button>
          <button className={styles.confirmButton} onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Xác Nhận"}
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}

export default function OTP({ isOpen, onRequestClose }) {
  return <OtpModal isOpen={isOpen} onRequestClose={onRequestClose} />;
}
