"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import classNames from "classnames/bind";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";

const locgia = [
  { id: "allsp/underTwomillion", title: "DƯỚI 2 TRIỆU" },
  { id: "tu2den5", title: "TỪ 2 TRIỆU ĐẾN 5 TRIỆU" },
  { id: "tu5den10", title: "TỪ 5 TRIỆU ĐẾN 10 TRIỆU" },
  { id: "tu10den20", title: "TỪ 10 TRIỆU ĐẾN 20 TRIỆU" },
  { id: "tu20den30", title: "TỪ 20 TRIỆU ĐẾN 30 TRITRIỆU" },
  { id: "tu30den50", title: "TỪ 30 TRIỆU ĐẾN 50 TRIỆU" },
  { id: "tu50den100", title: "TỪ 50 TRIỆU ĐẾN 100 TRIỆU " },
  { id: "over100", title: "TRÊN 100 TRIỆU" },
];

export default function Header() {
  const cx = classNames.bind(styles);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (inputData.trim() === "") {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/product/timkiem?query=${inputData}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi tìm kiếm");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      const [inputData, setInputData] = useState("");
      const [isMounted, setIsMounted] = useState(false);
      const router = useRouter();
      useEffect(() => {
        setIsMounted(true);
      }, []);

      const handleSearch = () => {
        if (inputData && isMounted) {
          router.push(`/components/search?query=${inputData}`);
        }
      };

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
                <Link href="/">
                  <img
                    className={cx("img")}
                    src="/image/item/icons/logo.png"
                    alt="Wristly"
                  />
                </Link>
              </div>
              <div className={cx("search-bar")}>
                <input
                  value={inputData}
                  onChange={(event) => setInputData(event.target.value)}
                  type="text"
                  placeholder="Bạn muốn tìm ..."
                  className={cx("input")}
                />
                <button
                  type="button"
                  className={cx("button")}
                  onClick={handleSearch}
                  disabled={!inputData}>
                  <i className="fas fa-search" style={{ color: "white" }}></i>
                </button>
              </div>
              <div className={cx("contact-info")}>
                <div className={cx("phone")}>
                  <img
                    className={cx("phone-img")}
                    src="/image/item/icons/icon_call.png"
                    alt="Phone"
                  />
                  <span className={cx("phone-span")}>
                    GỌI NGAY
                    <br />
                    024.3991.8668
                  </span>
                </div>

                <div className={cx("user")}>
                  <Link href="/components/login">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: "#ffffff" }}
                    />
                  </Link>
                </div>

                <div className={cx("cart")}>
                  <Link href="/components/giohang">
                    <i className="fas fa-shopping-cart"></i>
                  </Link>
                  <span className={cx("cart-count")}>3</span>
                </div>
              </div>
            </div>
          </header>

          <nav class={cx("navbar")}>
            <ul class={cx("nav-list")}>
              <li className={cx("nav-list-li")}>
                <Link href="/" className={cx("nav-list-home")}>
                  {/* Sử dụng cx để kết hợp class từ CSS Modules với các class toàn cục */}
                  <i className={cx("nav-list-li-i", "fas", "fa-home")}></i>
                </Link>
              </li>
              <li className={cx("nav-list-li")}>
                <Link
                  href={"/components/thuonghieu"}
                  className={cx("nav-list-li-a")}>
                  THƯƠNG HIỆU
                </Link>
                <ul className={cx("dropdown-menu")}>
                  {category.map((item) => (
                    <li className={cx("dropdown-menu-li")} key={item._id}>
                      <Link
                        href={`/components/chitietdanhmuc/${item._id}`}
                        style={{ color: "white" }}>
                        <img
                          className={cx("dropdown-menu-img")}
                          src={`http://localhost:5000/images/${item.hinh_anh}`}
                          alt=""
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className={cx("nav-list-li")}>
                <Link
                  href="/components/donghonam"
                  className={cx("nav-list-li-a")}>
                  ĐỒNG HỒ NAM
                </Link>
                <ul className={cx("dropdown-menu-dhn")}>
                  {/* Danh sách thương hiệu */}
                  <li className={cx("dropdown-menu-dhn-li1")}>
                    <h3 className={cx("dropdown-menu-dhn-h3")}>THƯƠNG HIỆU</h3>
                    <ul className={cx("dropdown-menu-dhn-ul")}>
                      {category.map((item) => (
                        <li
                          className={cx("dropdown-menu-dhn-li2")}
                          key={item._id}
                          style={{ fontSize: "10px" }}>
                          <Link
                            href={`/components/chitietdanhmuc/${item._id}`}
                            className={cx("cxcx")}>
                            {item.danh_muc}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>

                  {/* Danh sách mức giá */}
                  <li className={cx("dropdown-menu-dhn-li1")}>
                    <h3 className={cx("dropdown-menu-dhn-h3")}>MỨC GIÁ</h3>
                    <ul className={cx("dropdown-menu-dhn-ul")}>
                      {locgia.map((item) => (
                        <li
                          key={item.id}
                          className={cx("dropdown-menu-dhn-li2")}>
                          <Link href="" className={cx("cxcx")}>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>

                  {/* Danh sách loại máy */}
                  <li className={cx("dropdown-menu-dhn-li1")}>
                    <h3 className={cx("dropdown-menu-dhn-h3")}>LOẠI MÁY</h3>
                    <ul className={cx("dropdown-menu-dhn-ul")}>
                      <li className={cx("dropdown-menu-dhn-li2")}>
                        AUTOMATIC (MÁY CƠ TỰ ĐỘNG)
                      </li>
                      <li className={cx("dropdown-menu-dhn-li2")}>
                        QUARTZ (MÁY PIN - ĐIỆN TỬ)
                      </li>
                      <li className={cx("dropdown-menu-dhn-li2")}>
                        ECO-DRIVE (NĂNG LƯỢNG ÁNH SÁNG)
                      </li>
                      <li className={cx("dropdown-menu-dhn-li2")}>
                        QUARTZ CHRONOGRAPH (MÁY BẤM GIỜ THỂ THAO)
                      </li>
                    </ul>
                  </li>

                  {/* Danh sách chất liệu dây */}
                  <li className={cx("dropdown-menu-dhnu-li1")}>
                    <h3 className={cx("dropdown-menu-dhnu-h3")}>
                      CHẤT LIỆU DÂY
                    </h3>
                    <ul className={cx("dropdown-menu-dhnu-ul")}>
                      <li className={cx("dropdown-menu-dhnu-li2")}>DÂY DA</li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        THÉP KHÔNG GỈ 316L
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        THÉP KHÔNG GỈ 316L MẠ VÀNG CÔNG NGHỆ PVD
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        THÉP KHÔNG GỈ 316L DẠNG LƯỚI
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        THÉP KHÔNG GỈ 316L DẠNG LẮC
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>DÂY VẢI</li>
                    </ul>
                  </li>

                  {/* Danh sách phong cách */}
                  <li className={cx("dropdown-menu-dhn-li1")}>
                    <h3 className={cx("dropdown-menu-dhn-h3")}>PHONG CÁCH</h3>
                    <ul className={cx("dropdown-menu-dhn-ul")}>
                      <li className={cx("dropdown-menu-dhn-li2")}>
                        SANG TRỌNG
                      </li>
                      <li className={cx("dropdown-menu-dhn-li2")}>THỂ THAO</li>
                      <li className={cx("dropdown-menu-dhn-li2")}>QUÂN ĐỘI</li>
                      <li className={cx("dropdown-menu-dhn-li2")}>
                        THỜI TRANG
                      </li>
                      <li className={cx("dropdown-menu-dhn-li2")}>HIỆN ĐẠI</li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/*Đồng hồ nữ */}
              <li className={cx("nav-list-li")}>
                <Link
                  href="/components/donghonu"
                  className={cx("nav-list-li-a")}>
                  ĐỒNG HỒ NỮ
                </Link>
                <ul className={cx("dropdown-menu-dhnu")}>
                  <li className={cx("dropdown-menu-dhnu-li1")}>
                    <h3 className={cx("dropdown-menu-dhnu-h3")}>THƯƠNG HIỆU</h3>
                    <ul className={cx("dropdown-menu-dhnu-ul")}>
                      {category.map((item) => (
                        <li
                          className={cx("dropdown-menu-dhn-li2")}
                          key={item._id}
                          style={{ fontSize: "10px" }}>
                          <Link
                            href={`/components/chitietdanhmuc/${item._id}`}
                            className={cx("cxcx")}>
                            {item.danh_muc}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className={cx("dropdown-menu-dhnu-li1")}>
                    <h3 className={cx("dropdown-menu-dhnu-h3")}>MỨC GIÁ</h3>
                    <ul className={cx("dropdown-menu-dhnu-ul")}>
                      {locgia.map((item) => (
                        <li
                          key={item.gia}
                          className={cx("dropdown-menu-dhn-li2")}>
                          <Link
                            href={`/components/sanphamlocgia/${item.gia}`}
                            className={cx("cxcx")}>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className={cx("dropdown-menu-dhd-li1")}>
                    <h3 className={cx("dropdown-menu-dhd-h3")}>LOẠI MÁY</h3>
                    <ul className={cx("dropdown-menu-dhd-ul")}>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        AUTOMATIC (MÁY CƠ TỰ ĐỘNG)
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        QUARTZ (MÁY PIN - ĐIỆN TỬ)
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        ECO-DRIVE (NĂNG LƯỢNG ÁNH SÁNG)
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        QUARTZ CHRONOGRAPH (MÁY BẤM GIỜ THỂ THAO)
                      </li>
                    </ul>
                  </li>
                  <li className={cx("dropdown-menu-dhnu-li1")}>
                    <h3 className={cx("dropdown-menu-dhnu-h3")}>
                      CHẤT LIỆU DÂY
                    </h3>
                    <ul className={cx("dropdown-menu-dhnu-ul")}>
                      <li className={cx("dropdown-menu-dhnu-li2")}>DÂY DA</li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        THÉP KHÔNG GỈ 316L
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        THÉP KHÔNG GỈ 316L MẠ VÀNG CÔNG NGHỆ PVD
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        THÉP KHÔNG GỈ 316L DẠNG LƯỚI
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        THÉP KHÔNG GỈ 316L DẠNG LẮC
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>DÂY VẢI</li>
                    </ul>
                  </li>
                  <li className={cx("dropdown-menu-dhnu-li1")}>
                    <h3 className={cx("dropdown-menu-dhnu-h3")}>PHONG CÁCH</h3>
                    <ul className={cx("dropdown-menu-dhnu-ul")}>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        SANG TRỌNG
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>THỂ THAO</li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>QUÂN ĐỘI</li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>
                        THỜI TRANG
                      </li>
                      <li className={cx("dropdown-menu-dhnu-li2")}>HIỆN ĐẠI</li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/*Đồng hồ đôi*/}
              <li className={cx("nav-list-li")}>
                <Link
                  href="/components/donghodoi"
                  className={cx("nav-list-li-a")}>
                  ĐỒNG HỒ ĐÔI
                </Link>
                <ul className={cx("dropdown-menu-dhd")}>
                  <li className={cx("dropdown-menu-dhd-li1")}>
                    <h3 className={cx("dropdown-menu-dhd-h3")}>THƯƠNG HIỆU</h3>
                    <ul className={cx("dropdown-menu-dhd-ul")}>
                      {category.map((item) => (
                        <li
                          className={cx("dropdown-menu-dhn-li2")}
                          key={item._id}
                          style={{ fontSize: "10px" }}>
                          <Link
                            href={`/components/chitietdanhmuc/${item._id}`}
                            className={cx("cxcx")}>
                            {item.danh_muc}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className={cx("dropdown-menu-dhd-li1")}>
                    <h3 className={cx("dropdown-menu-dhd-h3")}>MỨC GIÁ</h3>
                    <ul className={cx("dropdown-menu-dhd-ul")}>
                      {locgia.map((item) => (
                        <li
                          key={item.gia}
                          className={cx("dropdown-menu-dhn-li2")}>
                          <Link
                            href={`/components/sanphamlocgia/${item.gia}`}
                            className={cx("cxcx")}>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className={cx("dropdown-menu-dhd-li1")}>
                    <h3 className={cx("dropdown-menu-dhd-h3")}>LOẠI MÁY</h3>
                    <ul className={cx("dropdown-menu-dhd-ul")}>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        AUTOMATIC (MÁY CƠ TỰ ĐỘNG)
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        QUARTZ (MÁY PIN - ĐIỆN TỬ)
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        ECO-DRIVE (NĂNG LƯỢNG ÁNH SÁNG)
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        QUARTZ CHRONOGRAPH (MÁY BẤM GIỜ THỂ THAO)
                      </li>
                    </ul>
                  </li>
                  <li className={cx("dropdown-menu-dhd-li1")}>
                    <h3 className={cx("dropdown-menu-dhd-h3")}>
                      CHẤT LIỆU DÂY
                    </h3>
                    <ul className={cx("dropdown-menu-dhd-ul")}>
                      <li className={cx("dropdown-menu-dhd-li2")}>DÂY DA</li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        THÉP KHÔNG GỈ 316L
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        THÉP KHÔNG GỈ 316L MẠ VÀNG CÔNG NGHỆ PVD
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        THÉP KHÔNG GỈ 316L DẠNG LƯỚI
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        THÉP KHÔNG GỈ 316L DẠNG LẮC
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>DÂY VẢI</li>
                    </ul>
                  </li>
                  <li className={cx("dropdown-menu-dhd-li1")}>
                    <h3 className={cx("dropdown-menu-dhd-h3")}>PHONG CÁCH</h3>
                    <ul className={cx("dropdown-menu-dhd-ul")}>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        SANG TRỌNG
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>THỂ THAO</li>
                      <li className={cx("dropdown-menu-dhd-li2")}>QUÂN ĐỘI</li>
                      <li className={cx("dropdown-menu-dhd-li2")}>
                        THỜI TRANG
                      </li>
                      <li className={cx("dropdown-menu-dhd-li2")}>HIỆN ĐẠI</li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/*Đồng hồ treo tường*/}
              <li className={cx("nav-list-li")}>
                <Link
                  href="/components/donghotreotuong"
                  className={cx("nav-list-li-a")}>
                  ĐỒNG HỒ TREO TƯỜNG
                </Link>
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
                      <li className={cx("dropdown-menu-dhtt-li2")}>
                        DƯỚI 2 TRIỆU
                      </li>
                      <li className={cx("dropdown-menu-dhtt-li2")}>
                        TỪ 2 TRIỆU ĐẾN 5 TRIỆU
                      </li>
                      <li className={cx("dropdown-menu-dhtt-li2")}>
                        TRÊN 5 TRIỆU
                      </li>
                    </ul>
                  </li>
                  <li className={cx("dropdown-menu-dhtt-li1")}>
                    <h3 className={cx("dropdown-menu-dhtt-h3")}>VỎ MÁY</h3>
                    <ul className={cx("dropdown-menu-dhtt-ul")}>
                      <li className={cx("dropdown-menu-dhtt-li2")}>
                        THỦY TINH
                      </li>
                      <li className={cx("dropdown-menu-dhtt-li2")}>NHỰA</li>
                      <li className={cx("dropdown-menu-dhtt-li2")}>Gỗ</li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className={cx("nav-list-li")}>
                <Link
                  href="/components/daydongho"
                  className={cx("nav-list-li-a")}>
                  DÂY ĐỒNG HỒ
                </Link>
              </li>
              <li className={cx("nav-list-li")}>
                <Link
                  href="/components/sanphamkhac"
                  className={cx("nav-list-li-a")}>
                  SẢN PHẨM KHÁC
                </Link>
                <ul className={cx("dropdown-menu-doc")}>
                  <li className={cx("dropdown-menu-doc-li")}>
                    <Link
                      href="/components/donghothuysi"
                      className={cx("dropdown-menu-doc-a")}>
                      ĐỒNG HỒ THỤY SĨ
                    </Link>
                  </li>
                  <li className={cx("dropdown-menu-doc-li")}>
                    <Link
                      href="/components/donghonhatban"
                      className={cx("dropdown-menu-doc-a")}>
                      ĐỒNG HỒ NHẬT BẢN
                    </Link>
                  </li>
                  <li className={cx("dropdown-menu-doc-li")}>
                    <Link
                      href="/components/daydongho"
                      className={cx("dropdown-menu-doc-a")}>
                      DÂY TREO ĐỒNG HỒ
                    </Link>
                  </li>
                  <li className={cx("dropdown-menu-doc-li")}>
                    <Link
                      href="/components/trangsucCk"
                      className={cx("dropdown-menu-doc-a")}>
                      TRANG SỨC CALVIN KLEIN
                    </Link>
                  </li>
                  <li className={cx("dropdown-menu-doc-li")}>
                    <Link
                      href="/components/trangsucDW"
                      className={cx("dropdown-menu-doc-a")}>
                      TRANG SỨC DW
                    </Link>
                  </li>
                  <li className={cx("dropdown-menu-doc-li")}>
                    <Link
                      href="/components/donghobaothuc"
                      className={cx("dropdown-menu-doc-a")}>
                      ĐỒNG HỒ BÁO THỨC
                    </Link>
                  </li>
                  <li className={cx("dropdown-menu-doc-li")}>
                    <Link
                      href="/components/donghodeban"
                      className={cx("dropdown-menu-doc-a")}>
                      ĐỒNG HỒ ĐỂ BÀN
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={cx("nav-list-li")}>
                <Link
                  href="/components/suadongho"
                  className={cx("nav-list-li-a")}>
                  SỬA ĐỒNG HỒ
                </Link>
              </li>
            </ul>
          </nav>
        </>
      );
    }
  };
}
