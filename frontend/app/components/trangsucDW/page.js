"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../donghonu/donghonu.module.css";
export default function TrangsucDW() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/product/category/loai/902a8bb2-fdea-473d-8779-6f815503e8c2"
        );
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
    <>
      <div className={styles["container-header"]}>
        <div id="main-container" className={styles.mt20}>
          <div className={styles["main-column"]}>
            <div className={styles["center-1col"]}>
              <div className={styles.clear}></div>
              <div className={styles.hiden}>
                <div className={styles.clear}></div>
              </div>
              <div className={styles.clear}></div>
              <div className={styles.container}>
                <div className={styles.clear}></div>
                <div className={styles["products-cat"]}>
                  <div className={styles["block-products-filter"]}></div>
                  {/*Menu-Trang sức DW */}
                  <div className={styles["field-title"]}>
                    <div className={styles["title-name"]}>
                      <div className={styles["cat-title"]}>
                        <div
                          className={styles["cat-title-main"]}
                          id="cat-dong-ho">
                          <div className={styles["title-icon"]}>
                            <h1>Trang sức DW</h1>
                          </div>
                        </div>
                        <div className={styles.clear}></div>
                      </div>
                    </div>

                    <select
                      className={styles["order-select"]}
                      name="order-select">
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
                                  <Link href="#">
                                    <img
                                      src={`http://localhost:5000/images/${hinh_anh}`}
                                      alt={ten}
                                      width="300"
                                      height="363"
                                      style={{
                                        display: "inline-block",
                                        opacity: "1",
                                      }}
                                    />
                                  </Link>
                                </figure>
                                <h3>
                                  <Link
                                    className={styles.name}
                                    href="#"
                                    title={ten}>
                                    <span className={styles["cat-name"]}>
                                      {ten_san_pham}
                                    </span>
                                    {ma_san_pham}
                                  </Link>
                                </h3>
                                <span className={styles["loai-may"]}>
                                  {loai}
                                </span>
                                <span className={styles["row-lm"]}>|</span>
                                <span className={styles["duong-kinh"]}>
                                  {duong_kinh}
                                </span>
                                <div className={styles["price-area"]}>
                                  <div className={styles["price-old"]}>
                                    Giá:{" "}
                                    <span>
                                      {gia_san_pham.toLocaleString("vi-VN")}₫
                                    </span>
                                  </div>
                                  <div className={styles["price-current"]}>
                                    Giá KM: {gia_giam.toLocaleString("vi-VN")} ₫
                                  </div>
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
                    <Link
                      className={styles["other-page"]}
                      title="Page 2"
                      href="#">
                      <span>2</span>
                    </Link>
                    <Link
                      className={styles["other-page"]}
                      title="Page 3"
                      href="#">
                      <span>3</span>
                    </Link>
                    <Link
                      className={styles["other-page"]}
                      title="Page 4"
                      href="#">
                      <span>4</span>
                    </Link>
                    <b>...</b>
                    <Link
                      className={styles["next-page"]}
                      title="Next page"
                      href="#">
                      ›
                    </Link>
                    <Link
                      className={styles["last-page"]}
                      title="Last page"
                      href="#">
                      ››
                    </Link>
                  </div>
                </div>
                <div className={styles.clear}></div>

                {/* đánh giá start */}
                <div className={styles.evaluateCat}>
                  <div className={`${styles.ratingArea} ${styles.cls}`}>
                    <span id="ratings">
                      <i
                        className={` ${styles.starOn}`}
                        id="rate_1"
                        value="1"></i>
                      <i
                        className={` ${styles.starOn}`}
                        id="rate_2"
                        value="2"></i>
                      <i
                        className={` ${styles.starOn}`}
                        id="rate_3"
                        value="3"></i>
                      <i
                        className={` ${styles.starOff}`}
                        id="rate_4"
                        value="4"></i>
                      <i
                        className={` ${styles.starOff}`}
                        id="rate_5"
                        value="5"></i>
                    </span>
                    <span className={styles.ratingNote}>
                      Nhấn vào đây để đánh giá
                    </span>
                  </div>
                </div>

                <div className={styles.clear}></div>
                <div
                  className={`${styles.aq_relates} ${styles.content_li}`}></div>
              </div>
            </div>
            {/* end đồng hồ báo thức   */}
            <div className={styles.clear}></div>
          </div>
        </div>
      </div>
    </>
  );
}
