"use client";
import Link from "next/link";
import styles from "./comments.module.css";
import { useState, useEffect } from "react";
export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // gọi tất cả các bình luận từ API
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/comment/showAll?page=${currentPage}&ten_dang_nhap=${search}`);
      const data = await response.json();
      setComments(data.comments);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [currentPage, search]);

  // chức năng chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // hàm xử lí thay đổi bình luận
  const handSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
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
                  <input type="text" id="search" value={search} onChange={handSearchChange} />
                </div>
              </div>
              <table id="productTable" className={styles.productTable}>
                <thead>
                  <tr>
                    <th style={{ width: "3%" }}>
                      <input type="checkbox" id="selectAll" />
                    </th>
                    <th style={{ width: "10%", textAlign: "center" }}>Id bình luận</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Id sản phẩm</th>
                    <th style={{ width: "8%", textAlign: "center" }}>Họ và tên </th>
                    <th style={{ width: "12%", textAlign: "center" }}>Nội dung</th>
                    <th style={{ width: "5%", textAlign: "center" }}>Sao</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Ngày bình luận</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment) => {
                    const { _id, noi_dung, sao, ngay_binh_luan, ten_dang_nhap, id_san_pham } = comment;

                    return (
                      <tr key={_id}>
                        <td>
                          <input type="checkbox" className={styles.rowCheckbox} />
                        </td>
                        <td>{_id}</td>
                        <td>{id_san_pham}</td>
                        <td style={{ textAlign: "center" }}>
                          <span className={`${styles.status} ${styles.inStock} `}>{comment.user?.ten_dang_nhap}</span>
                        </td>

                        <td style={{ textAlign: "center" }}>{noi_dung}</td>
                        z<td style={{ textAlign: "center" }}>{sao}</td>
                        <td style={{ textAlign: "center" }}>
                          {new Date(ngay_binh_luan).toLocaleString("vi-VN", {
                            timeZone: "Asia/Ho_Chi_Minh",
                          })}
                        </td>

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
                <div className={styles.paginationControls}>
                  <button
                    className={`${styles.paginationButton} ${
                      currentPage === 1 ? styles.disabled : styles["other-page"]
                    }`}
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  <button className={styles.paginationButton}>{`Trang ${currentPage} / ${totalPages || 1}`}</button>
                  <button
                    className={`${styles.paginationButton} ${
                      currentPage === totalPages ? styles.disabled : styles["other-page"]
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
