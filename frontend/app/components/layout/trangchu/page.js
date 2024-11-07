"use client";
import React, { useEffect, useState } from "react";
import styles from "./trangchu.module.css";
import Slider from "react-slick";
import classNames from "classnames/bind";
import Banner from "../banner/page";
import Link from "next/link";

const cx = classNames.bind(styles);

export default function Main() {
   
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [firstSlider, setFirstSlider] = useState(null);
  const [secondSlider, setSecondSlider] = useState(null);

  
  const firstSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

 
  const secondSettings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

 
  const nextFirst = () => {
    if (firstSlider) {
      firstSlider.slickNext();
    }
  };

  const prevFirst = () => {
    if (firstSlider) {
      firstSlider.slickPrev();
    }
  };

  const nextSecond = () => {
    if (secondSlider) {
      secondSlider.slickNext();
    }
  };

  const prevSecond = () => {
    if (secondSlider) {
      secondSlider.slickPrev();
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (firstSlider) {
        nextFirst();
      }
      if (secondSlider) {
        nextSecond();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [firstSlider, secondSlider]);


  const [productsNam, setProductsNam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/product/allsp/gioitinh-nam10sp");
      const data = await response.json();
      setProductsNam(data.products);
    };

    fetchData();
  }, []);

  const [productsNu, setProductsNu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/product/allsp/gioitinh-nu10sp");
      const data = await response.json();
      setProductsNu(data.products);
    };

    fetchData();
  }, []);

  const [productsDoi, setProductsDoi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/product/allsp/doi10sp");
      const data = await response.json();
      setProductsDoi(data.products);
    };

    fetchData();
  }, []);

  
  const [productsNewNam, setProductsNewNam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/product/limit/gioitinh-nam");
      const data = await response.json();
      setProductsNewNam(data.products);
    };

    fetchData();
  }, []);

  const [productsNewNu, setProductsNewNu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/product/limit/gioitinh-nu");
      const data = await response.json();
      setProductsNewNu(data.products);
    };

    fetchData();
  }, []);

  const [productsNewDoi, setProductsNewDoi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/product/limit/doi");
      const data = await response.json();
      setProductsNewDoi(data.products);
    };

    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/cate/allcate");
      const data = await response.json();
      setCategory(data.cates);
    };

    fetchData();
  }, []);

  // tính % sản phẩm
  const roundDiscount = (discountPercentage) => {
    const discountLevels = [10, 15, 20, 25, 30, 40, 50];
    return discountLevels.reduce((prev, curr) =>
      Math.abs(curr - discountPercentage) < Math.abs(prev - discountPercentage) ? curr : prev
    );
  };

  return (
    <>
      <Banner />
      <section>
        <div className={styles.productContainer}>
          <p className={styles.featuredTitle}>TẤT CẢ SẢN PHẨM</p>
          <div className={styles.tab}>
            <p
              className={activeTab === "tab1" ? styles.active1 : styles.tabItem}
              onClick={() => handleTabClick("tab1")}
            >
              ĐỒNG HỒ NAM
            </p>
            <p
              className={activeTab === "tab2" ? styles.active1 : styles.tabItem}
              onClick={() => handleTabClick("tab2")}
            >
              ĐỒNG HỒ NỮ
            </p>
            <p
              className={activeTab === "tab3" ? styles.active1 : styles.tabItem}
              onClick={() => handleTabClick("tab3")}
            >
              ĐỒNG HỒ ĐÔI
            </p>
          </div>
          <div>
            {activeTab === "tab1" && (
              <div className={styles.dongHoNam}>
                {productsNam.map((item) => (
                  <div key={item._id} className={styles.watch}>
                    <div className={styles.discountBadge}>
                      - {roundDiscount(Math.round(((item.gia_san_pham - item.gia_giam) / item.gia_san_pham) * 100))}%
                    </div>
                    <Link href={`/components/product-detail/${item._id}`}>
                      <img src={`http://localhost:5000/images/${item.hinh_anh}`} alt={item.ten_san_pham} />
                    </Link>
                    <p>
                      <small>{item.ten_san_pham}</small>
                    </p>
                    <br />
                    <b>{item.ma_san_pham}</b>
                    <p>
                      <small>
                        {item.loai} | {item.duong_kinh}
                      </small>
                    </p>
                    <p>
                      <small style={{ textDecoration: "line-through", color: "#B1B1B1", fontSize: "15px" }}>
                        Giá: {formatCurrency(item.gia_san_pham)}
                      </small>
                    </p>
                    <p>
                      <span className={styles.priceKm}>Giá KM: {formatCurrency(item.gia_giam)}</span>
                    </p>
                  </div>
                ))}
                <div className={styles.xemThem}>
                  <p>
                    <Link href="/components/donghonam">
                      <b>XEM THÊM ĐỒNG HỒ NAM</b>
                    </Link>
                  </p>
                </div>
              </div>
            )}
            {activeTab === "tab2" && (
              <div className={styles.dongHoNu}>
                {productsNu.map((item) => (
                  <div key={item._id} className={styles.watch}>
                    <div className={styles.discountBadge}>
                      - {roundDiscount(Math.round(((item.gia_san_pham - item.gia_giam) / item.gia_san_pham) * 100))}%
                    </div>
                    <Link href={`/components/product-detail/${item._id}`}>
                      <img src={`http://localhost:5000/images/${item.hinh_anh}`} alt={item.ten_san_pham} />
                    </Link>
                    <p>
                      <small>{item.ten_san_pham}</small>
                    </p>
                    <br />
                    <b>{item.ma_san_pham}</b>
                    <p>
                      <small>
                        {item.loai} | {item.duong_kinh}
                      </small>
                    </p>
                    <p>
                      <small style={{ textDecoration: "line-through", color: "#B1B1B1" }}>
                        Giá: {formatCurrency(item.gia_san_pham)}
                      </small>
                    </p>
                    <p>
                      <span className={styles.priceKm}>Giá KM: {formatCurrency(item.gia_giam)}</span>
                    </p>
                  </div>
                ))}
                <div className={styles.xemThem}>
                  <p>
                    <Link href="/components/donghonu">
                      <b>XEM THÊM ĐỒNG HỒ NỮ</b>
                    </Link>
                  </p>
                </div>
              </div>
            )}
            {activeTab === "tab3" && (
              <div className={styles.dongHoDoi}>
                {productsDoi.map((item) => (
                  <div key={item._id} className={styles.watch}>
                    <div className={styles.discountBadge}>
                      - {roundDiscount(Math.round(((item.gia_san_pham - item.gia_giam) / item.gia_san_pham) * 100))}%
                    </div>
                    <Link href={`/components/product-detail/${item._id}`}>
                      <img src={`http://localhost:5000/images/${item.hinh_anh}`} alt={item.ten_san_pham} />
                    </Link>
                    <p>
                      <small>{item.ten_san_pham}</small>
                    </p>
                    <br />
                    <b>{item.ma_san_pham}</b>
                    <p>
                      <small>
                        {item.loai} | {item.duong_kinh}
                      </small>
                    </p>
                    <p>
                      <small style={{ textDecoration: "line-through", color: "#B1B1B1" }}>
                        Giá: {formatCurrency(item.gia_san_pham)}
                      </small>
                    </p>
                    <p>
                      <span className={styles.priceKm}>Giá KM: {formatCurrency(item.gia_giam)}</span>
                    </p>
                  </div>
                ))}
                <div className={styles.xemThem}>
                  <p>
                    <Link href="/components/donghodoi">
                      <b>XEM THÊM ĐỒNG HỒ ĐÔI</b>
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className={styles.productContainer}>
          <p className={styles.featuredTitle}>SẢN PHẨM MỚI</p>
          <div className={styles.tab}>
            <p
              className={activeTab === "tab1" ? styles.active1 : styles.tabItem}
              onClick={() => handleTabClick("tab1")}
            >
              ĐỒNG HỒ NAM
            </p>
            <p
              className={activeTab === "tab2" ? styles.active1 : styles.tabItem}
              onClick={() => handleTabClick("tab2")}
            >
              ĐỒNG HỒ NỮ
            </p>
            <p
              className={activeTab === "tab3" ? styles.active1 : styles.tabItem}
              onClick={() => handleTabClick("tab3")}
            >
              ĐỒNG HỒ ĐÔI
            </p>
          </div>
          <div>
            {activeTab === "tab1" && (
              <div className={styles.dongHoNam}>
                {productsNewNam.map((item) => (
                  <div key={item._id} className={styles.watch}>
                    <div className={styles.discountBadge}>
                      - {roundDiscount(Math.round(((item.gia_san_pham - item.gia_giam) / item.gia_san_pham) * 100))}%
                    </div>
                    <Link href={`/components/product-detail/${item._id}`}>
                      <img src={`http://localhost:5000/images/${item.hinh_anh}`} alt={item.ten_san_pham} />
                    </Link>
                    <p>
                      <small>{item.ten_san_pham}</small>
                    </p>
                    <br />
                    <b>{item.ma_san_pham}</b>
                    <p>
                      <small>
                        {item.loai} | {item.duong_kinh}
                      </small>
                    </p>
                    <p>
                      <small style={{ textDecoration: "line-through", color: "#B1B1B1" }}>
                        Giá: {formatCurrency(item.gia_san_pham)}
                      </small>
                    </p>
                    <p>
                      <span className={styles.priceKm}>Giá KM: {formatCurrency(item.gia_giam)}</span>
                    </p>
                    <div className={styles.overlay}>New</div>
                  </div>
                ))}
                <div className={styles.xemThem}>
                  <p>
                    <Link href="/components/donghonew?query=gioi_tinh=Nam">
                      <b>XEM THÊM ĐỒNG HỒ NAM MỚI</b>
                    </Link>
                  </p>
                </div>
              </div>
            )}
            {activeTab === "tab2" && (
              <div className={styles.dongHoNu}>
                {productsNewNu.map((item) => (
                  <div key={item._id} className={styles.watch}>
                    <div className={styles.discountBadge}>
                      - {roundDiscount(Math.round(((item.gia_san_pham - item.gia_giam) / item.gia_san_pham) * 100))}%
                    </div>
                    <Link href={`/components/product-detail/${item._id}`}>
                      <img src={`http://localhost:5000/images/${item.hinh_anh}`} alt={item.ten_san_pham} />
                    </Link>
                    <p>
                      <small>{item.ten_san_pham}</small>
                    </p>
                    <br />
                    <b>{item.ma_san_pham}</b>
                    <p>
                      <small>
                        {item.loai} | {item.duong_kinh}
                      </small>
                    </p>
                    <p>
                      <small style={{ textDecoration: "line-through", color: "#B1B1B1" }}>
                        Giá: {formatCurrency(item.gia_san_pham)}
                      </small>
                    </p>
                    <p>
                      <span className={styles.priceKm}>Giá KM: {formatCurrency(item.gia_giam)}</span>
                    </p>
                    <div className={styles.overlay}>New</div>
                  </div>
                ))}
                <div className={styles.xemThem}>
                  <p>
                    <Link href="/components/donghonew?query=gioi_tinh=Nữ">
                      <b>XEM THÊM ĐỒNG HỒ NỮ MỚi</b>
                    </Link>
                  </p>
                </div>
              </div>
            )}
            {activeTab === "tab3" && (
              <div className={styles.dongHoDoi}>
                {productsNewDoi.map((item) => (
                  <div key={item._id} className={styles.watch}>
                    <div className={styles.discountBadge}>
                      - {roundDiscount(Math.round(((item.gia_san_pham - item.gia_giam) / item.gia_san_pham) * 100))}%
                    </div>
                    <Link href={`/components/product-detail/${item._id}`}>
                      <img src={`http://localhost:5000/images/${item.hinh_anh}`} alt={item.ten_san_pham} />
                    </Link>
                    <p>
                      <small>{item.ten_san_pham}</small>
                    </p>
                    <br />
                    <b>{item.ma_san_pham}</b>
                    <p>
                      <small>
                        {item.loai} | {item.duong_kinh}
                      </small>
                    </p>
                    <p>
                      <small style={{ textDecoration: "line-through", color: "#B1B1B1" }}>
                        Giá: {formatCurrency(item.gia_san_pham)}
                      </small>
                    </p>
                    <p>
                      <span className={styles.priceKm}>Giá KM: {formatCurrency(item.gia_giam)}</span>
                    </p>
                    <div className={styles.overlay}>New</div>
                  </div>
                ))}
                <div className={styles.xemThem}>
                  <p>
                    <Link href="/components/donghonew?query=gioi_tinh=Đồng Hồ Đôi">
                      <b>XEM THÊM ĐỒNG HỒ ĐÔI MỚI </b>
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className={styles.slideSection}>
        <div className={styles.title}>
          <p className={styles.titleIndex}>THƯƠNG HIỆU NỔI BẬT</p>
          <p>
            <a href="#">Xem tất cả &raquo;</a>
          </p>
        </div>
        <div className={styles.owlItem}>
          <Slider ref={setFirstSlider} {...firstSettings}>
            {category.map((item) => (
              <div key={item._id}>
                <div className={styles.item}>
                  <a href="#" title={item.danh_muc}>
                    <img
                      alt={item.danh_muc}
                      width="280"
                      height="130"
                      src={`http://localhost:5000/images/${item.hinh_anh2}`}
                      style={{ opacity: 1, display: "block" }}
                    />
                  </a>
                </div>
              </div>
            ))}
          </Slider>

          <button onClick={prevFirst} className={`${styles.navButton} ${styles.prevButton}`}>
            <img src="/image/item/icons/left.png"  width="40px" height="30px" />
          </button>

          <button onClick={nextFirst} className={`${styles.navButton} ${styles.nextButton}`}>
            <img src="/image/item/icons/right.png"  width="40px" height="30px" />
          </button>
        </div>
      </section>
      <div className={styles.ttContainer}>
        <p className={styles.titleVs}>Vì sao nên chọn chúng tôi</p>
        <div className={styles.iconList}>
          <div className={styles.iconItem}>
            <img src="/image/item/icons/huyhieu.png" className={styles.uytin} />
            <p>100% Hàng chính hãng</p>
          </div>
          <div className={styles.iconItem}>
            <img src="/image/item/icons/vanchuyen.png" className={styles.vanchuyen} />
            <p>Miễn phí vận chuyển</p>
          </div>
          <div className={styles.iconItem}>
            <img src="/image/item/picture4.jpg" className={styles.baove} />
            <p>Bảo hành 5 năm</p>
          </div>
          <div className={styles.iconItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={40} viewBox="0 0 24 24" className={styles.ngay}>
              <g fill="none" stroke="black" strokeWidth={1}>
                <path d="M3 20.4V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6Z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 16c0-4 4-8 4-8h-5"></path>
              </g>
            </svg>
            <p>Đổi hàng trong 7 ngày</p>
          </div>
        </div>

        <div className={styles.certificateSection}>
          <div className={styles.text}>
            <h3 className={styles.textTitle}>Đại lý ủy quyền chính thức các thương hiệu lớn</h3>
            <p className={styles.xtc}>Xem tất cả</p>

            <p className={styles.textBrand}>
              Chứng nhận Duy Anh Watch là đại lý ủy quyền chính thức của thương hiệu LONGINES tại Việt Nam (
              <a href="#">Xem ngay</a>).
            </p>

            <div className={styles.sectionBrand}>
              <div className={styles.sliderCll}>
                <div id="pav-slide-content">
                  <div className={styles.brandIndex}>
                    <div className={styles.itemSlide1}>
                      <Slider ref={setSecondSlider} {...secondSettings}>
                        {category.map((item) => (
                            <div className={styles.item} key={item._id}>
                                <img
                                  alt={item.danh_muc}
                                  width="390"
                                  height="50"
                                  src={`http://localhost:5000/images/${item.hinh_anh}`}   
                                />
                            </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img src="/image/item/icons/longines_1616385184.jpg.webp" alt="Chứng nhận" className={styles.imgChungnhan} />
        </div>
      </div>
      <div className={cx("container-news")}>
        <h2 className={cx("title-unline")}>TIN TỨC - VIDEO</h2>
        <div className={cx("section-news")}>
          {/* Phần tin tức */}
          <div className={cx("news-section")}>
            <div className={cx("item-left")}>
              <div className={cx("item-1")}>
                <div className={cx("news-item")}>
                  <h4>Lịch sử thương hiệu đồng hồ Maurice Lacroix</h4>
                  <p>
                    Với tuổi đời còn non trẻ trong làng chế tác đồng hồ Thụy Sỹ nhưng Maurice Lacroix đã dần khẳng định
                    được vị thế là nhà...
                  </p>
                  <p>
                    <i className="fa-solid fa-calendar-days"></i>
                    <small>04/10/2024</small>
                  </p>
                </div>
                <img
                  src="/image/item/icons/maurice-lacroix-brand-luxe-history_1728024212.jpg.webp"
                  alt="Maurice Lacroix"
                />
              </div>

              {/* Lặp lại các item tương tự */}
              <div className={cx("item-1")}>
                <div className={cx("news-item")}>
                  <h4>Lịch sử thương hiệu đồng hồ Maurice Lacroix</h4>
                  <p>
                    Với tuổi đời còn non trẻ trong làng chế tác đồng hồ Thụy Sỹ nhưng Maurice Lacroix đã dần khẳng định
                    được vị thế là nhà...
                  </p>
                  <p>
                    <i className="fa-solid fa-calendar-days"></i>
                    <small>04/10/2024</small>
                  </p>
                </div>
                <img
                  src="/image/item/icons/maurice-lacroix-brand-luxe-history_1728024212.jpg.webp"
                  alt="Maurice Lacroix"
                />
              </div>

              {/* Và tiếp tục thêm các item khác */}
              <div className={cx("item-1")}>
                <div className={cx("news-item")}>
                  <h4>Lịch sử thương hiệu đồng hồ Maurice Lacroix</h4>
                  <p>
                    Với tuổi đời còn non trẻ trong làng chế tác đồng hồ Thụy Sỹ nhưng Maurice Lacroix đã dần khẳng định
                    được vị thế là nhà...
                  </p>
                  <p>
                    <i className="fa-solid fa-calendar-days"></i>
                    <small>04/10/2024</small>
                  </p>
                </div>
                <img
                  src="/image/item/icons/maurice-lacroix-brand-luxe-history_1728024212.jpg.webp"
                  alt="Maurice Lacroix"
                />
              </div>
            </div>
          </div>

          {/* Phần video */}
          <div className={cx("video-section")}>
            <div className={cx("video-title")}>
              <img src="/image/item/icons/youtube.png" alt="YouTube Icon" />
              <p>Review Đồng Hồ Hamilton Jazzmaster Gmt Auto H32605581</p>
            </div>

            {/* Video chính */}
            <div className={cx("video-wrapper")}>
              <iframe src="https://www.youtube.com/embed/H32605581" frameBorder="0" allowFullScreen></iframe>
            </div>
            <h4 className={cx("title-video")}>Review Đồng Hồ Hamilton Jazzmaster GMT Auto H32605581</h4>

            {/* Video liên quan */}
            <div className={cx("related-videos")}>
              <div className={cx("related-video")}>
                <iframe src="https://www.youtube.com/embed/ID1" frameBorder="0" allowFullScreen></iframe>
                <p className={cx("title-videos")}>Review Đồng Hồ</p>
              </div>
              <div className={cx("related-video")}>
                <iframe src="https://www.youtube.com/embed/ID2" frameBorder="0" allowFullScreen></iframe>
                <p className={cx("title-videos")}>Review Đồng Hồ</p>
              </div>
              <div className={cx("related-video")}>
                <iframe src="https://www.youtube.com/embed/ID3" frameBorder="0" allowFullScreen></iframe>
                <p className={cx("title-videos")}>Review Đồng Hồ</p>
              </div>
              <div className={cx("related-video")}>
                <iframe src="https://www.youtube.com/embed/ID3" frameBorder="0" allowFullScreen></iframe>
                <p className={cx("title-videos")}>Review Đồng Hồ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
