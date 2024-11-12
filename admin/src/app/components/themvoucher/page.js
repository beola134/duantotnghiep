"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import styles from "./themvoucher.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function ThemVoucher() {
  const [maVouchers, setmaVouchers] = useState("");
  const [giatri, setgiatri] = useState("");
  const [ngayBD, setngayBD] = useState("");
  const [ngayKT, setngayKT] = useState("");
  const [mota, setmota] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Kiểm tra nếu các trường bắt buộc chưa được điền
    if (!maVouchers) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng nhập mã voucher!",
      });
      return;
    }
    if (!giatri) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng nhập giá trị voucher",
      });
      return;
    }
    if (!ngayBD) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng ngày bắt đầu tính giá trị voucher",
      });
      return;
    }
    if (!ngayKT) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng ngày kết thúc tính giá trị voucher",
      });
      return;
    }

  const formData = {
    ma_voucher: maVouchers,
    gia_tri: giatri,
    bat_dau: ngayBD,
    ket_thuc: ngayKT,
    mo_ta: mota,
  };

    try {
      const response = await fetch("http://localhost:5000/voucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thêm voucher thành công!",
        }).then(() => {
          router.push("/components/voucher");
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: errorData.error || "Có lỗi xảy ra!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Có lỗi xảy ra!",
      });
    }
  };

  return (
    <>
      <div className={styles.SidebarContainer}>
        <section id={styles.content}>
          <div className={styles.header1}>
            <div className={styles.title} style={{ fontWeight: "bold" }}>
              Thêm Voucher
            </div>
            <div className={styles.timestamp} id="timestamp"></div>
          </div>
          <div className={styles.bg}>
            <form onSubmit={handleSubmit}>
              <div className={styles.container1}>
                <div className={styles.formGroup}>
                  <label htmlFor="ma_Voucher">Mã Voucher</label>
                  <input
                    type="text"
                    id="ma_Voucher"
                    className="ma_Voucher"
                    value={maVouchers}
                    onChange={(e) => setmaVouchers(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="giatri">Giá trị voucher</label>
                  <input
                    type="text"
                    id="giatri"
                    className="giatri"
                    onChange={(e) => setgiatri(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="ngayBD">
                    Ngày bắt đầu tính giá trị voucher
                  </label>
                  <input
                    type="date"
                    id="ngayBD"
                    className="ngayBD"
                    onChange={(e) => setngayBD(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="ngayKT">
                    Ngày kết thúc tính giá trị voucher
                  </label>
                  <input
                    type="date"
                    id="ngayKT"
                    className="ngayKT"
                    onChange={(e) => setngayKT(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="description">Mô tả voucher</label>
                  <textarea
                    id="description"
                    name="description"
                    value={mota}
                    onChange={(e) => setmota(e.target.value)}
                  />
                </div>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  onClick={handleSubmit}>
                  Thêm
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}