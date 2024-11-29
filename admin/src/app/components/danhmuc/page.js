"use client";
import Link from "next/link";
import styles from "./danhmuc.module.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function DanhmucPage() {
  const [cates, setDanhmuc] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCates, settotalCates] = useState(0);
  const itemsPerPage = 5;

  const fetchDanhmuc = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/cate/allcate?page=${currentPage}&ten_danh_muc=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Lỗi không thể tải dữ liệu");
      }
      const data = await response.json();
      setTotalPage(data.totalPages);
      setDanhmuc(data.cates);
      settotalCates(data.totalCates);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDanhmuc();
  }, [currentPage, searchQuery]);

  // chức năng chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // hàm xử lí thay đổi danh mục
  const handSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const deleteDanhmuc = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xóa danh mục này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    try {
      const response = await fetch(`http://localhost:5000/cate/deletecate/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDanhmuc(cates.filter((cate) => cate._id !== id));
        Swal.fire({
          icon: "success",
          title: "Xóa thành công!",
          text: "Danh mục đã được xóa thành công!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Có lỗi xảy ra khi xóa Danh mục.",
        });
      }
    } catch (error) {
      console.error("Error deleting Danh mục:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi xóa Danh mục.",
      });
    }
  };

  const startDanhmucIndex = (currentPage - 1) * itemsPerPage + 1;
  const endDanhmucIndex = Math.min(currentPage * itemsPerPage, totalCates);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;

  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Danh Sách Danh mục
          </div>
          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
              <Link href="/components/themdanhmuc" className={styles.sp}>
                <i className="fas fa-plus"></i> Tạo mới Danh mục
              </Link>
            </div>
            <div className={styles.buttonGroup}>
              &nbsp;
              <button className={styles.sp3}>
                <i className="fas fa-print"></i> In dữ liệu
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

          <div className={styles.tableControls}>
            <div className={styles.search}>
              <label htmlFor="search" style={{ fontWeight: "bold" }}>
                Tìm kiếm:
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={handSearchChange}
                placeholder="Nhập tên danh mục..."
              />
            </div>
          </div>

          <table id="productTable" className={styles.productTable}>
            <thead>
              <tr>
                <th style={{ width: "15%", textAlign: "center" }}>Id Danh mục</th>
                <th style={{ width: "12%", textAlign: "center" }}>Tên danh mục</th>
                <th style={{ width: "10%", textAlign: "center" }}>Hình ảnh</th>
                <th style={{ width: "10%", textAlign: "center" }}>Mô tả</th>
                <th style={{ width: "10%", textAlign: "center" }}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {cates.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Không có danh mục
                  </td>
                </tr>
              ) : (
                cates.map((cate) => {
                  const { _id, ten_danh_muc, mo_ta, hinh_anh } = cate;

                  return (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td style={{ textAlign: "center" }}>{ten_danh_muc}</td>
                      <td style={{ width: "10%", textAlign: "center" }}>
                        <img src={`http://localhost:5000/images/${hinh_anh}`} />
                      </td>
                      <td style={{ textAlign: "center" }}>{mo_ta}</td>
                      <td style={{ textAlign: "center" }}>
                        <Link href={`/components/suadanhmuc/${_id}`} className={`${styles.btn} ${styles.edit}`}>
                          ✏️
                        </Link>
                        &nbsp;
                        <button className={`${styles.btn} ${styles.delete}`} onClick={() => deleteDanhmuc(_id)}>
                          🗑️
                        </button>
                        &nbsp;
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <span>
              Hiện {startDanhmucIndex} đến {endDanhmucIndex} của {totalCates} {""}
              sản phẩm
            </span>
            <div className={styles.paginationControls}>
              <button
                className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : styles["other-page"]}`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button className={styles.paginationButton}>{`Trang ${currentPage} / ${totalPage}`}</button>

              <button
                className={`${styles.paginationButton} ${
                  currentPage === totalPage ? styles.disabled : styles["other-page"]
                }`}
                onClick={() => currentPage < totalPage && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
