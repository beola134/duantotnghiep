"use client";
import styles from "./donghotreotuong.module.css";
import classNames from "classnames/bind";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function DongHoTreoTuong() {
  const cx = classNames.bind(styles);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/product/category/14257815-7fd6-41ac-9cd1-6a5d54f0eaa4");
      const data = await response.json();
      setProduct(data.products);
    };

    fetchData();
  }, []);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  console.log("PROcate", products);
  return (
    <>
      <div className={cx("container-header")}>
        <div id="main-container" className={cx("mt20")}>
          <div className={cx("main-column")}>
            <div className={cx("center-1col")}>
              <div className={cx("banner-cat-manuf")}>
                <img src="/image/banner/banner-donghotreotuong.jpg" alt="" />
              </div>
              <div className={cx("clear")} />
              <div className={cx("hiden")}>
                <div className={cx("clear")} />
                <div className={cx("block-product-filter", "cls")}>
                  <div className={cx("field-area", "field-item")}>
                    <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-loai">
                      Loại
                    </div>
                    <div
                      id="loai"
                      className={cx("field-label", "filters-in-field", "filters-in-field-0-column", "filter-4-loai")}
                    >
                      <span className={cx("close")}>x</span>
                      <div className={cx("filters-in-field-inner", "cls")}>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Quả Lắc">
                            Quả Lắc
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item2 */}
                  <div className={cx("field-area", "field-item")}>
                    <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-manufactory">
                      Thương hiệu
                    </div>
                    <div
                      id="manufactory"
                      className={cx(
                        "field-label",
                        "filters-in-field",
                        "filters-in-field-0-column",
                        "filter-4-manufactory"
                      )}
                    >
                      <span className={cx("close")}>x</span>
                      <div className={cx("filters-in-field-inner", "cls")}>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="SEIKO">
                            SEIKO
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="RHYTHM">
                            RHYTHM
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item3 */}
                  <div className={cx("field-area", "field-item")}>
                    <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-price">
                      Mức giá
                    </div>
                    <div
                      id="price"
                      className={cx("field-label", "filters-in-field", "filters-in-field-0-column", "filter-4-price")}
                    >
                      <span className={cx("close")}>x</span>
                      <div className={cx("filters-in-field-inner", "cls")}>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Dưới 2 triệu">
                            Dưới 2 triệu
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Từ 2 triệu đến 5 triệu">
                            Từ 2 triệu đến 5 triệu
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Trên 5 triệu">
                            Trên 5 triệu
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* item4: Vỏ máy */}
                  <div className={cx("field-area", "field-item")}>
                    <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-vo-may">
                      Vỏ máy
                    </div>
                    <div
                      id="vo-may"
                      className={cx("field-label", "filters-in-field", "filters-in-field-0-column", "filter-4-vo-may")}
                    >
                      <span className={cx("close")}>x</span>
                      <div className={cx("filters-in-field-inner", "cls")}>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Thủy Tinh">
                            Thủy Tinh
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Nhựa">
                            Nhựa
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Gỗ">
                            Gỗ
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item5 */}
                  <div className={cx("field-area", "field-item")}>
                    <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-kieu-dang">
                      Kiểu dáng
                    </div>
                    <div
                      id="kieu-dang"
                      className={cx(
                        "field-label",
                        "filters-in-field",
                        "filters-in-field-0-column",
                        "filter-4-kieu-dang"
                      )}
                    >
                      <span className={cx("close")}>x</span>
                      <div className={cx("filters-in-field-inner", "cls")}>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Mặt vuông">
                            Mặt vuông
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Mặt tròn">
                            Mặt tròn
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Mặt chữ nhật">
                            Mặt chữ nhật
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Mặt Oval">
                            Mặt Oval
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* item6: Màu mặt */}
                  <div className={cx("field-area", "field-item")}>
                    <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-mau-mat">
                      Màu mặt
                    </div>
                    <div
                      id="mau-mat"
                      className={cx("field-label", "filters-in-field", "filters-in-field-1-column", "filter-4-mau-mat")}
                    >
                      <span className={cx("close")}>x</span>
                      <div className={cx("filters-in-field-inner", "cls")}>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Trắng">
                            Trắng
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Đen">
                            Đen
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Xanh lam">
                            Xanh lam
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Vàng">
                            Vàng
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Đỏ">
                            Đỏ
                          </a>
                        </div>
                        <div className={cx("cls", "item")}>
                          <a rel="nofollow" href="#" title="Nâu">
                            Nâu
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* container */}
              <div className={cx("container")}>
                <div className={cx("clear")} />
                <div className={cx("all-summary")}>
                  <div className={cx("summary-content-filter", "description")}>
                    <p>
                      <a href="#">
                        <em>
                          <strong>Đồng hồ treo tường</strong>
                        </em>
                      </a>
                      &nbsp;được coi là một món đồ nội thất trang trí&nbsp;tuyệt vời, biến mỗi không gian sống trở nên
                      ấm ấp, sinh động, tươi vui hoặc theo bất kỳ phong cách nào mà bạn muốn. Dù bạn có là người kỹ tính
                      luôn yêu cầu mọi thứ phải cầu toàn đi chăng nữa thì thế giới phong phú của
                      <em>
                        <strong>
                          <a href="#"> đồng hồ treo tường&nbsp;trang trí </a>&nbsp;&nbsp;
                        </strong>
                      </em>
                      tại
                      <em>
                        <strong> Duy Anh Watch</strong>{" "}
                      </em>
                      &nbsp;với đầy đủ các thiết kế, kiểu dáng, kích thước, màu sắc...đều sẽ khiến bạn hài lòng.
                    </p>
                  </div>
                  <div className={cx("view-more")}>Xem thêm</div>
                </div>
                <div className={cx("clear")} />
                <div className={cx("products-cat")}>
                  <div className={cx("block-products-filter")}>
                    <div className={cx("block-product-filter", "cls")}>
                      {/* block - menu-ngang */}
                      {/* item1 */}
                      <div className={cx("field-area", "field-item")}>
                        <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-loai">
                          Loại
                        </div>
                        <div
                          id="loai"
                          className={cx(
                            "field-label",
                            "filters-in-field",
                            "filters-in-field-0-column",
                            "filter-4-loai"
                          )}
                        >
                          <span className={cx("close")}>x</span>
                          <div className={cx("filters-in-field-inner", "cls")}>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Quả Lắc">
                                Quả Lắc
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* item2 */}
                      <div className={cx("field-area", "field-item")}>
                        <div
                          className={cx("field-name", "normal", "field", "field-opened")}
                          data-id="id-field-manufactory"
                        >
                          Thương hiệu
                        </div>
                        <div
                          id="manufactory"
                          className={cx(
                            "field-label",
                            "filters-in-field",
                            "filters-in-field-0-column",
                            "filter-4-manufactory"
                          )}
                        >
                          <span className={cx("close")}>x</span>
                          <div className={cx("filters-in-field-inner", "cls")}>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="SEIKO">
                                SEIKO
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="RHYTHM">
                                RHYTHM
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* item3 */}
                      <div className={cx("field-area", "field-item")}>
                        <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-price">
                          Mức giá
                        </div>
                        <div
                          id="price"
                          className={cx(
                            "field-label",
                            "filters-in-field",
                            "filters-in-field-0-column",
                            "filter-4-price"
                          )}
                        >
                          <span className={cx("close")}>x</span>
                          <div className={cx("filters-in-field-inner", "cls")}>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Dưới 2 triệu">
                                Dưới 2 triệu
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Từ 2 triệu đến 5 triệu">
                                Từ 2 triệu đến 5 triệu
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Trên 5 triệu">
                                Trên 5 triệu
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* item4 */}
                      <div className={cx("field-area", "field-item")}>
                        <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-vo-may">
                          Vỏ máy
                        </div>
                        <div
                          id="vo-may"
                          className={cx(
                            "field-label",
                            "filters-in-field",
                            "filters-in-field-0-column",
                            "filter-4-vo-may"
                          )}
                        >
                          <span className={cx("close")}>x</span>
                          <div className={cx("filters-in-field-inner", "cls")}>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Thủy Tinh">
                                Thủy Tinh
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Nhựa">
                                Nhựa
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Gỗ">
                                Gỗ
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* item5 */}
                      <div className={cx("field-area", "field-item")}>
                        <div
                          className={cx("field-name", "normal", "field", "field-opened")}
                          data-id="id-field-kieu-dang"
                        >
                          Kiểu dáng
                        </div>
                        <div
                          id="kieu-dang"
                          className={cx(
                            "field-label",
                            "filters-in-field",
                            "filters-in-field-0-column",
                            "filter-4-kieu-dang"
                          )}
                        >
                          <span className={cx("close")}>x</span>
                          <div className={cx("filters-in-field-inner", "cls")}>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Mặt vuông">
                                Mặt vuông
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Mặt tròn">
                                Mặt tròn
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Mặt chữ nhật">
                                Mặt chữ nhật
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Mặt Oval">
                                Mặt Oval
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* item6 */}
                      <div className={cx("field-area", "field-item")}>
                        <div className={cx("field-name", "normal", "field", "field-opened")} data-id="id-field-mau-mat">
                          Màu mặt
                        </div>
                        <div
                          id="mau-mat"
                          className={cx(
                            "field-label",
                            "filters-in-field",
                            "filters-in-field-1-column",
                            "filter-4-mau-mat"
                          )}
                        >
                          <span className={cx("close")}>x</span>
                          <div className={cx("filters-in-field-inner", "cls")}>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Trắng">
                                Trắng
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Đen">
                                Đen
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Xanh lam">
                                Xanh lam
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Vàng">
                                Vàng
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Đỏ">
                                Đỏ
                              </a>
                            </div>
                            <div className={cx("cls", "item")}>
                              <a rel="nofollow" href="#" title="Nâu">
                                Nâu
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={cx("field-title")}>
                    <div className={cx("title-name")}>
                      <div className={cx("cat-title")}>
                        <div className={cx("cat-title-main")} id="cat-dong-ho">
                          <div className={cx("title-icon")}>
                            <h1>Đồng hồ treo tường</h1>
                          </div>
                        </div>
                        <div className={cx("clear")} />
                      </div>
                    </div>
                    <select className={cx("order-select")} name="order-select">
                      <option value="">Sắp xếp theo</option>
                      <option value="#">Bán chạy nhất</option>
                      <option value="#">Khuyễn mãi</option>
                      <option value="#">Giá từ thấp tới cao</option>
                      <option value="#">Giá từ cao tới thấp</option>
                      <option value="#">Mới nhất</option>
                      <option value="#">Xem nhiều</option>
                      <option value="#">Sản phẩm hot</option>
                    </select>
                    <div className={cx("clear")} />
                  </div>
                  {/*  */}
                  <div className={cx("clear")} />
                  {/* product-đồng hồ nam */}
                  <section className={cx("products-cat-frame")}>
                    <div className={cx("products-cat-frame-inner")}>
                      <div className={cx("product-grid", "cls")}>
                        {products.map((item) => (
                          <div className={cx("item")}>
                            <Link href={`/components/product-detail/${item._id}`}>
                              <div className={cx("frame-inner")}>
                                <figure className={cx("product-image")}>
                                  <img
                                    src={`http://localhost:5000/images/${item.hinh_anh}`}
                                    alt={item.ten_san_pham}
                                    width={300}
                                    height={363}
                                    style={{ display: "inline-block", opacity: 1 }}
                                  />
                                </figure>
                                <h3>
                                  <a className={cx("name")} title={item.ten_san_pham}>
                                    <span className={cx("cat-name")}>{item.ten_san_pham}</span>
                                    {item.ma_san_pham}
                                  </a>
                                </h3>
                                <span className={cx("loai-may")}>{item.loai} </span>
                                <span className={cx("row-lm")}>|</span>
                                <span className={cx("duong-kinh")}>{item.duong_kinh}</span>
                                <div className={cx("price-arae")}>
                                  <div className={cx("price-current")}>{formatCurrency(item.gia_san_pham)}</div>
                                </div>
                                <div className={cx("clear")} />
                              </div>
                              <div className={cx("clear")} />
                            </Link>
                          </div>
                        ))}

                        {products.map((item) => (
                          <div className={cx("item")}>
                            <div className={cx("frame-inner")}>
                              <figure className={cx("product-image")}>
                                <Link href={`/components/product-detail/${item._id}`}>
                                  <img
                                    src={`http://localhost:5000/images/${item.hinh_anh}`}
                                    alt={item.ten_san_pham}
                                    width={300}
                                    height={363}
                                    style={{ display: "inline-block", opacity: 1 }}
                                  />
                                </Link>
                              </figure>
                              <h3>
                                <a className={cx("name")} href="#" title="Đồng hồ treo tường Rhythm CMG620NR04">
                                  <span className={cx("cat-name")}>{item.ten_san_pham}</span>
                                  {item.ma_san_pham}
                                </a>
                              </h3>
                              <span className={cx("loai-may")}>{item.loai} </span>
                              <span className={cx("row-lm")}>|</span>
                              <span className={cx("duong-kinh")}>{item.duong_kinh}</span>
                              <div className={cx("price-arae")}>
                                <div className={cx("price-current")}>{formatCurrency(item.gia_san_pham)}</div>
                              </div>
                              <div className={cx("clear")} />
                            </div>
                            <div className={cx("clear")} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                  {/* phân trang */}
                  <div className={cx("pagination")}>
                    <span title="Page 1" className={cx("current")}>
                      <span>1</span>
                    </span>
                    <a className={cx("other-page")} title="Page 2" href="#">
                      <span>2</span>
                    </a>
                    <a className={cx("other-page")} title="Page 3" href="#">
                      <span>3</span>
                    </a>
                    <a className={cx("other-page")} title="Page 4" href="#">
                      <span>4</span>
                    </a>
                    <b>...</b>
                    <a className={cx("next-page")} title="Next page" href="#">
                      ›
                    </a>
                    <a className={cx("last-page")} title="Last page" href="#">
                      ››
                    </a>
                  </div>
                </div>
                <div className={cx("clear")} />
                {/* đánh giá  */}
                <div className={cx("evaluate-cat")}>
                  <div className={cx("rating-area", "cls")}>
                    <span id="ratings" className={cx("cls")}>
                      <i className={cx("icon_v1", "star_on")} id="rate_1" value={1} />
                      <i className={cx("icon_v1", "star_on")} id="rate_2" value={2} />
                      <i className={cx("icon_v1", "star_on")} id="rate_3" value={3} />
                      <i className={cx("icon_v1", "star_off")} id="rate_4" value={4} />
                      <i className={cx("icon_v1", "star_off")} id="rate_5" value={5} />
                    </span>
                    <span className={cx("rating-note")}>Nhấn vào đây để đánh giá</span>
                  </div>

                  {/* mô tả */}
                  <div className={cx("summary-content-cat", "description", "height-auto")}>
                    <h2 dir="ltr" style={{ textAlign: "center" }}>
                      <span style={{ color: "#2980b9" }}>
                        <strong>NÂNG CẤP&nbsp;KHÔNG GIAN SỐNG&nbsp;CỦA BẠN VỚI ĐỒNG HỒ TREO TƯỜNG TRANG TRÍ</strong>
                      </span>
                    </h2>
                    <p dir="ltr" style={{ textAlign: "justify" }}>
                      &nbsp;
                    </p>
                    <p dir="ltr" style={{ textAlign: "justify" }}>
                      Bạn đã bao giờ nghĩ đến trước khi đồng hồ được phát minh, người xưa đã theo dõi thời gian nhờ
                      chuyển động của mặt trời như thế nào chưa. Đồng hồ giúp chúng ta quản lý cuộc sống của mình.
                      <strong>
                        <em>Đồng hồ treo tường</em>
                      </strong>
                      &nbsp;là một vật dụng quan trọng trong gia đình&nbsp;giúp bạn luôn đúng giờ, đến đúng nơi, đúng
                      lúc để có được thành công trong cuộc sống.
                    </p>
                    <div style={{ textAlign: "center" }}>
                      <figure className={cx("image")} style={{ display: "inline-block" }}>
                        <img
                          alt="Đồng hồ treo tường Seiko"
                          height={734}
                          className={cx("lazy")}
                          width={1100}
                          style={{ display: "inline-block", opacity: 1 }}
                          src="/image/item/donghotreotuong-hinh1.jpg"
                        />
                        <figcaption>
                          <strong>
                            <a href="#">Đồng hồ treo tường Seiko </a>
                          </strong>
                        </figcaption>
                      </figure>
                    </div>
                    <p dir="ltr" style={{ textAlign: "justify" }}>
                      Nếu muốn cạnh tranh với thế giới ngày nay để thành công, điều rất quan trọng là phải biết ảnh
                      hưởng của thời gian đối với cuộc sống của chúng ta. Để coi trọng thời gian, bạn nên đúng giờ, bạn
                      cần có
                      <em>
                        <strong>đồng hồ treo tường</strong>
                      </em>{" "}
                      xung quanh mình. Và thực sự với một hoặc nhiều chiếc đồng hồ treo tường hiện diện trong không gian
                      sống của bạn nó sẽ khiến bạn và gia đình mình kiểm soát được thời gian trong mọi hoạt động của
                      cuộc sống, góp phần cải thiện chất lượng sống của mình.
                    </p>
                    <div style={{ textAlign: "center" }}>
                      <figure className={cx("image")} style={{ display: "inline-block" }}>
                        <img
                          alt="đồng hồ treo tường Seiko"
                          height={734}
                          className={cx("lazy")}
                          width={1100}
                          style={{ display: "inline-block", opacity: 1 }}
                          src="/image/item/donghotreotuong-hinh2.jpg"
                        />
                        <figcaption>
                          <strong>Đồng hồ treo tường Seiko</strong>
                        </figcaption>
                      </figure>
                    </div>
                    <p dir="ltr" style={{ textAlign: "justify" }}>
                      <a href="#">
                        <em>
                          <strong>Đồng hồ treo tường sang trọng</strong>
                        </em>
                      </a>
                      &nbsp;không chỉ giúp bạn nhìn thấy đúng thời điểm và nó cũng là một phần trang trí rất tuyệt vời
                      cho ngôi nhà, văn phòng làm việc hay bất cứ không gian nào khác. Bên cạnh đó, lựa chọn
                      <em>
                        <strong>
                          <a href="#">đồng hồ treo tường</a>
                        </strong>
                        <a href="#">
                          <strong>&nbsp;đẹp</strong>
                        </a>
                      </em>
                      &nbsp;là một trong những ưu tiên hàng đầu khi nghĩ đến thiết kế nội thất trong căn nhà của bạn.
                      Một không gian sống hiện đại được hưởng lợi từ những đường nét tinh tế trên những chiếc&nbsp;
                      <strong>
                        <a href="#">
                          <em>đồng hồ treo tường cao cấp</em>
                        </a>
                      </strong>
                      sẽ khiến bạn và người thân của mình hoàn toàn hài lòng với chúng.
                    </p>
                    <div style={{ textAlign: "center" }}>
                      <figure className={cx("image")} style={{ display: "inline-block" }}>
                        <img
                          alt="Đồng hồ treo tường Seiko"
                          height={734}
                          className={cx("lazy")}
                          width={1100}
                          style={{ display: "inline-block", opacity: 1 }}
                          src="/public/img/item/donghotreotuong-hinh3.jpg"
                        />
                        <figcaption>
                          <strong>Đồng hồ treo tường Seiko</strong>
                        </figcaption>
                      </figure>
                    </div>
                    <p dir="ltr" style={{ textAlign: "justify" }}>
                      &nbsp;
                    </p>
                    <p dir="ltr" style={{ textAlign: "justify" }}>
                      Cho dù bạn đang tìm kiếm một chiếc
                      <a href="#">
                        <em>
                          <strong>đồng hồ treo tường đẹp</strong>
                        </em>
                      </a>
                      &nbsp;theo phong cách cổ điển hay sang trọng và tinh tế,
                      <strong>
                        <a href="#">Đồng hồ Duy Anh</a>
                      </strong>{" "}
                      có hơn&nbsp;800+ mẫu cho bạn lựa chọn đến từ thương hiệu
                      <em>
                        <strong>
                          <a href="#"> đồng hồ treo tường&nbsp;Seiko </a>
                        </strong>
                      </em>
                      và
                      <em>
                        <strong>
                          <a href="#"> đồng hồ treo tường&nbsp;Rhythm </a>
                        </strong>
                      </em>
                      , với nhiều kiểu dáng và mức giá khác nhau…
                    </p>
                    <p dir="ltr" style={{ textAlign: "justify" }}>
                      &nbsp;
                    </p>
                    <p dir="ltr" style={{ textAlign: "justify" }}>
                      <em>
                        <strong>Các thông tin tham khảo thêm</strong>
                      </em>
                    </p>
                    <ul dir="ltr">
                      <li>
                        <a href="#">ĐỊA CHỈ BÁN ĐỒNG HỒ TREO TƯỜNG UY TÍN TẠI HÀ NỘI</a>
                      </li>
                      <li style={{ textAlign: "justify" }}>
                        <a href="#">HƯỚNG DẪN LỰA CHỌN ĐỒNG HỒ TREO TƯỜNG CHO NGÔI NHÀ CỦA BẠN</a>
                      </li>
                      <li style={{ textAlign: "justify" }}>
                        <a href="#">TOP CÁC MẪU ĐỒNG HỒ TREO TƯỜNG&nbsp;TRANG TRÍ PHÒNG KHÁCH ĐẸP</a>
                      </li>
                      <li style={{ textAlign: "justify" }}>
                        <a href="#">HỆ THỐNG CỬA HÀNG CỦA DUY ANH</a>
                      </li>
                    </ul>
                    <p>&nbsp;</p>
                    <p>
                      <span style={{ color: "#2980b9" }}>
                        <em>
                          <strong>DUY ANH WATCH</strong> luôn&nbsp;mang đến cho khách hàng những chiếc
                          <strong>đồng hồ treo tường đẹp</strong>&nbsp;đáp ứng hoàn hảo&nbsp;cho cuộc&nbsp;sống
                          hiện&nbsp;đại, thể hiện nét thẩm mỹ tối giản và thêm sức hấp dẫn trực quan cho không gian sống
                          của mình.
                        </em>
                      </span>
                    </p>
                    <p>&nbsp;</p>
                    <hr />
                    <p dir="ltr">
                      <strong>
                        <em>Hệ thống&nbsp;mạng xã hội của Đồng hồ Duy Anh (Duy Anh Watch)</em>
                      </strong>
                    </p>
                    <ul>
                      <li>
                        Facebook:&nbsp;
                        <a href="#">https://www.facebook.com/donghoduyanh.vn/</a>
                      </li>
                      <li>
                        Instagram:&nbsp;
                        <a href="#">https://www.instagram.com/donghoduyanh_official/</a>
                      </li>
                    </ul>
                    <hr />
                    <p>&nbsp;</p>
                  </div>
                </div>
                {/* xem thêm */}
                <div className={cx("vm-summary-content-cat")}>
                  <span>Xem thêm</span>
                </div>
                <div className={cx("clear")} />
                <div className={cx("aq-relates content-li")} />
              </div>
            </div>
            {/* end - đồng hồ nam */}
            <div className={cx("clear")} />
          </div>
        </div>
      </div>
    </>
  );
}
