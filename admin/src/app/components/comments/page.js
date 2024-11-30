"use client";
import styles from "./comments.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

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
  const handleToggleComment = async (id, trang_thai) => {
    try {
      const response = await fetch(`http://localhost:5000/comment/changeStatus/${id}`, {
        method: "PUT",
      });
      const data = await response.json();

      if (data.message) {
        setComments((prevComments) =>
          prevComments.map((comment) => (comment._id === id ? { ...comment, trang_thai: !trang_thai } : comment))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  // hiển thị số sản phẩm trên mỗi trang
  const totalComment = comments.length;
  const startDanhmucIndex = (currentPage - 1) * 10 + 1;
  const endDanhmucIndex = currentPage * 10 > totalComment ? totalComment : currentPage * 10;

  // Hàm xuất file pdf
  const handleExportPDF = async () => {
    const table = document.getElementById("productTable");
    if (!table) {
      alert("Không tìm thấy bảng dữ liệu!");
      return;
    }

    const canvas = await html2canvas(table);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("table-data.pdf");
  };

  // Hàm xuất file excel

  const exportToExcel = () => {
    const table = document.getElementById("productTable");
    if (!table) {
      alert("Không tìm thấy bảng dữ liệu!");
      return;
    }

    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    const worksheet = workbook.Sheets.Sheet1;

    const columnWidths = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 20 }, { wch: 10 }];

    worksheet["!cols"] = columnWidths;

    XLSX.writeFile(workbook, "table-data.xlsx");
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
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
                <button
                  className={styles.sp3}
                  onClick={() => {
                    const originalContent = document.body.innerHTML;
                    const tableContent = document.getElementById("productTable").outerHTML;
                    document.body.innerHTML = tableContent;
                    window.print();
                    document.body.innerHTML = originalContent;
                  }}
                >
                  <i className="fas fa-print"></i> In dữ liệu
                </button>
                &nbsp;
                <button className={styles.sp5} onClick={exportToExcel}>
                  <i className="fas fa-file-excel"></i> Xuất Excel
                </button>
                &nbsp;
                <button className={styles.sp6} onClick={handleExportPDF}>
                  <i className="fas fa-file-pdf"></i> Xuất PDF
                </button>
                &nbsp;
              </div>
            </div>

            <div className={styles.tableContainer}>
              <div className={styles.tableControls}>
                <label htmlFor="entries" style={{ fontWeight: "bold" }}></label>
                <div className={styles.search}>
                  <label htmlFor="search" style={{ fontWeight: "bold" }}>
                    Tìm kiếm:
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={handSearchChange}
                    placeholder="Nhập tên người dùng..."
                  />
                </div>
              </div>
              <table id="productTable" className={styles.productTable}>
                <thead>
                  <tr>
                    <th style={{ width: "15%", textAlign: "center" }}>Id bình luận</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Id sản phẩm</th>
                    <th style={{ width: "8%", textAlign: "center" }}>Họ và tên </th>
                    <th style={{ width: "12%", textAlign: "center" }}>Nội dung</th>
                    <th style={{ width: "5%", textAlign: "center" }}>Sao</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Ngày bình luận</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        Không có bình luận nào
                      </td>
                    </tr>
                  ) : (
                    comments.map((comment) => {
                      const { _id, noi_dung, sao, ngay_binh_luan, id_san_pham, trang_thai } = comment;

                      return (
                        <tr key={_id} className={!trang_thai ? styles.hiddenRow : ""}>
                          <td>{_id}</td>
                          <td>{id_san_pham}</td>
                          <td style={{ textAlign: "center" }}>
                            <span className={`${styles.status} ${styles.inStock}`}>{comment.user?.ten_dang_nhap}</span>
                          </td>

                          <td style={{ textAlign: "center" }}>{noi_dung}</td>
                          <td style={{ textAlign: "center" }}>{sao}</td>
                          <td style={{ textAlign: "center" }}>
                            {new Date(ngay_binh_luan).toLocaleString("vi-VN", {
                              timeZone: "Asia/Ho_Chi_Minh",
                            })}
                          </td>

                          <td style={{ textAlign: "center" }}>
                            <button
                              onClick={() => handleToggleComment(_id, trang_thai)}
                              className={`${styles.btn} ${styles.edit}`}
                            >
                              <FontAwesomeIcon icon={trang_thai ? faEye : faEyeSlash} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <span className={styles.totalComment}>
                  Hiện {startDanhmucIndex} đến {endDanhmucIndex} của {totalComment} bình luận
                </span>
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
