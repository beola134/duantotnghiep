"use client";
import Product from "../product/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../donghonu/donghonu.module.css";
import Loading from "../loading/page";

export default function Donghonu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/allsp/getXuatXuNB");
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
    return <Loading />;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }

  return (
    <>
      <div className={styles["container-header"]}>
        <div id="main-container" className={styles.mt20}>
          <div className={styles["main-column"]}>
            <div className={styles["center-1col"]}>
              <div className={styles.clear}></div>
              <div className={styles.hiden}>
                <div className={styles.clear}></div>
                <div className={styles["block-product-filter"]}>
                  {/* Giới tính */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div className={`${styles["field-name"]} ${styles.normal} ${styles.field}`}>Giới tính</div>
                    <div
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-0-column"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <Link rel="nofollow" href="#" title="Đồng hồ nam">
                          <span>Đồng hồ nam</span>
                        </Link>
                        <Link rel="nofollow" href="#" title="Đồng hồ nữ">
                          <span>Đồng hồ nữ</span>
                        </Link>
                        <Link rel="nofollow" href="#" title="Đồng hồ đôi">
                          <span>Đồng hồ đôi</span>
                        </Link>
                        <Link rel="nofollow" href="#" title="Đồng hồ unisex">
                          <span>Đồng hồ unisex</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* Thương hiệu  */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                    >
                      Thương hiệu
                    </div>
                    <div
                      id="brand"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-3-column"]} ${styles["filter-brand"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="LONGINES">
                            LONGINES
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="TISSOT">
                            TISSOT
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="MIDO">
                            MIDO
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="CERTINA">
                            CERTINA
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="HAMILTON">
                            HAMILTON
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="TITONI">
                            TITONI
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="FREDERIQUE CONSTANT">
                            FREDERIQUE CONSTANT
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="CALVIN KLEIN">
                            CALVIN KLEIN
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="EDOX">
                            EDOX
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="CLAUDE BERNARD">
                            CLAUDE BERNARD
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="SEIKO">
                            SEIKO
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="CITIZEN">
                            CITIZEN
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="ORIENT">
                            ORIENT
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="CASIO">
                            CASIO
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="OLYM PIANUS">
                            OLYM PIANUS
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="DANIEL WELLINGTON">
                            DANIEL WELLINGTON
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="FOSSIL">
                            FOSSIL
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="SKAGEN">
                            SKAGEN
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="MICHAEL KORS">
                            MICHAEL KORS
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mức giá */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                    >
                      Mức giá
                    </div>
                    <div
                      id="price"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-price"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Dưới 2 triệu">
                            Dưới 2 triệu
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Từ 2 triệu đến 5 triệu">
                            Từ 2 triệu đến 5 triệu
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Từ 5 triệu đến 10 triệu">
                            Từ 5 triệu đến 10 triệu
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Từ 10 triệu đến 20 triệu">
                            Từ 10 triệu đến 20 triệu
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Từ 20 triệu đến 30 triệu">
                            Từ 20 triệu đến 30 triệu
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Từ 30 triệu đến 50 triệu">
                            Từ 30 triệu đến 50 triệu
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Từ 50 triệu đến 100 triệu">
                            Từ 50 triệu đến 100 triệu
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Trên 100 triệu">
                            Trên 100 triệu
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Khuyến mãi */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-discount"
                    >
                      Khuyến mại
                    </div>
                    <div
                      id="discount"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-discount"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Giảm 10%">
                            Giảm 10%
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Giảm 15%">
                            Giảm 15%
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Giảm 20%">
                            Giảm 20%
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Giảm 25%">
                            Giảm 25%
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Giảm 30%">
                            Giảm 30%
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Giảm 40%">
                            Giảm 40%
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Giảm 50%">
                            Giảm 50%
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Loại máy */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-loai-may"
                    >
                      Loại máy
                    </div>
                    <div
                      id="loai-may"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-loai-may"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Automatic (Máy cơ tự động)">
                            Automatic (Máy cơ tự động)
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Quartz (Máy pin - điện tử)">
                            Quartz (Máy pin - điện tử)
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Eco-Drive (Năng lượng ánh sáng)">
                            Eco-Drive (Năng lượng ánh sáng)
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Quartz Chronograph (Máy pin bấm giờ thể thao)">
                            Quartz Chronograph (Máy pin bấm giờ thể thao)
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Automatic Chronometer (Máy cơ tự động chuẩn COSC)">
                            Automatic Chronometer (Máy cơ tự động chuẩn COSC)
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Quartz Chronometer (Máy pin chuẩn COSC)">
                            Quartz Chronometer (Máy pin chuẩn COSC)
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Automatic Chronograph (Máy cơ tự động bấm giờ thể thao)">
                            Automatic Chronograph (Máy cơ tự động bấm giờ thể thao)
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Quartz Solar (Năng lượng ánh sáng)">
                            Quartz Solar (Năng lượng ánh sáng)
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Đồng hồ cơ lên giây cót bằng tay ( Manual winding )">
                            Đồng hồ cơ lên giây cót bằng tay ( Manual winding )
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Đường kính */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-duong-kinh"
                    >
                      Đường kính
                    </div>
                    <div
                      id="duong-kinh"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-duong-kinh"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Dưới 25mm">
                            Dưới 25mm
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="25mm đến 30mm">
                            25mm đến 30mm
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="30mm đến 35mm">
                            30mm đến 35mm
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="35mm đến 38mm">
                            35mm đến 38mm
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="38mm đến 40mm">
                            38mm đến 40mm
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="40mm đến 42mm">
                            40mm đến 42mm
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="42mm đến 45mm">
                            42mm đến 45mm
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Từ 45mm trở lên">
                            Từ 45mm trở lên
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Chất liệu dây  */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-chat-lieu-day"
                    >
                      Chất liệu dây
                    </div>
                    <div
                      id="chat-lieu-day"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-chat-lieu-day"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Dây da">
                            Dây da
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ 316L">
                            Thép không gỉ 316L
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ 316L mạ vàng công nghệ PVD">
                            Thép không gỉ 316L mạ vàng công nghệ PVD
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ 316L dạng lưới">
                            Thép không gỉ 316L dạng lưới
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ 316L dạng lắc">
                            Thép không gỉ 316L dạng lắc
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Dây vải">
                            Dây vải
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ 316L/ Vàng 18K">
                            Thép không gỉ 316L/ Vàng 18K
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ 316L/ Ceramic">
                            Thép không gỉ 316L/ Ceramic
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ mạ công nghệ PVD">
                            Thép không gỉ mạ công nghệ PVD
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Dây cao su">
                            Dây cao su
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Dây dù">
                            Dây dù
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Titanium">
                            Titanium
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Titanium mạ vàng công nghệ PVD">
                            Titanium mạ vàng công nghệ PVD
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Nhựa">
                            Nhựa
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Chất liệu vỏ */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-chat-lieu-vo"
                    >
                      Chất liệu vỏ
                    </div>
                    <div
                      id="chat-lieu-vo"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-chat-lieu-vo"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ 316L">
                            Thép không gỉ 316L
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ mạ vàng công nghệ PVD">
                            Thép không gỉ mạ vàng công nghệ PVD
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Vàng 18K">
                            Vàng 18K
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ 316L/ Vàng 18K">
                            Thép không gỉ 316L/ Vàng 18K
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Titanium">
                            Titanium
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Titanium mạ công nghệ PVD">
                            Titanium mạ công nghệ PVD
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Ceramic">
                            Ceramic
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ 316L/ Ceramic">
                            Thép không gỉ 316L/ Ceramic
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thép không gỉ mạ công nghệ PVD">
                            Thép không gỉ mạ công nghệ PVD
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Nhựa">
                            Nhựa
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Titanium/ Vàng 18K">
                            Titanium/ Vàng 18K
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mặt kính */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-mat-kinh"
                    >
                      Mặt kính
                    </div>
                    <div
                      id="mat-kinh"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-mat-kinh"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Sapphire">
                            Sapphire
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Mặt kính cứng">
                            Mặt kính cứng
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Hardlex Crystal">
                            Hardlex Crystal
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Mica">
                            Mica
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Kinh Nhựa">
                            Kinh Nhựa
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Màu mặt */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-mau-mat"
                    >
                      Màu mặt
                    </div>
                    <div
                      id="mau-mat"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-mau-mat"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Trắng">
                            Trắng
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Hồng">
                            Hồng
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Xám">
                            Xám
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Đen">
                            Đen
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Xanh lam">
                            Xanh lam
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Vàng">
                            Vàng
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Khảm trai">
                            Khảm trai
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Đỏ">
                            Đỏ
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Da Cam">
                            Da Cam
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Xanh Lá">
                            Xanh Lá
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Nâu">
                            Nâu
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Phong cách */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-phong-cach"
                    >
                      Phong cách
                    </div>
                    <div
                      id="phong-cach"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-phong-cach"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Sang trọng">
                            Sang trọng
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thể thao">
                            Thể thao
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thể thao sang trọng">
                            Thể thao sang trọng
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Quân đội">
                            Quân đội
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thời trang">
                            Thời trang
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Hiện đại">
                            Hiện đại
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Kiểu dáng */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-kieu-dang"
                    >
                      Kiểu dáng
                    </div>
                    <div
                      id="kieu-dang"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-kieu-dang"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Mặt vuông">
                            Mặt vuông
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Mặt tròn">
                            Mặt tròn
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Mặt chữ nhật">
                            Mặt chữ nhật
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Mặt Oval">
                            Mặt Oval
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Khác">
                            Khác
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Xuất xứ thương hiệu */}
                  <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-xuat-xu-thuong-hieu"
                    >
                      Xuất xứ thương hiệu
                    </div>
                    <div
                      id="xuat-xu-thuong-hieu"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-0-column"]} ${styles["filter-4-xuat-xu-thuong-hieu"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Nhật Bản">
                            Nhật Bản
                          </Link>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <Link rel="nofollow" href="#" title="Thụy Sỹ">
                            Thụy Sỹ
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.clear}></div>
              <div className={styles.container}>
                <div className={styles.clear}></div>
                <div className={styles["all-summary"]}>
                  <div className={styles["summary-content-filter"]} style={{ description: true }}>
                    <p>
                      Bước lên chuyến tàu thời gian <strong>đồng hồ Nhật Bản</strong>, Duy Anh Watch sẽ dẫn dắt bạn đến
                      với hành trình giải mã sức hút trên từng mẫu đồng hồ chính hãng đến từ “Bộ tứ” lừng danh của sứ xở
                      Hoa Anh Đào: Seiko, Citizen, Orient, Casio. Với thế mạnh về phân khúc giá dễ tiếp cận,{" "}
                      <strong>đồng hồ Nhật Bản</strong> sẽ gửi đến “người người, nhà nhà” danh mục sản phẩm bắt mắt, độ
                      bền ấn tượng mà ngay cả sinh viên hay những người mới ra trường vẫn có thể thoải mái sở hữu.
                    </p>
                  </div>

                  <div className={styles["view-more"]}>Xem thêm</div>
                </div>
                <div className={styles.clear}></div>
                <div className={styles["products-cat"]}>
                  <div className={styles["block-products-filter"]}>
                    <div className={styles["block-product-filter"]}>
                      {/* Giới tính */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div className={`${styles["field-name"]} ${styles.normal} ${styles.field}`}>Giới tính</div>
                        <div
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-0-column"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <Link rel="nofollow" href="#" title="Đồng hồ nam">
                              <span>Đồng hồ nam</span>
                            </Link>
                            <Link rel="nofollow" href="#" title="Đồng hồ nữ">
                              <span>Đồng hồ nữ</span>
                            </Link>
                            <Link rel="nofollow" href="#" title="Đồng hồ đôi">
                              <span>Đồng hồ đôi</span>
                            </Link>
                            <Link rel="nofollow" href="#" title="Đồng hồ unisex">
                              <span>Đồng hồ unisex</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* Thương hiệu  */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                        >
                          Thương hiệu
                        </div>
                        <div
                          id="brand"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-3-column"]} ${styles["filter-brand"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="LONGINES">
                                LONGINES
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="TISSOT">
                                TISSOT
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="MIDO">
                                MIDO
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="CERTINA">
                                CERTINA
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="HAMILTON">
                                HAMILTON
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="TITONI">
                                TITONI
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="FREDERIQUE CONSTANT">
                                FREDERIQUE CONSTANT
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="CALVIN KLEIN">
                                CALVIN KLEIN
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="EDOX">
                                EDOX
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="CLAUDE BERNARD">
                                CLAUDE BERNARD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="SEIKO">
                                SEIKO
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="CITIZEN">
                                CITIZEN
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="ORIENT">
                                ORIENT
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="CASIO">
                                CASIO
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="OLYM PIANUS">
                                OLYM PIANUS
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="DANIEL WELLINGTON">
                                DANIEL WELLINGTON
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="FOSSIL">
                                FOSSIL
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="SKAGEN">
                                SKAGEN
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="MICHAEL KORS">
                                MICHAEL KORS
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mức giá */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                        >
                          Mức giá
                        </div>
                        <div
                          id="price"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-price"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Dưới 2 triệu">
                                Dưới 2 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Từ 2 triệu đến 5 triệu">
                                Từ 2 triệu đến 5 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Từ 5 triệu đến 10 triệu">
                                Từ 5 triệu đến 10 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Từ 10 triệu đến 20 triệu">
                                Từ 10 triệu đến 20 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Từ 20 triệu đến 30 triệu">
                                Từ 20 triệu đến 30 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Từ 30 triệu đến 50 triệu">
                                Từ 30 triệu đến 50 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Từ 50 triệu đến 100 triệu">
                                Từ 50 triệu đến 100 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Trên 100 triệu">
                                Trên 100 triệu
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Khuyến mãi */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-discount"
                        >
                          Khuyến mại
                        </div>
                        <div
                          id="discount"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-discount"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Giảm 10%">
                                Giảm 10%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Giảm 15%">
                                Giảm 15%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Giảm 20%">
                                Giảm 20%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Giảm 25%">
                                Giảm 25%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Giảm 30%">
                                Giảm 30%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Giảm 40%">
                                Giảm 40%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Giảm 50%">
                                Giảm 50%
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Loại máy */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-loai-may"
                        >
                          Loại máy
                        </div>
                        <div
                          id="loai-may"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-loai-may"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Automatic (Máy cơ tự động)">
                                Automatic (Máy cơ tự động)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Quartz (Máy pin - điện tử)">
                                Quartz (Máy pin - điện tử)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Eco-Drive (Năng lượng ánh sáng)">
                                Eco-Drive (Năng lượng ánh sáng)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Quartz Chronograph (Máy pin bấm giờ thể thao)">
                                Quartz Chronograph (Máy pin bấm giờ thể thao)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Automatic Chronometer (Máy cơ tự động chuẩn COSC)">
                                Automatic Chronometer (Máy cơ tự động chuẩn COSC)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Quartz Chronometer (Máy pin chuẩn COSC)">
                                Quartz Chronometer (Máy pin chuẩn COSC)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Automatic Chronograph (Máy cơ tự động bấm giờ thể thao)"
                              >
                                Automatic Chronograph (Máy cơ tự động bấm giờ thể thao)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Quartz Solar (Năng lượng ánh sáng)">
                                Quartz Solar (Năng lượng ánh sáng)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Đồng hồ cơ lên giây cót bằng tay ( Manual winding )">
                                Đồng hồ cơ lên giây cót bằng tay ( Manual winding )
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*Đường kính */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-duong-kinh"
                        >
                          Đường kính
                        </div>
                        <div
                          id="duong-kinh"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-duong-kinh"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Dưới 25mm">
                                Dưới 25mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="25mm đến 30mm">
                                25mm đến 30mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="30mm đến 35mm">
                                30mm đến 35mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="35mm đến 38mm">
                                35mm đến 38mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="38mm đến 40mm">
                                38mm đến 40mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="40mm đến 42mm">
                                40mm đến 42mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="42mm đến 45mm">
                                42mm đến 45mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Từ 45mm trở lên">
                                Từ 45mm trở lên
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*Chất liệu dây  */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-chat-lieu-day"
                        >
                          Chất liệu dây
                        </div>
                        <div
                          id="chat-lieu-day"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-chat-lieu-day"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Dây da">
                                Dây da
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ 316L">
                                Thép không gỉ 316L
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ 316L mạ vàng công nghệ PVD">
                                Thép không gỉ 316L mạ vàng công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ 316L dạng lưới">
                                Thép không gỉ 316L dạng lưới
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ 316L dạng lắc">
                                Thép không gỉ 316L dạng lắc
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Dây vải">
                                Dây vải
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ 316L/ Vàng 18K">
                                Thép không gỉ 316L/ Vàng 18K
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ 316L/ Ceramic">
                                Thép không gỉ 316L/ Ceramic
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ mạ công nghệ PVD">
                                Thép không gỉ mạ công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Dây cao su">
                                Dây cao su
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Dây dù">
                                Dây dù
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Titanium">
                                Titanium
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Titanium mạ vàng công nghệ PVD">
                                Titanium mạ vàng công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Nhựa">
                                Nhựa
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*Chất liệu vỏ */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-chat-lieu-vo"
                        >
                          Chất liệu vỏ
                        </div>
                        <div
                          id="chat-lieu-vo"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-chat-lieu-vo"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ 316L">
                                Thép không gỉ 316L
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ mạ vàng công nghệ PVD">
                                Thép không gỉ mạ vàng công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Vàng 18K">
                                Vàng 18K
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ 316L/ Vàng 18K">
                                Thép không gỉ 316L/ Vàng 18K
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Titanium">
                                Titanium
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Titanium mạ công nghệ PVD">
                                Titanium mạ công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Ceramic">
                                Ceramic
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ 316L/ Ceramic">
                                Thép không gỉ 316L/ Ceramic
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thép không gỉ mạ công nghệ PVD">
                                Thép không gỉ mạ công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Nhựa">
                                Nhựa
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Titanium/ Vàng 18K">
                                Titanium/ Vàng 18K
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mặt kính */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-mat-kinh"
                        >
                          Mặt kính
                        </div>
                        <div
                          id="mat-kinh"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-mat-kinh"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Sapphire">
                                Sapphire
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Mặt kính cứng">
                                Mặt kính cứng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Hardlex Crystal">
                                Hardlex Crystal
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Mica">
                                Mica
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Kinh Nhựa">
                                Kinh Nhựa
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*Màu mặt */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-mau-mat"
                        >
                          Màu mặt
                        </div>
                        <div
                          id="mau-mat"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-mau-mat"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Trắng">
                                Trắng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Hồng">
                                Hồng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Xám">
                                Xám
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Đen">
                                Đen
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Xanh lam">
                                Xanh lam
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Vàng">
                                Vàng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Khảm trai">
                                Khảm trai
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Đỏ">
                                Đỏ
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Da Cam">
                                Da Cam
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Xanh Lá">
                                Xanh Lá
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Nâu">
                                Nâu
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*Phong cách */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-phong-cach"
                        >
                          Phong cách
                        </div>
                        <div
                          id="phong-cach"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-phong-cach"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Sang trọng">
                                Sang trọng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thể thao">
                                Thể thao
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thể thao sang trọng">
                                Thể thao sang trọng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Quân đội">
                                Quân đội
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thời trang">
                                Thời trang
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Hiện đại">
                                Hiện đại
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*Kiểu dáng */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-kieu-dang"
                        >
                          Kiểu dáng
                        </div>
                        <div
                          id="kieu-dang"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-kieu-dang"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Mặt vuông">
                                Mặt vuông
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Mặt tròn">
                                Mặt tròn
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Mặt chữ nhật">
                                Mặt chữ nhật
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Mặt Oval">
                                Mặt Oval
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Khác">
                                Khác
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*Xuất xứ thương hiệu */}
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-xuat-xu-thuong-hieu"
                        >
                          Xuất xứ thương hiệu
                        </div>
                        <div
                          id="xuat-xu-thuong-hieu"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-0-column"]} ${styles["filter-4-xuat-xu-thuong-hieu"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Nhật Bản">
                                Nhật Bản
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Thụy Sỹ">
                                Thụy Sỹ
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Menu-Đồng hồ nam */}
                  <div className={styles["field-title"]}>
                    <div className={styles["title-name"]}>
                      <div className={styles["cat-title"]}>
                        <div className={styles["cat-title-main"]} id="cat-dong-ho">
                          <div className={styles["title-icon"]}>
                            <h1>Đồng hồ</h1>
                          </div>
                        </div>
                        <div className={styles.clear}></div>
                      </div>
                    </div>

                    <select className={styles["order-select"]} name="order-select">
                      <option value="">Sắp xếp theo</option>
                      <option value="#">Bán chạy nhất</option>
                      <option value="#">Khuyến mãi</option>
                      <option value="#">Giá từ thấp tới cao</option>
                      <option value="#">Giá từ cao tới thấp</option>
                      <option value="#">Mới nhất</option>
                      <option value="#">Xem nhiều</option>
                      <option value="#">Sản phẩm hot</option>
                    </select>
                    <div className={styles.clear}></div>
                  </div>

                  <div className={styles.clear}></div>
                  {/*Danh sách sản phẩm */}

                  <section className={styles["products-cat-frame"]}>
                    <div className={styles["products-cat-frame-inner"]}>
                      <div className={styles["product-grid"]}>
                        {/* item-1 */}
                        <Product data={products}></Product>
                      </div>
                    </div>
                  </section>

                  {/* phân trang*/}
                  <div className={styles.pagination}>
                    <span title="Page 1" className={styles.current}>
                      <span>1</span>
                    </span>
                    <Link className={styles["other-page"]} title="Page 2" href="#">
                      <span>2</span>
                    </Link>
                    <Link className={styles["other-page"]} title="Page 3" href="#">
                      <span>3</span>
                    </Link>
                    <Link className={styles["other-page"]} title="Page 4" href="#">
                      <span>4</span>
                    </Link>
                    <b>...</b>
                    <Link className={styles["next-page"]} title="Next page" href="#">
                      ›
                    </Link>
                    <Link className={styles["last-page"]} title="Last page" href="#">
                      ››
                    </Link>
                  </div>
                </div>
                <div className={styles.clear}></div>

                {/* đánh giá start */}
                <div className={styles.evaluateCat}>
                  <div className={`${styles.ratingArea} ${styles.cls}`}>
                    <span id="ratings">
                      <i className={` ${styles.starOn}`} id="rate_1" value="1"></i>
                      <i className={` ${styles.starOn}`} id="rate_2" value="2"></i>
                      <i className={` ${styles.starOn}`} id="rate_3" value="3"></i>
                      <i className={` ${styles.starOff}`} id="rate_4" value="4"></i>
                      <i className={` ${styles.starOff}`} id="rate_5" value="5"></i>
                    </span>
                    <span className={styles.ratingNote}>Nhấn vào đây để đánh giá</span>
                  </div>
                </div>

                {/* mô tả*/}
                <div className={`${styles.summaryContentCat} ${styles.description} ${styles.heightAuto}`}>
                  <p dir="ltr" style={{ textAlign: "justify" }}>
                    Nhật Bản là một gã khổng lồ trong ngành sản xuất đồng hồ, với một số mẫu đồng hồ tốt nhất thế giới ở
                    mọi chủng loại và mức giá đến từ Đất nước Mặt trời mọc.
                  </p>
                  <p dir="ltr" style={{ textAlign: "justify" }}>
                    Khi bạn nghĩ về <strong>đồng hồ Nhật Bản</strong>, bạn có thể hướng đến các lựa chọn đồng hồ thạch
                    anh và <strong>đồng hồ cơ Nhật Bản</strong> từ các thương hiệu như Casio, Seiko và Citizen... Nhật
                    Bản có lẽ là nước dẫn đầu về giá trị trong ngành công nghiệp đồng hồ toàn cầu, một vị thế có được
                    nhờ những chiếc đồng hồ như bộ sưu tập Casio G-Shock và đồng hồ thợ lặn Seiko SKX.{" "}
                  </p>
                  <p dir="ltr" style={{ textAlign: "justify" }}>
                    Bên cạnh đó, Nhật Bản cũng là một nguồn cung cấp tuyệt vời
                    <em>
                      <strong>
                        <Link href="#">
                          <span className={styles.highlightText}>đồng hồ cao cấp</span>
                        </Link>
                      </strong>
                    </em>
                    , tầm trung và <strong>đồng hồ Nhật Bản giá rẻ</strong> từ các tập đoàn lớn cũng như một số thương
                    hiệu độc lập mới nổi. Dưới đây là một số thương hiệu tốt nhất đến từ Nhật Bản:
                  </p>
                  <h2 dir="ltr" style={{ textAlign: "justify" }}>
                    <strong>1. Giới thiệu các thương hiệu đồng hồ Nhật Bản nổi tiếng</strong>
                  </h2>
                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.1&nbsp;Casio</strong>
                  </h3>

                  <p dir="ltr" className={styles.justifyText}>
                    Rất có thể chiếc đồng hồ đầu tiên của bạn là
                    <em>
                      <strong>
                        <Link href="#">
                          <span className={styles.highlightText}>Casio</span>
                        </Link>
                      </strong>
                    </em>
                    . Casio được thành lập vào năm 1946 bởi Tadao Kashio, thế nhưng phải đến những năm 70, Casio mới sản
                    xuất chiếc đồng hồ đầu tiên của mình. Kể từ đó, Casio đã thành công và bắt đầu giới thiệu nhiều mẫu
                    đồng hồ đa dạng hơn với đủ loại chức năng khác nhau. Những chiếc đồng hồ này chính xác, cứng cáp và
                    giá cả phải chăng.
                  </p>

                  <p className={styles.imageContainer}>
                    <img height="800" className={styles.lazy} width="1200" src="/image/item/nb1.jpg" />
                  </p>

                  <p dir="ltr" className={styles.justifyText}>
                    Ngày nay, có lẽ nổi bật nhất là bộ sưu tập
                    <em>
                      <strong>
                        <Link href="#">
                          <span className={styles.highlightText}>Casio G Shock</span>
                        </Link>
                      </strong>
                    </em>
                    . Được giới thiệu vào năm 1983, G-Shocks đã phát triển trở thành biểu tượng văn hóa và đồng hồ. Và
                    trong thập kỷ qua, Casio bắt đầu giới thiệu những chiếc G-Shocks cao cấp hơn với cấu tạo bằng thép
                    không gỉ, vỏ bằng sợi carbon, cảm biến tiên tiến như GPS và kết nối Bluetooth. Đặc biệt, dòng MR-G
                    của G-Shocks cũng tôn vinh lịch sử Nhật Bản bằng cách giới thiệu những chiếc đồng hồ được trang trí
                    bởi những người thợ thủ công truyền thống của Nhật Bản. , đồng hồ nam hay nữ, Longines vẫn mang đến
                    hàng loạt phiên bản nổi tiếng đáp ứng nhiều thị hiếu khác nhau.
                  </p>

                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;
                  </p>

                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.2 Citizen</strong>
                  </h3>

                  <p dir="ltr" className={styles.justifyText}>
                    Vào những năm 70,
                    <em>
                      <strong>
                        <Link href="#">
                          <span className={styles.highlightText}>Citizen</span>
                        </Link>
                      </strong>
                    </em>{" "}
                    bắt đầu sản xuất hàng loạt đồng hồ thạch anh giá rẻ nhưng có độ chính xác cao. Năm 1976, Citizen đã
                    tiến xa hơn công nghệ thạch anh với việc tạo ra chiếc đồng hồ thạch anh tương tự chạy bằng năng
                    lượng mặt trời đầu tiên trên thế giới, dẫn đến sự phát triển của công nghệ Eco-Drive, công nghệ hiện
                    đang cung cấp năng lượng cho nhiều đồng hồ của Citizen và là một đề xuất giá trị mạnh mẽ cho thương
                    hiệu.
                  </p>

                  <p className={styles.imageContainer}>
                    <img
                      alt="đồng hồ nam rolex"
                      height="375"
                      className={styles.lazy}
                      width="1200"
                      src="/image/item/nb2.jpg"
                    />
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    Citizen cũng được biết đến với những chiếc <strong>đồng hồ nữ Nhật Bản</strong>
                    có kiểu dáng đẹp và được phái nữ ưa chuộng.
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;
                  </p>

                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.3 Grand Seiko</strong>
                  </h3>

                  <p dir="ltr" className={styles.justifyText}>
                    Chiếc Grand Seiko đầu tiên được ra mắt vào năm 1960 như cách nói của Seiko rằng hãng có thể sản xuất
                    những chiếc đồng hồ tốt như bất kỳ sản phẩm xa xỉ nào từ Thụy Sĩ. Vào năm 2017, Seiko đã tạo nên
                    thương hiệu riêng của Grand Seiko, với phương án sản xuất, thiết kế hoàn toàn riêng biệt.
                  </p>

                  <p className={styles.imageContainer}>
                    <img height="800" className={styles.lazy} width="1200" src="/image/item/nb3.jpg" />
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    Grand Seiko hiện nay thường được công nhận là đã mang lại hiệu quả to lớn cho
                    <strong>đồng hồ Nhật Bản chính hãng</strong> khi nói đến tay nghề thủ công.
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;
                  </p>

                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.4 Orient</strong>
                  </h3>

                  <p dir="ltr" className={styles.justifyText}>
                    <em>
                      <strong>
                        <Link href="#">
                          <span className={styles.highlightText}>Orient</span>
                        </Link>
                      </strong>
                    </em>{" "}
                    là công ty con của Tập đoàn Seiko Epson, với lĩnh vực kinh doanh chính là máy in và các thiết bị
                    liên quan đến hình ảnh.
                  </p>

                  <p className={styles.imageContainer}>
                    <img
                      alt="đồng hồ nam omega"
                      height="675"
                      className={styles.lazy}
                      width="1200"
                      src="/image/item/nb4.jpg"
                    />
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    Orient đang dẫn đầu trong lĩnh vực <strong>đồng hồ cơ Nhật Bản</strong> giá cả phải chăng. Bộ sưu
                    tập đồng hồ phổ biến nhất của là{" "}
                    <em>
                      <strong>
                        <Link href="#">
                          <span className={styles.highlightText}>Orient Bambino</span>
                        </Link>
                      </strong>
                    </em>
                    - một chiếc đồng hồ đeo tay mang phong cách cổ điển. Orient cũng nổi tiếng với những chiếc đồng hồ
                    lặn và Kamasu.
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;
                  </p>

                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.5 Seiko</strong>
                  </h3>

                  <p dir="ltr" className={styles.justifyText}>
                    Công ty được thành lập vào năm 1881 bởi Kintaro Hattori và bắt đầu bằng việc bán và sửa chữa đồng hồ
                    và{" "}
                    <em>
                      <strong>
                        <Link href="#">
                          <span className={styles.highlightText}>đồng hồ đeo tay</span>
                        </Link>
                      </strong>
                    </em>
                    . Chỉ 11 năm sau, Hattori bắt đầu sản xuất đồng hồ và sau đó là đồng hồ bỏ túi, tiếp theo là chiếc
                    đồng hồ đeo tay đầu tiên của Nhật Bản vào năm 1913. Những năm 1960 là thời kỳ phát triển nhanh chóng
                    của công ty.{" "}
                    <em>
                      <strong>
                        <Link href="#">
                          <span className={styles.highlightText}>Seiko </span>
                        </Link>
                      </strong>
                    </em>
                    còn đạt được sự công nhận quốc tế trên cả mong đợi khi so sánh với các thương hiệu Thụy Sĩ tại cuộc
                    thi Neuchatel Observatory. Vào năm 1969, Seiko không chỉ là một trong những công ty đầu tiên giới
                    thiệu đồng hồ chronograph tự lên dây cót mà còn cho ra mắt chiếc đồng hồ thạch anh đầu tiên trên thế
                    giới, Astron.
                  </p>

                  <p className={styles.imageContainer}>
                    <img
                      alt="đồng hồ nam Hamilton Ventura Edge Dune Limited Edition H24624330"
                      height="800"
                      className={styles.lazy}
                      width="1200"
                      src="/image/item/nb5.jpg"
                    />
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    Một trong những thành tựu lớn nhất của thương hiệu là bộ chuyển động Spring Drive là một chuyển động
                    cơ điện hỗn hợp, đặc biệt với kim giây trượt mượt mà, và độ chính xác vượt trội của nó là +1 / -1
                    giây mỗi ngày. Có lẽ đây là một trong những bộ máy đồng hồ ấn tượng và thú vị nhất còn tồn tại cho
                    đến ngày nay xuất phát từ Nhật Bản.
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;
                  </p>

                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.6 Credo</strong>
                  </h3>

                  <p dir="ltr" className={styles.justifyText}>
                    Credor là một trong những bí mật được giữ kín nhất của ngành sản xuất đồng hồ Nhật Bản. Hầu hết mọi
                    người chưa bao giờ nghe nói về Credor, ít biết hơn về những chiếc đồng hồ đáng kinh ngạc mà thương
                    hiệu sản xuất hoàn toàn in-house. Thương hiệu được hình thành vào những năm bảy mươi để đại diện cho
                    đỉnh cao của bí quyết và tay nghề thủ công của Seiko. Ngày nay, nhiều chiếc{" "}
                    <strong>đồng hồ Nhật Bản cao cấp</strong> của Credor có bộ chuyển động Spring Drive của Seiko, nhưng
                    với những cải tiến kỹ thuật và mức độ hoàn thiện bằng tay cao hơn.
                  </p>

                  <p className={styles.imageContainer}>
                    <img
                      alt="đồng hồ nam mido"
                      height="800"
                      className={styles.lazy}
                      width="1200"
                      src="/image/item/nb6.jpg"
                    />
                  </p>

                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;
                  </p>

                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.7 Hajime Asaoka</strong>
                  </h3>

                  <p dir="ltr" className={styles.justifyText}>
                    Nhật Bản là quê hương của một số thương hiệu ấn tượng nếu ít được biết đến, bao gồm Hajime Asaoka,
                    một trong những nhà sản xuất <strong>đồng hồ Nhật Bản</strong> độc lập nổi tiếng nhất của Nhật Bản.
                    Giống như nhiều người khác trong lĩnh vực kinh doanh của mình, người sáng lập cùng tên với Hajime
                    Asaoka là người tự học, đã thu thập được nhiều kỹ năng và kiến ​​thức của mình bằng cách đọc “Kỹ
                    thuật đồng hồ nổi tiếng của George Daniels” và xem các video trên YouTube.
                  </p>

                  <p className={styles.imageContainer}>
                    <img
                      alt="đồng hồ nam seiko 5 sport"
                      height="800"
                      className={styles.lazy}
                      width="1200"
                      src="/image/item/nb7.jpg"
                    />
                  </p>

                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;
                  </p>

                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.8 Minase</strong>
                  </h3>

                  <p dir="ltr" className={styles.justifyText}>
                    Mặc dù Minase là một công ty tương đối mới trong ngành, được thành lập vào năm 2005, nhưng công ty
                    mẹ của nó, Kyowa and Co., đã hoạt động trong lĩnh vực sản xuất lâu hơn. Kyowa and Co., một công ty
                    liên quan đến cơ khí và gia công được thành lập vào năm 1963. Với khả năng gia công chính xác, một
                    trong những điểm đặc biệt của nó là vỏ đồng hồ và dây đeo. Cuối cùng, công ty quyết định thành lập
                    và tạo ra những chiếc đồng hồ hoàn chỉnh của riêng mình và Minase đã ra đời.
                  </p>

                  <p className={styles.imageCenter}>
                    <img
                      alt="dong-ho-casio"
                      height="510"
                      className={styles.lazy}
                      width="1200"
                      src="/image/item/nb8.jpg"
                    />
                  </p>

                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>

                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.9 Masahiro Kikuno</strong>
                  </h3>
                  <p dir="ltr" className={styles.justifyText}>
                    Người thợ đồng hồ bậc thầy Masahiro Kikuno chế tác những chiếc đồng hồ của mình gần như hoàn toàn
                    bằng tay. Từ thiết kế, sản xuất đến lắp ráp, Masahiro Kikuno là một trong số khoảng 30 người duy
                    nhất trên thế giới có đủ kỹ năng để sản xuất ra những chiếc đồng hồ được hoàn thiện vô cùng phức
                    tạp, và được thiết kế chu đáo. Nổi bật là chiếc <strong>đồng hồ nam Nhật Bản</strong>
                    Tourbillon của Kikuno có vỏ bằng vàng đỏ 18k.
                  </p>
                  <p className={styles.imageCenter}>
                    <img
                      alt="đồng hồ nam citizen"
                      height="800"
                      className={styles.lazy}
                      width="1200"
                      src="/image/item/nb9.jpg"
                    />
                  </p>

                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;
                  </p>

                  <h3 dir="ltr" className={styles.justifyText}>
                    <strong>1.10 Knot</strong>
                  </h3>

                  <p dir="ltr" className={styles.justifyText}>
                    Ở Nhật Bản khá coi trọng chủ nghĩa tối giản. Nhưng với Knot, một thương hiệu mới ra mắt gần đây sử
                    dụng các chi tiết lựa chọn, sự phức tạp cổ điển và vật liệu cao cấp để tạo ấn tượng mạnh mẽ về sự
                    tối giản. Ở thương hiệu này bạn có thể tìm thấy nhiều mẫu <strong>đồng hồ nam Nhật Bản</strong> khác
                    nhau hoặc đặt làm theo yêu cầu của bạn và có một mức giá tuyệt vời.
                  </p>

                  <p className={styles.imageCenter}>
                    <img
                      alt="đồng hồ nam orient"
                      height="675"
                      className={styles.lazy}
                      width="1200"
                      src="/image/item/nb10.jpg"
                    />
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    Về độ chính xác và độ bền, <strong>đồng hồ Nhật Bản</strong> luôn là một trong những lựa chọn đáng
                    giá cho khách hàng!
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    Một chiếc đồng hồ sang trọng chính hãng là một món phụ kiện hoàn hảo cho bộ trang phục của bạn, hơn
                    thế nữa, nó còn là sự tuyên bố về phong cách của người đeo. Vì vậy đầu tư vào món đồ này cần có sự
                    suy nghĩ kỹ lưỡng và lựa chọn địa chỉ mua đồng hồ uy tín để có được sản phẩm chính hãng từ các
                    thương hiệu đồng hồ Nhật Bản hàng đầu.
                  </p>
                  <p dir="ltr" className={styles.justifyText}>
                    &nbsp;
                  </p>

                  <h2 dir="ltr" className={styles.justifyText}>
                    <strong>2. Địa chỉ mua đồng hồ Nhật Bản chính hãng</strong>
                  </h2>

                  <p dir="ltr" className={styles.justifyText}>
                    Duy Anh Watch là đại lý ủy quyền chính thức của một số thương hiệu Nhật Bản, cung cấp cho khách hàng
                    những mẫu đồng hồ chính hãng của các thương hiệu Nhật Bản như Seiko, Citizen, Casio, Orient…
                  </p>

                  <p dir="ltr" className={styles.justifyText}>
                    Tìm kiếm một chiếc đồng hồ ưng ý đã khó, và khi chọn mua ở một cửa hàng uy tín còn khó hơn để chắc
                    chắn không mua phải hàng giả, hàng nhái. Chính vì vậy Duy Anh Watch cam kết với khách hàng về sự tin
                    tưởng vào sản phẩm và giá trị đồng tiền bỏ ra khi bạn đến với chúng tôi.
                  </p>

                  <p className={styles.justifyText}>
                    Tại mỗi cửa hàng của Đồng hồ Duy Anh, mức <strong>giá đồng hồ Nhật Bản</strong>
                    luôn được niêm yết rõ ràng, kèm theo đó là chế độ bảo hành chính hãng, dịch vụ hậu mãi chu đáo để
                    bạn có thể yên tâm lựa chọn khi đến với chúng tôi.
                  </p>

                  <p className={styles.justifyText}>&nbsp;</p>

                  <div className={styles.clear}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
