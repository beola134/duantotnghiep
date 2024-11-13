"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./header.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Menu() {
  const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setOrderDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  const toggleProductDropdown = () => {
    setProductDropdownOpen(!isProductDropdownOpen);
    setOrderDropdownOpen(false); 
  };

  const toggleOrderDropdown = () => {
    setOrderDropdownOpen(!isOrderDropdownOpen);
    setProductDropdownOpen(false); 
  };

  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.sidebar}>
        <Link href="/" className={styles.brand}>
          <i className={`bx bxs-smile ${styles.icon}`}></i>
          AdminSite
        </Link>
        <ul className={styles.sideMenu}>
          <li>
            <Link href="/" className={styles.active}>
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
            <Link href="/components/quanlikho">
              <i className={`bx bxs-widget ${styles.icon}`}></i>
              Quản lý kho
            </Link>
          </li>
          <li className={styles.divider} data-text="Bình luận">
            Bình luận
          </li>
          <li>

            <Link href="/components/comments">
              <i className={`bx bxs-comment-detail ${styles.icon}`}></i>
              Quản lý bình luận
            </Link>
          </li>
          <li className={styles.divider} data-text="Tài khoản">
            Tài khoản
          </li>
          <li>
            <Link href="/components/taikhoan" onClick={toggleProductDropdown}>
              <i className={`bx bxs-user-account ${styles.icon}`}></i>
              Quản Lý Tài khoản
             
            </Link>
            
          </li>
          <li className={styles.divider} data-text="Đơn Hàng">
            Đơn Hàng
          </li>
          <li>
            <Link href="/components/quanlydonhang" onClick={toggleOrderDropdown}>
              <i className={`bx bxs-cart ${styles.icon}`}></i>
              Quản Lý Đơn Hàng
              
            </Link>
            
          </li>
          <li className={styles.divider} data-text="Voucher">
            Voucher
          </li>
          <li>
            <Link href="/components/voucher">
              <i className={`bx bx-qr ${styles.icon}`}></i>
              Quản lý Voucher
            </Link>
          </li>
        </ul>
        <div className={styles.ads}>
          <div className={styles.wrapper}>


            <Link style={{ textDecoration: "none" }} href="#" className={styles.btnUpgrade}>
              Đăng xuất
            </Link>
          </div>
        </div>
      </section>
      <section id={styles.content}>
        <nav className={styles.nav}>
          <i className={`bx bx-menu ${styles.toggleSidebar}`}></i>
          <form action="#"></form>
          <a href="#" className={styles.navLink}>
            <i className={`bx bxs-bell ${styles.icon}`}></i>
            <span className={styles.badge}>5</span>
          </a>
          <a href="/components/comments" className={styles.navLink}>
            <i className={`bx bxs-message-square-dots ${styles.icon}`}></i>
            <span className={styles.badge}>8</span>
          </a>
          <span className={styles.divider}></span>
          <div className="dropdown profile">

            <a
              className="dropdown-toggle d-flex align-items-center"
              href="#"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
                className={`${styles.roundedCircle}`}
                width="40"
                height="40"
              />
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-end ${styles.dropdownMenu}`}
              aria-labelledby="profileDropdown">
              <li>
                <a className={`dropdown-item ${styles.dropdownItem}`} href="#">
                  <i className="bx bxs-user-circle icon"></i>
                  Profile
                </a>
              </li>
              <li>
                <a className={`dropdown-item ${styles.dropdownItem}`} href="#">
                  <i className="bx bxs-cog"></i> Settings
                </a>
              </li>
              <li>
                <a className={`dropdown-item ${styles.dropdownItem}`} href="#">
                  <i className="bx bxs-log-out-circle"></i>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
}