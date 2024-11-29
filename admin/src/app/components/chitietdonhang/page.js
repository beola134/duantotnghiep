"use client";
import styles from "./donhang.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import RobotoRegular from "../taikhoan/Roboto-Regular.base64";



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
  
  // Hàm xuất dữ liệu ra Excel
  const exportToExcel = async () => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xuất dữ liệu ra file Excel?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xuất",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("Danh Sách Sản Phẩm Đã Bán");
          
          worksheet.columns = [
            { header: "ID", key: "_id", width: 20 },
            { header: "Giá Sản Phẩm", key: "gia_san_pham", width: 25 },
            { header: "Tên Sản Phẩm", key: "ten_san_pham", width: 25 },
            { header: "Số Lượng", key: "so_luong", width: 40 },
            { header: "ID Đơn Hàng", key: "id_don_hang", width: 20 },
            { header: "ID Sản Phẩm", key: "id_san_pham", width: 20 },
          ];
          worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "FFFFFF" } };
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "0070C0" },
            };
            cell.alignment = { vertical: "middle", horizontal: "center" };
          });
          // Lấy dữ liệu từ bảng HTML và thêm vào Excel
          const rows = Array.from(
            document.querySelectorAll("#productTable tbody tr")
          );
           rows.forEach((row) => {
             const cols = row.querySelectorAll("td");
             const id = cols[0].textContent.trim();
             const giaSanPham = cols[1].textContent.trim();
             const tenSanPham = cols[2].textContent.trim();
             const soLuong = cols[3].textContent.trim();
             const idDonHang = cols[4].textContent.trim();
             const idSanPham = cols[5].textContent.trim();
             // Thêm dòng vào worksheet
             worksheet.addRow({
               _id: id,
               gia_san_pham: giaSanPham,
               ten_san_pham: tenSanPham,
               so_luong: soLuong,
               id_don_hang: idDonHang,
               id_san_pham: idSanPham,
             });
           });
          worksheet.eachRow((row) => {
            row.eachCell((cell) => {
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
            });
          });
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "chi_tiet_don_hang.xlsx";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          Swal.fire({
            title: "Thành công",
            text: "Dữ liệu đã được xuất ra file Excel!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Lỗi khi xuất Excel:", error);
          Swal.fire({
            title: "Lỗi",
            text: "Không thể xuất file Excel. Vui lòng thử lại!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  // Hàm xuất dữ liệu ra PDF
  const exportToPDF = () => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xuất dữ liệu ra file PDF?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xuất",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const doc = new jsPDF();
          doc.addFileToVFS("Roboto-Regular.ttf", RobotoRegular);
          doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
          doc.setFont("Roboto");
          doc.setFontSize(18);
          doc.text("Chi tiết đơn hàng", 14, 20);
          const rows = [];
          const headers = [
            "ID",
            "Giá Sản Phẩm",
            "Tên Sản Phẩm",
            "Số Lượng",
            "ID Đơn Hàng",
            "ID Sản Phẩm",
          ];
          const tableRows = document.querySelectorAll("#productTable tbody tr");
          tableRows.forEach((row) => {
            const cols = row.querySelectorAll("td");
            const _id = cols[0].textContent.trim();
            const gia_san_pham = cols[1].textContent.trim();
            const ten_san_pham = cols[2].textContent.trim();
            const so_luong = cols[3].textContent.trim();
            const id_don_hang = cols[4].textContent.trim();
            const id_san_pham = cols[5].textContent.trim();
            console.log(tableRows);
            
            rows.push([
              _id,
              gia_san_pham,
              ten_san_pham,
              so_luong,
              id_don_hang,
              id_san_pham,
            ]);
          });
          doc.autoTable({
            head: [headers],
            body: rows,
            startY: 30,
            theme: "grid",
            headStyles: {
              fillColor: [0, 112, 192],
              textColor: [255, 255, 255],
            },
            styles: { font: "Roboto", fontSize: 10 },
            columnStyles: {
              0: { cellWidth: 25 }, // ID đơn hàng
              1: { cellWidth: 20 }, // giá sản phẩm
              2: { cellWidth: 30 }, // Tên sp
              3: { cellWidth: 20 }, // Số luọng
              4: { cellWidth: 15 }, // id đơn hang
              5: { cellWidth: 25 }, // id sản phẩm

            },
          });
          doc.save("chi_tiet_don_hang.pdf");
          Swal.fire({
            title: "Thành công",
            text: "Dữ liệu đã được xuất ra file PDF!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Lỗi khi xuất PDF:", error);
          Swal.fire({
            title: "Lỗi",
            text: "Không thể xuất file PDF. Vui lòng thử lại!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
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

   if (loading) {
     return <p>Loading...</p>;
   }

   if (error) {
     return <p>Error: {error}</p>;
   }
  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Danh Sách Sản Phẩm Đã Bán
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
              {displayUsers.length > 0 ? (
                <table id="productTable" className={styles.productTable}>
                  <thead>
                    <tr>
                      <th style={{ width: "35%", textAlign: "center" }}>ID</th>
                      <th style={{ width: "25%", textAlign: "center" }}>
                        Giá Sản phẩm
                      </th>
                      <th style={{ width: "25%", textAlign: "center" }}>
                        Tên sản phẩm
                      </th>
                      <th style={{ width: "15%", textAlign: "center" }}>
                        Số lượng
                      </th>
                      <th style={{ width: "15%", textAlign: "center" }}>
                        ID đơn hàng
                      </th>
                      <th style={{ width: "15%", textAlign: "center" }}>
                        ID sản phẩm
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayUsers.map((item) => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td style={{ textAlign: "center" }}>
                          <p className={styles.mota}>
                            {item.gia_san_pham.toLocaleString("vi-VN")}đ
                          </p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.ten_san_pham}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.so_luong}</td>
                        <td>{item.id_don_hang}</td>
                        <td>{item.id_san_pham}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontStyle: "italic",
                    fontWeight: "bold",
                  }}
                >
                  Không tìm thấy dữ liệu cần tìm.
                </p>
              )}
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
