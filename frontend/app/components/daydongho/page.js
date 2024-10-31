"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./daydongho.module.css";
import Loading from "../loading/page";

export default function Daydongho() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("Dây đồng hồ"); // Tiêu đề danh mục
  const [selectedFilter, setSelectedFilter] = useState([]); // Lưu trữ các bộ lọc đã chọn
  const [sortOption, setSortOption] = useState(""); // Tuỳ chọn sắp xếp (tăng/giảm dần)
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1);

  const [filter, setFilter] = useState({
    size_day: "",
    mau_day: "",
    thuong_hieu: "",
    chat_lieu_day: "",
    danh_muc: "",
  });

  // 1. Hàm gọi API để lấy danh sách sản phẩm dựa vào bộ lọc và phân trang
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({ ...filter, page: currentPage });
      const response = await fetch(
        `http://localhost:5000/product/filterDayDongHo?${queryParams}`
      );
      if (!response.ok) {
        throw new Error("Lỗi không thể tải dữ liệu");
      }
      const data = await response.json();
      setProducts(data.products); // Cập nhật danh sách sản phẩm
      setTotalPages(data.totalPages); // Cập nhật tổng số trang
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Gọi lại API khi bộ lọc hoặc trang hiện tại thay đổi
  useEffect(() => {
    fetchProducts();
  }, [filter, currentPage]);
  // 3. Hàm chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts();
  };
   // 4. Hàm cập nhật bộ lọc khi chọn mới
  const handleFilterChange = (filterType, value) => {
    const newFilters = [...selectedFilter];
    const newFilter = { ...filter, [filterType]: value };

    // Cập nhật hoặc thêm bộ lọc vào danh sách đã chọn
    const filterIndex = newFilters.findIndex((filter) => filter.startsWith(`${filterType}=`));
    if (filterIndex !== -1) {
      newFilters[filterIndex] = `${filterType}=${value}`;
    } else {
      newFilters.push(`${filterType}=${value}`);
    }
    // Cập nhật trạng thái bộ lọc
    setSelectedFilter(newFilters);
    setFilter(newFilter);

    // Đặt lại danh mục khi chọn một danh mục khác
    if (filterType === "danh_muc") {
      setCategoryName(value);
    }
  };
