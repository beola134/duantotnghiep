import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // Hàm xử lý sự kiện cuộn
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
      <footer>
      
        {/* Footer Top */}
        <div className="bg-[#796752] py-[30px] mt-10">
        <div className="container">
          <div className={`${styles.blockContactSimple}`}>
            <div className={styles.item}>
              <div className={styles.icon}>
                <i className="fa-regular fa-clock"></i>
              </div>
              <div className={styles.title}>Mua hàng Online</div>
              <div className={styles.content}>Tất cả các ngày trong tuần</div>
            </div>
            <div className={`${styles.item}`}>
              <div className={styles.icon}>
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className={styles.item1}>
                <div className={styles.title}>Hỗ trợ bán hàng</div>
                <div className={styles.content}>084.5487.339</div>
              </div>
              <div className={styles.item2}>
                <div className={styles.title}>Hỗ trợ kỹ thuật</div>
                <div className={styles.content}>070.4434.597</div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.icon}>
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div className={styles.title}>Email</div>
              <div className={styles.content}>watchwristly@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <div className="clear-both"></div>

        {/* Footer Center */}

        <div className="container ">
          <div className={styles.footerFacebook}>
            <div className={styles.bottommenuFt}>
              <ul className={styles.menuBottom}>
                <li className={`${styles.level0}`}>
                  <span className={styles.clickMobile}></span>
                  <Link href="#">Về donghowristly</Link>
                  <ul id="menu-sub1">
                    <li className={styles.level1}>
                      <Link href="#">Giới thiệu về donghowristly</Link>
                    </li>
                    <li className={styles.level1}>
                      <Link href="#">Triết lý kinh doanh</Link>
                    </li>
                    <li className={styles.level1}>
                      <Link href="#">Giấy chứng nhận và giải thưởng</Link>
                    </li>
                    <li className={styles.level1}>
                      <Link href="#">Khách hàng nói gì về chúng tôi</Link>
                    </li>
                  </ul>
                </li>
                <li className={`${styles.level0} ${styles.menuItem}`}>
                  <span className={styles.clickMobile}></span>
                  <Link href="#">Chăm sóc khách hàng</Link>
                  <ul id="menu-sub6">
                    <li className={styles.menusubItem}>
                      <Link href="#">Hướng dẫn mua hàng</Link>
                    </li>
                    <li className={styles.menusubItem}>
                      <Link href="#">Chính sách đổi trả</Link>
                    </li>
                    <li className={styles.menusubItem}>
                      <Link href="#">Chính sách bảo hành</Link>
                    </li>
                    <li className={styles.menusubItem}>
                      <Link href="#">Dịch vụ và sửa chữa</Link>
                    </li>
                    <li className={styles.menusubItem}>
                      <Link href="#">Hướng dẫn sử dụng đồng hồ</Link>
                    </li>
                    <li className={styles.menusubItem}>
                      <Link href="#">Chính sách Khách hàng thân thiết</Link>
                    </li>
                  </ul>
                </li>
                <li className={`${styles.level0}`}>
                  <span className={styles.clickMobile}></span>
                  <Link href="#">Tiện ích</Link>
                  <ul id="menu-sub13">
                    <li className={styles.menusubItem}>
                      <Link href="#">Tin Tức Và Sự Kiện</Link>
                    </li>
                    <li className={styles.menusubItem}>
                      <Link href="#">Tuyển dụng</Link>
                    </li>
                    <li className={styles.menusubItem}>
                      <Link href="#">Thanh Toán</Link>
                    </li>
                    <li className={styles.menusubItem}>
                      <Link href="#">Mua hàng online</Link>
                    </li>
                    <li className={styles.menusubItem}>
                      <Link href="#">Mua Hàng Trả Góp</Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="clear-both"></div>
            </div>

            <div className={styles.fanpageFb}>
              <div
                className="fb-page"
                data-href="https://www.facebook.com/profile.php?id=61566364566665"
                data-tabs="timeline"
                data-width="300"
                data-height="70"
                data-small-header="false"
                data-adapt-container-width="false"
                data-hide-cover="false"
                data-show-facepile="false"
              >
                <blockquote
                  cite="https://www.facebook.com/profile.php?id=61566364566665"
                  className="fb-xfbml-parse-ignore"
                >
                  <Link href="https://www.facebook.com/profile.php?id=61566364566665">Đồng Hồ Wristly</Link>
                </blockquote>
              </div>

              <div className={styles.blockShare}>
                <div className={styles.titleSocial}>Liên kết</div>
                <div className={styles.socialFt}>
                  <Link href="">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>

                  <Link href="">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="clear-both"></div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-[#796752] text-[#f3f3f3] py-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2">
              <h3 className="font-semibold mb-3">CÔNG TY TNHH PHÁT TRIỂN WRISTLY</h3>
              <ul className="text-sm leading-6">
                <li>VPGD: Công viên phần mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12, TP.HCM</li>
                <li>Điện thoại: (08)4.5487.399</li>
                <li>MST: 0105545498 Cấp ngày: 03/10/2011 Nơi cấp: TP. Hồ Chí Minh</li>
              </ul>
            </div>

            <div className="md:w-2/5 mt-6 md:mt-0">
              <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <a href="#" className="block w-36">
                  <img src="/image/item/dathongbao.png" alt="Bộ công thương chứng nhận" className="w-full" />
                </a>
                <div className="text-right text-sm mt-5">&copy; WristlyWatch-All rights reserved</div>
              </div>

              <div className="mt-4">
                <a
                  href="https://www.dmca.com/Protection/Status.aspx?ID=5cdfd6b9-54ac-4fa8-953f-524e3520dffa&refurl=https://donghoduyanh.com/"
                  className="block w-36 mx-auto md:mx-0"
                >
                  <img src="/image/item/dmca_protected_sml_120l.png" alt="" className="w-full" />
                </a>
              </div>

              <div className="mt-6 text-center md:text-right text-sm">
                <div>
                  <a href="#" className="text-white">
                    Longines
                  </a>
                  <span className="mx-1">|</span>
                  <a href="#" className="text-white">
                    Tissot
                  </a>
                  <span className="mx-1">|</span>
                  <a href="#" className="text-white">
                    MIDO
                  </a>
                  <span className="mx-1">|</span>
                  <a href="#" className="text-white">
                    Frederique Constant
                  </a>
                  <span className="mx-1">|</span>
                  <a href="#" className="text-white">
                    Seiko
                  </a>
                  <span className="mx-1">|</span>
                  <a href="#" className="text-white">
                    Citizen
                  </a>
                  <span className="mx-1">|</span>
                  <a href="#" className="text-white">
                    Orient
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="fixedBar" style={{ position: "fixed", bottom: "168px", display: isVisible ? "block" : "none" }}>
            <div id="barInner">
              <button className={styles.goTop} href="" onClick={scrollToTop}>
                <i className="fa-solid fa-angles-up"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
