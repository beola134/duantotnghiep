import Product from "../product/page";
import Link from "next/link";
import styles from "../donghonu/donghonu.module.css";
export default async function TrangsucCK() {
  const sp2 = await fetch(
    `http://localhost:5000/product/category/loai/8f42f090-d363-4ba3-ac77-d9936133b670`
  );
  const data2 = await sp2.json();
  console.log(data2);
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
                  {/*Menu-Trang sức CALVIN KLEIN */}
                  <div className={styles["field-title"]}>
                    <div className={styles["title-name"]}>
                      <div className={styles["cat-title"]}>
                        <div
                          className={styles["cat-title-main"]}
                          id="cat-dong-ho">
                          <div className={styles["title-icon"]}>
                            <h1>Trang sức CALVIN KLEIN</h1>
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
                        <Product data={data2.products}></Product>
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