// 5. Hàm xóa tất cả bộ lọc và đặt lại về trạng thái ban đầu
const handleClearFilters = () => {
  setSelectedFilter([]);
  setFilter({
    danh_muc: "Dây đồng hồ",
  });
  setCurrentPage(1);
  setCategoryName("Dây đồng hồ");
  fetchProducts();
};
// 6. Hàm xóa một bộ lọc cụ thể
const handleRemoveFilter = (filterToRemove) => {
  // Loại bỏ bộ lọc cụ thể khỏi selectedFilter
  const newFilters = selectedFilter.filter((filter) => filter !== filterToRemove);

  // Cập nhật filter dựa trên các bộ lọc còn lại
  const [filterType] = filterToRemove.split("=");
  const updatedFilter = { ...filter, [filterType]: "" }; // Xóa giá trị của bộ lọc bị xoá

  // Nếu xoá danh mục (brand), đặt lại tiêu đề về đồng hồ nam
  if (filterType === "danh_muc") {
    setCategoryName("Dây đồng hồ");
  }
  setSelectedFilter(newFilters);
  setFilter(updatedFilter);
  fetchProducts();
};
// 7. Hàm sắp xếp sản phẩm theo giá
const sortProducts = (products) => {
  if (sortOption === "asc") {
    return [...products].sort((a, b) => a.gia_san_pham - b.gia_san_pham); // Giá từ thấp đến cao
  } else if (sortOption === "desc") {
    return [...products].sort((a, b) => b.gia_san_pham - a.gia_san_pham); // Giá từ cao đến thấp
  }
  return products; // Trả về danh sách gốc nếu không sắp xếp
};
// 8. Cập nhật tuỳ chọn sắp xếp
const handleSortChange = (e) => {
  setSortOption(e.target.value);
};

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }
  const displayedProducts = sortProducts(products); // sắp xếp sản phẩm trước khi hiển thị
  return (
    <>
      <div className={styles["container-header"]}>
        <div id="main-container" className={styles["mt20"]}>
          <div className={styles["main-column"]}>
            <div className={styles["center-1col"]}>
              <div className={styles.clear}></div>

              {/* container */}
              <div className={styles.container}>
                <div className={styles.clear}></div>
                <div className={styles["all-summary"]}>
                  <div
                    className={`${styles["summary-content-filter"]} ${styles.description}`}
                  >
                    <div className={styles["banner-cat-manuf"]}>
                      <img src="/image/item/banner-daydongho.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div className={styles.clear}></div>
                {selectedFilter.length > 0 && (
                  <div className={styles.choosedfilter}>
                    {selectedFilter.map((filter, index) => (
                      <Link key={index} rel="nofollow" href="#" onClick={() => handleRemoveFilter(filter)}>
                        {filter.split("=")[1]} {/*Hiển thị các bộ lọc đã chọn*/}
                      </Link>
                    ))}
                    <Link rel="nofollow" className={styles.reset} href="#" onClick={handleClearFilters}>
                      Xoá hết
                    </Link>
                  </div>
                )}
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
                              <Link rel="nofollow" href="#" title="Size 26-24mm" onClick={() => handleFilterChange("size_day", "Size 26-24mm")}>
                              Kích thước 26-24mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 26-22mm" onClick={() => handleFilterChange("size_day", "Size 26-22mm")}>
                                Kích thước 26-22mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 24-22mm" onClick={() => handleFilterChange("size_day", "Size 24-22mm")}>
                                Kích thước 24-22mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 24-20mm" onClick={() => handleFilterChange("size_day", "Size 24-20mm")}>
                                Kích thước 24-20mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 22-20mm" onClick={() => handleFilterChange("size_day", "Size 22-20mm")}>
                                Kích thước 22-20mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 21-18mm" onClick={() => handleFilterChange("size_day", "Size 21-18mm")}>
                                Kích thước 21-18mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 20-18mm" onClick={() => handleFilterChange("size_day", "Size 20-18mm")}>
                                Kích thước 20-18mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 19-18mm" onClick={() => handleFilterChange("size_day", "Size 19-18mm")}>
                                Kích thước 19-18mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 18-16mm" onClick={() => handleFilterChange("size_day", "Size 18-16mm")}>
                                Kích thước 18-16mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 16-14mm" onClick={() => handleFilterChange("size_day", "Size 16-14mm")}>
                                Kích thước 16-14mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 14-12mm" onClick={() => handleFilterChange("size_day", "Size 14-12mm")}>
                                Kích thước 14-12mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Size 12-10mm" onClick={() => handleFilterChange("size_day", "Size 12-10mm")}>
                                Kích thước 12-10mm
                              </Link>
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
                              <Link rel="nofollow" href="#" title="Nâu (Brown)" onClick={() => handleFilterChange("mau_day", "Nâu (Brown)")}>
                                Nâu (Brown)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Nâu (Tan)" onClick={() => handleFilterChange("mau_day", "Nâu (Tan)")}>
                                Nâu (Tan)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Xanh (Green)" onClick={() => handleFilterChange("mau_day", "Xanh (Green)")}>
                                Xanh (Green)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Xanh (Navy)" onClick={() => handleFilterChange("mau_day", "Xanh (Navy)")}>
                                Xanh (Navy)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Đen" onClick={() => handleFilterChange("mau_day", "Đen")}>
                                Đen
                              </Link>
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
                              <Link rel="nofollow" href="#" title="ZRC-Rochet" onClick={() => handleFilterChange("thuong_hieu", "ZRC-Rochet")}>
                                ZRC-Rochet
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Longines" onClick={() => handleFilterChange("thuong_hieu", "Longines")}>
                                Longines
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Seiko" onClick={() => handleFilterChange("thuong_hieu", "Seiko")}>
                                Seiko
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Tissot" onClick={() => handleFilterChange("thuong_hieu", "Tissot")}>
                                Tissot
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Daniel Wellington"
                              onClick={() => handleFilterChange("thuong_hieu", "Daniel Wellington")}>
                                Daniel Wellington
                              </Link>
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
                              <Link rel="nofollow" href="#" title="Dây cao su" onClick={() => handleFilterChange("chat_lieu_day", "Dây cao su")}>
                                Dây cao su
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Dây da" onClick={() => handleFilterChange("chat_lieu_day", "Dây da")}>
                                Dây da
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Dây Silicone" onClick={() => handleFilterChange("chat_lieu_day", "Dây Silicone")}>
                                Dây Silicone
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Dây dù" onClick={() => handleFilterChange("chat_lieu_day", "Dây dù")}>
                                Dây dù
                              </Link>
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

                    <select className={styles["order-select"]} name="order-select" onChange={handleSortChange}>
                      <option value="">Sắp xếp theo</option>
                      <option value="asc">Giá từ thấp tới cao</option>
                      <option value="desc">Giá từ cao tới thấp</option>
                      <option value="newest">Mới nhất</option>
                      <option value="hot">Sản phẩm hot</option>
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
                          {displayedProducts.map((product) => {
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
                    {/* Prev trang đâù */}
                    <span
                      title="First page"
                      className={
                        currentPage === 1
                          ? styles.disabled
                          : styles["other-page"]
                      }
                      onClick={() => currentPage > 1 && handlePageChange(1)}
                    >
                      ‹‹
                    </span>
                    {/* Prev 1 trang */}
                    <span
                      className={
                        currentPage === 1
                          ? styles.disabled
                          : styles["other-page"]
                      }
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                    >
                      ‹
                    </span>
                    {/* Trang hiện tại */}
                    <span
                      className={styles.currentPage}
                    >{`Trang ${currentPage} / ${totalPages || 1}`}</span>
                    {/* Next 1 trang*/}
                    <span
                      className={
                        currentPage === totalPages
                          ? styles.disabled
                          : styles["other-page"]
                      }
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                    >
                      ›
                    </span>
                    {/* Next tới trang cuối */}
                    <span
                      className={
                        currentPage === totalPages
                          ? styles.disabled
                          : styles["other-page"]
                      }
                      onClick={() =>
                        currentPage < totalPages && handlePageChange(totalPages)
                      }
                    >
                      ››
                    </span>
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
