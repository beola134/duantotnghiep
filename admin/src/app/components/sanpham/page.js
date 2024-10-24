"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./sanpham.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function SanPham() {
  const uploadFile = () => {
    alert("Tính năng tải file chưa được triển khai!");
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
    alert("Dữ liệu đã được sao chép");
  };

  // Hàm xuất dữ liệu ra Excel
  const exportToExcel = () => {
    const table = document.getElementById("productTable");
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, "products.xlsx");
  };

  // Hàm xuất dữ liệu ra PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#productTable" });
    doc.save("products.pdf");
  };

  // Hàm xóa tất cả dữ liệu
  const deleteAll = () => {
    if (confirm("Bạn có chắc chắn muốn xóa tất cả không?")) {
      const tableBody = document.querySelector("#productTable tbody");
      tableBody.innerHTML = "";
    }
  };
  const deleteProduct = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/product/xoasp/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Lỗi khi xóa sản phẩm");
        }
        // Xóa sản phẩm đã bị xóa khỏi trạng thái
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        alert("Xóa sản phẩm thành công");
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/allsp");
        if (!response.ok) {
          throw new Error("Lỗi không thể tải dữ liệu");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }
  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.sidebar}>
        <Link href="index.html" className={styles.brand}>
          <i className={`bx bxs-smile ${styles.icon}`}></i>
          AdminSite
        </Link>
        <ul className={styles.sideMenu}>
          <li>
            <Link href="index.html" className={styles.active}>
              <i className={`bx bxs-dashboard ${styles.icon}`}></i>
              Thống Kê
            </Link>
          </li>
          <li className={styles.divider} data-text="Sản Phẩm">
            Sản Phẩm
          </li>

          <li>
            <Link href="sanpham">
              <i className={`bx bxs-chart ${styles.icon}`}></i>
              Quản lý sản phẩm
            </Link>
          </li>
          <li>
            <Link href="quanlydanhmuc.html">
              <i className={`bx bxs-widget ${styles.icon}`}></i>
              Quản lý danh mục
            </Link>
          </li>
          <li>
            <Link href="khosanpham.html">
              <i className={`bx bxs-widget ${styles.icon}`}></i>
              Quản lý kho
            </Link>
          </li>
          <li className={styles.divider} data-text="Bình luận">
            Bình luận
          </li>
          <li>
            <Link href="quanlybinhluan.html">
              <i className={`bx bxs-comment-detail ${styles.icon}`}></i>
              Quản lý bình luận
            </Link>
          </li>
          <li className={styles.divider} data-text="Tài khoản">
            Tài khoản
          </li>
          <li>
            <Link href="#">
              <i className={`bx bxs-user-account ${styles.icon}`}></i>
              Tài khoản
              <i className={`bx bx-chevron-right ${styles.iconRight}`}></i>
            </Link>
            <ul className={styles.sideDropdown}>
              <li>
                <Link href="quanlytaikhoan.html">Quản lý tài khoản</Link>
              </li>
              <li>
                <Link href="phanquyen.html">Phân Quyền</Link>
              </li>
              <li>
                <Link href="themnhanvien.html">Tạo thành viên mới</Link>
              </li>
            </ul>
          </li>
          <li className={styles.divider} data-text="Đơn Hàng">
            Đơn Hàng
          </li>
          <li>
            <Link href="#">
              <i className={`bx bxs-cart ${styles.icon}`}></i>
              Đơn Hàng
              <i className={`bx bx-chevron-right ${styles.iconRight}`}></i>
            </Link>
            <ul className={styles.sideDropdown}>
              <li>
                <Link href="quanlydonhang.html">Quản lý đơn hàng</Link>
              </li>
              <li>
                <Link href="quanlygiohang.html">Quản lý giỏ hàng</Link>
              </li>
            </ul>
          </li>
        </ul>
        <div className={styles.ads}>
          <div className={styles.wrapper}>
            <Link
              style={{ textDecoration: "none" }}
              href="#"
              className={styles.btnUpgrade}
            >
              Logout
            </Link>
          </div>
        </div>
      </section>
      <section id={styles.content}>
        <nav className={styles.nav}>
          <i className={`bx bx-menu ${styles.toggleSidebar}`}></i>
          <form action="#">
            <div className={styles.formGroup}>
              <input type="text" placeholder="Search..." />
              <i className={`bx bx-search ${styles.icon}`}></i>
            </div>
          </form>
          <a href="#" className={styles.navLink}>
            <i className={`bx bxs-bell ${styles.icon}`}></i>
            <span className={styles.badge}>5</span>
          </a>
          <a href="#" className={styles.navLink}>
            <i className={`bx bxs-message-square-dots ${styles.icon}`}></i>
            <span className={styles.badge}>8</span>
          </a>
          <span className={styles.divider}></span>
          {/* <div className={`${styles.dropdown} ${styles.profile}`}>
            <a
              className={`${styles.dropdownToggle} d-flex align-items-center`}
              href="#"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
                className={styles.roundedCircle}
                width="40"
                height="40"
              />
            </a>
            <ul className={`${styles.dropdownMenu} dropdown-menu-end`} aria-labelledby="profileDropdown">
              <li>
                <a className={styles.dropdownItem} href="#">
                  <i className={`bx bxs-user-circle ${styles.icon}`}></i>
                  Profile
                </a>
              </li>
              <li>
                <a className={styles.dropdownItem} href="#">
                  <i className={`bx bxs-cog`}></i> Settings
                </a>
              </li>
              <li>
                <a className={styles.dropdownItem} href="#">
                  <i className={`bx bxs-log-out-circle`}></i> Logout
                </a>
              </li>
            </ul>
          </div> */}
        </nav>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Danh Sách Sản Phẩm
          </div>
          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
              <Link href="/components/themsanpham" className={styles.sp}>
                <i className="fas fa-plus"></i> Tạo mới sản phẩm
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
                      ID sản phẩm
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
                      Giá giảm
                    </th>
                    <th style={{ width: "10%", textAlign: "center" }}>
                      Mã sản phẩm
                    </th>
                    <th style={{ width: "15%", textAlign: "center" }}>
                      Chức năng
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
                            alt="Casio World Time AE-1200WHD-1AVDF"
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
                        <td>
                          <button
                            className={`${styles.btn} ${styles.delete}`}
                            id="deleteButton"
                            onClick={() => deleteProduct(_id)}
                          >
                            🗑️
                          </button>
                          &nbsp;
                          <Link
                            href={`/components/suasanpham/${_id}`}
                            className={`${styles.btn} ${styles.edit}`}
                          >
                            ✏️
                          </Link>
                          &nbsp;
                        </td>
                      </tr>
                    );
                  })}
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
