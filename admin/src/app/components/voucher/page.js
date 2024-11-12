"use client";
import Link from "next/link";
import styles from "./voucher.module.css";
import { useState, useEffect } from "react";
export default function VoucherPage() {
  const [vouchers, setvouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // gọi tất cả các bình luận từ API
  useEffect(() => {
    const fetchvouchers = async () => {
      try {
        const response = await fetch("http://localhost:5000/voucher/getAllVouchers");
        const data = await response.json();
        setvouchers(data.vouchers);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchvouchers();
  }, []);

  const deleteVoucher = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/voucher/deleteVoucher/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setvouchers(vouchers.filter((voucher) => voucher._id !== id));
        alert("Voucher đã được xóa thành công!");
      } else {
        alert("Có lỗi xảy ra khi xóa voucher.");
      }
    } catch (error) {
      console.error("Error deleting voucher:", error);
      alert("Có lỗi xảy ra khi xóa voucher.");
    }
  };

  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Danh Sách Vouchers
          </div>
          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
              <Link href="/components/themvoucher" className={styles.sp}>
                <i className="fas fa-plus"></i> Tạo mới voucher
              </Link>
              <div className={styles.buttonGroup}>
                <button className={styles.sp2}>
                  &nbsp;
                  <i className="fas fa-file-upload"></i> Tải từ file
                </button>
                &nbsp;
                <button className={styles.sp3}>
                  <i className="fas fa-print"></i> In dữ liệu
                </button>
                &nbsp;
                <button className={styles.sp4}>
                  <i className="fas fa-copy"></i> Sao chép
                </button>
                &nbsp;
                <button className={styles.sp5}>
                  &nbsp;
                  <i className="fas fa-file-excel"></i> Xuất Excel
                </button>
                &nbsp;
                <button className={styles.sp6}>
                  <i className="fas fa-file-pdf"></i> Xuất PDF
                </button>
                &nbsp;
              </div>
            </div>

            <div className={styles.tableContainer}>
              <div className={styles.tableControls}>
                <label htmlFor="entries" style={{ fontWeight: "bold" }}>
                  Hiện&nbsp;
                  <select id="entries">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span>&nbsp; danh mục</span>
                </label>
                <div className={styles.search}>
                  <label htmlFor="search" style={{ fontWeight: "bold" }}>
                    Tìm kiếm:
                  </label>
                  <input type="text" id="search" />
                </div>
              </div>
              <table id="productTable" className={styles.productTable}>
                <thead>
                  <tr>
                    <th style={{ width: "3%" }}>
                      <input type="checkbox" id="selectAll" />
                    </th>
                    <th style={{ width: "12%", textAlign: "center" }}>Id Voucher</th>
                    <th style={{ width: "12%", textAlign: "center" }}>Mã Voucher</th>
                    <th style={{ width: "12%", textAlign: "center" }}>Giá trị</th>
                    <th style={{ width: "12%", textAlign: "center" }}>Ngày bắt đầu</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Ngày kết thúc</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Mô tả</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {vouchers.map((voucher) => {
                    const { _id, ma_voucher, gia_tri, bat_dau, ket_thuc, mo_ta } = voucher;

                    return (
                      <tr key={_id}>
                        <td>
                          <input type="checkbox" className={styles.rowCheckbox} />
                        </td>
                        <td>{_id}</td>
                        <td style={{ textAlign: "center" }}>{ma_voucher}</td>
                        <td style={{ textAlign: "center" }}>{gia_tri}</td>
                        <td style={{ textAlign: "center" }}>{bat_dau}</td>
                        <td style={{ textAlign: "center" }}>{ket_thuc}</td>
                        <td style={{ textAlign: "center" }}>{mo_ta}</td>
                        <td style={{ textAlign: "center" }}>
                          <Link href={`/components/suavoucher/${_id}`} className={`${styles.btn} ${styles.edit}`}>
                            ✏️
                          </Link>
                          &nbsp;
                          <button
                            className={`${styles.btn} ${styles.delete}`}
                            id="deleteButton"
                            onClick={() => deleteVoucher(_id)}
                          >
                            🗑️
                          </button>
                          &nbsp;
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <span></span>
                <div className={styles.paginationControls}>
                  <button className={styles.paginationButton}>Lùi</button>
                  <button className={`${styles.paginationButton} ${styles.active}`}>1</button>
                  <button className={styles.paginationButton}>2</button>
                  <button className={styles.paginationButton}>Tiếp</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
