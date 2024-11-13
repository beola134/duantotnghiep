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
  const [totalPage, settotalPage] = useState(1);
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

  // Hàm in dữ liệu
  const printData = () => {
    window.print();
  };

  // Hàm sao chép dữ liệu
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

  // Hàm tìm kiếm sản phẩm
  const searchProducts = async (query) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/product/timkiem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error("Lỗi khi tìm kiếm sản phẩm");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý sự kiện thay đổi trong ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Delay debounce để chờ người dùng ngừng gõ
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 1) {
        // Chỉ tìm kiếm khi từ khóa có độ dài > 1 ký tự
        searchProducts(searchQuery);
      } else if (searchQuery.length === 0) {
        // Nếu ô tìm kiếm trống, tải lại toàn bộ sản phẩm
        fetchProducts();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  
  // Hàm tải toàn bộ sản phẩm ban đầu
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/product/allsp?page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Lỗi không thể tải dữ liệu");
      }
      const data = await response.json();
      settotalPage(data.totalPage);
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);
  // Tính chỉ số bắt đầu và kết thúc của sản phẩm cho trang hiện tại
  const startItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const endItemIndex = Math.min(currentPage * itemsPerPage, totalProducts);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts();
  };

  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Kho
          </div>
          

          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
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
                    <th style={{ width: "10%", textAlign: "center" }}>
                      Số lượng
                    </th>
                    <th style={{ width: "10%", textAlign: "center" }}>
                      Giá tiền
                    </th>
                    <th style={{ width: "10%", textAlign: "center" }}>
                      Giá giảm
                    </th>
                    <th style={{ width: "10%", textAlign: "center" }}>
                      Mã sản phẩm
                    </th>
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
                      ma_san_pham,
                      gia_san_pham,
                      gia_giam,
                      hinh_anh,
                      so_luong,
                    } = product;

                    return (
                      <tr key={_id}>
                        <td>
                          <input
                            type="checkbox"
                            className={styles.rowCheckbox}
                          />
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
                        <td>
                          <span
                            className={`${styles.status} ${styles.inStock}`}
                          >
                            {gia_san_pham.toLocaleString("vi-VN")}₫
                          </span>
                        </td>
                        <td>{gia_giam.toLocaleString("vi-VN")}₫</td>
                        <td>{ma_san_pham}</td>
                        <td style={{ textAlign: "center" }}>Còn hàng 
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={styles.pagination}>
              <span>Hiện {startItemIndex} đến {endItemIndex} của {totalProducts} sản phẩm</span>
                <div className={styles.paginationControls}>
                  <span
                    className={`${styles.paginationButton} ${
                      currentPage === 1 ? styles.disabled : styles["other-page"]
                    }`}
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                  >
                    ‹
                  </span>

                  <span
                    className={styles.paginationButton}
                  >{`Trang ${currentPage} / ${totalPage || 1}`}</span>
                  <span
                    className={`${styles.paginationButton} ${
                      currentPage === totalPage
                        ? styles.disabled
                        : styles["other-page"]
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPage}
                  >
                    ›
                  </span>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
