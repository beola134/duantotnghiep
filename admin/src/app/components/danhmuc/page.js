"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./danhmuc.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function DanhMuc() {
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

  // Hàm xóa tất cả dữ liệu
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

  const  deleteCategory = async (id) => {
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

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/cate/deletecate/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Lỗi khi xóa danh mục");
        }
        
        setCategories((prevCategory) =>
          prevCategory.filter((category) => category._id !== id)
        );

        Swal.fire({
          title: "Thành công",
          text: "Danh mục đã được xóa thành công!",
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

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/cate/allcatess");
        if (!response.ok) {
          throw new Error("Lỗi không thể tải dữ liệu");
        }
        const data = await response.json();
        setCategories(data.cates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
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
            Danh Sách Danh Mục
          </div>
          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
              <Link href="/components/themdanhmuc" className={styles.sp}>
                <i className="fas fa-plus"></i> Tạo mới danh mục
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
                  <input type="text" id="search" />
                </div>
              </div>
              <table id="productTable" className={styles.productTable}>
                <thead>
                  <tr>
                    <th style={{ width: "3%" }}>
                      <input type="checkbox" id="selectAll" />
                    </th>
                    <th style={{ width: "12%", textAlign: "center" }}>
                      ID danh mục
                    </th>
                    <th style={{ width: "40%", textAlign: "center" }}>
                      Ghi chú
                    </th>
                    <th style={{ width: "15%", textAlign: "center" }}>
                      Tên danh mục
                    </th>
                    <th style={{ width: "15%", textAlign: "center" }}>
                      Ảnh danh mục
                    </th>
                    <th style={{ width: "15%", textAlign: "center" }}>
                      Chức năng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <input type="checkbox" className={styles.rowCheckbox} />
                      </td>
                      <td>{item._id}</td>
                      <td > <p className={styles.mota}>{item.mo_ta}</p></td>
                      <td>{item.danh_muc}</td>
                      <td>
                        <img
                          src={`http://localhost:5000/images/${item.hinh_anh2}`}
                          alt={item.danh_muc}
                        />
                      </td>
                      
                      <td>
                        <Link
                          href={`/components/suadanhmuc/${item._id}`}
                          className={`${styles.btn} ${styles.edit}`}
                        >
                          ✏️
                        </Link>{" "}
                        &nbsp;
                        <button
                          className={`${styles.btn} ${styles.delete}`}
                          id="deleteButton"
                          onClick={() => deleteCategory(item._id)}
                        >
                          🗑️
                        </button>
                        &nbsp;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <span>Hiện 1 đến 10 của 16 danh mục</span>
                <div className={styles.paginationControls}>
                  <button className={styles.paginationButton}>Lùi</button>
                  <button
                    className={`${styles.paginationButton} ${styles.active}`}
                  >
                    1
                  </button>
                  <button className={styles.paginationButton}>2</button>
                  <button className={styles.paginationButton}>Tiếp</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
