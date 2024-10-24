"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./daydongho.module.css";

export default function Daydongho() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/product/category/92ad8d9a-fba0-48db-a93d-6974bb5a9ed9"
        );
        const data = await res.json();
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
    <>
      <div className={styles["container-header"]}>
        <div id="main-container" className={styles["mt20"]}>
          <div className={styles["main-column"]}>
            <div className={styles["center-1col"]}>
              <div className={styles.clear}></div>

              <div className={styles.hiden}>
                <div className={styles.clear}></div>
                {/* none-menu-ngang */}
                <div
                  className={`${styles["block-product-filter"]} ${styles.cls}`}
                >
                  {/* item1 */}
                  <div
                    className={`${styles["field-area"]} ${styles["field-item"]}`}
                  >
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-size-day"
                    >
                      Size dây
                    </div>
                    <div
                      id="size-day"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-size-day"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div
                        className={`${styles["filters-in-field-inner"]} ${styles.cls}`}
                      >
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 26-24mm">
                            Size 26-24mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 26-22mm">
                            Size 26-22mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 24-22mm">
                            Size 24-22mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 24-20mm">
                            Size 24-20mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 22-20mm">
                            Size 22-20mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 21-18mm">
                            Size 21-18mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 20-18mm">
                            Size 20-18mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 19-18mm">
                            Size 19-18mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 18-16mm">
                            Size 18-16mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 16-14mm">
                            Size 16-14mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 14-12mm">
                            Size 14-12mm
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Size 12-10mm">
                            Size 12-10mm
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item2 */}
                  <div
                    className={`${styles["field-area"]} ${styles["field-item"]}`}
                  >
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-mau-day"
                    >
                      Màu Dây
                    </div>
                    <div
                      id="mau-day"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-mau-day"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div
                        className={`${styles["filters-in-field-inner"]} ${styles.cls}`}
                      >
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Nâu (Brown)">
                            Nâu (Brown)
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Nâu (Tan)">
                            Nâu (Tan)
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Xanh (Green)">
                            Xanh (Green)
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Xanh (Navy)">
                            Xanh (Navy)
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Đen">
                            Đen
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item3 */}
                  <div
                    className={`${styles["field-area"]} ${styles["field-item"]}`}
                  >
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-thuong-hieu"
                    >
                      Thương hiệu
                    </div>
                    <div
                      id="thuong-hieu"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-thuong-hieu"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div
                        className={`${styles["filters-in-field-inner"]} ${styles.cls}`}
                      >
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="ZRC-Rochet">
                            ZRC-Rochet
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Longines">
                            Longines
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Seiko">
                            Seiko
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Tissot">
                            Tissot
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Daniel Wellington">
                            Daniel Wellington
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item4 */}
                  <div
                    className={`${styles["field-area"]} ${styles["field-item"]}`}
                  >
                    <div
                      className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                      data-id="id-field-chat-lieu"
                    >
                      Chất Liệu
                    </div>
                    <div
                      id="chat-lieu"
                      className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-0-column"]} ${styles["filter-4-chat-lieu"]}`}
                    >
                      <span className={styles.close}>x</span>
                      <div
                        className={`${styles["filters-in-field-inner"]} ${styles.cls}`}
                      >
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Dây cao su">
                            Dây cao su
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Dây da">
                            Dây da
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Dây Silicone">
                            Dây Silicone
                          </a>
                        </div>
                        <div className={`${styles.cls} ${styles.item}`}>
                          <a rel="nofollow" href="#" title="Dây dù">
                            Dây dù
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* container */}
              <div className={styles.container}>
                <div className={styles.clear}></div>
                <div className={styles["all-summary"]}>
                  <div
                    className={`${styles["summary-content-filter"]} ${styles.description}`}
                  >
                    <div className={styles["banner-cat-manuf"]}>
                      <img
                        src="/image/item/banner-daydongho.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.clear}></div>
                <div className={styles["products-cat"]}>
                  <div className={styles["block-products-filter"]}>
                    <div
                      className={`${styles["block-product-filter"]} ${styles.cls}`}
                    >
                      {/* item1 */}
                      <div
                        className={`${styles["field-area"]} ${styles["field-item"]}`}
                      >
                        <div
                          className={`${styles["field-name"]} ${styles.normal}`}
                          data-id="id-field-size-day"
                        >
                          Kích thước dây
                        </div>
                        <div
                          id="size-day"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-size-day"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div
                            className={`${styles["filters-in-field-inner"]} ${styles.cls}`}
                          >
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 26-24mm">
                                Kích thước 26-24mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 26-22mm">
                                Kích thước 26-22mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 24-22mm">
                                Kích thước 24-22mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 24-20mm">
                                Kích thước 24-20mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 22-20mm">
                                Kích thước 22-20mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 21-18mm">
                                Kích thước 21-18mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 20-18mm">
                                Kích thước 20-18mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 19-18mm">
                                Kích thước 19-18mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 18-16mm">
                                Kích thước 18-16mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 16-14mm">
                                Kích thước 16-14mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 14-12mm">
                                Kích thước 14-12mm
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Size 12-10mm">
                                Kích thước 12-10mm
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* item2 */}
                      <div
                        className={`${styles["field-area"]} ${styles["field-item"]}`}
                      >
                        <div
                          className={`${styles["field-name"]} ${styles.normal}`}
                          data-id="id-field-mau-day"
                        >
                          Màu Dây
                        </div>
                        <div
                          id="mau-day"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-mau-day"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div
                            className={`${styles["filters-in-field-inner"]} ${styles.cls}`}
                          >
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Nâu (Brown)">
                                Nâu (Brown)
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Nâu (Tan)">
                                Nâu (Tan)
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Xanh (Green)">
                                Xanh (Green)
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Xanh (Navy)">
                                Xanh (Navy)
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Đen">
                                Đen
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* item3 */}
                      <div
                        className={`${styles["field-area"]} ${styles["field-item"]}`}
                      >
                        <div
                          className={`${styles["field-name"]} ${styles.normal}`}
                          data-id="id-field-thuong-hieu"
                        >
                          Thương hiệu
                        </div>
                        <div
                          id="thuong-hieu"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-thuong-hieu"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div
                            className={`${styles["filters-in-field-inner"]} ${styles.cls}`}
                          >
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="ZRC-Rochet">
                                ZRC-Rochet
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Longines">
                                Longines
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Seiko">
                                Seiko
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Tissot">
                                Tissot
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a
                                rel="nofollow"
                                href="#"
                                title="Daniel Wellington"
                              >
                                Daniel Wellington
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* item4 */}
                      <div
                        className={`${styles["field-area"]} ${styles["field-item"]}`}
                      >
                        <div
                          className={`${styles["field-name"]} ${styles.normal}`}
                          data-id="id-field-chat-lieu"
                        >
                          Chất Liệu
                        </div>
                        <div
                          id="chat-lieu"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-0-column"]} ${styles["filter-4-chat-lieu"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div
                            className={`${styles["filters-in-field-inner"]} ${styles.cls}`}
                          >
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Dây cao su">
                                Dây cao su
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Dây da">
                                Dây da
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Dây Silicone">
                                Dây Silicone
                              </a>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <a rel="nofollow" href="#" title="Dây dù">
                                Dây dù
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Menu - Đồng hồ nam  */}
                  <div className={styles["field-title"]}>
                    <div className={styles["title-name"]}>
                      <div className={styles["cat-title"]}>
                        <div
                          className={styles["cat-title-main"]}
                          id="cat-dong-ho"
                        >
                          <div className={styles["title-icon"]}>
                            <h1>Dây đồng hồ</h1>
                          </div>
                        </div>
                        <div className={styles.clear}></div>
                      </div>
                    </div>

                    <select
                      className={styles["order-select"]}
                      name="order-select"
                    >
                      <option value="">Sắp xếp theo</option>
                      <option value="#">Bán chạy nhất</option>
                      <option value="#">Khuyễn mãi</option>
                      <option value="#">Giá từ thấp tới cao</option>
                      <option value="#">Giá từ cao tới thấp</option>
                      <option value="#">Mới nhất</option>
                      <option value="#">Xem nhiều</option>
                      <option value="#">Sản phẩm hot</option>
                    </select>
                    <div className={styles.clear}></div>
                  </div>
                  {/*  */}
                  <div className={styles.clear}></div>
                  {/* product-đồng hồ nam */}
                  <div className={styles["products-cat"]}>
                    <section className={styles["products-cat-frame"]}>
                      <div className={styles["products-cat-frame-inner"]}>
                        <div className={styles["product-grid"]}>
                          {products.map((product) => {
                            const {
                              _id,
                              ten,
                              ten_san_pham,
                              ma_san_pham,
                              gia_san_pham,
                              hinh_anh,
                            } = product;

                            return (
                              <div key={_id} className={styles.item}>
                                <div className={styles["frame-inner"]}>
                                  <figure className={styles["product-image"]}>
                                    <Link href="#">
                                      <img
                                        src={`http://localhost:5000/images/${hinh_anh}`}
                                        alt={ten}
                                        width="300"
                                        height="363"
                                      />
                                    </Link>
                                  </figure>
                                  <h3>
                                    <Link
                                      href="#"
                                      className={styles.name}
                                      title={ten}
                                    >
                                      <span className={styles["cat-name"]}>
                                        {ten_san_pham}
                                      </span>
                                      {ma_san_pham}
                                    </Link>
                                  </h3>
                                  <div className={styles["price-area"]}>
                                    <div className={styles["price-current"]}>
                                      <span>
                                        {gia_san_pham.toLocaleString("vi-VN")}₫
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                  </div>
                  {/* phân trang */}
                  <div className={styles.pagination}>
                    <span title="Page 1" className={styles.current}>
                      <span>1</span>
                    </span>
                    <a className={styles["other-page"]} title="Page 2" href="#">
                      <span>2</span>
                    </a>
                    <a className={styles["other-page"]} title="Page 3" href="#">
                      <span>3</span>
                    </a>
                    <a className={styles["other-page"]} title="Page 4" href="#">
                      <span>4</span>
                    </a>
                    <b>...</b>
                    <a
                      className={styles["next-page"]}
                      title="Next page"
                      href="#"
                    >
                      ›
                    </a>
                    <a
                      className={styles["last-page"]}
                      title="Last page"
                      href="#"
                    >
                      ››
                    </a>
                  </div>
                </div>
                <div className={styles.clear}></div>
                {/* đánh giá  */}
                <div className={styles.evaluateCat}>
                  <div className={`${styles.ratingArea} ${styles.cls}`}>
                    <span id="ratings">
                      <i
                        className={` ${styles.starOn}`}
                        id="rate_1"
                        value="1"
                      ></i>
                      <i
                        className={` ${styles.starOn}`}
                        id="rate_2"
                        value="2"
                      ></i>
                      <i
                        className={` ${styles.starOn}`}
                        id="rate_3"
                        value="3"
                      ></i>
                      <i
                        className={` ${styles.starOff}`}
                        id="rate_4"
                        value="4"
                      ></i>
                      <i
                        className={` ${styles.starOff}`}
                        id="rate_5"
                        value="5"
                      ></i>
                    </span>
                    <span className={styles.ratingNote}>
                      Nhấn vào đây để đánh giá
                    </span>
                  </div>
                </div>

                <div className={styles.clear}></div>
                <div
                  className={`${styles.aq_relates} ${styles.content_li}`}
                ></div>
              </div>
            </div>
            {/* end - đồng hồ nam */}
            <div className={styles.clear}></div>
          </div>
        </div>
      </div>
    </>
  );
}
