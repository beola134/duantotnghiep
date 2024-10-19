"use client";
import React, { useEffect, useState } from "react";
import styles from "./bannerslide1.module.css";
import classNames from "classnames/bind";
import Script from "next/script";

export default function BannerSlide1() {
  const cx = classNames.bind(styles);
  useEffect(() => {
    const $carousel = $(".slider-carousel");

    // Khởi tạo Owl Carousel
    $carousel.owlCarousel({
      items: 1, // Chỉ hiện 1 item mỗi lần
      loop: true, // Lặp lại slider
      autoplay: true, // Tự động chuyển ảnh
      autoplayTimeout: 5000, // Thời gian chuyển ảnh (5 giây)
      autoplayHoverPause: true, // Dừng khi hover
      dots: false, // Hiện dots
      nav: false, // Hiện nút điều hướng
    });

    // Dọn dẹp khi component unmount
    return () => {
      $carousel.trigger("destroy.owl.carousel");
    };
  }, []);

  return (
    <>
      <div className={cx("slider-collection")}>
        <div class={cx("pav-slide-content")}>
          <div
            className={cx("slider-carousel", "fs-slider-home", "fs-slider-home-content", "owl-carousel", "owl-theme")}
          >
            <div className={cx("item")}>
              <img src="/image/banner/banner1.jpg" />
            </div>
            <div className={cx("item")}>
              <img src="/image/banner/banner2.png" alt="Banner 2" />
            </div>
            <div className={cx("item")}>
              <img src="/image/banner/banner3.jpg" alt="Banner 3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
