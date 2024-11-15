"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./quanlikho.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function SanPham() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 5;

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
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/product/getProducts?page=${currentPage}&search=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Lỗi không thể tải dữ liệu");
      }
      const data = await response.json();
      settotalPages(data.totalPages || 1);
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchProducts = debounce(fetchProducts, 300);

  useEffect(() => {
    debouncedFetchProducts();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startProductIndex = (currentPage - 1) * itemsPerPage + 1;
  const endProductIndex = Math.min(currentPage * itemsPerPage, totalProducts);
  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Danh Sách Sản Phẩm Trong Kho
          </div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
              <Link href="/components/themsanpham" className={styles.sp}>
                <i className="fas fa-plus"></i> Tạo mới sản phẩm
              </Link>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.sp2} onClick={uploadFile}>
                &nbsp;
                <i className="fas fa-file-upload"></i> Tải từ file
              </button>
              &nbsp;
              <button className={styles.sp3} onClick={printData}>
                <i className="fas fa-print"></i> In dữ liệu
              </button>
              &nbsp;
              <button className={styles.sp4} onClick={copyData}>
                <i className="fas fa-copy"></i> Sao chép
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
                placeholder="Nhập tên sản phẩm..."
              />
            </div>
          </div>
          <table id="productTable" className={styles.productTable}>
            <thead>
              <tr>
                <th style={{ width: "3%" }}>
                  <input type="checkbox" id="selectAll" />
                </th>
                <th style={{ width: "12%", textAlign: "center" }}>
                  ID sản phẩm
                </th>
                <th style={{ width: "20%", textAlign: "center" }}>
                  Tên sản phẩm
                </th>
                <th style={{ width: "10%", textAlign: "center" }}>Ảnh</th>
                <th style={{ width: "10%", textAlign: "center" }}>Số lượng</th>
                <th style={{ width: "10%", textAlign: "center" }}>Giá tiền</th>
                <th style={{ width: "15%", textAlign: "center" }}>
                  Mã sản phẩm
                </th>
                <th style={{ width: "10%", textAlign: "center" }}>Đã bán</th>
                <th style={{ width: "15%", textAlign: "center" }}>
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const {
                  _id,
                  ten_san_pham,
                  hinh_anh,
                  ma_san_pham,
                  gia_san_pham,
                  so_luong,
                  trang_thai,
                  da_ban,
                } = product;

                return (
                  <tr key={_id}>
                    <td>
                      <input type="checkbox" className={styles.rowCheckbox} />
                    </td>
                    <td>{_id}</td>
                    <td>{ten_san_pham}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/images/${hinh_anh}`}
                        alt="Sản phẩm"
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>{so_luong}</td>
                    <td>{gia_san_pham.toLocaleString("vi-VN")}₫</td>
                    <td style={{ textAlign: "center" }}>{ma_san_pham}</td>
                    <td style={{ textAlign: "center" }}>{da_ban}</td>
                    <td style={{ textAlign: "center" }}>{trang_thai}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <span>
              Hiện {startProductIndex} đến {endProductIndex} của {totalProducts}{" "}
              sản phẩm
            </span>
            <div className={styles.paginationControls}>
              <button
                className={`${styles.paginationButton} ${
                  currentPage === 1 ? styles.disabled : styles["other-page"]
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button className={styles.paginationButton}>
                {`Trang ${currentPage} / ${totalPages}`}
              </button>
              <button
                className={`${styles.paginationButton} ${
                  currentPage === totalPages
                    ? styles.disabled
                    : styles["other-page"]
                }`}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
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
