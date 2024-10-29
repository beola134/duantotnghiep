"use client";
import { useEffect, useState } from "react";
import styles from "./detail.module.css";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSilce";
import Loading from "../../loading/page";
import Swal from "sweetalert2";

export default function Detail({ params }) {
  const [product, setProducts] = useState(null);
  const [cate, setCate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/chitietsp/${params.id}`);
        if (!response.ok) {
          throw new Error("Lỗi không thể tải dữ liệu");
        }
        const data = await response.json();
        setProducts(data.product);
        setCate(data.cate);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [params]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }
  return (
    <>
      {/* FrameLeft */}
      <div className={`${styles.topProductDetail} ${styles.container}  ${styles.cls}`}>
        <div className={styles.frameLeft}>
          <div className={styles.discountPro}>
            -<span id="discount-pro">10</span>
            <span>%</span>
          </div>
          <div
            style={{
              position: "relative",
              left: "0px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <img
              className={`${styles.imgResponsive} ${styles.bkProductImage}`}
              src={`http://localhost:5000/images/${product.hinh_anh}`}
              alt={product.ten}
              width="398"
              height="481"
            />
          </div>
          <div className={styles.thumbs}>
            <div className={styles.listItem}>
              {/* <div className={styles.item} style={{ maxWidth: "calc(100% / 5 -10px)" }}>
                <img src="/image/item/picture1.jpg" alt="" />
                <span>Ảnh thực tế</span>
              </div> */}
              <div className={styles.item} style={{ maxWidth: "calc(100% / 5 -10px)" }}>
                <img src="/image/item/picture2.jpg" alt="" />
                <span>Video thực tế</span>
              </div>
              <div className={styles.item} style={{ maxWidth: "calc(100% / 5 -10px)" }}>
                <img src="/image/item/picture3.jpg" alt="" />
                <span>Thông tin sản phẩm</span>
              </div>
              <div className={styles.item} style={{ maxWidth: "calc(100% / 5 -10px)" }}>
                <img src="/image/item/picture4.jpg" alt="" />
                <span>Phân biệt thật giả</span>
              </div>
              <div className={styles.item} style={{ maxWidth: "calc(100% / 5 -10px)" }}>
                <img src="/image/item/picture5.jpg" alt="" />
                <span>Hướng dẫn chọn size</span>
              </div>
            </div>
          </div>
          <div className={styles.slideFT}></div>
          <div className={styles.hitShare}>
            {/* <!-- Facebook Like Button --> */}
            <div
              className="fb-like"
              data-href="https://www.yourwebsite.com"
              data-width="250"
              data-layout="button"
              data-action="like"
              data-size="small"
              data-share="false"
            ></div>
            {/* <!-- Facebook Share Button --> */}
            <div
              className="fb-share-button"
              data-href="https://www.yourwebsite.com"
              data-width="250"
              data-layout="button"
            ></div>
          </div>
        </div>
        {/* frame center */}
        <div className={styles.frameCenter}>
          <div className={`${styles.nameTable} ${styles.mt20}`}>
            <div className={styles.logoManufactory}>
              <img
                className={styles.imageGiftCat}
                src={`http://localhost:5000/images/${cate.hinh_anh}`}
                alt={cate.danh_muc}
              />
            </div>
            <div className={styles.productName}>
              <h1 className={styles.bkProductName}>{product.ten}</h1>
              <div className={`${styles.itemSsMain} ${styles.itemSs} ${styles.itemSs19005}`}>
                <span className={styles.iconSs}></span>
                <span className={styles.txtSs}>So sánh</span>
              </div>
            </div>
            <div className={`${styles.codeManu} ${styles.mt10} ${styles.cf}`}>
              <span className={styles.rateHead}>
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`${styles.starOn} ${styles.star}`}>
                    <i className="fa-solid fa-star"></i>
                  </span>
                ))}
                <span className={styles.hide}>5</span>
                <a className={styles.rateCount} href="" title="Đánh giá sản phẩm này">
                  (<span>1</span> đánh giá)
                </a>
              </span>
            </div>
            <span className={styles.codeProduct}>Mã sản phẩm: {product.ma_san_pham}</span>
            <ul className={styles.infoMainFilter}>
              <li className={styles.cf}>
                <div className={`${styles.liLeft} ${styles.fl}`}>Loại máy</div>
                <span className={styles.fl}>:</span>
                <div className={`${styles.liRight} ${styles.fl}`}>{product.loai_may}</div>
              </li>
              <li className={styles.cf}>
                <div className={`${styles.liLeft} ${styles.fl}`}>Đường kính</div>
                <span className={styles.fl}>:</span>
                <div className={`${styles.liRight} ${styles.fl}`}>{product.duong_kinh}</div>
              </li>
              <li className={`${styles.statusProduct} ${styles.statusProduct11}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 -3.5 170 170">
                  <path d="M142.196 30.4125C142.586 30.0637 142.897 29.6356 143.109 29.1567C143.32 28.6778 143.427 28.1592 143.422 27.6357C143.417 27.1122 143.3 26.5959 143.079 26.1213C142.858 25.6467 142.538 25.2248 142.141 24.8838C141.722 24.5249 141.307 24.1678 140.895 23.8127C137.751 21.1093 134.5 18.3102 131.1 15.9225C105.123 -2.36044 78.1316 -2.4633 50.8803 7.23287C26.2068 16.0055 10.3619 33.5563 3.77909 59.3882C-3.56415 88.249 2.86618 113.71 22.9048 135.073C23.4261 135.625 23.9582 136.177 24.4895 136.704C35.2539 147.469 48.6614 154.115 59.2847 158.739C63.8445 160.731 87.2404 163.149 93.5707 162.206C131.19 156.588 155.946 135.37 164.569 99.8725C166.215 92.9194 167.035 85.7962 167.011 78.6508C166.974 71.1466 165.712 63.6988 163.275 56.6012C163.097 56.0703 162.805 55.5851 162.418 55.1805C162.031 54.7759 161.56 54.4618 161.037 54.2606C160.515 54.0595 159.954 53.9764 159.396 54.0171C158.838 54.0579 158.295 54.2216 157.808 54.4965L157.706 54.5547C156.931 54.9984 156.336 55.7005 156.027 56.5381C155.717 57.3757 155.712 58.2954 156.012 59.1364C158.212 65.2371 159.334 71.674 159.327 78.1592C159.251 85.9394 158.198 93.6792 156.192 101.197C150.248 122.8 136.038 138.545 112.75 149.315C89.0741 160.65 55.1215 149.19 46.0879 143.226C36.1031 136.4 27.3663 127.908 20.2596 118.121C9.11418 102.34 6.61369 79.6587 12.6028 58.9229C15.4055 49.3489 20.3036 40.5185 26.9421 33.0722C33.5806 25.6259 41.793 19.7503 50.9838 15.8714C74.8941 5.93474 98.8852 4.18192 122.285 19.0635C125.422 21.061 133.422 27.3424 137.465 30.5501C138.143 31.0882 138.99 31.3691 139.855 31.3432C140.721 31.3172 141.549 30.986 142.194 30.4082L142.196 30.4125Z"></path>
                  <path d="M74.6287 104.313C76.2312 102.79 77.1115 102.019 77.9173 101.177C103.753 74.1855 132.047 49.8851 160.508 25.7727C161.584 24.8619 162.685 23.7 163.958 23.3737C165.493 22.9815 167.996 23.4326 168.682 24.2661C169.133 24.8821 169.418 25.6035 169.509 26.3612C169.601 27.1189 169.496 27.8875 169.206 28.5932C168.537 30.3474 166.907 31.8498 165.429 33.1629C156.607 41.0019 147.538 48.5708 138.872 56.5716C120.756 73.3024 102.756 90.1576 84.8704 107.137C77.0334 114.561 74.0173 114.862 66.8059 106.929C62.0589 101.705 47.7328 84.0973 43.3455 78.5495C42.7256 77.6872 42.1735 76.7781 41.6941 75.8305C40.7045 74.0756 40.0576 72.1419 42.0246 70.7814C44.2158 69.2662 45.7707 70.8473 47.0696 72.4937C48.384 74.1607 49.5048 75.9916 50.9121 77.5713C55.2811 82.4737 69.908 99.1421 74.6287 104.313Z"></path>
                </svg>
                Sẵn hàng
              </li>
            </ul>
            <div className={styles.boxGift}>
              <div className={styles.titleGift}>Khuyến mãi</div>
              <div className={styles.gift}>
                <p>
                  Giảm
                  <span style={{ color: "#ff0000" }}>
                    <strong>&nbsp;10%</strong>
                  </span>
                  &nbsp;toàn bộ thương hiệu <strong>Tissot</strong> từ <strong>6.8 - 3.9</strong>
                </p>
                <p>
                  Giảm
                  <span style={{ color: "#ff0000" }}>
                    <strong>&nbsp;30%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là đồng hồ&nbsp;
                  <strong>
                    <a href="#" style={{ color: "#3498db" }}>
                      Casio
                    </a>
                    , &nbsp;
                    <a href="#" style={{ color: "#3498db" }}>
                      Calvin Klein
                    </a>
                  </strong>
                </p>
                <p>
                  Giảm
                  <span style={{ color: "#ff0000" }}>
                    <strong>&nbsp;25%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là đồng hồ
                  <strong>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>&nbsp;Claude Bernard</span>
                    </a>
                    <span style={{ color: "#3498db" }}>, </span>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Edox</span>
                    </a>
                    <span style={{ color: "#3498db" }}>,&nbsp;</span>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Titoni</span>
                    </a>
                  </strong>
                </p>

                <p>
                  Giảm
                  <span style={{ color: "#ff0000" }}>
                    <strong>&nbsp;20%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là đồng hồ
                  <strong>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>&nbsp;DW</span>
                    </a>
                    &nbsp;
                    <span style={{ color: "#3498db" }}>, </span>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Olym Pianus</span>
                    </a>
                    <span style={{ color: "#3498db" }}>,&nbsp;</span>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Fossil</span>
                    </a>
                    <span style={{ color: "#3498db" }}>, </span>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Michael Kors</span>
                    </a>
                  </strong>
                </p>

                <p>
                  Giảm
                  <span style={{ color: "#ff0000" }}>
                    <strong>&nbsp;15%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là đồng hồ
                  <strong>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>&nbsp;Hamilton</span>
                    </a>
                    <span style={{ color: "#3498db" }}>, </span>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Mido</span>
                    </a>
                    <span style={{ color: "#3498db" }}>, </span>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Certina</span>
                    </a>
                    <span style={{ color: "#3498db" }}>, </span>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Seiko, </span>
                    </a>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>&nbsp;Đồng hồ nữ Longines,&nbsp;</span>
                    </a>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Đồng hồ nữ Tissot</span>
                    </a>
                  </strong>
                </p>

                <p>
                  Giảm
                  <span style={{ color: "#ff0000" }}>
                    <strong>&nbsp;20%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là
                  <strong>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>&nbsp;Đồng Hồ Treo Tường</span>
                    </a>
                  </strong>
                  <span style={{ color: "#3498db" }}>, </span>
                  <strong>
                    <a href="#">
                      <span style={{ color: "#3498db" }}>Để Bàn</span>
                    </a>
                  </strong>
                  &nbsp;có giá niêm yết từ
                  <span style={{ color: "#ff0000" }}>
                    <strong>&nbsp;2 triệu</strong>
                  </span>
                  &nbsp; trở lên
                </p>

                <p>
                  Tặng ngay 1 trong 2 phần quà sau khi mua đồng hồ cơ <strong>Tissot</strong>&nbsp;(Số lượng có hạn):
                </p>

                <ol>
                  <li>
                    1. Tặng 01 đồng hồ treo tường
                    <a href="#">
                      <span style={{ color: "#3498db" }}>
                        <strong>&nbsp;SEIKO</strong>
                      </span>
                    </a>
                    &nbsp;hoặc
                    <a href="#">
                      <span style={{ color: "#3498db" }}>
                        <strong>&nbsp;RHYTHM&nbsp;</strong>
                      </span>
                    </a>
                    trị giá lên đến <strong>1 triệu đồng.</strong>
                  </li>
                  <li>
                    2.&nbsp;Tặng 01 dây da
                    <a href="#">
                      <span style={{ color: "#3498db" }}>
                        <strong>ZRC</strong>
                      </span>
                    </a>
                    thương hiệu Pháp trị giá lên đến <strong>700.000đ</strong>
                  </li>
                </ol>

                <p>
                  Ưu đãi <strong>MUA 1 TẶNG 1 </strong>tặng đồng hồ đến <strong>10 Triệu&nbsp;</strong>
                  <a href="#">
                    <span style={{ color: "#3498db" }}>(Xem chi tiết tại đây)</span>
                  </a>
                  <span style={{ color: "#3498db" }}>&nbsp;</span>
                </p>
              </div>
            </div>
            <div className={styles.clear}></div>
            <div className={styles.orderFast}>
              <form name="form_regis_phone" id="form_regis_phone" method="post">
                <div className={styles.wrapperInfor}>
                  <input
                    type="text"
                    name="telephone_buy_fast"
                    id="telephone_buy_fast"
                    placeholder="Để lại số điện thoại..."
                    className={`${styles.keyword} ${styles.txtPhone} ${styles.inputText}`}
                  />
                  <select name="cities_buy_fast" id="cities_buy_fast">
                    <option value="">Tỉnh/Thành Phố</option>
                    <option value="1473">Hà Nội</option>
                    <option value="1474">TP HCM</option>
                    <option value="1475">Hải Phòng</option>
                    <option value="1482">Bắc Giang</option>
                    <option value="1483">Bắc Kạn</option>
                    <option value="1484">Bắc Ninh</option>
                    <option value="1485">Cao Bằng</option>
                    <option value="1486">Điện Biên</option>
                    <option value="1487">Hà Giang</option>
                    <option value="1488">Hà Nam</option>
                    <option value="1489">Hải Dương</option>
                    <option value="1490">Hòa Bình</option>
                    <option value="1491">Hưng Yên</option>
                    <option value="1492">Lai Châu</option>
                    <option value="1493">Lạng Sơn</option>
                    <option value="1494">Lào Cai</option>
                    <option value="1495">Nam Định</option>
                    <option value="1496">Ninh Bình</option>
                    <option value="1497">Phú Thọ</option>
                    <option value="1498">Quảng Ninh</option>
                    <option value="1499">Sơn La</option>
                    <option value="1500">Thái Bình</option>
                    <option value="1501">Thái Nguyên</option>
                    <option value="1502">Thanh Hóa</option>
                    <option value="1503">Tuyên Quang</option>
                    <option value="1504">Vĩnh Phúc</option>
                    <option value="1505">Yên Bái</option>
                    <option value="1506">Đà Nẵng</option>
                    <option value="1507">Bình Định</option>
                    <option value="1508">Bình Phước</option>
                    <option value="1509">Bình Thuận</option>
                    <option value="1510">Đắk Lắk</option>
                    <option value="1511">Đắk Nông</option>
                    <option value="1512">Gia Lai</option>
                    <option value="1513">Hà Tĩnh</option>
                    <option value="1514">Khánh Hòa</option>
                    <option value="1515">Kon Tum</option>
                    <option value="1516">Lâm Đồng</option>
                    <option value="1517">Nghệ An</option>
                    <option value="1518">Ninh Thuận</option>
                    <option value="1519">Phú Yên</option>
                    <option value="1520">Quảng Bình</option>
                    <option value="1521">Quảng Nam</option>
                    <option value="1522">Quảng Ngãi</option>
                    <option value="1523">Quảng Trị</option>
                    <option value="1524">Thừa Thiên Huế</option>
                    <option value="1525">Cần Thơ</option>
                    <option value="1526">An Giang</option>
                    <option value="1527">Bà Rịa - Vũng Tàu</option>
                    <option value="1528">Bạc Liêu</option>
                    <option value="1529">Bến Tre</option>
                    <option value="1530">Bình Dương</option>
                    <option value="1531">Cà Mau</option>
                    <option value="1532">Đồng Nai</option>
                    <option value="1533">Đồng Tháp</option>
                    <option value="1534">Hậu Giang</option>
                    <option value="1535">Kiên Giang</option>
                    <option value="1536">Long An</option>
                    <option value="1537">Sóc Trăng</option>
                    <option value="1538">Tây Ninh</option>
                    <option value="1539">Tiền Giang</option>
                    <option value="1540">Trà Vinh</option>
                    <option value="1541">Vĩnh Long</option>
                    <option value="1542">Nước Ngoài</option>
                    <option value="1543">Bắc Kinh</option>
                  </select>
                  <input
                    type="button"
                    name="submit-res"
                    value="Gửi"
                    className={`${styles.btPhone} ${styles.buttonSub} ${styles.button}`}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* frame right */}

        <div className={styles.frameRight}>
          <div className={styles.boxPriceRight}>
            <div className={styles.boxPriceRightTop}>
              <div className={styles.priceOld}>
                <span>Giá</span>
                <span className={styles.priceOld}> {product.gia_san_pham.toLocaleString("vi-VN")}₫</span>
              </div>
              <div className={styles.priceCurrent}>
                <div className={styles.titlePriceCurrent}>Giá KM:</div>
                <div className={styles.numberPriceCurrent}>
                  <input type="hidden" value="1" className={styles.bkProductQty} />
                  <span className={styles.bkProductPrice}>{product.gia_giam.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className={styles.noteVat}>(Giá trên đã bao gồm VAT)</div>
              </div>
              <div className={styles.clear}></div>
              <div className={styles.boxPriceRightBot}>
                <div className={`${styles.btnBuy} ${styles.buyRow} ${styles.cls}`}>
                  <form action="">
                    <button type="submit" className={`${styles.btBuySp} ${styles.buySp} ${styles.submit}`}>
                      Mua ngay
                    </button>
                    <button
                      type="button"
                      className={`${styles.btBuySp} ${styles.buySp} ${styles.submit}`}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(addToCart({ item: product, so_luong: 1 }));
                        Swal.fire({
                          title: "Thành công!",
                          text: "Sản phẩm đã được thêm vào giỏ hàng.",
                          icon: "success",
                          confirmButtonText: "OK",
                        });
                      }}
                    >
                      Thêm vào giỏ hàng
                    </button>

                    <button
                      style={{ marginBottom: "20px" }}
                      type="button"
                      className={`${styles.btBuySp} ${styles.buySp} ${styles.submit}`}
                    >
                      Tư vấn miễn phí
                    </button>
                  </form>
                </div>
                <div className={styles.noteHotline}>
                  <svg
                    width="30px"
                    height="30px"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 32.666 32.666"
                    style={{ enableBackground: "new 0 0 32.666 32.666" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        d="M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z
                  M16.666,7.856L16.665,9.52c3.853,0,6.983,3.133,6.981,6.983l1.666-0.001C25.312,11.735,21.436,7.856,16.666,7.856z 
                  M16.333,0C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006
                  c0-0.559-0.45-1.01-1.007-1.01c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319
                  c7.896,0,14.317,6.424,14.317,14.319c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761
                  c0.634-0.377,1.183-0.887,1.591-1.529c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518
                  c0.243-1.064-4.658-3.143-5.084-1.814c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168
                  c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001c-0.028-0.029-0.062-0.061-0.092-0.092
                  c-0.031-0.029-0.062-0.062-0.093-0.092v0.002c-1.106-1.096-2.506-2.34-3.457-3.459c-0.36-0.424-0.534-1.102-0.168-1.377
                  c0.41-0.311,1.966-0.543,2.458-0.699c1.326-0.424-0.75-5.328-1.816-5.084c-0.832,0.195-1.727,0.227-2.516,0.553
                  c-0.134,0.057-0.238,0.16-0.359,0.24c-2.799,1.774-3.16,6.082-0.428,9.292c1.041,1.228,2.127,2.416,3.245,3.576
                  l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09c0.03,0.031,0.059,0.062,0.088,0.095l0.006-0.006
                  c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098c3.67-2.021,5.312-6.338,5.312-9.719
                  C32.666,7.326,25.339,0,16.333,0z"
                      />
                    </g>
                  </svg>
                  <div>Hoặc mua hàng qua điện thoại</div>
                  <a title="hotline mua hàng" href="#" className={styles.phoneCall}>
                    024.3991.8668
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  end top-product-detail */}
      <div className={styles.clear}></div>
      <div className={`${styles.productPos0} ${styles.container}`}>
        <div
          className={`${styles.blockStrengths} ${styles.strengths0} ${styles.blocksStrengths} ${styles.blocks0} block`}
        >
          <div className={`${styles.strengthsRectangle4Block} ${styles.cls}`}>
            <div className={`${styles.item}`}>
              <div className={styles.itemInner}>
                <div className={styles.item1}>
                  <div className={styles.isvg}>
                    <a href="#" title="100% hàng chính hãng">
                      <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 405.075 405.075"
                        style={{ enableBackground: "new 0 0 405.075 405.075" }}
                      >
                        <g>
                          <g>
                            <g>
                              <path d="M373.488,337.075l-59.2-104c6-2.8,9.6-9.2,9.2-16.4l-4.4-36.8l25.2-26.4c5.6-5.6,6-15.2,0.4-22l-25.2-27.2l5.2-37.2     c0.8-8-4.8-16-12.8-17.6l-36.4-7.2l-17.6-32.4c-3.6-7.6-12.4-10.8-20.4-7.6h-0.4l-33.6,15.6l-32.8-16c-3.6-2-8-2.4-12-1.2     c-4,1.2-7.2,4-9.2,7.6l-18,32.4l-36.4,6.4c-8.4,1.6-14,9.2-13.2,18l4.4,36.8l-25.2,26.4c-5.6,5.6-6,15.2-0.4,22l25.2,27.2     l-5.2,37.2c-0.8,7.2,3.6,14,10.4,16.8l-59.6,105.6c-1.6,2.4-1.2,5.6,0,8c1.6,2.4,4,4,6.8,4h64l29.2,50.8c1.6,2.4,4,4,6.8,4     s5.6-1.6,6.8-4l57.2-97.6l57.2,98.8c1.6,2.4,4,4,6.8,4s5.6-1.6,6.8-4l29.2-52h64c2.8,0,5.6-1.6,6.8-4     C375.088,342.675,375.088,339.475,373.488,337.075z M138.688,379.875l-24.8-42.8c-1.6-2.4-4-4-6.8-4h-55.2l55.2-97.6l22.8,4     l17.6,32.4c3.6,7.6,12.4,10.8,20.4,7.6h0.4l16.4-7.6l8,14L138.688,379.875z M161.888,265.075c-0.4,0-0.4,0-0.4,0l-17.6-33.2     c-2.4-4-6.4-7.2-11.2-7.6l-36.8-6.8l5.2-36.8c0.8-4.8-0.8-10-4-13.2l-24.8-27.2l25.2-26.4c3.6-3.6,5.2-8.4,4.4-13.2l-4.4-36.4     c0,0,0-0.4,0.4-0.8l36.4-6.4c4.4-0.8,8.8-3.6,11.2-8l18-32.4l32.8,16c4.4,2.4,10,2.4,14.4,0l33.2-15.2c0.4,0,0.4,0,0.4,0     l17.6,33.2c2.4,4,6.4,7.2,10.8,7.6l36.4,7.2l-5.2,36.8c-0.8,4.8,0.8,10,4,13.2l25.2,27.2l-25.6,26.4c-3.6,3.6-5.2,8.4-4.4,13.2     l4.4,36.8l-36,6c-4.4,0.8-8.8,3.6-11.2,8l-18,32.4l-32.8-16c-4.4-2.4-10-2.4-14.4,0L161.888,265.075z M297.888,333.075     c-2.8,0-5.6,1.6-6.8,4l-24.8,44l-56.4-97.6c-0.4-1.2-0.8-2-1.6-2.8l-8.8-15.6l2.8-1.2l32.8,16c2.4,1.2,4.8,1.6,7.2,1.6     c5.6,0,11.2-2.8,14-8l18-32.4l24-4.4l54.8,96.4H297.888z"></path>
                              <path d="M282.288,141.075c0-44-36-80-80-80s-80,36-80,80s36,80,80,80S282.288,185.075,282.288,141.075z M202.288,205.075     c-35.2,0-64-28.8-64-64s28.8-64,64-64s64,28.8,64,64S237.488,205.075,202.288,205.075z"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className={styles.itemR}>
                  <a href="#" title="100% hàng chính hãng">
                    100% hàng chính hãng
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.itemBreak}></div>
            {/* <!--  --> */}
            <div className={`${styles.item} ${styles.item2}`}>
              <div className={styles.itemInner}>
                <div className={styles.item1}>
                  <div className={styles.isvg}>
                    <a href="#" title="Miễn phí vận chuyển">
                      <svg x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: " new 0 0 512 512" }}>
                        <g>
                          <g>
                            <path d="M476.158,231.363l-13.259-53.035c3.625-0.77,6.345-3.986,6.345-7.839v-8.551c0-18.566-15.105-33.67-33.67-33.67h-60.392 			V110.63c0-9.136-7.432-16.568-16.568-16.568H50.772c-9.136,0-16.568,7.432-16.568,16.568V256c0,4.427,3.589,8.017,8.017,8.017 			c4.427,0,8.017-3.589,8.017-8.017V110.63c0-0.295,0.239-0.534,0.534-0.534h307.841c0.295,0,0.534,0.239,0.534,0.534v145.372 			c0,4.427,3.589,8.017,8.017,8.017c4.427,0,8.017-3.589,8.017-8.017v-9.088h94.569c0.008,0,0.014,0.002,0.021,0.002 			c0.008,0,0.015-0.001,0.022-0.001c11.637,0.008,21.518,7.646,24.912,18.171h-24.928c-4.427,0-8.017,3.589-8.017,8.017v17.102 			c0,13.851,11.268,25.119,25.119,25.119h9.086v35.273h-20.962c-6.886-19.883-25.787-34.205-47.982-34.205 			s-41.097,14.322-47.982,34.205h-3.86v-60.393c0-4.427-3.589-8.017-8.017-8.017c-4.427,0-8.017,3.589-8.017,8.017v60.391H192.817 			c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097,14.322-47.982,34.205H50.772c-0.295,0-0.534-0.239-0.534-0.534v-17.637 			h34.739c4.427,0,8.017-3.589,8.017-8.017s-3.589-8.017-8.017-8.017H8.017c-4.427,0-8.017,3.589-8.017,8.017 			s3.589,8.017,8.017,8.017h26.188v17.637c0,9.136,7.432,16.568,16.568,16.568h43.304c-0.002,0.178-0.014,0.355-0.014,0.534 			c0,27.996,22.777,50.772,50.772,50.772s50.772-22.776,50.772-50.772c0-0.18-0.012-0.356-0.014-0.534h180.67 			c-0.002,0.178-0.014,0.355-0.014,0.534c0,27.996,22.777,50.772,50.772,50.772c27.995,0,50.772-22.776,50.772-50.772 			c0-0.18-0.012-0.356-0.014-0.534h26.203c4.427,0,8.017-3.589,8.017-8.017v-85.511C512,251.989,496.423,234.448,476.158,231.363z 			 M375.182,144.301h60.392c9.725,0,17.637,7.912,17.637,17.637v0.534h-78.029V144.301z M375.182,230.881v-52.376h71.235 			l13.094,52.376H375.182z M144.835,401.904c-19.155,0-34.739-15.583-34.739-34.739s15.584-34.739,34.739-34.739 			c19.155,0,34.739,15.583,34.739,34.739S163.99,401.904,144.835,401.904z M427.023,401.904c-19.155,0-34.739-15.583-34.739-34.739 			s15.584-34.739,34.739-34.739c19.155,0,34.739,15.583,34.739,34.739S446.178,401.904,427.023,401.904z M495.967,299.29h-9.086 			c-5.01,0-9.086-4.076-9.086-9.086v-9.086h18.171V299.29z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M144.835,350.597c-9.136,0-16.568,7.432-16.568,16.568c0,9.136,7.432,16.568,16.568,16.568 			c9.136,0,16.568-7.432,16.568-16.568C161.403,358.029,153.971,350.597,144.835,350.597z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M427.023,350.597c-9.136,0-16.568,7.432-16.568,16.568c0,9.136,7.432,16.568,16.568,16.568 			c9.136,0,16.568-7.432,16.568-16.568C443.591,358.029,436.159,350.597,427.023,350.597z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M332.96,316.393H213.244c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017H332.96 			c4.427,0,8.017-3.589,8.017-8.017S337.388,316.393,332.96,316.393z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M127.733,282.188H25.119c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h102.614 			c4.427,0,8.017-3.589,8.017-8.017S132.16,282.188,127.733,282.188z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M278.771,173.37c-3.13-3.13-8.207-3.13-11.337,0.001l-71.292,71.291l-37.087-37.087c-3.131-3.131-8.207-3.131-11.337,0 			c-3.131,3.131-3.131,8.206,0,11.337l42.756,42.756c1.565,1.566,3.617,2.348,5.668,2.348s4.104-0.782,5.668-2.348l76.96-76.96 			C281.901,181.576,281.901,176.501,278.771,173.37z"></path>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className={styles.itemR}>
                  <a href="#" title="Miễn phí vận chuyển">
                    Miễn phí vận chuyển
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.itemBreak}></div>
            {/* <!--  --> */}
            <div className={`${styles.item} ${styles.item3}`}>
              <div className={styles.itemInner}>
                <div className={styles.item1}>
                  <div className={styles.isvg}>
                    <a href="#" title="Bảo hành 5 năm">
                      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="-65 0 511 511.99875" width="40px">
                        <path d="m60.5 207c0 5.523438-4.476562 10-10 10s-10-4.476562-10-10 4.476562-10 10-10 10 4.476562 10 10zm0 0"></path>
                        <path d="m184.953125 510.320312c1.679687 1.117188 3.613281 1.679688 5.546875 1.679688s3.867188-.5625 5.546875-1.679688l90.941406-60.632812c58.554688-39.03125 93.511719-104.351562 93.511719-174.730469v-204.679687c0-4.296875-2.75-8.117188-6.824219-9.480469l-180-60.28125c-2.0625-.6875-4.292969-.6875-6.351562 0l-180 60.28125c-4.078125 1.363281-6.824219 5.183594-6.824219 9.480469v204.679687c0 70.378907 34.957031 135.699219 93.511719 174.730469zm-164.453125-235.363281v-197.480469l170-56.933593 170 56.933593v197.480469c0 63.675781-31.628906 122.773438-84.605469 158.089844l-85.394531 56.933594-85.394531-56.933594c-52.976563-35.3125-84.605469-94.414063-84.605469-158.089844zm0 0"></path>
                        <path d="m184.953125 462.25c1.679687 1.117188 3.613281 1.679688 5.546875 1.679688s3.867188-.5625 5.546875-1.679688l68.75-45.839844c47.402344-31.597656 75.703125-84.472656 75.703125-141.441406v-175.859375c0-4.296875-2.746094-8.117187-6.820312-9.480469l-140-46.941406c-2.0625-.691406-4.296876-.691406-6.359376 0l-140 46.941406c-4.074218 1.363282-6.820312 5.183594-6.820312 9.480469v67.890625c0 5.519531 4.476562 10 10 10 5.519531 0 10-4.480469 10-10v-60.695312l130-43.589844 130 43.589844v168.664062c0 50.269531-24.972656 96.921875-66.796875 124.800781l-63.203125 42.140625-63.203125-42.144531c-41.828125-27.875-66.796875-74.53125-66.796875-124.796875v-27.96875c0-5.523438-4.480469-10-10-10-5.523438 0-10 4.476562-10 10v27.96875c0 56.972656 28.300781 109.847656 75.703125 141.441406zm0 0"></path>
                        <path d="m149.289062 328.207031c5.664063 5.667969 13.199219 8.789063 21.210938 8.789063s15.542969-3.121094 21.210938-8.789063l80-80c11.722656-11.722656 11.726562-30.695312 0-42.417969-11.722657-11.722656-30.695313-11.726562-42.421876-.003906l-58.789062 58.792969-18.789062-18.789063c-11.71875-11.722656-30.695313-11.726562-42.421876 0-11.726562 11.722657-11.726562 30.695313 0 42.421876zm-25.859374-68.277343c3.910156-3.90625 10.230468-3.90625 14.136718 0l25.859375 25.859374c3.90625 3.902344 10.238281 3.902344 14.144531 0l65.859376-65.859374c3.910156-3.90625 10.226562-3.90625 14.140624 0 3.90625 3.90625 3.90625 10.226562-.003906 14.136718l-80 80c-1.890625 1.890625-4.398437 2.933594-7.066406 2.933594s-5.179688-1.042969-7.070312-2.933594l-40-40c-3.90625-3.90625-3.910157-10.226562 0-14.136718zm0 0"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className={styles.itemR}>
                  <a href="#" title="Bảo hành 5 năm">
                    Bảo hành 5 năm
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.itemBreak}></div>
            {/* <!--  --> */}
            <div className={`${styles.item} ${styles.item4}`}>
              <div className={styles.itemInner}>
                <div className={styles.item1}>
                  <div className={styles.isvg}>
                    <a href="#" title="Đổi hàng trong 7 ngày">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: "new 0 0 512 512" }}
                      >
                        <g>
                          <g>
                            <path d="M504.5,0H7.5C3.358,0,0,3.358,0,7.5v497c0,4.142,3.358,7.5,7.5,7.5h497c4.142,0,7.5-3.358,7.5-7.5V7.5    C512,3.358,508.642,0,504.5,0z M497,497H15V15h482V497z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M474.5,30h-437c-4.142,0-7.5,3.358-7.5,7.5v45c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5V45h422v422H45V112.5    c0-4.142-3.358-7.5-7.5-7.5c-4.142,0-7.5,3.358-7.5,7.5v362c0,4.142,3.358,7.5,7.5,7.5h437c4.142,0,7.5-3.358,7.5-7.5v-437    C482,33.358,478.642,30,474.5,30z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M305.5,228.501h-7.794l33.07-77.167c3.652-8.522,2.786-18.231-2.318-25.971C323.354,117.621,314.772,113,305.5,113h-99    c-15.164,0-27.5,12.336-27.5,27.5s12.336,27.5,27.5,27.5h57.295l-25.928,60.5H206.5c-15.164,0-27.5,12.336-27.5,27.5    s12.336,27.5,27.5,27.5h7.797l-33.068,77.163c-5.973,13.937,0.506,30.136,14.444,36.109c3.45,1.479,7.091,2.229,10.82,2.229    c11.023,0,20.949-6.544,25.289-16.672l42.354-98.828H305.5c15.164,0,27.5-12.336,27.5-27.5S320.664,228.501,305.5,228.501z     M305.5,268.501h-36.311c-3,0-5.712,1.788-6.894,4.546l-44.302,103.374c-1.974,4.605-6.487,7.581-11.5,7.581l-0.002,7.5V384    c-1.687,0-3.339-0.342-4.911-1.016c-6.335-2.715-9.28-10.078-6.565-16.414l37.549-87.617c0.993-2.317,0.755-4.978-0.632-7.083    c-1.388-2.104-3.74-3.371-6.261-3.371H206.5c-6.893,0-12.5-5.607-12.5-12.5s5.607-12.5,12.5-12.5h36.313    c3.001,0.001,5.712-1.787,6.894-4.545l32.356-75.5c0.993-2.317,0.755-4.978-0.632-7.083c-1.388-2.104-3.74-3.371-6.261-3.371    H206.5c-6.893,0-12.5-5.607-12.5-12.5s5.607-12.5,12.5-12.5h99c4.214,0,8.116,2.101,10.436,5.619    c2.32,3.519,2.714,7.932,1.054,11.806l-37.551,87.622c-0.993,2.317-0.755,4.978,0.632,7.083c1.388,2.104,3.74,3.371,6.261,3.371    H305.5c6.893,0,12.5,5.607,12.5,12.5S312.393,268.501,305.5,268.501z"></path>
                          </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className={styles.itemR}>
                  <a href="#" title="Đổi hàng trong 7 ngày">
                    Đổi hàng trong 7 ngày
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.itemBreak}></div>
          </div>
        </div>
      </div>

      <div className={styles.clear}></div>
      {/*   bottom-product-detail */}
      <div className={`${styles.bottomDetail} ${styles.container}`}>
        <div className={styles.bottomDetail1}>
          <div className={styles.productTab}>
            <ul className={styles.productTabsUl}>
              <li className={`${styles.scrollNavItem} ${styles.fl} ${styles.active}`}>
                <a className={styles.scrollNavLink} href="#">
                  <span>Mô tả chi tiết</span>
                </a>
              </li>
              <li className={`${styles.scrollNavItem} ${styles.fl}`}>
                <a className={styles.scrollNavLink} href="#">
                  <span>Chế độ bảo hành</span>
                </a>
              </li>
              <li className={`${styles.scrollNavItem} ${styles.fl}`}>
                <a className={styles.scrollNavLink} href="#">
                  <span>Hướng dẫn sử dụng </span>
                </a>
              </li>
            </ul>
            <div className={styles.clearfix}></div>
          </div>
          {/* detail-product  */}
          {/* mô tả chi tiết  */}
          <div className={styles.productTabContent}>
            <div id="prodetails-tab1" className={`${styles.prodetailsTab} ${styles.cf} `}>
              <div className={styles.topInfoDetail}>
                <div className={styles.titleDetailChar}>Thông tin sản phẩm</div>
                <div className={`${styles.tableCondensed} ${styles.compareTable}`}>
                  <table className={styles.table} border="0" cellPadding="0" width="100%">
                    <tbody>
                      <tr className={styles.tr0} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Giới tính:
                        </td>
                        <td className={styles.contentCharactestic}>{product.gioi_tinh}</td>
                      </tr>
                      <tr className={styles.tr1} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Kiểu dáng:
                        </td>
                        <td className={styles.contentCharactestic}>{product.kieu_dang}</td>
                      </tr>
                      <tr className={styles.tr0} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Loại máy:
                        </td>
                        <td className={styles.contentCharactestic}>{product.loai_may}</td>
                      </tr>
                      <tr className={styles.tr1} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Phong cách:
                        </td>
                        <td className={styles.contentCharactestic}>{product.phong_cach}</td>
                      </tr>
                      <tr className={styles.tr0} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Mặt kính:
                        </td>
                        <td className={styles.contentCharactestic}>{product.mat_kinh}</td>
                      </tr>
                      <tr className={styles.tr1} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Đường kính:
                        </td>
                        <td className={styles.contentCharactestic}>{product.duong_kinh}</td>
                      </tr>
                      <tr className={styles.tr0} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Chất liệu vỏ:
                        </td>
                        <td className={styles.contentCharactestic}>{product.chat_lieu_vo}</td>
                      </tr>
                      <tr className={styles.tr1} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Độ dày:
                        </td>
                        <td className={styles.contentCharactestic}>11.2mm</td>
                      </tr>
                      <tr className={styles.tr0} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Chất liệu dây:
                        </td>
                        <td className={styles.contentCharactestic}>{product.chat_lieu_day}</td>
                      </tr>
                      <tr className={styles.tr1} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Size dây:
                        </td>
                        <td className={styles.contentCharactestic}>20mm</td>
                      </tr>
                      <tr className={styles.tr0} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Độ chịu nước:
                        </td>
                        <td className={styles.contentCharactestic}>{product.do_chiu_nuoc}</td>
                      </tr>
                      <tr className={styles.tr1} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Lug to Lug:
                        </td>
                        <td className={styles.contentCharactestic}>45mm</td>
                      </tr>
                      <tr className={styles.tr0} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Tính năng khác:
                        </td>
                        <td className={styles.contentCharactestic}>
                          Lịch ngày. Caliber Powermatic 80.111, 23 chân kính, lò xo cân bằng Nivachron, trữ cót 80h.
                          Sapphire chống lóa.
                        </td>
                      </tr>
                      <tr className={styles.tr1} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Bảo hành chính hãng:
                        </td>
                        <td className={styles.contentCharactestic}>2 năm quốc tế</td>
                      </tr>
                      <tr className={styles.tr0} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Màu mặt:
                        </td>
                        <td className={styles.contentCharactestic}>Trắng</td>
                      </tr>
                      <tr className={styles.tr1} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Bảo hành Duy Anh:
                        </td>
                        <td className={styles.contentCharactestic}>5 năm (đã bao gồm Bảo hành Quốc tế).</td>
                      </tr>
                      <tr className={styles.tr0} valign="top">
                        <td className={styles.titleCharactestic} width="40%">
                          Xuất xứ thương hiệu:
                        </td>
                        <td className={styles.contentCharactestic}>Thụy sĩ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* chế độ bảo hành */}
            <div id="prodetails-tab2" className={`${styles.prodetailsTab} ${styles.hide}`}>
              <blockquote cite="donghoduyanh.com">
                <div className={styles.tabContent}>
                  <div className={styles.configGuarantee}>
                    <p style={{ textAlign: "justify" }}>
                      Theo chính sách bảo hành của các hãng đồng hồ, tất cả các đồng hồ chính hãng bán ra đều kèm theo
                      01 thẻ/ sổ/ giấy bảo hành chính hãng (Quốc tế) có giá trị bảo hành theo thời gian quy định của
                      từng hãng đồng hồ khác nhau.
                      <br />
                      Mỗi thẻ/ sổ/ giấy bảo hành chỉ được phát hành kèm theo mỗi chiếc đồng hồ bán ra một lần duy nhất
                      và không cấp lại dưới bất kỳ hình thức nào.
                    </p>

                    <strong>I. BẢO HÀNH CHÍNH HÃNG (BẢO HÀNH QUỐC TẾ)</strong>

                    <p style={{ textAlign: "justify" }}>
                      Bảo hành chính hãng (hầu hết là bảo hành quốc tế) là chế độ bảo hành do nhà sản xuất (hãng đồng
                      hồ) cung cấp cho tất cả sản phẩm do chính họ sản xuất (sản phẩm chính hãng). Khi quý khách mua
                      đồng hồ chính hãng thì đồng hồ sẽ luôn đi kèm theo chế độ này (biểu thị bằng sổ/thẻ/giấy/... do
                      nhà sản xuất cung cấp). Đồng hồ có bảo hành chính hãng sẽ được đảm bảo những quyền lợi sau:
                    </p>

                    <ul>
                      <li>
                        Được tiếp nhận bảo hành theo quy định của nhà sản xuất tại các trung tâm bảo hành chính hãng và
                        hệ thống đại lý chính thức nơi quý khách mua hàng.
                      </li>
                      <li>
                        Được đặt mua các linh kiện, phụ kiện chính hãng (máy, chi tiết máy, dây, khóa, kính,...) ngay cả
                        khi đã hết thời hạn bảo hành.
                      </li>
                      <li>Bảo hành chính hãng là minh chứng cho tính chính hãng của sản phẩm.</li>
                    </ul>

                    <p style={{ textAlign: "justify" }}>
                      - Bảo hành chỉ có giá trị khi đồng hồ có thẻ/ sổ/ giấy bảo hành chính thức đi kèm, được ghi đầy đủ
                      và chính xác các thông tin như: mã số đồng hồ, mã đáy đồng hồ, địa chỉ bán, ngày mua hàng,...
                      <br />- Thời gian bảo hành được tính kể từ ngày mua ghi trên thẻ/ sổ/ giấy bảo hành và không được
                      gia hạn sau khi hết thời hạn bảo hành:
                    </p>

                    <ul>
                      <li>Bảo hành 1 năm với đồng hồ Nhật Bản (riêng Orient Star là 2 năm).</li>
                      <li>Bảo hành 2 năm với đồng hồ Thụy Sỹ (dòng máy Chronometer của Tissot, Mido là 3 năm).</li>
                      <li>
                        Thương hiệu khác: 2 năm cho Daniel Wellington, Freelook,...; bảo hành máy trọn đời cho Skagen.
                      </li>
                    </ul>

                    <p style={{ textAlign: "justify" }}>
                      - Chỉ bảo hành miễn phí cho các hư hỏng về máy và linh kiện bên trong của đồng hồ khi được xác
                      định do lỗi nhà sản xuất.
                      <br />- Không thay thế hoặc đổi bằng chiếc đồng hồ khác.
                    </p>

                    <u>
                      <strong>Lưu ý:</strong>
                    </u>
                    <p style={{ textAlign: "justify" }}>
                      Đồng hồ không có kết nối với mạng máy tính nên không thể áp dụng bảo hành điện tử. Quý khách vui
                      lòng bảo quản thẻ/ sổ/ giấy bảo hành cẩn thận để được hưởng quyền lợi bảo hành. Duy Anh và các
                      trung tâm bảo hành quốc tế của hãng có quyền từ chối bảo hành nếu không cung cấp đủ giấy tờ.
                    </p>

                    <strong>II. CHÍNH SÁCH BẢO HÀNH RIÊNG CỦA ĐỒNG HỒ DUY ANH</strong>

                    <p style={{ textAlign: "justify" }}>
                      Bắt đầu từ ngày 01/09/2018, khi mua đồng hồ tại Duy Anh (trừ đồng hồ treo tường, để bàn, thông
                      minh), quý khách sẽ nhận được các chính sách bảo hành sau:
                    </p>

                    <ul>
                      <li>Bảo hành máy trong 5 năm, miễn phí công lắp đặt, sửa chữa, kiểm tra chống nước,...</li>
                      <li>Miễn phí thay linh kiện lần đầu, giảm 50% cho các lần sau.</li>
                      <li>Miễn phí lau dầu, bảo dưỡng 5 năm đối với đồng hồ cơ (trừ Kinetic, Auto Quartz, Hybrid).</li>
                      <li>Miễn phí thay pin trọn đời với đồng hồ pin (ngoại trừ Eco-Drive, Solar, Kinetic,...).</li>
                      <li>Miễn phí đánh bóng kính cứng trong 6 tháng.</li>
                      <li>
                        Tặng dây ZRC (trị giá 500.000 VNĐ) nếu dây hỏng trong 6 tháng (áp dụng cho đồng hồ từ 5.000.000
                        VNĐ trở lên).
                      </li>
                    </ul>

                    <u>
                      <strong>Lưu ý:</strong>
                    </u>
                    <p style={{ textAlign: "justify" }}>
                      - Chế độ bảo hành mở rộng đi kèm giấy bảo hành do Duy Anh cấp. Quý khách cần bảo quản và cung cấp
                      giấy tờ khi sử dụng ưu đãi. Duy Anh có quyền từ chối nếu thiếu giấy tờ.
                    </p>

                    <strong>KHÔNG BẢO HÀNH TRONG CÁC TRƯỜNG HỢP SAU:</strong>
                    <ul>
                      <li>Không bảo hành vỏ, mặt kính, dây, khóa đồng hồ (trừ lỗi kỹ thuật do nhà sản xuất).</li>
                      <li>
                        Không bảo hành hư hỏng do sử dụng sai cách như xông hơi, tắm nước nóng, tiếp xúc hóa chất,...
                      </li>
                      <li>
                        Không bảo hành nếu đồng hồ bị sửa chữa tại nơi không phải trung tâm bảo hành được chỉ định.
                      </li>
                      <li>Không bảo hành hư hỏng do thiên tai, tai nạn, cố tình gây hư hỏng,...</li>
                    </ul>
                  </div>
                </div>
              </blockquote>
            </div>
            {/* hướng dẫn sử dụng  */}
            <blockquote cite="donghoduyanh.com">
              <div id="prodetailsTab3" className={`${styles.prodetailsTab} ${styles.hide}`}>
                <div className={styles.tab}>
                  <button
                    className={`${styles.tablinks1} ${styles.tabBoder} ${styles.tabCachChinhDongHo} ${styles.active}`}
                  >
                    <span className={styles.text}>Cách chỉnh đồng hồ</span>
                  </button>
                  <button className={`${styles.tablinks1} ${styles.tabBoder} ${styles.tabHuongDanChonSize}`}>
                    <span>Hướng dẫn chọn size</span>
                  </button>
                  <button className={`${styles.tablinks1} ${styles.tabBoder} ${styles.tabMucDoChongNuocCuaDongHo}`}>
                    <span>Mức độ chống nước của đồng hồ</span>
                  </button>
                  <button className={`${styles.tablinks1} ${styles.tabBoder} ${styles.tabHuongDanVeSinhDongHo}`}>
                    <span>Hướng dẫn vệ sinh đồng hồ</span>
                  </button>
                </div>
                <div id="tab-2" className={`${styles.tabcontent1} ${styles.description}`}>
                  <p style={{ textAlign: "justify" }}>
                    <br />
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span> &nbsp; </span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <div
                    className={styles.youtubeEmbedWrapper}
                    style={{
                      height: "0",
                      overflow: "hidden",
                      paddingBottom: "56.25%",
                      paddingTop: "30px",
                      position: "relative",
                    }}
                  >
                    <iframe
                      allow=";"
                      allowFullScreen
                      frameBorder="0"
                      height="360"
                      src="https://www.youtube.com/embed/Fh_enTXmKXE"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                      }}
                      width="640"
                      data-loader="frame"
                    ></iframe>
                  </div>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>
                            <img alt="" height="500" src="/public/img/item/detail-hinh1.jpg" width="850" />
                          </span>
                        </span>
                      </span>
                    </span>
                    <br />
                    &nbsp;
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>
                            - Đối với đồng hồ có 2 kim (giờ/phút) và đồng hồ 3 kim (giờ/phút/giây): Bạn kéo nhẹ nút điều
                            chỉnh ra 1 nấc để chỉnh giờ phút.
                          </span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>
                            - Đối với đồng hồ có 2 kim 1 lịch (giờ/phút/lịch ngày) và đồng hồ có 3 kim 1 lịch
                            (giờ/phút/giây/lịch ngày): có 2 nấc chỉnh, bạn kéo nhẹ nút điều chỉnh ra nấc đầu tiên để
                            chỉnh ngày (chỉ có thể chỉnh được 1 chiều, nếu cố vặn chiều còn lại có thể bị gãy lịch) và
                            kéo tiếp ra nấc thứ 2 để chỉnh giờ phút.
                          </span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <br />
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>
                            - Đối với đồng hồ có 6 kim 1 lịch thì 3 nút điều chỉnh bên cạnh, tuy nhiên tùy vào máy của
                            đồng hồ để có cách chỉnh:
                          </span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <br />
                    <br />
                    &nbsp;
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>
                            <strong>Đồng hồ có chức năng bấm giờ thể thao Chronograph:</strong>
                          </span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p style={{ textAlign: "justify" }}>&nbsp;</p>
                  <div
                    className={styles.youtubeEmbedWrapper}
                    style={{
                      height: "0",
                      overflow: "hidden",
                      paddingBottom: "56.25%",
                      paddingTop: "30px",
                      position: "relative",
                    }}
                  >
                    <iframe
                      allow=";"
                      allowFullScreen
                      frameBorder="0"
                      height="360"
                      src="https://www.youtube.com/embed/NKlH2f7yMFo?start=309"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                      }}
                      width="640"
                      data-loader="frame"
                    ></iframe>
                  </div>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>&nbsp;</span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p style={{ textAlign: "center" }}>
                    <img
                      alt="chỉnh ngày giờ đồng hồ chronograph"
                      src="https://donghoduyanh.com/upload/images/chinh-ngay-gi-dong-ho-chronograph.jpg"
                    />
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>
                            + Nút điều chỉnh nằm ở giữa có 2 nấc chỉnh, kéo nhẹ nấc đầu tiên ra để chỉnh ngày, tiếp đến
                            nấc thứ 2 để chỉnh giờ và phút.
                            <br />
                            <br />
                            + Nút trên cùng để cho chạy/dừng chức năng bấm giờ thể thao (chronograph).
                            <br />
                            <br />
                            + Khi nút trên đang dừng (chức năng bấm giờ chronograph đang dừng) bấm nút dưới để đưa 2 kim
                            về vị trí ban đầu số 12 giờ và đặt lại từ đầu.
                            <br />
                            <br />
                            <strong>Đồng hồ tự động (Automatic):</strong>
                          </span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <br />
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>
                            Thông thường nút điểu chỉnh ở giữa kéo ra để chỉnh ngày và giờ.
                            <br />
                            &nbsp;
                            <br />
                            Lưu ý:
                          </span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>
                            - Một số dòng đồng hồ cao cấp hay một số dòng đồng hồ có sử dụng gioăng cao su để chống vào
                            nước thì nút điều chỉnh không kéo ra ngay được mà phải xoay vặn (theo chiều ngược kim đồng
                            hồ) để mở nút điều chỉnh, sau đó mới kéo nhẹ ra các nấc cần điều chỉnh. Sau khi điều chỉnh
                            xong phải đóng nút điều chỉnh về vị trí ban đầu, ấn nút điều chỉnh vào đồng thời xoay vặn
                            (theo chiều kim đồng hồ) đóng chặt nút điều chỉnh để tránh nước bị thẩm thấu vào máy.
                          </span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ fontSize: "13pt" }}>
                      <span>
                        <span>
                          <span>&nbsp;</span>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p style={{ textAlign: "justify" }}>&nbsp;</p>
                </div>
              </div>
            </blockquote>
          </div>
        </div>

        <div className={styles.bottomDetailR}>
          <div className={styles.titleBox}>Chứng nhận chính hãng</div>
          <div className={styles.contentBox}>
            <img
              className={styles.lazy}
              alt="Chứng nhận chính hãng"
              width="335"
              height="470"
              src="https://donghoduyanh.com/images/certification/large/tissot-author5_1576645138.jpg"
              srcSet="https://donghoduyanh.com/images/certification/large/tissot-author5_1576645138.jpg.webp"
            />
          </div>
        </div>
      </div>
      <div className={styles.clear}></div>
      {/* mô tả chi tiết  */}
      <div className={`${styles.tabContent} ${styles.cls} ${styles.container} `}>
        <div className={styles.tabContentChars}>
          <div className={styles.titleDescription}>
            Mô tả Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00
          </div>
          <div className={styles.prodetailsTabContent}>
            <div className={styles.tabContentRight}>
              <div className={`${styles.description} ${styles.boxdesc}`} id="boxdesc">
                <div id="boxContentLinfo" style={{ maxHeight: "400px" }}>
                  <div className={styles.boxContentLinfoInner}>
                    <p>
                      Tissot Chemin des Tourelles Powermatic 80 là chiếc đồng hồ tự động do Thụy Sĩ sản xuất, được biết
                      đến với thiết kế bóng bẩy và khả năng dự trữ năng lượng lâu dài. Đồng hồ được cung cấp bởi bộ máy
                      Powermatic 80, có khả năng dự trữ năng lượng trong 80 giờ. Điều này có nghĩa là đồng hồ có thể
                      hoạt động liên tục trong 3 ngày mà không bị lên dây cót.
                    </p>

                    <p>&nbsp;</p>

                    <h2>
                      <strong>
                        Đánh giá về thiết kế&nbsp;Tissot Chemin des Tourelles Powermatic 80&nbsp;T139.807.22.038.00
                      </strong>
                    </h2>

                    <p>&nbsp;</p>

                    <p>
                      <a href="#">T139.807.22.038.00 </a>
                      có đường kính&nbsp;39mm, vỏ bằng thép không gỉ 316L với mạ&nbsp;PVD bằng vàng hồng. Đồng hồ có mặt
                      số màu trắng&nbsp;với các kim và vạch chỉ giờ màu vàng. Đồng hồ cũng có lịch&nbsp;ngày ở vị trí 6
                      giờ.
                    </p>

                    <p>
                      <img
                        class="lazy"
                        alt=""
                        style={{ display: "inline-block", opacity: "1" }}
                        src="/image/item/detail-hinh2.jpg"
                      />
                    </p>

                    <p>
                      T139.807.22.038.00 là chiếc đồng hồ đeo tay hoàn hảo để đeo hàng ngày. Đồng hồ cũng có khả năng
                      chống nước ở độ sâu 50 mét, vì vậy nó có thể được đeo hàng ngày như đi làm văn phòng, đi chơi...
                    </p>

                    <p>Đặc điểm:</p>

                    <p>
                      - Bộ máy&nbsp;Powermatic 80 với dự trữ năng lượng 80 giờ
                      <br />
                      - Vỏ thép không gỉ mạ vàng hồng PVD
                      <br />
                      - Mặt số màu trắng&nbsp;với kim và vạch số màu vàng
                      <br />
                      - Lịch&nbsp;ngày ở vị trí 6 giờ
                      <br />
                      - Chống nước đến 50 mét
                      <br />
                      Tissot T139.807.22.038.00 là sự lựa chọn tuyệt vời cho bất kỳ ai đang tìm kiếm một chiếc đồng hồ
                      thời trang và đáng tin cậy. Đồng hồ có khả năng dự trữ năng lượng lâu dài, thiết kế kiểu dáng đẹp
                      và vỏ thép không gỉ bền bỉ.
                    </p>

                    <p>
                      <img
                        class="lazy"
                        alt=""
                        style={{ display: "inline-block", opacity: "1" }}
                        src="/public/img/item/detail-hinh3.jpg"
                      />
                    </p>

                    <p>
                      T139.807.22.038.00 đã nhận được đánh giá tích cực từ các nhà phê bình cũng như khách hàng. Chiếc
                      đồng hồ này đã được ca ngợi vì thiết kế bóng bẩy, khả năng dự trữ năng lượng lâu dài và độ bền của
                      nó.
                    </p>

                    <p>
                      <img
                        class="lazy"
                        alt=""
                        style={{ display: "inline-block", opacity: "1" }}
                        src="/public/img/item/detail-hinh4.jpg"
                      />
                    </p>

                    <p>
                      Dưới đây là một vài trích dẫn từ các đánh giá về T139.807.22.038.00 của các trang chuyên đánh giá
                      đồng hồ:
                    </p>

                    <p>
                      <em>
                        - "T139.807.22.038.00 là chiếc đồng hồ thời trang và đáng tin cậy, hoàn hảo để đeo hàng ngày."
                      </em>
                      - Watchtime
                      <br />
                      <em>
                        - "Bộ máy Powermatic 80 là sự lựa chọn tuyệt vời cho bất kỳ ai đang tìm kiếm một chiếc đồng hồ
                        có khả năng dự trữ năng lượng lâu dài."
                      </em>
                      - Hodinkee
                      <br />-<em> "Vỏ thép không gỉ rất bền và sẽ tồn tại trong nhiều năm tới."</em> - Gear Patrol
                    </p>

                    <ul>
                      <li>
                        <p>
                          <strong>
                            <a href="#" title="Top 10 mẫu đồng hồ Tissot mới nhất năm 2023">
                              TOP 10 MẪU ĐỒNG HỒ TISSOT MỚI NHẤT NĂM 2023
                            </a>
                          </strong>
                        </p>
                      </li>
                    </ul>

                    <p>&nbsp;</p>

                    <h2>
                      <strong>Địa chỉ&nbsp;mua đồng hồ Tissot&nbsp;T139.807.22.038.00 chính hãng uy tín&nbsp;</strong>
                    </h2>

                    <p>&nbsp;</p>

                    <p>
                      Hiện tại mẫu đồng hồ T139.807.22.038.00 có sẵn để mua tại Duy Anh Watch. Đại lý ủy quyền chính
                      thức của Tissot tại Việt Nam. Khách hàng có thể tới tham khảo sản phẩm tại các showroom:&nbsp;
                    </p>

                    <p>
                      - Địa chỉ: 200A Phố Huế, Quận Hai Bà Trưng, Hà Nội (gần ngã tư Phố Huế - Tô Hiến Thành - Nguyễn
                      Công Trứ)
                    </p>

                    <p>Điện thoại: (024)2.214.8336</p>

                    <p>- Địa chỉ: F4-B08, Tầng 4, Trung Tâm Thương Mại Lotte Center, 54 Liễu Giai, Q.Ba Đình, Hà Nội</p>

                    <p>Điện thoại: (024)32676.555</p>

                    <p>- Địa chỉ: Tầng 2, TTTM Vincom Trần Duy Hưng, 119 Trần Duy Hưng, Cầu Giấy, Hà Nội</p>

                    <p>Điện thoại: (024)6656.6660</p>

                    <p>
                      - Địa chỉ: 205 Trần Hưng Đạo, phường Cô Giang, Quận 1, TP.Hồ Chí Minh (gần Ngân hàng Vietinbank)
                    </p>

                    <p>Điện thoại: 0836.88.99.86</p>

                    <p>- Địa chỉ: 300 Hai Bà Trưng, phường Tân Định, Quận 1, TP. Hồ Chí Minh (gần nhà thờ Tân Định)</p>

                    <p>Điện thoại: 08899.36168</p>

                    {/* <div className={styles.youtubeEmbedWrapper}>
                      <iframe
                        className="lazyif"
                        loading="lazy"
                        allow=";"
                        allowFullScreen
                        frameBorder="0"
                        height="360"
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        width="640"
                        src="https://www.youtube.com/embed/TUvPHS9q3oo"
                      ></iframe>
                    </div> */}
                    <p>
                      <br />
                      T139.807.22.038.00 là sự lựa chọn tuyệt vời cho bất kỳ ai đang tìm kiếm một chiếc đồng hồ thời
                      trang và đáng tin cậy. Đồng hồ có khả năng dự trữ năng lượng lâu dài, thiết kế kiểu dáng đẹp và vỏ
                      thép không gỉ bền bỉ. Đồng hồ cũng có khả năng chống nước ở độ sâu 50 mét, vì vậy nó có thể được
                      đeo khi bơi hoặc lặn với ống thở nhẹ.
                    </p>
                  </div>
                </div>

                <div className={styles.readmore} id="readmore-desc">
                  <span className="closed">Hiển thị thêm</span>
                </div>

                <div className={styles.productTags}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class={styles.clear}></div>
      {/* sản phẩm liên quan */}
      <div
        className={`${styles.relatedProducts} ${styles.favourite} ${styles.mt20} ${styles.textCenter} ${styles.container}`}
      >
        <div className={`${styles.blockTitle} ${styles.blockTitleBg}`}>
          <span>Sản phẩm liên quan</span>
        </div>
        <div className={`${styles.productsBlocksWrapper} ${styles.block} ${styles.slideshowHot} ${styles.cls}`}>
          <div
            className={`${styles.slideshowHotList} ${styles.productsBlocksSlideshowHot} ${styles.owlCarousel} ${styles.owlTheme} ${styles.owlResponsive1170} ${styles.owlLoaded}`}
            id="products-blocks-slideshow-hot-1"
          >
            <div className={styles.owlStageOuter}>
              <div
                className={styles.owlStage}
                style={{
                  width: "4248px",
                  transform: "translate3d(-1180px, 0px, 0px)",
                  transition: "0.25s",
                }}
              >
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh2.webp"
                            srcset="/image/item/detail-hinh2.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh2.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh3.webp"
                            srcset="/image/item/detail-hinh3.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh3.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh4.webp"
                            srcset="/image/item/detail-hinh4.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh4.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh5.webp"
                            srcset="/image/item/detail-hinh5.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh5.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh6.webp"
                            srcset="/image/item/detail-hinh6.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh6.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh7.webp"
                            srcset="/image/item/detail-hinh7.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh7.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh8.webp"
                            srcset="/image/item/detail-hinh8.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh8.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh2.webp"
                            srcset="/image/item/detail-hinh2.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh2.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh3.webp"
                            srcset="/image/item/detail-hinh3.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh3.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh4.webp"
                            srcset="/image/item/detail-hinh4.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh4.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* item1 */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="/image/item/detail-hinh5.webp"
                            srcset="/image/item/detail-hinh5.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="/image/item/detail-hinh5.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} item-ss-20789`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.owlControls}>
              <div className={styles.owlNav}>
                <div className={styles.owlPrev}>‹</div>

                <div className={styles.owlNext}>›</div>
              </div>
              <div className={styles.owlDots} style={{ display: "none" }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Đánh giá bình luận */}
      <div className={`${styles.bottomDetail} ${styles.container}`}>
        <div id="prodetail-tab30" className={styles.prodetailsTabCm}>
          <div className={styles.tabContentRight}>
            <div className={styles.commentsWebsite}>
              <div className={styles.fullScreenMobile}></div>
              <div className={`${styles.tabTitle} ${styles.cls}`}>
                <div className={styles.catTitleMain} id="tab-title-label">
                  <div className={styles.titleIcon}>
                    <i className="icon-v1"></i>
                  </div>
                  <span>Đánh giá - Bình luận</span>
                </div>
              </div>
              <div className={styles.comments}>
                <div className={styles.tabLabel}>
                  <span>
                    Có <strong>0</strong> bình luận, đánh giá
                  </span>
                  <strong> về {product.ten}</strong>
                </div>
                {/* <!--  --> */}
               
                <div id="-info-comment" className={styles.cls}></div>
                {/* <!--  --> */}
                <form name="comment-add-form" id="comment-add-form" className={`${styles.formComment} ${styles.cls}`}>
                  <label className={styles.labelForm}>Nhận xét và đánh giá</label>
                  <div className={styles.ratingArea}>
                    <span id="ratings" className={styles.cls}>
                      <i className={`${styles.iconV1} ${styles.starOn}`} id="rate_1" value="1"></i>
                      <i className={`${styles.iconV1} ${styles.starOn}`} id="rate_2" value="2"></i>
                      <i className={`${styles.iconV1} ${styles.starOn}`} id="rate_3" value="3"></i>
                      <i className={`${styles.iconV1} ${styles.starOff}`} id="rate_4" value="4"></i>
                      <i className={`${styles.iconV1} ${styles.starOff}`} id="rate_5" value="5"></i>
                    </span>
                    <span className={styles.ratingNote}>Nhấn vào đây để đánh giá</span>
                  </div>
                  <div className={styles.textarea}>
                    <textarea name="content" id="cmt-content" placeholder="Viết bình luận của bạn..."></textarea>
                  </div>

                  <input type="button" className={styles.btnCommentMb} value="Gửi bình luận" />

                
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
