"use client";
import Link from "next/link";
import styles from "./comments.module.css";
import { useState, useEffect } from "react";
export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // gọi tất cả các bình luận từ API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:5000/comment/showAll");
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Danh Sách Sản Phẩm
          </div>
          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
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
                <button className={styles.sp7}>
                  &nbsp;
                  <i className="fas fa-trash-alt"></i> Xóa tất cả
                </button>
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
                    <th style={{ width: "12%", textAlign: "center" }}>Id bình luận</th>
                    <th style={{ width: "12%", textAlign: "center" }}>Nội dung</th>
                    <th style={{ width: "5%", textAlign: "center" }}>Sao</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Ngày bình luận</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Id người dùng </th>
                    <th style={{ width: "10%", textAlign: "center" }}>Id sản phẩm</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment) => {
                    const { _id, noi_dung, sao, ngay_binh_luan, id_nguoi_dung, id_san_pham } = comment;

                    return (
                      <tr key={_id}>
                        <td>
                          <input type="checkbox" className={styles.rowCheckbox} />
                        </td>
                        <td>{_id}</td>
                        <td style={{ textAlign: "center" }}>{noi_dung}</td>
                        <td style={{ textAlign: "center" }}>{sao}</td>
                        <td style={{ textAlign: "center" }}>
                          {new Date(ngay_binh_luan).toLocaleString("vi-VN", {
                            timeZone: "Asia/Ho_Chi_Minh",
                          })}
                        </td>
                        <td>
                          <span className={`${styles.status} ${styles.inStock}`}>{id_nguoi_dung}</span>
                        </td>
                        <td>{id_san_pham}</td>
                        <td style={{ textAlign: "center" }}>
                          <Link href={`/components/suasanpham/${_id}`} className={`${styles.btn} ${styles.edit}`}>
                            ✏️
                          </Link>{" "}
                          &nbsp;
                          <button
                            className={`${styles.btn} ${styles.delete}`}
                            id="deleteButton"
                            onClick={() => deleteProduct(_id)}
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
                <span>Hiện 1 đến 10 của 16 danh mục</span>
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