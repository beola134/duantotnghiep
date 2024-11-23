"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./header.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Menu() {
  const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const isActive = (path) => currentPath === path || currentPath === "/";

  useEffect(() => {

    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (pathname === "/") {
        setCurrentPath("/components/thongke");
      } else {
        setCurrentPath(pathname);
      }
    }
  }, []);

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
  const handleLinkClick = (path) => {
    setCurrentPath(path);
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
            <Link
              href="/components/thongke"
              className={isActive("/components/thongke") ? styles.active : ""}
              onClick={() => handleLinkClick("/components/thongke")}
            >
              <i className={`bx bxs-chart ${styles.icon}`}></i>
              Thống Kê
            </Link>
          </li>
          <li className={styles.divider} data-text="Sản Phẩm">
            Sản Phẩm
          </li>
          <li>
            <Link
              href="/components/sanpham"
              className={isActive("/components/sanpham") ? styles.active : ""}
              onClick={() => handleLinkClick("/components/sanpham")}
            >
              <i className={`bx bxs-widget ${styles.icon}`}></i>
              Quản lý sản phẩm
            </Link>
          </li>
          <li>
            <Link
              href="/components/thuonghieu"
              className={
                isActive("/components/thuonghieu") ? styles.active : ""
              }
              onClick={() => handleLinkClick("/components/thuonghieu")}
            >
              <i className={`bx bxs-widget ${styles.icon}`}></i>
              Quản lý thương hiệu
            </Link>
          </li>
          <li>
            <Link
              href="/components/quanlikho"
              className={isActive("/components/quanlikho") ? styles.active : ""}
              onClick={() => handleLinkClick("/components/quanlikho")}
            >
              <i className={`bx bxs-widget ${styles.icon}`}></i>
              Quản lý kho
            </Link>
          </li>
          <li className={styles.divider} data-text="Bình luận">
            Bình luận
          </li>
          <li>
            <Link
              href="/components/comments"
              className={isActive("/components/comments") ? styles.active : ""}
              onClick={() => handleLinkClick("/components/comments")}
            >
              <i className={`bx bxs-comment-detail ${styles.icon}`}></i>
              Quản lý bình luận
            </Link>
          </li>
          <li className={styles.divider} data-text="Tài khoản">
            Tài khoản
          </li>
          <li>
            <Link
              href="/components/taikhoan"
              onClick={toggleProductDropdown}
              className={isActive("/components/taikhoan") ? styles.active : ""}
            >
              <i className={`bx bxs-user-account ${styles.icon}`}></i>
              Quản Lý Tài khoản
            </Link>
          </li>
          <li className={styles.divider} data-text="Đơn Hàng">
            Đơn Hàng
          </li>
          <li>
            <Link
              href="/components/quanlydonhang"
              onClick={toggleOrderDropdown}
              className={
                isActive("/components/quanlydonhang") ? styles.active : ""
              }
            >
              <i className={`bx bxs-cart ${styles.icon}`}></i>
              Quản Lý Đơn Hàng
            </Link>
          </li>
          <li>
            <Link
              href="/components/chitietdonhang"
              onClick={toggleOrderDropdown}
              className={
                isActive("/components/chitietdonhang") ? styles.active : ""
              }
            >
              <i className={`bx bxs-cart ${styles.icon}`}></i>
              Quản Lý Chi Tiết Đơn Hàng
            </Link>
          </li>
          <li className={styles.divider} data-text="Voucher">
            Voucher
          </li>
          <li>
            <Link
              href="/components/voucher"
              className={isActive("/components/voucher") ? styles.active : ""}
              onClick={() => handleLinkClick("/components/voucher")}
            >
              <i className={`bx bx-qr ${styles.icon}`}></i>
              Quản lý Voucher
            </Link>
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
              aria-expanded="false"
            >
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
              aria-labelledby="profileDropdown"
            >
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
