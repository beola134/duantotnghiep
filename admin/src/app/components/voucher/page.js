"use client";
import Link from "next/link";
import styles from "./voucher.module.css";
import { useState, useEffect } from "react";

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalVouchers, setTotalVouchers] = useState(0);
  const itemsPerPage = 5;

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const uploadFile = () => {
    Swal.fire({
      title: "Chưa khả dụng",
      text: "Tính năng tải file chưa được triển khai!",
      icon: "info",
      confirmButtonText: "OK",
    });
  };
  const printData = () => {
    window.print();
  };

  const copyData = () => {
    const table = document.getElementById("productTable");
    const range = document.createRange();
    range.selectNode(table);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");

    Swal.fire({
      title: "Thành công",
      text: "Dữ liệu đã được sao chép!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  // Hàm xuất dữ liệu ra Excel
  const exportToExcel = () => {
    const table = document.getElementById("productTable");
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, "products.xlsx");

    Swal.fire({
      title: "Thành công",
      text: "Dữ liệu đã được xuất ra Excel!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  // Hàm xuất dữ liệu ra PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#productTable" });
    doc.save("products.pdf");

    Swal.fire({
      title: "Thành công",
      text: "Dữ liệu đã được xuất ra PDF!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/voucher/getAllVouchers?page=${currentPage}&ma_voucher=${searchQuery}&limit=${itemsPerPage}`
      );
      if (!response.ok) {
        throw new Error("Lỗi không thể tải dữ liệu");
      }
      const data = await response.json();
      setTotalPage(data.totalPages || 1);
      setVouchers(data.vouchers);
      setTotalVouchers(data.totalVouchers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchVouchers = debounce(fetchVouchers, 300);

  useEffect(() => {
    debouncedFetchVouchers();
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const deleteVoucher = async (id) => {
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
      const response = await fetch(`http://localhost:5000/voucher/deleteVoucher/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVouchers(vouchers.filter((voucher) => voucher._id !== id));
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
      console.error("Error deleting voucher:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi xóa Danh mục.",
      });
    }
  };

  const startVoucherIndex = (currentPage - 1) * itemsPerPage + 1;
  const endVoucherIndex = Math.min(currentPage * itemsPerPage, totalVouchers);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;

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
            </div>
            <div className={styles.buttonGroup}>
              &nbsp;
              <button className={styles.sp3} onClick={printData}>
                <i className="fas fa-print"></i> In dữ liệu
              </button>
              &nbsp;
              <button className={styles.sp5} onClick={exportToExcel}>
                &nbsp;
                <i className="fas fa-file-excel"></i> Xuất Excel
              </button>
              &nbsp;
              <button className={styles.sp6} onClick={exportToPDF}>
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
                onChange={handleSearchChange}
                placeholder="Nhập mã voucher..."
              />
            </div>
          </div>

          <table id="productTable" className={styles.productTable}>
            <thead>
              <tr>
                <th style={{ width: "15%", textAlign: "center" }}>Id Voucher</th>
                <th style={{ width: "12%", textAlign: "center" }}>Mã Voucher</th>
                <th style={{ width: "12%", textAlign: "center" }}>Giá trị</th>
                <th style={{ width: "12%", textAlign: "center" }}>Phần trăm</th>
                <th style={{ width: "12%", textAlign: "center" }}>Số Lượng</th>
                <th style={{ width: "12%", textAlign: "center" }}>Ngày bắt đầu</th>
                <th style={{ width: "10%", textAlign: "center" }}>Ngày kết thúc</th>
                <th style={{ width: "10%", textAlign: "center" }}>Mô tả</th>
                <th style={{ width: "10%", textAlign: "center" }}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Không có voucher
                  </td>
                </tr>
              ) : (
                vouchers.map((voucher) => {
                  const { _id, ma_voucher, gia_tri, phan_tram, so_luong, bat_dau, ket_thuc, mo_ta } = voucher;

                  return (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td style={{ textAlign: "center" }}>{ma_voucher}</td>
                      <td style={{ textAlign: "center" }}>{gia_tri}</td>
                      <td style={{ textAlign: "center" }}>{phan_tram}%</td>
                      <td style={{ textAlign: "center" }}>{so_luong}</td>
                      <td style={{ textAlign: "center" }}>{bat_dau}</td>
                      <td style={{ textAlign: "center" }}>{ket_thuc}</td>
                      <td style={{ textAlign: "center" }}>{mo_ta}</td>
                      <td style={{ textAlign: "center" }}>
                        <Link href={`/components/suavoucher/${_id}`} className={`${styles.btn} ${styles.edit}`}>
                          ✏️
                        </Link>
                        &nbsp;
                        <button className={`${styles.btn} ${styles.delete}`} onClick={() => deleteVoucher(_id)}>
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
              Hiện {startVoucherIndex} đến {endVoucherIndex} của {totalVouchers} sản phẩm
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
