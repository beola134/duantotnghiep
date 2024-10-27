"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./donghodoi.module.css";
import Loading from "../loading/page";

export default function DonghoDoi() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/new/doi");
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
                      Đến với thế giới <strong>đồng hồ nam, nữ</strong> của Wristly, bạn sẽ được sở hữu hàng nghìn sản
                      phẩm chất lượng, thiết kế bắt mắt đến từ các thương hiệu&nbsp;
                      <em>
                        <strong>
                          <Link href="#" target="_blank">
                            đồng hồ&nbsp;Thụy Sỹ
                          </Link>
                        </strong>
                      </em>
                      , Nhật Bản, Pháp, Mỹ…danh tiếng trên thế giới. Mọi sản phẩm đều đảm bảo&nbsp;
                      <strong>100% hàng chính hãng</strong> kèm theo <strong>chế độ bảo hành chính hãng</strong> đặc
                      biệt với mức giá hợp lý sẽ đem đến cho bạn phụ kiện hoàn hảo nhất; khẳng định đẳng cấp, phong cách
                      riêng của bản thân
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
                            <h1>Đồng hồ mới đôi</h1>
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
                        {products.map((product) => {
                          const {
                            _id,
                            ten,
                            ten_san_pham,
                            ma_san_pham,
                            gia_san_pham,
                            gia_giam,
                            hinh_anh,
                            loai,
                            duong_kinh,
                          } = product;

                          return (
                            <div key={_id} className={styles.item}>
                              <div className={styles["frame-inner"]}>
                                <figure className={styles["product-image"]}>
                                  <Link href={`/components/product-detail/${_id}`}>
                                    <img
                                      src={`http://localhost:5000/images/${hinh_anh}`}
                                      alt={ten}
                                      width="300"
                                      height="363"
                                      style={{ display: "inline-block", opacity: "1" }}
                                    />
                                  </Link>
                                </figure>
                                <h3>
                                  <Link className={styles.name} href="#" title={ten}>
                                    <span className={styles["cat-name"]}>{ten_san_pham}</span>
                                    {ma_san_pham}
                                  </Link>
                                </h3>
                                <span className={styles["loai-may"]}>{loai}</span>
                                <span className={styles["row-lm"]}>|</span>
                                <span className={styles["duong-kinh"]}>{duong_kinh}</span>
                                <div className={styles["price-area"]}>
                                  <div className={styles["price-old"]}>
                                    Giá: <span>{gia_san_pham.toLocaleString("vi-VN")}₫</span>
                                  </div>
                                  <div className={styles["price-current"]}>
                                    Giá KM: {gia_giam.toLocaleString("vi-VN")} ₫
                                  </div>
                                </div>
                                <div className={styles.discount}>
                                  <span>-20%</span>
                                </div>
                                <div className={styles.clear}></div>
                              </div>
                              {/* end .frame-inner */}
                              <div className={styles.clear}></div>
                            </div>
                          );
                        })}
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

                <div className={styles.clear}></div>
                <div className={`${styles.aq_relates} ${styles.content_li}`}></div>
              </div>
            </div>
            {/* end đồng hồ nam   */}
            <div className={styles.clear}></div>
          </div>
        </div>
      </div>
    </>
  );
}
