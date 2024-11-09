"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./donhang.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function DonHang() {
  const [displayDonhang, setDisplayDonhang] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [donHangs, setDonhang] = useState([]);
  const [nguoiDungMap, setNguoiDungMap] = useState({});
   const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //tìm kiếm
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (query) => {
    const filteredDonhangs = donHangs.filter((donHang) => {
      const userName = nguoiDungMap[donHang.id_nguoi_dung]?.ho_ten || "";
      const phoneNumber = nguoiDungMap[donHang.id_nguoi_dung]?.dien_thoai || "";
      const trangThai = donHang.trang_thai || "";
      return (
        removeAccents(userName.toLowerCase()).includes(query) ||
        phoneNumber.includes(query) ||
        removeAccents(trangThai.toLowerCase()).includes(query)
      );
    });

    setDisplayDonhang(filteredDonhangs.slice(0, itemsPerPage));
    setCurrentPage(1);
  };


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(removeAccents(searchQuery.toLowerCase()));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, donHangs, itemsPerPage]);


// phân trang
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayDonhang(donHangs.slice(start, end));  
  }, [donHangs, itemsPerPage, currentPage]);

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

  const totalPages = Math.ceil(donHangs.length / itemsPerPage);



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


  const deleteAll = async () => {
    const result = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xóa tất cả không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      const tableBody = document.querySelector("#productTable tbody");
      tableBody.innerHTML = "";

      Swal.fire({
        title: "Đã xóa",
        text: "Tất cả dữ liệu đã được xóa!",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  
//lấy dữ liệu danh sách đơn hàng
  useEffect(() => {
    const fetchDonhang = async () => {
      try {
        const response = await fetch("http://localhost:5000/donhang/showAll");
        if (!response.ok) {
          throw new Error("Lỗi không thể tải dữ liệu");
        }
        const data = await response.json();
        setDonhang(data.donHangs);

        
        const idNguoiDungList = [
          ...new Set(data.donHangs.map((dh) => dh.id_nguoi_dung)),
        ];

       
        const nguoiDungData = await Promise.all(
          idNguoiDungList.map(async (id) => {
            const res = await fetch(`http://localhost:5000/users/${id}`);
            const userData = await res.json();
            return { id, ...userData.user };
          })
        );

        const nguoiDungObj = nguoiDungData.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setNguoiDungMap(nguoiDungObj);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonhang();
  }, []);
  //cập nhật trạng thái đơn hàng
    const handleStatusChange = async (id, newStatus) => {
      try {
        const response = await fetch(
          `http://localhost:5000/donhang/update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ trang_thai: newStatus }),
          }
        );

        if (!response.ok) {
          throw new Error("Lỗi cập nhật trạng thái");
        }

        
        setDonhang((prevDonHangs) =>
          prevDonHangs.map((donHang) =>
            donHang._id === id ? { ...donHang, trang_thai: newStatus } : donHang
          )
        );

        Swal.fire({
          title: "Thành công",
          text: "Trạng thái đơn hàng đã được cập nhật!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          title: "Lỗi",
          text: "Không thể cập nhật trạng thái",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

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
            Danh Sách đơn hàng
          </div>
          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
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
                <button className={styles.sp7} onClick={deleteAll}>
                  &nbsp;
                  <i className="fas fa-trash-alt"></i> Xóa tất cả
                </button>
              </div>
            </div>

            <div className={styles.tableContainer}>
              <div className={styles.tableControls}>
                <label htmlFor="entries" style={{ fontWeight: "bold" }}>
                  Hiện&nbsp;
                  <select
                    id="entries"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                  <span>&nbsp; danh mục</span>
                </label>
                <div className={styles.search}>
                  <label htmlFor="search" style={{ fontWeight: "bold" }}>
                    Tìm kiếm:
                  </label>
                  <input type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch} />
                </div>
              </div>
              <table id="productTable" className={styles.productTable}>
                <thead>
                  <tr>
                    <th style={{ width: "3%" }}>
                      <input type="checkbox" id="selectAll" />
                    </th>
                    <th style={{ width: "15%", textAlign: "center" }}>
                      ID đơn hàng
                    </th>
                    <th style={{ width: "12%", textAlign: "center" }}>
                      Địa chỉ
                    </th>
                    <th style={{ width: "12%", textAlign: "center" }}>
                      Tên khách hàng
                    </th>
                    <th style={{ width: "10%", textAlign: "center" }}>
                      Số điện thoại
                    </th>
                    <th style={{ width: "10%", textAlign: "center" }}>
                      Ghi chú
                    </th>
                    <th style={{ width: "10%", textAlign: "center" }}>
                      Ngày mua
                    </th>
                    <th style={{ width: "11%", textAlign: "center" }}>
                      Tổng tiền
                    </th>
                    <th style={{ width: "17%", textAlign: "center" }}>
                      Tình trạng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayDonhang.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <input type="checkbox" className={styles.rowCheckbox} />
                      </td>
                      <td>{item._id}</td>
                      <td>
                        <p className={styles.mota}>{item.dia_chi}</p>
                      </td>
                      <td>
                        {nguoiDungMap[item.id_nguoi_dung]?.ho_ten ||
                          "Đang tải..."}
                      </td>
                      <td>
                        {nguoiDungMap[item.id_nguoi_dung]?.dien_thoai ||
                          "Đang tải..."}
                      </td>
                      <td>{item.ghi_chu}</td>
                      <td>{item.thoi_gian_tao}</td>
                      <td>{item.tong_tien.toLocaleString("vi-VN")}₫</td>

                      <td>
                        <p className={styles.trangthai}>
                          <select
                            value={item.trang_thai}
                            onChange={(e) => handleStatusChange(item._id, e.target.value)}
                            style={{
                              backgroundColor: item.trang_thai === "Đơn hàng đã hủy" ? "white" : "black",
                              color: item.trang_thai === "Đơn hàng đã hủy" ? "black" : "white",
                              border: "1px solid black",
                            }}
                          >
                            <option
                              value="Chờ xác nhận"
                              style={{ backgroundColor: "black", color: "white" }}
                            >
                              Chờ xác nhận
                            </option>
                            <option
                              value="Đã xác nhận"
                              style={{ backgroundColor: "black", color: "white" }}
                            >
                              Đã xác nhận
                            </option>
                            <option
                              value="Đóng gói"
                              style={{ backgroundColor: "black", color: "white" }}
                            >
                              Đóng gói
                            </option>
                            <option
                              value="Đang giao hàng"
                              style={{ backgroundColor: "black", color: "white" }}
                            >
                              Đang giao hàng
                            </option>
                            <option
                              value="Giao hàng thành công"
                              style={{ backgroundColor: "black", color: "white" }}
                            >
                              Giao hàng thành công
                            </option>
                            <option
                              value="Đơn hàng đã hủy"
                              style={{
                                backgroundColor: "white",
                                color: "black",
                                border: "1px solid black",
                              }}
                            >
                              Đơn hàng đã hủy
                            </option>
                          </select>

                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <span>Hiện 1 đến {displayDonhang.length} của {donHangs.length} đơn hàng</span>
                <div className={styles.paginationControls}>
                  <button className={styles.paginationButton}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}>Lùi</button>
                  <button
                    className={`${styles.paginationButton}  ${styles.active}`}
                  >
                    {currentPage} / {totalPages}
                  </button>
          
                  <button className={styles.paginationButton} onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}>Tiếp</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
