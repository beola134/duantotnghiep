import React from "react";
import styles from "./dieukien.module.css"
function VoucherModal({ isOpen, onRequestClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>VOUCHER GIẢM 20K</h3>
        <div className={styles.content}>
          <p>
            <strong>Mã khuyến mãi:</strong> VC-20KDON399
          </p>
          <p>
            <strong>Điều kiện:</strong> Mã giảm 20k cho đơn hàng có giá trị tối thiểu 399k
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText("VC-20KDON399")}>
            Copy
          </button>
          <button className={styles.closeButton} onClick={onRequestClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoucherModal;