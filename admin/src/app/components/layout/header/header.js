"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./header.module.css";
import Link from "next/link";
import { useState } from "react";
export default function Menu() {
    const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);
    const [isOrderDropdownOpen, setOrderDropdownOpen] = useState(false);
  
    const toggleProductDropdown = () => {
      setProductDropdownOpen(!isProductDropdownOpen);
      setOrderDropdownOpen(false); // Đóng dropdown khác khi mở cái này
    };
  
    const toggleOrderDropdown = () => {
      setOrderDropdownOpen(!isOrderDropdownOpen);
      setProductDropdownOpen(false); // Đóng dropdown khác khi mở cái này
    };
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
            <Link href="/components/sanpham">
              <i className={`bx bxs-chart ${styles.icon}`}></i>
              Quản lý sản phẩm
            </Link>
          </li>
          <li>
            <Link href="/components/danhmuc">
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
          <li className={styles.divider} data-text="Tài khoản" >
            Tài khoản
          </li>
          <li>
            <Link href="#" onClick={toggleProductDropdown}>
              <i className={`bx bxs-user-account ${styles.icon}`}></i>
              Tài khoản
              <i className={`bx bx-chevron-right ${styles.iconRight}`}></i>
              
            </Link>
            <ul className={`${styles.sideDropdown} ${
                isProductDropdownOpen ? styles.show : ""
              }`}>
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
            <Link href="#" onClick={toggleOrderDropdown}>
              <i className={`bx bxs-cart ${styles.icon}`}></i>
              Đơn Hàng
              <i className={`bx bx-chevron-right ${styles.iconRight}`}></i>
            </Link>
            <ul className={`${styles.sideDropdown} ${
                isOrderDropdownOpen ? styles.show : ""
              }`}>
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
              Đăng xuất
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
          <div className={`${styles.dropdown} ${styles.profile}`}>
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
                  <i className={`bx bxs-log-out-circle`}></i>Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </nav>
        </section>
   </div>
  );
}