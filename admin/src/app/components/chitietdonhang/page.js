"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./donhang.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

import jsPDF from "jspdf";
import "jspdf-autotable";

const exportToPDF = () => {
  if (typeof document !== "undefined") {
    const doc = new jsPDF();

    // Add title
    doc.text("Chi Tiết Đơn Hàng", 14, 10);

    // Auto table
    doc.autoTable({
      html: "#productTable",
      startY: 20,
      styles: { fontSize: 10 },
    });

    // Save the PDF
    doc.save("OrderDetails.pdf");

    Swal.fire({
      title: "Thành công",
      text: "Dữ liệu đã được xuất ra PDF!",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
};

const exportToExcel = () => {
  if (typeof document !== "undefined") {
    const table = document.getElementById("productTable");
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "OrderDetails");

    XLSX.writeFile(workbook, "OrderDetails.xlsx");
    Swal.fire({
      title: "Thành công",
      text: "Dữ liệu đã được xuất ra Excel!",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
};

export default function ChiTietDonHang() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  //tìm kiếm
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const handleSearch = (e) => {
    const query = removeAccents(searchQuery.toLowerCase());
    const filtered = users.filter((user) => {
      const giadonhang = String(user.gia_san_pham || "");
      const tensp = user.ten_san_pham || "";
      const soluong = String(user.so_luong || "");
      return (
        removeAccents(giadonhang.toLowerCase()).includes(query) ||
        removeAccents(tensp.toLowerCase()).includes(query) ||
        removeAccents(soluong.toLowerCase()).includes(query)
      );
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(removeAccents(searchQuery.toLowerCase()));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, users, itemsPerPage]);

  //phân trang
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const dataToShow = searchQuery ? filteredUsers : users;
    setDisplayUsers(dataToShow.slice(start, end));
  }, [filteredUsers, users, itemsPerPage, currentPage, searchQuery]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    Swal.fire({
      title: "Đã cập nhật",
      text: `Giới hạn hiển thị đã được thay đổi thành ${e.target.value} mục.`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const totalPages = Math.ceil((searchQuery ? filteredUsers.length : users.length) / itemsPerPage);

  const uploadFile = () => {
    Swal.fire({
      title: "Chưa khả dụng",
      text: "Tính năng tải file chưa được triển khai!",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  const printData = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const copyData = () => {
    if (typeof document !== "undefined") {
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
    }
  };

  const exportToExcel = () => {
    if (typeof document !== "undefined" && typeof XLSX !== "undefined") {
      const table = document.getElementById("productTable");
      const workbook = XLSX.utils.table_to_book(table);
      XLSX.writeFile(workbook, "products.xlsx");

      Swal.fire({
        title: "Thành công",
        text: "Dữ liệu đã được xuất ra Excel!",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const exportToPDF = () => {
    if (typeof document !== "undefined" && typeof jsPDF !== "undefined") {
      const doc = new jsPDF();
      doc.autoTable({ html: "#productTable" });
      doc.save("products.pdf");

      Swal.fire({
        title: "Thành công",
        text: "Dữ liệu đã được xuất ra PDF!",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  //lấy dữ liệu danh sách chi tiết đơn hàng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/donhang/getAllOrderDetails");
        if (!response.ok) {
          throw new Error("Lỗi không thể tải dữ liệu");
        }
        const data = await response.json();
        setUser(data.ordersDetail);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Danh Sách Tài Khoản
          </div>
          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
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

            <div className={styles.tableContainer}>
              <div className={styles.tableControls}>
                <div className={styles.search}>
                  <label htmlFor="search" style={{ fontWeight: "bold" }}>
                    Tìm kiếm:
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Nhập tên sản phẩm..."
                  />
                </div>
              </div>
              <table id="productTable" className={styles.productTable}>
                <thead>
                  <tr>
                    <th style={{ width: "35%", textAlign: "center" }}>ID</th>
                    <th style={{ width: "25%", textAlign: "center" }}>Giá Sản phẩm</th>
                    <th style={{ width: "25%", textAlign: "center" }}>Tên sản phẩm</th>
                    <th style={{ width: "15%", textAlign: "center" }}>Số lượng</th>
                    <th style={{ width: "15%", textAlign: "center" }}>ID đơn hàng</th>
                    <th style={{ width: "15%", textAlign: "center" }}>ID sản phẩm</th>
                  </tr>
                </thead>
                <tbody>
                  {displayUsers.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td style={{ textAlign: "center" }}>
                        <p className={styles.mota}>{item.gia_san_pham.toLocaleString("vi-VN")}đ</p>
                      </td>
                      <td style={{ textAlign: "center" }}>{item.ten_san_pham}</td>
                      <td style={{ textAlign: "center" }}>{item.so_luong}</td>
                      <td>{item.id_don_hang}</td>
                      <td>{item.id_san_pham}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <span>
                  Hiện 1 đến {displayUsers.length} của {filteredUsers.length || users.length} chi tiết đơn hàng
                </span>
                <div className={styles.paginationControls}>
                  <button
                    className={styles.paginationButton}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>
                  <button className={`${styles.paginationButton} ${styles.active}`}>
                    {` Trang ${currentPage} / ${totalPages}`}
                  </button>

                  <button
                    className={styles.paginationButton}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
