"use client";
import React,{ useEffect,useState } from "react";
import Slider from "react-slick";
import styles from "./banner.module.css";
import classNames from "classnames/bind";
import Script from "next/script";
import BannerSlide1 from "../../bannerslide1/page";
import BannerSlide2 from "../../bannerslide2/page";

const items = [
  { src: "/image/item/Thuonghieu-carousel/casio.webp", alt: "Casio" },
  { src: "/image/item/Thuonghieu-carousel/orient.webp", alt: "Orient" },
  { src: "/image/item/Thuonghieu-carousel/citizen.webp", alt: "Citizen" },
  { src: "/image/item/Thuonghieu-carousel/seiko.webp", alt: "Seiko" },
  { src: "/image/item/Thuonghieu-carousel/frederique-constant-geneve.webp", alt: "Frederique Constant Geneve" },
  { src: "/image/item/Thuonghieu-carousel/certina.webp", alt: "Certina" },
  { src: "/image/item/Thuonghieu-carousel/titoni.webp", alt: "Titoni" },
  { src: "/image/item/Thuonghieu-carousel/hamilton.webp", alt: "Hamilton" },
  { src: "/image/item/Thuonghieu-carousel/mido.webp", alt: "Mido" },
  { src: "/image/item/Thuonghieu-carousel/tissot.webp", alt: "Tissot" },
  { src: "/image/item/Thuonghieu-carousel/longines.webp", alt: "Longines" },
  { src: "/image/item/Thuonghieu-carousel/maurice-lacroix.webp", alt: "Maurice Lacroix" },
  { src: "/image/item/Thuonghieu-carousel/fossil.webp", alt: "Fossil" },
  { src: "/image/item/Thuonghieu-carousel/danicel-wellington.webp", alt: "Danicel Wellington" },
  { src: "/image/item/Thuonghieu-carousel/calvin-klein.webp", alt: "Calvin Klein" },
  { src: "/image/item/Thuonghieu-carousel/Olym Pianus.webp", alt: "Olym Pianus" },
];
const cx = classNames.bind(styles);
export default function Banner() {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, 
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    autoplaySpeed: 3000, 
  };
  const [slider, setSlider] = useState(null); 
  useEffect(() => {
    const interval = setInterval(() => {
      if (slider) {
        next();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [slider]); 
  return (
    <>
      <BannerSlide1 />
      <section className={cx("section-banner")}>
        <div className={cx("typewriter")}>
          <p className={cx("typewriter1")}>WRISTLY - SỐ LƯỢNG ĐỒNG HỒ ĐA DẠNG</p>
        </div>
      </section>

      <section className={cx("icon-section")}>
        <div className={cx("icon-container")}>
          <div className={cx("icon1")}>
            <img src="/image/item/icons/icons_1.png" alt="Icon 1" className={cx("icon-image1")} loading="lazy" />
          </div>
          <div className={cx("text-container")}>
            <p>
              <b>PHÒNG BẢO HÀNH ĐẠT</b>
            </p>
            <small>TIÊU CHUẨN THỤY SĨ</small>
          </div>
        </div>

        <div className={cx("icon-container")}>
          <div className={cx("icon1", "gold")}>
            <img src="/image/item/icons/icon_2.png" alt="Icon 2" className={cx("icon-image1")} loading="lazy" />
          </div>
          <div className={cx("text-container")}>
            <p>
              <b>THƯƠNG HIỆU UY TÍN</b>
            </p>
            <small>LÂU ĐỜI 70 NĂM</small>
          </div>
        </div>

        <div className={cx("icon-container")}>
          <div className={cx("icon1")}>
            <img src="/image/item/icons/icon_3.png" alt="Icon 3" className={cx("icon-image1")} loading="lazy" />
          </div>
          <div className={cx("text-container")}>
            <p>
              <b>ĐỀN 20 LẦN NẾU BÁN</b>
            </p>
            <small>HÀNG FAKE</small>
          </div>
        </div>
      </section>

      <section className={cx("section-img")}>
        <div className={cx("img-banner")}>
          <img
            src="/image/banner/longines-sale_1.jpg"
            alt="Longines Sale Banner"
            width="500"
            height="300"
            loading="lazy"
          />
        </div>
        <div className={cx("img-banner")}>
          <img src="/image/banner/tissot gentleman.jpg" alt="Tissot Banner" loading="lazy" />
        </div>
      </section>

      <section className={cx("brand")}>
        <div className={cx("pav-slide-content")}>
          <div className={cx("fs-slider-home", "fs-slider-home-content", "brand-slider")}>
            <Slider {...settings}>
              {items.map((item, index) => (
                <div className={cx("item")} key={index}>
                  <img src={item.src} alt={item.alt} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <BannerSlide2 />

      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
        strategy="lazyOnload"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
      />
    </>
  );
}
