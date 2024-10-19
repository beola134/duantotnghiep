"use client";
import React, { useEffect } from "react";
import styles from "./banner.module.css";
import classNames from "classnames/bind";
import Script from "next/script";
import BannerSlide1 from "../../bannerslide1/page";

export default function Banner() {
  const cx = classNames.bind(styles);
  useEffect(() => {
    if (typeof $ !== "undefined") {
      const brandSlider = $(".brand-slider");
      brandSlider.owlCarousel({
        items: 6,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        dots: false,
      });

      return () => {
        brandSlider.trigger("destroy.owl.carousel"); // Cleanup
      };
    }
  }, []);

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
            <img src="/image/item/icons_1.png" alt="Icon 1" className={cx("icon-image1")} loading="lazy" />
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
            <img src="/image/item/icon_2.png" alt="Icon 2" className={cx("icon-image1")} loading="lazy" />
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
            <img src="/image/item/icon_3.png" alt="Icon 3" className={cx("icon-image1")} loading="lazy" />
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
          <div className={cx("fs-slider-home", "fs-slider-home-content", "brand-slider", "owl-carousel", "owl-theme")}>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/casio.webp" alt="Casio" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/orient.webp" alt="Orient" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/citizen.webp" alt="Citizen" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/seiko.webp" alt="Seiko" />
            </div>
            <div className={cx("item")}>
              <img
                src="/image/item/Thuonghieu-carousel/frederique-constant-geneve.webp"
                alt="Frederique Constant Geneve"
              />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/certina.webp" alt="Certina" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/titoni.webp" alt="Titoni" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/hamilton.webp" alt="Hamilton" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/mido.webp" alt="Mido" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/tissot.webp" alt="Tissot" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/longines.webp" alt="Longines" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/maurice-lacroix.webp" alt="Maurice Lacroix" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/fossil.webp" alt="Fossil" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/danicel-wellington.webp" alt="Danicel Wellington" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/calvin-klein.webp" alt="Calvin Klein" />
            </div>
            <div className={cx("item")}>
              <img src="/image/item/Thuonghieu-carousel/Olym Pianus.webp" alt="Olym Pianus" />
            </div>
          </div>
        </div>
      </section>
      {/* <BannerSlide2 /> */}

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
