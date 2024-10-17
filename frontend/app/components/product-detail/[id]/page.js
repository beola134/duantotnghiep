import styles from "./detail.module.css";
export default function Detail() {
  return (
    <>
      <div className={`${styles.topProductDetail} ${styles.container} ${styles.cls}`}>
        <div className={styles.frameLeft}>
          <div className={styles.discountPro}>
            -<span id="discount-pro">10</span>
            <span>%</span>
          </div>
          <div style={{ position: "relative", left: "0px", textAlign: "center", marginBottom: "20px" }}>
            <img
              className={`${styles.imgResponsive} bk-product-image`}
              src="../public/img/product/detail-hinh1.webp"
              alt="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00"
              width="398"
              height="481"
            />
          </div>
          <div className={styles.thumbs}>
            <div className={styles.listItem}>
              <div className={styles.item} style={{ maxWidth: "calc(100% / 5 - 10px)" }}>
                <img src="../public/img/item/picture1.jpg" alt="" />
                <span>Ảnh thực tế</span>
              </div>
              <div className={styles.item} style={{ maxWidth: "calc(100% / 5 - 10px)" }}>
                <img src="../public/img/item/picture2.jpg" alt="" />
                <span>Video thực tế</span>
              </div>
              <div className={styles.item} style={{ maxWidth: "calc(100% / 5 - 10px)" }}>
                <img src="../public/img/item/picture3.jpg" alt="" />
                <span>Thông tin sản phẩm</span>
              </div>
              <div className={styles.item} style={{ maxWidth: "calc(100% / 5 - 10px)" }}>
                <img src="../public/img/item/picture4.jpg" alt="" />
                <span>Phân biệt thật giả</span>
              </div>
              <div className={styles.item} style={{ maxWidth: "calc(100% / 5 - 10px)" }}>
                <img src="../public/img/item/picture5.jpg" alt="" />
                <span>Hướng dẫn chọn size</span>
              </div>
            </div>
          </div>
          <div className={styles.slideFT}></div>
          <div className={styles.hitShare}>
            <div
              className="fb-like"
              data-href="https://www.yourwebsite.com"
              data-width="250"
              data-layout="button"
              data-action="like"
              data-size="small"
              data-share="false"
            ></div>
            <div
              className="fb-share-button"
              data-href="https://www.yourwebsite.com"
              data-width="250"
              data-layout="button"
            ></div>
          </div>
        </div>
        {/* <!--  --> */}
        <div className={styles.frameCenter}>
          <div className={`${styles.nameTable} ${styles.mt20}`}>
            <div className={styles.logoManufactory}>
              <img className={styles.imageGiftCat} src="../public/img/item/brand1.png" alt="" />
            </div>
            <div className={styles.productName}>
              <h1 className={styles.bkProductName}>
                Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00
              </h1>
              <div className={`${styles.itemSsMain} ${styles.itemSs} ${styles.itemSs19005}`}>
                <span className={styles.iconSs}></span>
                <span className={styles.txtSs}>So sánh</span>
              </div>
            </div>
            <div className={`${styles.codeManu} mt10 cf`}>
              <span className={`${styles.rate} ${styles.rateHead}`}>
                <span className={`${styles.starOn} ${styles.star}`}>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className={`${styles.starOn} ${styles.star}`}>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className={`${styles.starOn} ${styles.star}`}>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className={`${styles.starOn} ${styles.star}`}>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className={`${styles.starOn} ${styles.star}`}>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className={styles.hide}>5</span>
                <span className={styles.hide}>5</span>
                <a className={styles.rateCount} href="" title="Đánh giá sản phẩm này ">
                  (<span>1</span> đánh giá )
                </a>
              </span>
            </div>
            <span className={styles.codeProduct}>Mã sản phẩm: T139.807.22.038.00</span>
            <ul className={styles.infoMainFilter}>
              <li className="cf">
                <div className={`${styles.liLeft} fl`}>Loại máy</div>
                <span className="fl">:</span>
                <div className={`${styles.liRight} fl`}>Automatic (Máy cơ tự động )</div>
              </li>
              <li className="cf">
                <div className={`${styles.liLeft} fl`}>Đường kính</div>
                <span className="fl">:</span>
                <div className={`${styles.liRight} fl`}>39mm</div>
              </li>
              <li className={`${styles.statusProduct} ${styles.statusProduct11}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 -3.5 170 170">
                  <path d="M142.196 30.4125C142.586 30.0637 142.897 29.6356 143.109 29.1567C143.32 28.6778 143.427 28.1592 143.422 27.6357C143.417 27.1122 143.3 26.5959 143.079 26.1213C142.858 25.6467 142.538 25.2248 142.141 24.8838C141.722 24.5249 141.307 24.1678 140.895 23.8127C137.751 21.1093 134.5 18.3102 131.1 15.9225C105.123 -2.36044 78.1316 -2.4633 50.8803 7.23287C26.2068 16.0055 10.3619 33.5563 3.77909 59.3882C-3.56415 88.249 2.86618 113.71 22.9048 135.073C23.4261 135.625 23.9582 136.177 24.4895 136.704C35.2539 147.469 48.6614 154.115 59.2847 158.739C63.8445 160.731 87.2404 163.149 93.5707 162.206C131.19 156.588 155.946 135.37 164.569 99.8725C166.215 92.9194 167.035 85.7962 167.011 78.6508C166.974 71.1466 165.712 63.6988 163.275 56.6012C163.097 56.0703 162.805 55.5851 162.418 55.1805C162.031 54.7759 161.56 54.4618 161.037 54.2606C160.515 54.0595 159.954 53.9764 159.396 54.0171C158.838 54.0579 158.295 54.2216 157.808 54.4965L157.706 54.5547C156.931 54.9984 156.336 55.7005 156.027 56.5381C155.717 57.3757 155.712 58.2954 156.012 59.1364C158.212 65.2371 159.334 71.674 159.327 78.1592C159.251 85.9394 158.198 93.6792 156.192 101.197C150.248 122.8 136.038 138.545 112.75 149.315C89.0741 160.65 55.1215 149.19 46.0879 143.226C36.1031 136.4 27.3663 127.908 20.2596 118.121C9.11418 102.34 6.61369 79.6587 12.6028 58.9229C15.4055 49.3489 20.3036 40.5185 26.9421 33.0722C33.5806 25.6259 41.793 19.7503 50.9838 15.8714C74.8941 5.93474 98.8852 4.18192 122.285 19.0635C125.422 21.061 133.422 27.3424 137.465 30.5501C138.143 31.0882 138.99 31.3691 139.855 31.3432C140.721 31.3172 141.549 30.986 142.194 30.4082L142.196 30.4125Z"></path>
                  <path d="M74.6287 104.313C76.2312 102.79 77.1115 102.019 77.9173 101.177C103.753 74.1855 132.047 49.8851 160.508 25.7727C161.584 24.8619 162.685 23.7 163.958 23.3737C165.493 22.9815 167.996 23.4326 168.682 24.2661C169.133 24.8821 169.418 25.6035 169.509 26.3612C169.601 27.1189 169.496 27.8875 169.206 28.5932C168.537 30.3474 166.907 31.8498 165.429 33.1629C156.607 41.0019 147.538 48.5708 138.872 56.5716C120.756 73.3024 102.756 90.1576 84.8704 107.137C77.0334 114.561 74.0173 114.862 66.8059 106.929C62.0589 101.705 47.7328 84.0973 43.3455 78.5495C42.7256 77.6872 42.1735 76.7781 41.6941 75.8305C40.7045 74.0756 40.0576 72.1419 42.0246 70.7814C44.2158 69.2662 45.7707 70.8473 47.0696 72.4937C48.384 74.1607 49.5048 75.9916 50.9121 77.5713C55.2811 82.4737 69.908 99.1421 74.6287 104.313Z"></path>
                </svg>
                Sẵn hàng
              </li>
            </ul>
            {/* <!--  --> */}
            <div className={styles.boxGift}>
              <div className={styles.titleGift}>Khuyến mãi</div>
              <div className={styles.gift}>
                <p>
                  Giảm&nbsp;
                  <span className={styles.highlight}>
                    <strong>10%</strong>
                  </span>
                  &nbsp;toàn bộ thương hiệu <strong>Tissot</strong>&nbsp;từ&nbsp;<strong>6.8 - 3.9</strong>
                </p>
                <p>
                  Giảm&nbsp;
                  <span className={styles.highlight}>
                    <strong>30%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là đồng hồ
                  <strong>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Casio</span>
                    </a>
                    <span className={styles.brandColor}>,</span>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Calvin Klein</span>
                    </a>
                  </strong>
                </p>
                <p>
                  Giảm&nbsp;
                  <span className={styles.highlight}>
                    <strong>25%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là đồng hồ
                  <strong>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Claude Bernard</span>
                    </a>
                    <span className={styles.brandColor}>, </span>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Edox</span>
                    </a>
                    <span className={styles.brandColor}>,&nbsp;</span>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Titoni</span>
                    </a>
                  </strong>
                </p>
                <p>
                  Giảm&nbsp;
                  <span className={styles.highlight}>
                    <strong>20%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là đồng hồ
                  <strong>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>DW</span>
                    </a>
                    <span className={styles.brandColor}>, </span>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Olym Pianus</span>
                    </a>
                    <span className={styles.brandColor}>,&nbsp;</span>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Fossil</span>
                    </a>
                    <span className={styles.brandColor}>, </span>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Michael Kors</span>
                    </a>
                  </strong>
                </p>
                <p>
                  Giảm&nbsp;
                  <span className={styles.highlight}>
                    <strong>15%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là đồng hồ
                  <strong>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Hamilton</span>
                    </a>
                    <span className={styles.brandColor}>, </span>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Mido</span>
                    </a>
                    <span className={styles.brandColor}>, </span>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Certina</span>
                    </a>
                    <span className={styles.brandColor}>, </span>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Seiko</span>
                    </a>
                  </strong>
                </p>
                <p>
                  Giảm&nbsp;
                  <span className={styles.highlight}>
                    <strong>20%</strong>
                  </span>
                  &nbsp;khi mua sản phẩm thứ 2 là
                  <strong>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Đồng Hồ Treo Tường</span>
                    </a>
                  </strong>
                  <span className={styles.brandColor}>, </span>
                  <strong>
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>Để Bàn</span>
                    </a>
                  </strong>
                  &nbsp;có giá niêm yết từ&nbsp;
                  <span className={styles.highlight}>
                    <strong>2 triệu</strong>
                  </span>
                  &nbsp;trở lên
                </p>
                <p>
                  Tặng ngay 1 trong 2 phần quà sau khi mua đồng hồ cơ <strong>Tissot</strong>&nbsp;(Số lượng có hạn):
                </p>
                <ol>
                  <li>
                    1. Tặng 01 đồng hồ treo tường
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>
                        <strong>SEIKO</strong>
                      </span>
                    </a>
                    hoặc
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>
                        <strong>RHYTHM</strong>
                      </span>
                    </a>
                    trị giá lên đến <strong>1 triệu đồng.</strong>
                  </li>
                  <li>
                    2.&nbsp;Tặng 01 dây da
                    <a href="#" className={styles.brandLink}>
                      <span className={styles.brandColor}>
                        <strong>ZRC</strong>
                      </span>
                    </a>
                    thương hiệu Pháp trị giá lên đến <strong>700.000đ</strong>
                  </li>
                </ol>
                <p>
                  Ưu đãi <strong>MUA 1 TẶNG 1 </strong>tặng đồng hồ đến <strong>10 Triệu&nbsp;</strong>
                  <a href="#">
                    <span className={styles.brandLink}>(Xem chi tiết tại đây)</span>
                  </a>
                  <span className={styles.brandColor}>&nbsp;</span>
                </p>
              </div>
            </div>
            <div className={styles.clear}></div>
            {/* <!--  --> */}
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
                    <option value="1543">Bắc Kinh</option>
                  </select>
                  <input
                    type="button"
                    name="submit-res"
                    value="Gửi"
                    className={`${styles.buttonSub} ${styles.btPhone} ${styles.button}`}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!--  --> */}
        <div className={styles.frameRight}>
          <div className={styles.boxPriceRight}>
            <div className={styles.boxPriceRightTop}>
              <div className={styles.priceOld}>
                <span>Giá</span>
                <span className={styles.priceOld}>26.950.000₫</span>
              </div>
              <div className={styles.priceCurrent}>
                <div className={styles.titlePriceCurrent}>Giá KM:</div>
                <div className={styles.numberPriceCurrent}>
                  <input type="hidden" value="1" className="bk-product-qty" />
                  <span className="bk-product-price" data-price="24255000" data-price-old="26950000">
                    24.255.000₫
                  </span>
                </div>
                <div className={styles.noteVat}>(Giá trên đã bao gồm VAT)</div>
              </div>
              <div className={styles.clear}></div>
              <div className={styles.boxPriceRightBot}>
                <div className={styles.btnBuy}>
                  <form action="">
                    <button type="submit" className={`${styles.btBuySp} ${styles.buySp} ${styles.submit}`}>
                      Mua ngay
                    </button>
                    <button className={`${styles.btBuySp} ${styles.buySp} ${styles.submit}`} type="button">
                      Thêm vào giỏ hàng
                    </button>
                  </form>
                  <button
                    style={{ marginBottom: "20px" }}
                    type="button"
                    className={`${styles.btBuySp} ${styles.buySp} ${styles.submit}`}
                  >
                    Tư vấn miễn phí
                  </button>
                </div>
                <div className={styles.noteHotline}>
                  <svg
                    width="30px"
                    height="30px"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32.666 32.666"
                    style={{ enableBackground: "new 0 0 32.666 32.666" }}
                  >
                    <g>
                      <path
                        d="M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z
                          M16.666,7.856L16.665,9.52c3.853,0,6.983,3.133,6.981,6.983l1.666-0.001C25.312,11.735,21.436,7.856,16.666,7.856z M16.333,0
                          C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006c0-0.559-0.45-1.01-1.007-1.01
                          c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319c7.896,0,14.317,6.424,14.317,14.319
                          c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761c0.634-0.377,1.183-0.887,1.591-1.529
                          c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518c0.243-1.064-4.658-3.143-5.084-1.814
                          c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001
                          c-0.028-0.029-0.062-0.061-0.092-0.092c-0.031-0.029-0.062-0.062-0.093-0.092v0.002c-1.106-1.096-2.506-2.34-3.457-3.459
                          c-0.36-0.424-0.534-1.102-0.168-1.377c0.41-0.311,1.966-0.543,2.458-0.699c1.326-0.424-0.75-5.328-1.816-5.084
                          c-0.832,0.195-1.727,0.227-2.516,0.553c-0.134,0.057-0.238,0.16-0.359,0.24c-2.799,1.774-3.16,6.082-0.428,9.292
                          c1.041,1.228,2.127,2.416,3.245,3.576l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09c0.03,0.031,0.059,0.062,0.088,0.095
                          l0.006-0.006c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098c3.67-2.021,5.312-6.338,5.312-9.719
                          C32.666,7.326,25.339,0,16.333,0z"
                      ></path>
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
      {/* <!-- end top-product-detail --> */}
      <div className={styles.clear}></div>
      <div className={`${styles.productPos0} container`}>
        <div className={`${styles.blockStrengths} ${styles.strengths0} ${styles.blocksStrengths} ${styles.block}`}>
          <div className={styles.strengthsRetangle4Block}>
            <div className={styles.item}>
              <div className={styles.itemInner}>
                <div className={styles.item1}>
                  <div className={styles.isvg}>
                    <a href="#" title="100% hàng chính hãng">
                      <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 405.075 405.075"
                        style={{ enableBackground: "new 0 0 405.075 405.075" }}
                        xmlSpace="preserve"
                      >
                        <g>
                          <g>
                            <g>
                              <path d="M373.488,337.075l-59.2-104c6-2.8,9.6-9.2,9.2-16.4l-4.4-36.8l25.2-26.4c5.6-5.6,6-15.2,0.4-22l-25.2-27.2l5.2-37.2c0.8-8-4.8-16-12.8-17.6l-36.4-7.2l-17.6-32.4c-3.6-7.6-12.4-10.8-20.4-7.6h-0.4l-33.6,15.6l-32.8-16c-3.6-2-8-2.4-12-1.2c-4,1.2-7.2,4-9.2,7.6l-18,32.4l-36.4,6.4c-8.4,1.6-14,9.2-13.2,18l4.4,36.8l-25.2,26.4c-5.6,5.6-6,15.2-0.4,22l25.2,27.2l-5.2,37.2c-0.8,7.2,3.6,14,10.4,16.8l-59.6,105.6c-1.6,2.4-1.2,5.6,0,8c1.6,2.4,4,4,6.8,4h64l29.2,50.8c1.6,2.4,4,4,6.8,4s5.6-1.6,6.8-4l57.2-97.6l57.2,98.8c1.6,2.4,4,4,6.8,4s5.6-1.6,6.8-4l29.2-52h64c2.8,0,5.6-1.6,6.8-4C375.088,342.675,375.088,339.475,373.488,337.075z M138.688,379.875l-24.8-42.8c-1.6-2.4-4-4-6.8-4h-55.2l55.2-97.6l22.8,4l17.6,32.4c3.6,7.6,12.4,10.8,20.4,7.6h0.4l16.4-7.6l8,14L138.688,379.875z M161.888,265.075c-0.4,0-0.4,0-0.4,0l-17.6-33.2c-2.4-4-6.4-7.2-11.2-7.6l-36.8-6.8l5.2-36.8c0.8-4.8-0.8-10-4-13.2l-24.8-27.2l25.2-26.4c3.6-3.6,5.2-8.4,4.4-13.2l-4.4-36.4c0,0,0-0.4,0.4-0.8l36.4-6.4c4.4-0.8,8.8-3.6,11.2-8l18-32.4l32.8,16c4.4,2.4,10,2.4,14.4,0l33.2-15.2c0.4,0,0.4,0,0.4,0l17.6,33.2c2.4,4,6.4,7.2,10.8,7.6l36.4,7.2l-5.2,36.8c-0.8,4.8,0.8,10,4,13.2l25.2,27.2l-25.6,26.4c-3.6,3.6-5.2,8.4-4.4,13.2l4.4,36.8l-36,6c-4.4,0.8-8.8,3.6-11.2,8l-18,32.4l-32.8-16c-4.4-2.4-10-2.4-14.4,0L161.888,265.075z M297.888,333.075c-2.8,0-5.6,1.6-6.8,4l-24.8,44l-56.4-97.6c-0.4-1.2-0.8-2-1.6-2.8l-8.8-15.6l2.8-1.2l32.8,16c2.4,1.2,4.8,1.6,7.2,1.6c5.6,0,11.2-2.8,14-8l18-32.4l24-4.4l54.8,96.4H297.888z"></path>
                              <path d="M282.288,141.075c0-44-36-80-80-80s-80,36-80,80s36,80,80,80S282.288,185.075,282.288,141.075z M202.288,205.075c-35.2,0-64-28.8-64-64s28.8-64,64-64s64,28.8,64,64S237.488,205.075,202.288,205.075z"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className={styles.itemR}>
                  <a href="#" title="100% hàng chính hãng">
                    100% hàng chính hãng{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.itemBreak}></div>
            {/* <!--  --> */}
            <div className={styles.item}>
              <div className={styles.itemInner}>
                <div className={styles.item1}>
                  <div className={styles.isvg}>
                    <a href="#" title="Miễn phí vận chuyển ">
                      <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: "new 0 0 512 512" }}
                        xmlSpace="preserve"
                      >
                        <g>
                          <g>
                            <path d="M476.158,231.363l-13.259-53.035c3.625-0.77,6.345-3.986,6.345-7.839v-8.551c0-18.566-15.105-33.67-33.67-33.67h-60.392V110.63c0-9.136-7.432-16.568-16.568-16.568H50.772c-9.136,0-16.568,7.432-16.568,16.568v8.552c0,3.854,2.719,7.07,6.344,7.839l-13.257,53.035c-18.596,2.184-32.572,17.281-32.572,35.68v5.721c0,18.797,15.297,34.095,34.095,34.095c6.208,0,11.793-1.489,16.782-4.012l36.384,93.637c-1.48,0.099-3.352,0.237-5.195,0.406c-30.306,2.174-49.091,16.645-49.091,29.478v5.721c0,17.092,15.671,30.221,31.881,30.221h386.697c16.211,0,30.882-13.129,30.882-30.221v-5.721c0-12.833-18.786-27.304-49.092-29.478c-1.842-0.169-3.713-0.307-5.193-0.406l36.383-93.637c4.989,2.523,10.574,4.012,16.782,4.012c18.798,0,34.095-15.297,34.095-34.095v-5.721C508.731,248.644,494.754,233.547,476.158,231.363z M65.434,149.065l13.944-55.776h306.763l13.944,55.776H65.434z M375.989,481.681c0,5.519-4.492,10.11-10.11,10.11H146.11c-5.619,0-10.11-4.491-10.11-10.11v-5.721c0-5.519,4.491-10.11,10.11-10.11h219.768c5.618,0,10.11,4.491,10.11,10.11V481.681z"></path>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className={styles.itemR}>
                  <a href="#" title="Miễn phí vận chuyển ">
                    Miễn phí vận chuyển{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.itemBreak}></div>
            {/* <!--  --> */}
            <div className={styles.item}>
              <div className={styles.itemInner}>
                <div className={styles.item1}>
                  <div className={styles.isvg}>
                    <a href="#" title="Bảo hành 2 năm">
                      <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 30 30"
                        style={{ enableBackground: "new 0 0 30 30" }}
                        xmlSpace="preserve"
                      >
                        <g>
                          <g>
                            <path d="M18.75,0h-7.5C8.48,0,7.5,0.96,7.5,2.25v2.25h-1.5C4.35,4.5,3,5.85,3,7.5v15c0,1.65,1.35,3,3,3h1.5v2.25C7.5,29.04,8.48,30,9.75,30h7.5c1.27,0,2.25-0.96,2.25-2.25v-2.25h1.5c1.65,0,3-1.35,3-3v-15c0-1.65-1.35-3-3-3h-1.5V2.25C21,0.96,20.04,0,18.75,0z M15,2.25v3h-3v-3H15z M12.75,30h-3v-3h3V30z M18.75,30h-3v-3h3V30z M21,25.5h-3v-3h3V25.5z M21,21h-3v-3h3V21z M21,16.5h-3v-3h3V16.5z M21,12h-3v-3h3V12z M27,23.25c0,1.66-1.35,3-3,3h-5.25v-3H30V23.25z M12.75,9h-3V6h3V9z M15,15h-3v-3h3V15z M12.75,18h-3v-3h3V18z M21,6h-3V3h3V6z"></path>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className={styles.itemR}>
                  <a href="#" title="Bảo hành 2 năm">
                    Bảo hành 2 năm
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.itemBreak}></div>
            {/* <!--  --> */}
          </div>
        </div>
      </div>
      <div className={styles.clear}></div>
      {/* <!-- bottom-product-detail --> */}
      <div className={`${styles.bottomDetail} container`}>
        <div className={styles.bottomDetail1}>
          <div className={styles.productTab}>
            <ul className={`${styles.productTabsUl} cf clearfix`}>
              <li className={`${styles.scrollNavItem} fl ${styles.active}`}>
                <a className={styles.scrollNavLink} href="#">
                  <span>Mô tả chi tiết</span>
                </a>
              </li>
              <li className={`${styles.scrollNavItem} fl`}>
                <a className={styles.scrollNavLink} href="#">
                  <span>Chế độ bảo hành</span>
                </a>
              </li>
              <li className={`${styles.scrollNavItem} fl`}>
                <a className={styles.scrollNavLink} href="#">
                  <span>Hướng dẫn sử dụng </span>
                </a>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
          {/* <!-- detail-product --> */}
          <div className={`${styles.productTabContent}`}>
            <div id="prodetails-tab1" className={`${styles.prodetailsTab} cf`}>
              <div className={styles.topInfoDetail}>
                <div className={styles.titleDetailChar}>Thông tin sản phẩm</div>
                <div className={`${styles.compareTable} table-condensed`}>
                  <table className={styles.table} border="0" cellpadding="0">
                    <tbody>
                      <tr className="tr-0" valign="top">
                        <td className={styles.titleCharactestic}>Giới tính:</td>
                        <td className={styles.contentCharactestic}>Nam</td>
                      </tr>
                      {/* Continue with other rows */}
                      <tr className="tr-1" valign="top">
                        <td className={styles.titleCharactestic}>Xuất xứ thương hiệu:</td>
                        <td className={styles.contentCharactestic}>Thụy sĩ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            import styles from './Guarantee.module.css';
            <div id="prodetails-tab2" className={`${styles.prodetailsTab} ${styles.hide}`}>
              <blockquote cite="donghoduyanh.com">
                <div className={styles.tabContent}>
                  <div className={styles.configGuarantee}>
                    <p>
                      Theo chính sách bảo hành của các hãng đồng hồ, tất cả các đồng hồ chính hãng bán ra đều kèm theo
                      01 thẻ/ sổ/ giấy bảo hành chính hãng (Quốc tế) có giá trị bảo hành theo thời gian quy định của
                      từng hãng đồng hồ khác nhau.
                      <br />
                      Mỗi thẻ/ sổ/ giấy bảo hành chỉ được phát hành kèm theo mỗi chiếc đồng hồ bán ra một lần duy nhất
                      và không cấp lại dưới bất kỳ hình thức nào.
                    </p>

                    <strong>I. BẢO HÀNH CHÍNH HÃNG (BẢO HÀNH QUỐC TẾ)</strong>

                    <p>
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

                    <p>
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

                    <p>
                      - Chỉ bảo hành miễn phí cho các hư hỏng về máy và linh kiện bên trong của đồng hồ khi được xác
                      định do lỗi nhà sản xuất.
                      <br />- Không thay thế hoặc đổi bằng chiếc đồng hồ khác.
                    </p>

                    <u>
                      <strong>Lưu ý:</strong>
                    </u>
                    <p>
                      Đồng hồ không có kết nối với mạng máy tính nên không thể áp dụng bảo hành điện tử. Quý khách vui
                      lòng bảo quản thẻ/ sổ/ giấy bảo hành cẩn thận để được hưởng quyền lợi bảo hành. Duy Anh và các
                      trung tâm bảo hành quốc tế của hãng có quyền từ chối bảo hành nếu không cung cấp đủ giấy tờ.
                    </p>

                    <strong>II. CHÍNH SÁCH BẢO HÀNH RIÊNG CỦA ĐỒNG HỒ DUY ANH</strong>

                    <p>
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
                    <p>
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
            (
            <blockquote cite="donghoduyanh.com">
              <div id="prodetails-tab3" className={`${styles.prodetailsTab} hide`}>
                <div className={styles.tab}>
                  <button className={`${styles.tabButton} ${styles.active}`}>
                    <span className="text">Cách chỉnh đồng hồ</span>
                  </button>
                  <button className={styles.tabButton}>
                    <span>Hướng dẫn chọn size</span>
                  </button>
                  <button className={styles.tabButton}>
                    <span>Mức độ chống nước của đồng hồ</span>
                  </button>
                  <button className={styles.tabButton}>
                    <span>Hướng dẫn vệ sinh đồng hồ</span>
                  </button>
                </div>
                <div id="tab-2" className={styles.tabContent}>
                  <p>
                    <br />
                  </p>
                  <div className={styles.youtubeEmbedWrapper}>
                    <iframe
                      allow=";"
                      allowFullScreen
                      frameBorder="0"
                      src="https://www.youtube.com/embed/Fh_enTXmKXE"
                    ></iframe>
                  </div>
                  <p>
                    <img alt="" className={styles.image} src="../public/img/item/detail-hinh1.jpg" />
                    <br />
                    &nbsp;
                  </p>
                  <p>
                    - Đối với đồng hồ có 2 kim (giờ/phút) và đồng hồ 3 kim (giờ/phút/giây): Bạn kéo nhẹ nút điều chỉnh
                    ra 1 nấc để chỉnh giờ phút.
                  </p>
                  <p>
                    - Đối với đồng hồ có 2 kim 1 lịch (giờ/phút/lịch ngày) và đồng hồ có 3 kim 1 lịch
                    (giờ/phút/giây/lịch ngày): có 2 nấc chỉnh, bạn kéo nhẹ nút điều chỉnh ra nấc đầu tiên để chỉnh ngày
                    (chỉ có thể chỉnh được 1 chiều, nếu cố vặn chiều còn lại có thể bị gãy lịch) và kéo tiếp ra nấc thứ
                    2 để chỉnh giờ phút.
                  </p>
                  <p>
                    <br />- Đối với đồng hồ có 6 kim 1 lịch thì 3 nút điều chỉnh bên cạnh, tuy nhiên tùy vào máy của
                    đồng hồ để có cách chỉnh:
                  </p>
                  <p>
                    <strong>Đồng hồ có chức năng bấm giờ thể thao Chronograph:</strong>
                  </p>
                  <div className={styles.youtubeEmbedWrapper}>
                    <iframe
                      allow=";"
                      allowFullScreen
                      frameBorder="0"
                      src="https://www.youtube.com/embed/NKlH2f7yMFo?start=309"
                    ></iframe>
                  </div>
                  <p style={{ textAlign: "center" }}>
                    <img
                      alt="chỉnh ngày giờ đồng hồ chronograph"
                      src="https://donghoduyanh.com/upload/images/chinh-ngay-gi-dong-ho-chronograph.jpg"
                      className={styles.image}
                    />
                  </p>
                  <p>
                    + Nút điều chỉnh nằm ở giữa có 2 nấc chỉnh, kéo nhẹ nấc đầu tiên ra để chỉnh ngày, tiếp đến nấc thứ
                    2 để chỉnh giờ và phút.
                    <br />
                    <br />
                    + Nút trên cùng để cho chạy/dừng chức năng bấm giờ thể thao (chronograph).
                    <br />
                    <br />
                    + Khi nút trên đang dừng (chức năng bấm giờ chronograph đang dừng) bấm nút dưới để đưa 2 kim về vị
                    trí ban đầu số 12 giờ và đặt lại từ đầu.
                    <br />
                    <br />
                    <strong>Đồng hồ tự động (Automatic):</strong>
                  </p>
                  <p>
                    Thông thường nút điểu chỉnh ở giữa kéo ra để chỉnh ngày và giờ.
                    <br />
                    &nbsp;
                    <br />
                    Lưu ý:
                  </p>
                  <p>
                    - Một số dòng đồng hồ cao cấp hay một số dòng đồng hồ có sử dụng gioăng cao su để chống vào nước thì
                    nút điều chỉnh không kéo ra ngay được mà phải xoay vặn (theo chiều ngược kim đồng hồ) để mở nút điều
                    chỉnh, sau đó mới kéo nhẹ ra các nấc cần điều chỉnh. Sau khi điều chỉnh xong phải đóng nút điều
                    chỉnh về vị trí ban đầu, ấn nút điều chỉnh vào đồng thời xoay vặn (theo chiều kim đồng hồ) đóng chặt
                    nút điều chỉnh để tránh nước bị thẩm thấu vào máy.
                  </p>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
        {/* <!--  --> */}
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
      {/* <!--  --> */}
      <div className={styles.container}>
        <div className={styles.tabContentChars}>
          <div className={styles.titleDescription}>
            Mô tả Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00
          </div>
          <div className={styles.prodetailsTabContent}>
            <div className={styles.tabContentRight}>
              <div className={styles.description} id="boxdesc">
                <div id="box-content-linfo" style={{ maxHeight: "400px" }}>
                  <div className={styles.boxdesc}>
                    <p>
                      Tissot Chemin des Tourelles Powermatic 80 là chiếc đồng hồ tự động do Thụy Sĩ sản xuất, được biết
                      đến với thiết kế bóng bẩy và khả năng dự trữ năng lượng lâu dài. Đồng hồ được cung cấp bởi bộ máy
                      Powermatic 80, có khả năng dự trữ năng lượng trong 80 giờ. Điều này có nghĩa là đồng hồ có thể
                      hoạt động liên tục trong 3 ngày mà không bị lên dây cót.
                    </p>

                    <h2>
                      <strong>Đánh giá về thiết kế Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00</strong>
                    </h2>

                    <p>
                      <a href="#">T139.807.22.038.00 </a>
                      có đường kính 39mm, vỏ bằng thép không gỉ 316L với mạ PVD bằng vàng hồng. Đồng hồ có mặt số màu
                      trắng với các kim và vạch chỉ giờ màu vàng. Đồng hồ cũng có lịch ngày ở vị trí 6 giờ.
                    </p>

                    <p>
                      <img
                        className={styles.lazy}
                        alt=""
                        style={{ display: "inline-block", opacity: 1 }}
                        src="../public/img/item/detail-hinh2.jpg"
                      />
                    </p>

                    <p>
                      T139.807.22.038.00 là chiếc đồng hồ đeo tay hoàn hảo để đeo hàng ngày. Đồng hồ cũng có khả năng
                      chống nước ở độ sâu 50 mét, vì vậy nó có thể được đeo hàng ngày như đi làm văn phòng, đi chơi...
                    </p>

                    <p>Đặc điểm:</p>
                    <p>
                      - Bộ máy Powermatic 80 với dự trữ năng lượng 80 giờ
                      <br />
                      - Vỏ thép không gỉ mạ vàng hồng PVD
                      <br />
                      - Mặt số màu trắng với kim và vạch số màu vàng
                      <br />
                      - Lịch ngày ở vị trí 6 giờ
                      <br />
                      - Chống nước đến 50 mét
                      <br />
                      Tissot T139.807.22.038.00 là sự lựa chọn tuyệt vời cho bất kỳ ai đang tìm kiếm một chiếc đồng hồ
                      thời trang và đáng tin cậy.
                    </p>

                    <p>
                      <img
                        className={styles.lazy}
                        alt=""
                        style={{ display: "inline-block", opacity: 1 }}
                        src="../public/img/item/detail-hinh3.jpg"
                      />
                    </p>

                    <p>
                      T139.807.22.038.00 đã nhận được đánh giá tích cực từ các nhà phê bình cũng như khách hàng. Chiếc
                      đồng hồ này đã được ca ngợi vì thiết kế bóng bẩy, khả năng dự trữ năng lượng lâu dài và độ bền của
                      nó.
                    </p>

                    <p>
                      <img
                        className={styles.lazy}
                        alt=""
                        style={{ display: "inline-block", opacity: 1 }}
                        src="../public/img/item/detail-hinh4.jpg"
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
                      <br />
                      <em>- "Vỏ thép không gỉ rất bền và sẽ tồn tại trong nhiều năm tới."</em> - Gear Patrol
                    </p>

                    <ul>
                      <li>
                        <strong>
                          <a href="#" title="Top 10 mẫu đồng hồ Tissot mới nhất năm 2023">
                            TOP 10 MẪU ĐỒNG HỒ TISSOT MỚI NHẤT NĂM 2023
                          </a>
                        </strong>
                      </li>
                    </ul>

                    <h2>
                      <strong>Địa chỉ mua đồng hồ Tissot T139.807.22.038.00 chính hãng uy tín</strong>
                    </h2>

                    <p>
                      Hiện tại mẫu đồng hồ T139.807.22.038.00 có sẵn để mua tại Duy Anh Watch. Đại lý ủy quyền chính
                      thức của Tissot tại Việt Nam. Khách hàng có thể tới tham khảo sản phẩm tại các showroom:&nbsp;
                    </p>

                    <p>- Địa chỉ: 200A Phố Huế, Quận Hai Bà Trưng, Hà Nội</p>
                    <p>Điện thoại: (024)2.214.8336</p>
                    <p>- Địa chỉ: F4-B08, Tầng 4, Trung Tâm Thương Mại Lotte Center, 54 Liễu Giai, Q.Ba Đình, Hà Nội</p>
                    <p>Điện thoại: (024)32676.555</p>
                    <p>- Địa chỉ: Tầng 2, TTTM Vincom Trần Duy Hưng, 119 Trần Duy Hưng, Cầu Giấy, Hà Nội</p>
                    <p>Điện thoại: (024)6656.6660</p>
                    <p>- Địa chỉ: 205 Trần Hưng Đạo, phường Cô Giang, Quận 1, TP.Hồ Chí Minh</p>
                    <p>Điện thoại: 0836.88.99.86</p>
                    <p>- Địa chỉ: 300 Hai Bà Trưng, phường Tân Định, Quận 1, TP. Hồ Chí Minh</p>
                    <p>Điện thoại: 08899.36168</p>

                    <div className={styles.youtubeEmbedWrapper}>
                      <iframe
                        className={styles.lazyif}
                        loading="lazy"
                        allow=";"
                        allowFullScreen
                        frameBorder="0"
                        height="360"
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        width="640"
                        src="https://www.youtube.com/embed/TUvPHS9q3oo"
                      ></iframe>
                    </div>

                    <p>
                      <br />
                      T139.807.22.038.00 là sự lựa chọn tuyệt vời cho bất kỳ ai đang tìm kiếm một chiếc đồng hồ thời
                      trang và đáng tin cậy. Đồng hồ có khả năng dự trữ năng lượng lâu dài và thiết kế sang trọng, chắc
                      chắn sẽ làm hài lòng người sử dụng.
                    </p>
                  </div>
                </div>
                <div id="readmore" className={styles.readmore}>
                  <a href="#">Xem thêm thông tin</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.clear}></div>
      {/* <!--  --> */}
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
                style={{ width: "4248px", transform: "translate3d(-1180px, 0px, 0px)", transition: "0.25s" }}
              >
                {/* <!-- Owl-Item Cloned 1  --> */}
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Đồng hồ nam Tissot Chemin des Tourelles Squelette T139.836.16.261.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Đồng hồ nam Tissot Chemin des Tourelles Squelette T139.836.16.261.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh5.webp"
                            srcSet="../public/img/product/detail-hinh5.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh5.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Đồng hồ nam Tissot Chemin des Tourelles Squelette T139.836.16.261.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin des Tourelles</span>
                          T139.836.16.261.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>39mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>27.300.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.570.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9093}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!-- Owl-Item Cloned 2  --> */}
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles  T099.407.22.037.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles  T099.407.22.037.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh6.webp"
                            srcSet="../public/img/product/detail-hinh6.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh6.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles  T099.407.22.037.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles</span>
                          T099.407.22.037.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>28.700.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 25.830.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div
                        className={`${styles.itemSs} ${styles.itemSs9093}`}
                        data-id="9093"
                        data-table="fs_products_dong_ho"
                      >
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!-- Owl-Item Cloned 3  --> */}
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.11.058.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.11.058.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh7.webp"
                            srcSet="../public/img/product/detail-hinh7.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh7.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.11.058.00" className={styles.name}>
                          <span className={styles.catName}>Tissot Chemin Des Tourelles </span>
                          T099.407.11.058.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>25.200.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 22.680.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9093}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!-- Owl-Item Cloned 4  --> */}
                import styles from './styles.module.css';
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles Powermatic 80 T099.407.11.033.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles Powermatic 80 T099.407.11.033.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh8.webp"
                            srcSet="../public/img/product/detail-hinh8.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh8.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Tissot Chemin Des Tourelles Powermatic 80 T099.407.11.033.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Tissot Chemin Des Tourelles </span>
                          80 T099.407.11.033.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>28.700.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 25.830.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9093}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!-- Owl-Item Cloned 5  --> */}
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.407.11.091.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.407.11.091.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh9.webp"
                            srcSet="../public/img/product/detail-hinh9.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh9.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.407.11.091.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin des Tourelles </span>
                          80 T139.407.11.091.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>24.850.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 22.365.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9093}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!-- Owl Item active 1 --> */}
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
                            data-src="../public/img/product/detail-hinh2.webp"
                            srcSet="../public/img/product/detail-hinh2.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh2.webp"
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

                      <div className={`${styles.itemSs} ${styles.itemSs20789}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* <!-- Owl Item active  2 --> */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles Powermatic 80 T099.407.36.448.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles Powermatic 80 T099.407.36.448.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh3.webp"
                            srcSet="../public/img/product/detail-hinh3.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh3.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Tissot Chemin Des Tourelles Powermatic 80 T099.407.36.448.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.36.448.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>28.700.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 25.830.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9093}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* <!-- Owl Item active 3 --> */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh4.webp"
                            srcSet="../public/img/product/detail-hinh4.webp"
                            style={{ opacity: 1, display: "block" }}
                            src="../public/img/product/detail-hinh4.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T139.807.22.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>39mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9249}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* <!-- Owl Item active 4 --> */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Đồng hồ nam Tissot Chemin des Tourelles Squelette T139.836.16.261.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Đồng hồ nam Tissot Chemin des Tourelles Squelette T139.836.16.261.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh5.webp"
                            srcSet="../public/img/product/detail-hinh5.webp"
                            style={{ opacity: 1, display: "block" }}
                            src="../public/img/product/detail-hinh5.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Đồng hồ nam Tissot Chemin des Tourelles Squelette T139.836.16.261.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T139.836.16.261.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>39mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>27.300.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.570.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs12124}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* <!-- Owl Item active 5 --> */}
                <div className={`${styles.owlItem} ${styles.active}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles  T099.407.22.037.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles  T099.407.22.037.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh6.webp"
                            srcSet="../public/img/product/detail-hinh6.webp"
                            style={{ opacity: 1, display: "block" }}
                            src="../public/img/product/detail-hinh6.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles  T099.407.22.037.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles </span>
                          T099.407.22.037.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>28.700.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 25.830.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs12124}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                  </div>
                </div>
                {/* <!-- Owl Item 1 --> */}
                <div className={styles.owlItem} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.11.058.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.11.058.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh6.webp"
                            srcSet="../public/img/product/detail-hinh6.webp"
                            style={{ opacity: 1, display: "block" }}
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.11.058.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles</span>
                          T099.407.11.058.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>25.200.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 22.680.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9249}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!--Owl Item 2  --> */}
                <div className={styles.owlItem} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles Powermatic 80 T099.407.11.033.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles Powermatic 80 T099.407.11.033.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh7.webp"
                            srcSet="../public/img/product/detail-hinh7.webp"
                            style={{ opacity: 1, display: "block" }}
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Tissot Chemin Des Tourelles Powermatic 80 T099.407.11.033.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Tissot Chemin Des Tourelles </span>
                          T099.407.11.033.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>28.700.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 25.830.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9249}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!--Owl Item 3 --> */}
                <div className={styles.owlItem} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.407.11.091.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.407.11.091.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh8.webp"
                            srcSet="../public/img/product/detail-hinh8.webp"
                            style={{ opacity: 1, display: "block" }}
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.407.11.091.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin des Tourelles </span>
                          T139.407.11.091.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>24.850.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 22.365.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9249}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* 
              <!-- Owl-Item Cloned 6  --> */}
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh2.webp"
                            srcSet="../public/img/product/detail-hinh2.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh2.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles</span>
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

                      <div className={`${styles.itemSs} ${styles.itemSs9181}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!-- Owl-Item Cloned 7  --> */}
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles Powermatic 80 T099.407.36.448.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles Powermatic 80 T099.407.36.448.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh3.webp"
                            srcSet="../public/img/product/detail-hinh3.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh3.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Tissot Chemin Des Tourelles Powermatic 80 T099.407.36.448.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Tissot Chemin Des Tourelles </span>
                          T099.407.36.448.00
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

                      <div className={`${styles.itemSs} ${styles.itemSs9181}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!-- Owl-Item Cloned 8 --> */}
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh4.webp"
                            srcSet="../public/img/product/detail-hinh4.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh4.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a
                          href="#"
                          title="Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00"
                          className={styles.name}
                        >
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin des Tourelles </span>
                          T139.807.22.038.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>39mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>26.950.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 24.255.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9181}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!-- Owl-Item Cloned 9 --> */}
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.36.038.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh5.webp"
                            srcSet="../public/img/product/detail-hinh5.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh5.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.36.038.00" className={styles.name}>
                          <span className={styles.catName}>Đồng hồ nam Tissot Chemin Des Tourelles</span>
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

                      <div className={`${styles.itemSs} ${styles.itemSs9181}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
                  </div>
                </div>
                {/* <!-- Owl Item Cloned 10 --> */}
                <div className={`${styles.owlItem} ${styles.cloned}`} style={{ width: "226px", marginRight: "10px" }}>
                  <div className={styles.item}>
                    <div className={styles.frameInner}>
                      <figure className={styles.productImage}>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.22.037.00">
                          <img
                            className={`${styles.owlLazy} ${styles.afterLazy}`}
                            alt="Tissot Chemin Des Tourelles T099.407.22.037.00"
                            width="300"
                            height="363"
                            data-src="../public/img/product/detail-hinh6.webp"
                            srcSet="../public/img/product/detail-hinh6.webp"
                            style={{ display: "block", opacity: 1 }}
                            src="../public/img/product/detail-hinh6.webp"
                          />
                        </a>
                      </figure>

                      <h2>
                        <a href="#" title="Tissot Chemin Des Tourelles T099.407.22.037.00" className={styles.name}>
                          <span className={styles.catName}>Tissot Chemin Des Tourelles</span>
                          T099.407.22.037.00
                        </a>
                      </h2>

                      <span className={styles.loaiMay}>Automatic</span>
                      <span className={styles.rowLm}>|</span>
                      <span className={styles.duongKinh}>42mm</span>
                      <div className={styles.priceArae}>
                        <div className={styles.priceOld}>
                          Giá: <span>28.700.000₫</span>
                        </div>
                        <div className={styles.priceCurrent}>Giá KM: 25.830.000₫</div>
                      </div>

                      <div className={styles.discount}>
                        <span>-10%</span>
                      </div>

                      <div className={`${styles.itemSs} ${styles.itemSs9181}`}>
                        <span className={styles.iconSs}></span>
                        <span className={styles.txtSs}> So sánh </span>
                      </div>

                      <div className={styles.clear}></div>
                    </div>
                    {/* <!-- end .frame_inner --> */}
                    <div className={styles.clear}></div>
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
      {/* <!--Đánh giá bình luận  --> */}

      <div className={styles.bottomDetail}>
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
                  <strong> về Đồng hồ nam Tissot Chemin des Tourelles Powermatic 80 T139.807.22.038.00</strong>
                </div>
                <form>
                  <input
                    type="text"
                    className={styles.commentKeywordWrapper}
                    id="comment-keyword"
                    name="comment-keyword"
                    placeholder="Tìm theo nội dung, người gửi..."
                  />
                  <button type="submit" className={styles.commentKeywordBtn}>
                    <i className="fa fa-search"></i>
                  </button>
                </form>
                <div id="-info-comment" className={styles.cls}></div>
                <form name="comment-add-form" id="comment-add-form" className={`${styles.formComment} ${styles.cls}`}>
                  <label className={styles.labelForm}>Nhận xét và đánh giá</label>
                  <div className={styles.ratingArea}>
                    <span id="ratings" className={styles.cls}>
                      <i className={`icon_v1 star_on ${styles.rate1}`} value="1"></i>
                      <i className={`icon_v1 star_on ${styles.rate2}`} value="2"></i>
                      <i className={`icon_v1 star_on ${styles.rate3}`} value="3"></i>
                      <i className={`icon_v1 star_off ${styles.rate4}`} value="4"></i>
                      <i className={`icon_v1 star_off ${styles.rate5}`} value="5"></i>
                    </span>
                    <span className={styles.ratingNote}>Nhấn vào đây để đánh giá</span>
                  </div>
                  <div className={styles.textarea}>
                    <textarea name="content" id="cmt-content" placeholder="Viết bình luận của bạn..."></textarea>
                  </div>
                  <input type="button" className={styles.btnCommentMb} value="Gửi bình luận" />
                  <div className={styles.wrapR} style={{ display: "none" }}>
                    <div className={styles.titleMb}>
                      Thông tin người gửi
                      <span className={styles.closeMdComment}>
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </div>
                    <div className={styles.wrapLoginPost}>
                      <aside className={styles.right}>
                        <div>
                          <input
                            className={styles.txtInput}
                            required=""
                            name="name"
                            type="text"
                            placeholder="Họ tên (bắt buộc)"
                            id="cmt-name"
                            autoComplete="off"
                            value=""
                          />
                        </div>
                        <div>
                          <input
                            className={styles.txtInput}
                            required=""
                            name="email"
                            type="email"
                            placeholder="Email (bắt buộc)"
                            id="cmt-email"
                            value=""
                          />
                        </div>
                      </aside>
                    </div>
                    <div className={styles.wrapSubmit}>
                      <div className={styles.pullRight}>
                        <input type="submit" className={styles.btnComment} value="Gửi bình luận" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
