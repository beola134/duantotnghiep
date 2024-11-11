"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./taikhoan.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
    
export default function TaiKhoan() {
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
    const filtered= users.filter((user) => {
      const userName = user.ho_ten || "";
      const phone = user.dien_thoai || "";
      const email = user.email || "";
      const role = user.quyen === 1 ? "quản trị viên" : user.quyen === 2 ? "khách hàng" : "";
      return (
        removeAccents(userName.toLowerCase()).includes(query) ||
        removeAccents(phone.toLowerCase()).includes(query) ||
        removeAccents(email.toLowerCase()).includes(query) ||
        removeAccents(role.toLowerCase()).includes(query)
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


  //cập nhật quyền người dùng
  const handleRoleChange = async (id, newRole) => {
    try {
      const response = await fetch(`http://localhost:5000/users/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quyen: newRole }),
      });
      if (!response.ok) throw new Error("Lỗi khi cập nhật chức vụ");

      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, quyen: newRole } : user
        )
      );

      Swal.fire({
        title: "Thành công",
        text: "Chức vụ đã được cập nhật!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Lỗi",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
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

 const totalPages = Math.ceil(
  (searchQuery ? filteredUsers.length : users.length) / itemsPerPage
);


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

  

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xóa tài khoản này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/users/delete/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Lỗi khi xóa tài khoản");
        }

        setUser((prevUsers) => prevUsers.filter((nguoi_dung) => nguoi_dung._id !== id));

        Swal.fire({
          title: "Thành công",
          text: "Tài khoản đã được xóa thành công!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          title: "Lỗi",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
//lấy dữ liệu danh sách tài khoản
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Lỗi không thể tải dữ liệu");
        }
        const data = await response.json();
        setUser(data.users);
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
              <Link href="/components/themtaikhoan" className={styles.sp}>
                <i className="fas fa-plus"></i> Tạo mới tài khoản
              </Link>
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
                  <span>&nbsp; người dùng</span>
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
                      ID tài khoản
                    </th>
                    <th style={{ width: "15%", textAlign: "center" }}>
                      Họ và tên
                    </th>
                    <th style={{ width: "12%", textAlign: "center" }}>Ảnh</th>
                    <th style={{ width: "10%", textAlign: "center" }}>
                      Địa chỉ
                    </th>
                    <th style={{ width: "18%", textAlign: "center" }}>Email</th>
                    <th style={{ width: "12%", textAlign: "center" }}>
                      Số điện thoại
                    </th>
                    <th style={{ width: "15%", textAlign: "center" }}>
                      Chức vụ
                    </th>
                   
                  </tr>
                </thead>
                <tbody>
                  {displayUsers.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <input type="checkbox" className={styles.rowCheckbox} />
                      </td>
                      <td>{item._id}</td>
                      <td>
                        <p className={styles.mota}>{item.ho_ten}</p>
                      </td>
                      <td>
                        <img
                          src={`http://localhost:5000/images/${item.hinh_anh}`}
                          alt={item.danh_muc}
                        />
                      </td>
                      <td>{item.dia_chi}</td>
                      <td>{item.email}</td>
                      <td>{item.dien_thoai}</td>
                      <td>
                        <p className={styles.chucvu}>
                         <select
                          style={{ textAlign: "center" }}
                          value={item.quyen}
                          onChange={(e) => handleRoleChange(item._id, Number(e.target.value))}
                          className={styles.roleSelect}
                        >
                          <option value="1">Quản trị viên</option>
                          <option value="2">Khách hàng</option>
                        </select>
                        </p>
                      </td>

                      
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <span>Hiện 1 đến {displayUsers.length} của {filteredUsers.length || users.length} người dùng</span>
                <div className={styles.paginationControls}>
                 <button
                    className={styles.paginationButton}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                   ‹
                  </button>
                  <button
                    className={`${styles.paginationButton} ${styles.active}`}
                  >
                    {currentPage} / {totalPages}
                  </button>
                  
                  <button
                    className={styles.paginationButton}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
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
