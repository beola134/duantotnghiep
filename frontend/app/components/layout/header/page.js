"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import classNames from "classnames/bind";
import Banner from "../banner/page";

export default function Header() {
  const cx = classNames.bind(styles);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/cate/allcate");
        if (!response.ok) {
          throw new Error("Lỗi không thể tải dữ liệu");
        }
        const data = await response.json();
        setCategory(data.cates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }

  return (
    <>
      <header className={cx("header")}>
        <div className={cx("top-bar")}>
          <div className={cx("logo")}>
            <img className={cx("img")} src="/image/item/logo.png" alt="Wristly" />
          </div>
          <div className={cx("search-bar")}>
            <input type="text" placeholder="Bạn muốn tìm ..." className={cx("input")} />
            <button type="button" className={cx("button")}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className={cx("contact-info")}>
            <div className={cx("phone")}>
              <img className={cx("phone-img")} src="/image/item/icon_call.png" alt="Phone" />
              <span className={cx("phone-span")}>
                GỌI NGAY
                <br />
                024.3991.8668
              </span>
            </div>
            <div className={cx("user")}>
              <i className="fa-solid fa-user user-i"></i>
            </div>
            <div className={cx("cart")}>
              <i className="fas fa-shopping-cart"></i>
              <span className={cx("cart-count")}>3</span>
            </div>
          </div>
        </div>
      </header>

      <nav class={cx("navbar")}>
        <ul class={cx("nav-list")}>
          <li className={cx("nav-list-li")}>
            <a className={cx("nav-list-home")}>
              {/* Sử dụng cx để kết hợp class từ CSS Modules với các class toàn cục */}
              <i className={cx("nav-list-li-i", "fas", "fa-home")}></i>
            </a>
          </li>
          <li className={cx("nav-list-li")}>
            <a className={cx("nav-list-li-a")}>THƯƠNG HIỆU</a>
            <ul className={cx("dropdown-menu")}>
              {category.map((item) => (
                <li className={cx("dropdown-menu-li")} key={item._id}>
                  <img
                    className={cx("dropdown-menu-img")}
                    src={`http://localhost:5000/images/${item.hinh_anh}`}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </li>
          <li className={cx("nav-list-li")}>
            <a className={cx("nav-list-li-a")}>ĐỒNG HỒ NAM</a>
            <ul className={cx("dropdown-menu-dhn")}>
              {/* Danh sách thương hiệu */}
              <li className={cx("dropdown-menu-dhn-li1")}>
                <h3 className={cx("dropdown-menu-dhn-h3")}>THƯƠNG HIỆU</h3>
                <ul className={cx("dropdown-menu-dhn-ul")}>
                  {category.map((item) => (
                    <li className={cx("dropdown-menu-dhn-li2")} key={item._id} style={{ fontSize: "10px" }}>
                      {item.danh_muc}
                    </li>
                  ))}
                </ul>
              </li>

              {/* Danh sách mức giá */}
              <li className={cx("dropdown-menu-dhn-li1")}>
                <h3 className={cx("dropdown-menu-dhn-h3")}>MỨC GIÁ</h3>
                <ul className={cx("dropdown-menu-dhn-ul")}>
                  <li className={cx("dropdown-menu-dhn-li2")}>DƯỚI 2 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>TỪ 2 TRIỆU ĐẾN 5 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>TỪ 5 TRIỆU ĐẾN 10 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>TỪ 10 TRIỆU ĐẾN 20 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>TỪ 20 TRIỆU ĐẾN 30 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>TỪ 30 TRIỆU ĐẾN 50 TRIỆU</li>
                </ul>
              </li>

              {/* Danh sách loại máy */}
              <li className={cx("dropdown-menu-dhn-li1")}>
                <h3 className={cx("dropdown-menu-dhn-h3")}>LOẠI MÁY</h3>
                <ul className={cx("dropdown-menu-dhn-ul")}>
                  <li className={cx("dropdown-menu-dhn-li2")}>AUTOMATIC (MÁY CƠ TỰ ĐỘNG)</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>QUARTZ (MÁY PIN - ĐIỆN TỬ)</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>ECO-DRIVE (NĂNG LƯỢNG ÁNH SÁNG)</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>QUARTZ CHRONOGRAPH (MÁY BẤM GIỜ THỂ THAO)</li>
                </ul>
              </li>

              {/* Danh sách chất liệu dây */}
              <li className={cx("dropdown-menu-dhnu-li1")}>
                <h3 className={cx("dropdown-menu-dhnu-h3")}>CHẤT LIỆU DÂY</h3>
                <ul className={cx("dropdown-menu-dhnu-ul")}>
                  <li className={cx("dropdown-menu-dhnu-li2")}>DÂY DA</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THÉP KHÔNG GỈ 316L</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THÉP KHÔNG GỈ 316L MẠ VÀNG CÔNG NGHỆ PVD</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THÉP KHÔNG GỈ 316L DẠNG LƯỚI</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THÉP KHÔNG GỈ 316L DẠNG LẮC</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>DÂY VẢI</li>
                </ul>
              </li>

              {/* Danh sách phong cách */}
              <li className={cx("dropdown-menu-dhn-li1")}>
                <h3 className={cx("dropdown-menu-dhn-h3")}>PHONG CÁCH</h3>
                <ul className={cx("dropdown-menu-dhn-ul")}>
                  <li className={cx("dropdown-menu-dhn-li2")}>SANG TRỌNG</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>THỂ THAO</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>QUÂN ĐỘI</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>THỜI TRANG</li>
                  <li className={cx("dropdown-menu-dhn-li2")}>HIỆN ĐẠI</li>
                </ul>
              </li>
            </ul>
          </li>

          {/*Đồng hồ nữ */}
          <li className={cx("nav-list-li")}>
            <a className={cx("nav-list-li-a")}>ĐỒNG HỒ NỮ</a>
            <ul className={cx("dropdown-menu-dhnu")}>
              <li className={cx("dropdown-menu-dhnu-li1")}>
                <h3 className={cx("dropdown-menu-dhnu-h3")}>THƯƠNG HIỆU</h3>
                <ul className={cx("dropdown-menu-dhnu-ul")}>
                  {category.map((item) => (
                    <li className={cx("dropdown-menu-dhnu-li2")} key={item._id} style={{ fontSize: "10px" }}>
                      {item.danh_muc}
                    </li>
                  ))}
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhnu-li1")}>
                <h3 className={cx("dropdown-menu-dhnu-h3")}>MỨC GIÁ</h3>
                <ul className={cx("dropdown-menu-dhnu-ul")}>
                  <li className={cx("dropdown-menu-dhnu-li2")}>DƯỚI 2 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>TỪ 2 TRIỆU ĐẾN 5 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>TỪ 5 TRIỆU ĐẾN 10 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>TỪ 10 TRIỆU ĐẾN 20 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>TỪ 20 TRIỆU ĐẾN 30 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>TỪ 30 TRIỆU ĐẾN 50 TRIỆU</li>
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhd-li1")}>
                <h3 className={cx("dropdown-menu-dhd-h3")}>LOẠI MÁY</h3>
                <ul className={cx("dropdown-menu-dhd-ul")}>
                  <li className={cx("dropdown-menu-dhd-li2")}>AUTOMATIC (MÁY CƠ TỰ ĐỘNG)</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>QUARTZ (MÁY PIN - ĐIỆN TỬ)</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>ECO-DRIVE (NĂNG LƯỢNG ÁNH SÁNG)</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>QUARTZ CHRONOGRAPH (MÁY BẤM GIỜ THỂ THAO)</li>
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhnu-li1")}>
                <h3 className={cx("dropdown-menu-dhnu-h3")}>CHẤT LIỆU DÂY</h3>
                <ul className={cx("dropdown-menu-dhnu-ul")}>
                  <li className={cx("dropdown-menu-dhnu-li2")}>DÂY DA</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THÉP KHÔNG GỈ 316L</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THÉP KHÔNG GỈ 316L MẠ VÀNG CÔNG NGHỆ PVD</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THÉP KHÔNG GỈ 316L DẠNG LƯỚI</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THÉP KHÔNG GỈ 316L DẠNG LẮC</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>DÂY VẢI</li>
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhnu-li1")}>
                <h3 className={cx("dropdown-menu-dhnu-h3")}>PHONG CÁCH</h3>
                <ul className={cx("dropdown-menu-dhnu-ul")}>
                  <li className={cx("dropdown-menu-dhnu-li2")}>SANG TRỌNG</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THỂ THAO</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>QUÂN ĐỘI</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>THỜI TRANG</li>
                  <li className={cx("dropdown-menu-dhnu-li2")}>HIỆN ĐẠI</li>
                </ul>
              </li>
            </ul>
          </li>

          {/*Đồng hồ đôi*/}
          <li className={cx("nav-list-li")}>
            <a className={cx("nav-list-li-a")}>ĐỒNG HỒ ĐÔI</a>
            <ul className={cx("dropdown-menu-dhd")}>
              <li className={cx("dropdown-menu-dhd-li1")}>
                <h3 className={cx("dropdown-menu-dhd-h3")}>THƯƠNG HIỆU</h3>
                <ul className={cx("dropdown-menu-dhd-ul")}>
                  {category.map((item) => (
                    <li className={cx("dropdown-menu-dhd-li2")} key={item._id} style={{ fontSize: "10px" }}>
                      {item.danh_muc}
                    </li>
                  ))}
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhd-li1")}>
                <h3 className={cx("dropdown-menu-dhd-h3")}>MỨC GIÁ</h3>
                <ul className={cx("dropdown-menu-dhd-ul")}>
                  <li className={cx("dropdown-menu-dhd-li2")}>DƯỚI 2 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>TỪ 2 TRIỆU ĐẾN 5 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>TỪ 5 TRIỆU ĐẾN 10 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>TỪ 10 TRIỆU ĐẾN 20 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>TỪ 20 TRIỆU ĐẾN 30 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>TỪ 30 TRIỆU ĐẾN 50 TRIỆU</li>
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhd-li1")}>
                <h3 className={cx("dropdown-menu-dhd-h3")}>LOẠI MÁY</h3>
                <ul className={cx("dropdown-menu-dhd-ul")}>
                  <li className={cx("dropdown-menu-dhd-li2")}>AUTOMATIC (MÁY CƠ TỰ ĐỘNG)</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>QUARTZ (MÁY PIN - ĐIỆN TỬ)</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>ECO-DRIVE (NĂNG LƯỢNG ÁNH SÁNG)</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>QUARTZ CHRONOGRAPH (MÁY BẤM GIỜ THỂ THAO)</li>
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhd-li1")}>
                <h3 className={cx("dropdown-menu-dhd-h3")}>CHẤT LIỆU DÂY</h3>
                <ul className={cx("dropdown-menu-dhd-ul")}>
                  <li className={cx("dropdown-menu-dhd-li2")}>DÂY DA</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>THÉP KHÔNG GỈ 316L</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>THÉP KHÔNG GỈ 316L MẠ VÀNG CÔNG NGHỆ PVD</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>THÉP KHÔNG GỈ 316L DẠNG LƯỚI</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>THÉP KHÔNG GỈ 316L DẠNG LẮC</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>DÂY VẢI</li>
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhd-li1")}>
                <h3 className={cx("dropdown-menu-dhd-h3")}>PHONG CÁCH</h3>
                <ul className={cx("dropdown-menu-dhd-ul")}>
                  <li className={cx("dropdown-menu-dhd-li2")}>SANG TRỌNG</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>THỂ THAO</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>QUÂN ĐỘI</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>THỜI TRANG</li>
                  <li className={cx("dropdown-menu-dhd-li2")}>HIỆN ĐẠI</li>
                </ul>
              </li>
            </ul>
          </li>

          {/*Đồng hồ treo tường*/}
          <li className={cx("nav-list-li")}>
            <a className={cx("nav-list-li-a")}>ĐỒNG HỒ TREO TƯỜNG</a>
            <ul className={cx("dropdown-menu-dhtt")}>
              <li className={cx("dropdown-menu-dhtt-li1")}>
                <h3 className={cx("dropdown-menu-dhtt-h3")}>THƯƠNG HIỆU</h3>
                <ul className={cx("dropdown-menu-dhtt-ul")}>
                  <li className={cx("dropdown-menu-dhtt-li2")}>SEIKO</li>
                  <li className={cx("dropdown-menu-dhtt-li2")}>RHYTHM</li>
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhtt-li1")}>
                <h3 className={cx("dropdown-menu-dhtt-h3")}>MỨC GIÁ</h3>
                <ul className={cx("dropdown-menu-dhtt-ul")}>
                  <li className={cx("dropdown-menu-dhtt-li2")}>DƯỚI 2 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhtt-li2")}>TỪ 2 TRIỆU ĐẾN 5 TRIỆU</li>
                  <li className={cx("dropdown-menu-dhtt-li2")}>TRÊN 5 TRIỆU</li>
                </ul>
              </li>
              <li className={cx("dropdown-menu-dhtt-li1")}>
                <h3 className={cx("dropdown-menu-dhtt-h3")}>VỎ MÁY</h3>
                <ul className={cx("dropdown-menu-dhtt-ul")}>
                  <li className={cx("dropdown-menu-dhtt-li2")}>THỦY TINH</li>
                  <li className={cx("dropdown-menu-dhtt-li2")}>NHỰA</li>
                  <li className={cx("dropdown-menu-dhtt-li2")}>Gỗ</li>
                </ul>
              </li>
            </ul>
          </li>

          <li className={cx("nav-list-li")}>
            <a className={cx("nav-list-li-a")}>DÂY ĐỒNG HỒ</a>
          </li>
          <li className={cx("nav-list-li")}>
            <a className={cx("nav-list-li-a")}>SẢN PHẨM KHÁC</a>
            <ul className={cx("dropdown-menu-doc")}>
              <li className={cx("dropdown-menu-doc-li")}>
                <a className={cx("dropdown-menu-doc-a")}>ĐỒNG HỒ THỤY SĨ</a>
              </li>
              <li className={cx("dropdown-menu-doc-li")}>
                <a className={cx("dropdown-menu-doc-a")}>ĐỒNG HỒ NHẬT BẢN</a>
              </li>
              <li className={cx("dropdown-menu-doc-li")}>
                <a className={cx("dropdown-menu-doc-a")}>DÂY TREO ĐỒNG HỒ</a>
              </li>
              <li className={cx("dropdown-menu-doc-li")}>
                <a className={cx("dropdown-menu-doc-a")}>TRANG SỨC CALVIN KLEIN</a>
              </li>
            </ul>
          </li>
          <li className={cx("nav-list-li")}>
            <a className={cx("nav-list-li-a")}>SỬA ĐỒNG HỒ</a>
          </li>
        </ul>
      </nav>
      <Banner />
    </>
  );
}
