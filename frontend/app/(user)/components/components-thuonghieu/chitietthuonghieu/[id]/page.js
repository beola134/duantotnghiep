"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./chitietdanhmuc.module.css";
import Loading from "../../../loading/page";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function DanhMuc({ params }) {
  const { id: thuong_hieu } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    gioi_tinh: "",
    thuong_hieu: thuong_hieu,
    muc_gia: "",
    khuyenmai: "",
    loai_may: "",
    duong_kinh: "",
    chat_lieu_day: "",
    chat_lieu_vo: "",
    mat_kinh: "",
    mau_mat: "",
    phong_cach: "",
    kieu_dang: "",
    xuat_xu: "",
  });

  const laySanPham = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...filter,
        page: currentPage,
      });

      const response = await fetch(`http://localhost:5000/product/filtersanphamdongho?${queryParams}`);
      if (!response.ok) {
        throw new Error("Lỗi không thể tải dữ liệu");
      }
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages); // Giả sử API trả về totalPages
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (thuong_hieu) {
      setFilter((prevFilter) => ({ ...prevFilter, thuong_hieu }));
      setCategoryName(thuong_hieu);
      setCurrentPage(1);
      laySanPham();
    }
  }, [thuong_hieu]);

  useEffect(() => {
    laySanPham();
  }, [filter, currentPage]);
  useEffect(() => {
    if (filter.thuong_hieu) {
      setCategoryName(filter.thuong_hieu);
      setCurrentPage(1);
      laySanPham();
    }
  }, [filter.thuong_hieu]);
  const capNhatBoLoc = (filterType, value) => {
    const newFilter = { ...filter, [filterType]: value };
    setFilter(newFilter);

    setSelectedFilter((prevFilters) => {
      const updatedFilters = prevFilters.filter((f) => !f.startsWith(`${filterType}=`));
      return value ? [...updatedFilters, `${filterType}=${value}`] : updatedFilters;
    });
  };

  const xoaTatCaBoLoc = () => {
    setSelectedFilter([]);
    setFilter({
      gioi_tinh: "",
      thuong_hieu: thuong_hieu,
      muc_gia: "",
      khuyenmai: "",
      loai_may: "",
      duong_kinh: "",
      chat_lieu_day: "",
      chat_lieu_vo: "",
      mat_kinh: "",
      mau_mat: "",
      phong_cach: "",
      kieu_dang: "",
      xuat_xu: "",
    });
    setCurrentPage(1);
    laySanPham();
  };

  const xoaBoLoc = (filterToRemove) => {
    const newFilters = selectedFilter.filter((filter) => filter !== filterToRemove);
    const [filterType] = filterToRemove.split("=");
    const updatedFilter = { ...filter, [filterType]: "" };
    setSelectedFilter(newFilters);
    setFilter(updatedFilter);
  };
  const thayDoiTrang = (page) => {
    setCurrentPage(page);
    laySanPham();
  };
  const sapXepSanPham = (products) => {
    if (sortOption === "asc") {
      return [...products].sort((a, b) => a.gia_giam - b.gia_giam);
    } else if (sortOption === "desc") {
      return [...products].sort((a, b) => b.gia_giam - a.gia_giam);
    }
    return products;
  };

  const capNhatSapXep = (e) => {
    setSortOption(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  const sanPhamHienThi = sapXepSanPham(products);

  return (
    <>
      <div className={styles["container-header"]}>
        <div id="main-container" className={styles.mt20}>
          <div className={styles["main-column"]}>
            <div className={styles["center-1col"]}>
              <div className={styles.clear}></div>
              <div className={styles.clear}></div>
              <div className={styles.container}>
                <div className={styles.clear}></div>
                <div className={styles["all-summary"]}>
                  <div className={styles["summary-content-filter"]} style={{ description: true }}>
                    <div className={cx('breadcrumb', 'flex', 'items-center uppercase mb-5')}>
                      <span className={cx('item', 'text-sm')}>
                        <Link href="/" className={cx('link', 'text-gray-800', 'hover:text-[#796752]')}>Trang chủ</Link>
                      </span>
                      <span className={cx('separator',  'mx-3', 'text-stone-400')}> &gt; </span>
                      <span className={cx('item', 'text-sm')}>
                        <Link href="/components/donghoall" className={cx('link', 'text-gray-800', 'hover:text-[#796752]')}>Đồng hồ</Link>
                      </span>
                      <span className={cx('separator',  'mx-3', 'text-stone-400')}> &gt; </span>
                      <span className={cx('item', 'text-sm', 'text-red-500')}>
                        <Link href="/components/components-thuonghieu/donghonam" className={cx('link', 'text-red-500')}>{" "}
                             Đồng hồ {categoryName === "Đồng hồ "
                                ? categoryName
                                : `${categoryName}`}</Link>
                      </span>
                    </div>
                    <p>
                      Đến với thế giới <strong>đồng hồ nam, nữ</strong> của Wristly, bạn sẽ được sở hữu hàng nghìn sản
                      phẩm chất lượng, thiết kế bắt mắt đến từ các thương hiệu &nbsp;
                      <em>
                        <strong>
                          <Link href="#" target="_blank">
                            đồng hồ&nbsp;Thụy Sỹ
                          </Link>
                        </strong>
                      </em>
                      , Nhật Bản, Pháp, Mỹ…danh tiếng trên thế giới. Mọi sản phẩm đều đảm bảo
                      <strong> &nbsp;100% hàng chính hãng&nbsp;</strong> kèm theo{" "}
                      <strong>chế độ bảo hành chính hãng</strong> đặc biệt với mức giá hợp lý sẽ đem đến cho bạn phụ
                      kiện hoàn hảo nhất; khẳng định đẳng cấp, phong cách riêng của bản thân
                    </p>
                  </div>

                  <div className={styles["view-more"]}>Xem thêm</div>
                </div>
                {selectedFilter.length > 0 && (
                  <div className={styles.choosedfilter}>
                    {selectedFilter.map((filter, index) => (
                      <Link key={index} rel="nofollow" href="#" onClick={() => xoaBoLoc(filter)}>
                        {filter.split("=")[1]}
                      </Link>
                    ))}
                    <Link rel="nofollow" className={styles.reset} href="#" onClick={xoaTatCaBoLoc}>
                      Xoá hết
                    </Link>
                  </div>
                )}
                <div className={styles.clear}></div>
                <div className={styles["products-cat"]}>
                  <div className={styles["block-products-filter"]}>
                    <div className={styles["block-product-filter"]}>
                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div className={`${styles["field-name"]} ${styles.normal} ${styles.field}`}>Giới tính</div>
                        <div
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-0-column"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <Link rel="nofollow" href="/components/components-thuonghieu/donghonam" title="Đồng hồ nam">
                              <span>Đồng hồ nam</span>
                            </Link>
                            <Link rel="nofollow" href="/components/components-thuonghieu/donghonu" title="Đồng hồ nữ">
                              <span>Đồng hồ nữ</span>
                            </Link>
                            <Link rel="nofollow" href="/components/components-thuonghieu/donghodoi" title="Đồng hồ đôi">
                              <span>Đồng hồ đôi</span>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                        >
                          Thương hiệu
                        </div>
                        <div
                          id="brand"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-3-column"]} ${styles["filter-brand"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="LONGINES"
                                onClick={() => capNhatBoLoc("thuong_hieu", "LONGINES")}
                              >
                                LONGINES
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="TISSOT"
                                onClick={() => capNhatBoLoc("thuong_hieu", "TISSOT")}
                              >
                                TISSOT
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="MIDO"
                                onClick={() => capNhatBoLoc("thuong_hieu", "MIDO")}
                              >
                                MIDO
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="CERTINA"
                                onClick={() => capNhatBoLoc("thuong_hieu", "CERTINA")}
                              >
                                CERTINA
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="HAMILTON"
                                onClick={() => capNhatBoLoc("thuong_hieu", "HAMILTON")}
                              >
                                HAMILTON
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="TITONI"
                                onClick={() => capNhatBoLoc("thuong_hieu", "TITONI")}
                              >
                                TITONI
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="FREDERIQUECONSTANT"
                                onClick={() => capNhatBoLoc("thuong_hieu", "FREDERIQUECONSTANT")}
                              >
                                FREDERIQUE CONSTANT
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="CALVINKLEIN"
                                onClick={() => capNhatBoLoc("thuong_hieu", "CALVINKLEIN")}
                              >
                                CALVIN KLEIN
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="EDOX"
                                onClick={() => capNhatBoLoc("thuong_hieu", "EDOX")}
                              >
                                EDOX
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="CLAUDE BERNARD"
                                onClick={() => capNhatBoLoc("thuong_hieu", "CLAUDEBERNARD")}
                              >
                                CLAUDE BERNARD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="SEIKO"
                                onClick={() => capNhatBoLoc("thuong_hieu", "SEIKO")}
                              >
                                SEIKO
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="CITIZEN"
                                onClick={() => capNhatBoLoc("thuong_hieu", "CITIZEN")}
                              >
                                CITIZEN
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="ORIENT"
                                onClick={() => capNhatBoLoc("thuong_hieu", "ORIENT")}
                              >
                                ORIENT
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="CASIO"
                                onClick={() => capNhatBoLoc("thuong_hieu", "CASIO")}
                              >
                                CASIO
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="OLYM PIANUS"
                                onClick={() => capNhatBoLoc("thuong_hieu", "OLYMPIANUS")}
                              >
                                OLYM PIANUS
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="DANIELWELLINGTON"
                                onClick={() => capNhatBoLoc("thuong_hieu", "DANIELWELLINGTON")}
                              >
                                DANIEL WELLINGTON
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="FOSSIL"
                                onClick={() => capNhatBoLoc("thuong_hieu", "FOSSIL")}
                              >
                                FOSSIL
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="SKAGEN"
                                onClick={() => capNhatBoLoc("thuong_hieu", "SKAGEN")}
                              >
                                SKAGEN
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="MICHAEL KORS"
                                onClick={() => capNhatBoLoc("thuong_hieu", "MICHAELKORS")}
                              >
                                MICHAEL KORS
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                        >
                          Mức giá
                        </div>
                        <div
                          id="price"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-price"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Dưới 2 triệu"
                                onClick={() => capNhatBoLoc("muc_gia", "Dưới 2 triệu")}
                              >
                                Dưới 2 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Từ 2 triệu đến 5 triệu"
                                onClick={() => capNhatBoLoc("muc_gia", "Từ 2 triệu đến 5 triệu")}
                              >
                                Từ 2 triệu đến 5 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Từ 5 triệu đến 10 triệu"
                                onClick={() => capNhatBoLoc("muc_gia", "Từ 5 triệu đến 10 triệu")}
                              >
                                Từ 5 triệu đến 10 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Từ 10 triệu đến 20 triệu"
                                onClick={() => capNhatBoLoc("muc_gia", "Từ 10 triệu đến 20 triệu")}
                              >
                                Từ 10 triệu đến 20 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Từ 20 triệu đến 30 triệu"
                                onClick={() => capNhatBoLoc("muc_gia", "Từ 20 triệu đến 30 triệu")}
                              >
                                Từ 20 triệu đến 30 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Từ 30 triệu đến 50 triệu"
                                onClick={() => capNhatBoLoc("muc_gia", "Từ 30 triệu đến 50 triệu")}
                              >
                                Từ 30 triệu đến 50 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Từ 50 triệu đến 100 triệu"
                                onClick={() => capNhatBoLoc("muc_gia", "Từ 50 triệu đến 100 triệu")}
                              >
                                Từ 50 triệu đến 100 triệu
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Trên 100 triệu"
                                onClick={() => capNhatBoLoc("muc_gia", "Trên 100 triệu")}
                              >
                                Trên 100 triệu
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-discount"
                        >
                          Khuyến mại
                        </div>
                        <div
                          id="discount"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-discount"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Giảm 10%"
                                onClick={() => capNhatBoLoc("khuyenmai", "Giảm 10%")}
                              >
                                Giảm 10%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Giảm 15%"
                                onClick={() => capNhatBoLoc("khuyenmai", "Giảm 15%")}
                              >
                                Giảm 15%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Giảm 20%"
                                onClick={() => capNhatBoLoc("khuyenmai", "Giảm 20%")}
                              >
                                Giảm 20%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Giảm 25%"
                                onClick={() => capNhatBoLoc("khuyenmai", "Giảm 25%")}
                              >
                                Giảm 25%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Giảm 30%"
                                onClick={() => capNhatBoLoc("khuyenmai", "Giảm 30%")}
                              >
                                Giảm 30%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Giảm 40%"
                                onClick={() => capNhatBoLoc("khuyenmai", "Giảm 40%")}
                              >
                                Giảm 40%
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Giảm 50%"
                                onClick={() => capNhatBoLoc("khuyenmai", "Giảm 50%")}
                              >
                                Giảm 50%
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-loai-may"
                        >
                          Loại máy
                        </div>
                        <div
                          id="loai-may"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-loai-may"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Automatic (Máy cơ tự động)"
                                onClick={() => capNhatBoLoc("loai_may", "Automatic (Máy cơ tự động)")}
                              >
                                Automatic (Máy cơ tự động)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Quartz (Máy pin - điện tử)"
                                onClick={() => capNhatBoLoc("loai_may", "Quartz (Máy pin - điện tử)")}
                              >
                                Quartz (Máy pin - điện tử)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Eco-Drive (Năng lượng ánh sáng)"
                                onClick={() => capNhatBoLoc("loai_may", "Eco-Drive (Năng lượng ánh sáng)")}
                              >
                                Eco-Drive (Năng lượng ánh sáng)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Quartz Chronograph (Máy pin bấm giờ thể thao)"
                                onClick={() =>
                                  capNhatBoLoc("loai_may", "Quartz Chronograph (Máy pin bấm giờ thể thao)")
                                }
                              >
                                Quartz Chronograph (Máy pin bấm giờ thể thao)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Automatic Chronometer (Máy cơ tự động chuẩn COSC)"
                                onClick={() =>
                                  capNhatBoLoc("loai_may", "Automatic Chronometer (Máy cơ tự động chuẩn COSC)")
                                }
                              >
                                Automatic Chronometer (Máy cơ tự động chuẩn COSC)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Quartz Chronometer (Máy pin chuẩn COSC)"
                                onClick={() => capNhatBoLoc("loai_may", "Quartz Chronometer (Máy pin chuẩn COSC)")}
                              >
                                Quartz Chronometer (Máy pin chuẩn COSC)
                              </Link>
                            </div>
                            <div
                              className={`${styles.cls} ${styles.item}`}
                              onClick={() =>
                                capNhatBoLoc("loai_may", "Automatic Chronograph (Máy cơ tự động bấm giờ thể thao)")
                              }
                            >
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Automatic Chronograph (Máy cơ tự động bấm giờ thể thao)"
                              >
                                Automatic Chronograph (Máy cơ tự động bấm giờ thể thao)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Quartz Solar (Năng lượng ánh sáng)"
                                onClick={() => capNhatBoLoc("loai_may", "Quartz Solar (Năng lượng ánh sáng)")}
                              >
                                Quartz Solar (Năng lượng ánh sáng)
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Đồng hồ cơ lên giây cót bằng tay ( Manual winding )"
                                onClick={() =>
                                  capNhatBoLoc("loai_may", "Đồng hồ cơ lên giây cót bằng tay ( Manual winding )")
                                }
                              >
                                Đồng hồ cơ lên giây cót bằng tay ( Manual winding )
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-duong-kinh"
                        >
                          Đường kính
                        </div>
                        <div
                          id="duong-kinh"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-duong-kinh"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Dưới 25mm"
                                onClick={() => capNhatBoLoc("duong_kinh", "Dưới 25mm")}
                              >
                                Dưới 25mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="25mm đến 30mm"
                                onClick={() => capNhatBoLoc("duong_kinh", "25mm đến 30mm")}
                              >
                                25mm đến 30mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="30mm đến 35mm"
                                onClick={() => capNhatBoLoc("duong_kinh", "30mm đến 35mm")}
                              >
                                30mm đến 35mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="35mm đến 38mm"
                                onClick={() => capNhatBoLoc("duong_kinh", "35mm đến 38mm")}
                              >
                                35mm đến 38mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="38mm đến 40mm"
                                onClick={() => capNhatBoLoc("duong_kinh", "38mm đến 40mm")}
                              >
                                38mm đến 40mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="40mm đến 42mm"
                                onClick={() => capNhatBoLoc("duong_kinh", "40mm đến 42mm")}
                              >
                                40mm đến 42mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="42mm đến 45mm"
                                onClick={() => capNhatBoLoc("duong_kinh", "42mm đến 45mm")}
                              >
                                42mm đến 45mm
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Từ 45mm trở lên"
                                onClick={() => capNhatBoLoc("duong_kinh", "Từ 45mm trở lên")}
                              >
                                Từ 45mm trở lên
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-chat-lieu-day"
                        >
                          Chất liệu dây
                        </div>
                        <div
                          id="chat-lieu-day"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-chat-lieu-day"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Dây da"
                                onClick={() => capNhatBoLoc("chat_lieu_day", "Dây da")}
                              >
                                Dây da
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ 316L"
                                onClick={() => capNhatBoLoc("chat_lieu_day", "Thép không gỉ 316L")}
                              >
                                Thép không gỉ 316L
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ 316L mạ vàng công nghệ PVD"
                                onClick={() =>
                                  capNhatBoLoc("chat_lieu_day", "Thép không gỉ 316L mạ vàng công nghệ PVD")
                                }
                              >
                                Thép không gỉ 316L mạ vàng công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ 316L dạng lưới"
                                onClick={() => capNhatBoLoc("chat_lieu_day", "Thép không gỉ 316L dạng lưới")}
                              >
                                Thép không gỉ 316L dạng lưới
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ 316L dạng lắc"
                                onClick={() => capNhatBoLoc("chat_lieu_day", " Thép không gỉ 316L dạng lắc")}
                              >
                                Thép không gỉ 316L dạng lắc
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Dây vải"
                                onClick={() => capNhatBoLoc("chat_lieu_day", " Dây vải")}
                              >
                                Dây vải
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ 316L/ Vàng 18K"
                                onClick={() => capNhatBoLoc("chat_lieu_day", " Thép không gỉ 316L/ Vàng 18K")}
                              >
                                Thép không gỉ 316L/ Vàng 18K
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ 316L/ Ceramic"
                                onClick={() => capNhatBoLoc("chat_lieu_day", " Thép không gỉ 316L/ Ceramic")}
                              >
                                Thép không gỉ 316L/ Ceramic
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ mạ công nghệ PVD"
                                onClick={() => capNhatBoLoc("chat_lieu_day", "Thép không gỉ mạ công nghệ PVD")}
                              >
                                Thép không gỉ mạ công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Dây cao su"
                                onClick={() => capNhatBoLoc("chat_lieu_day", " Dây cao su")}
                              >
                                Dây cao su
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Dây dù"
                                onClick={() => capNhatBoLoc("chat_lieu_day", "  Dây dù")}
                              >
                                Dây dù
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Titanium"
                                onClick={() => capNhatBoLoc("chat_lieu_day", " Titanium")}
                              >
                                Titanium
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Titanium mạ vàng công nghệ PVD"
                                onClick={() => capNhatBoLoc("chat_lieu_day", "itanium mạ vàng công nghệ PVD")}
                              >
                                Titanium mạ vàng công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Nhựa"
                                onClick={() => capNhatBoLoc("chat_lieu_day", "  Nhựa")}
                              >
                                Nhựa
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-chat-lieu-vo"
                        >
                          Chất liệu vỏ
                        </div>
                        <div
                          id="chat-lieu-vo"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-chat-lieu-vo"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ 316L"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Thép không gỉ 316L")}
                              >
                                Thép không gỉ 316L
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ mạ vàng công nghệ PVD"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Thép không gỉ mạ vàng công nghệ PVD")}
                              >
                                Thép không gỉ mạ vàng công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Vàng 18K"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Vàng 18K")}
                              >
                                Vàng 18K
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ 316L/ Vàng 18K"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Thép không gỉ 316L/ Vàng 18K")}
                              >
                                Thép không gỉ 316L/ Vàng 18K
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Titanium"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Titanium")}
                              >
                                Titanium
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Titanium mạ công nghệ PVD"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Titanium mạ công nghệ PVD")}
                              >
                                Titanium mạ công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Ceramic"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Ceramic")}
                              >
                                Ceramic
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ 316L/ Ceramic"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Thép không gỉ 316L/ Ceramic")}
                              >
                                Thép không gỉ 316L/ Ceramic
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thép không gỉ mạ công nghệ PVD"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Thép không gỉ mạ công nghệ PVD")}
                              >
                                Thép không gỉ mạ công nghệ PVD
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Nhựa"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Nhựa")}
                              >
                                Nhựa
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Titanium/ Vàng 18K"
                                onClick={() => capNhatBoLoc("chat_lieu_vo", "Titanium/ Vàng 18K")}
                              >
                                Titanium/ Vàng 18K
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-mat-kinh"
                        >
                          Mặt kính
                        </div>
                        <div
                          id="mat-kinh"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-mat-kinh"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Sapphire"
                                onClick={() => capNhatBoLoc("mat_kinh", "Sapphire")}
                              >
                                Sapphire
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Mặt kính cứng"
                                onClick={() => capNhatBoLoc("mat_kinh", "Mặt kính cứng")}
                              >
                                Mặt kính cứng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Hardlex Crystal"
                                onClick={() => capNhatBoLoc("mat_kinh", "Hardlex Crystal")}
                              >
                                Hardlex Crystal
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Mica"
                                onClick={() => capNhatBoLoc("mat_kinh", "Mica")}
                              >
                                Mica
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Kinh Nhựa"
                                onClick={() => capNhatBoLoc("mat_kinh", "Kinh Nhựa")}
                              >
                                Kinh Nhựa
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-mau-mat"
                        >
                          Màu mặt
                        </div>
                        <div
                          id="mau-mat"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-2-column"]} ${styles["filter-4-mau-mat"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Trắng"
                                onClick={() => capNhatBoLoc("mau_mat", "Trắng")}
                              >
                                Trắng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Hồng"
                                onClick={() => capNhatBoLoc("mau_mat", "Hồng")}
                              >
                                Hồng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Xám" onClick={() => capNhatBoLoc("mau_mat", "Xám")}>
                                Xám
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Đen" onClick={() => capNhatBoLoc("mau_mat", "Đen")}>
                                Đen
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Xanh lam"
                                onClick={() => capNhatBoLoc("mau_mat", "Xanh lam")}
                              >
                                Xanh lam
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Vàng"
                                onClick={() => capNhatBoLoc("mau_mat", "Vàng")}
                              >
                                Vàng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Khảm trai"
                                onClick={() => capNhatBoLoc("mau_mat", "Khảm trai")}
                              >
                                Khảm trai
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Đỏ" onClick={() => capNhatBoLoc("mau_mat", "Đỏ")}>
                                Đỏ
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Da Cam"
                                onClick={() => capNhatBoLoc("mau_mat", "Da Cam")}
                              >
                                Da Cam
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Xanh Lá"
                                onClick={() => capNhatBoLoc("mau_mat", "Xanh Lá")}
                              >
                                Xanh Lá
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link rel="nofollow" href="#" title="Nâu" onClick={() => capNhatBoLoc("mau_mat", "Nâu")}>
                                Nâu
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-phong-cach"
                        >
                          Phong cách
                        </div>
                        <div
                          id="phong-cach"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-phong-cach"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Sang trọng"
                                onClick={() => capNhatBoLoc("phong_cach", "Sang trọng")}
                              >
                                Sang trọng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thể thao"
                                onClick={() => capNhatBoLoc("phong_cach", "Thể thao")}
                              >
                                Thể thao
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thể thao sang trọng"
                                onClick={() => capNhatBoLoc("phong_cach", "Thể thao sang trọng")}
                              >
                                Thể thao sang trọng
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Quân đội"
                                onClick={() => capNhatBoLoc("phong_cach", "Quân đội")}
                              >
                                Quân đội
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thời trang"
                                onClick={() => capNhatBoLoc("phong_cach", "Thời trang")}
                              >
                                Thời trang
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Hiện đại"
                                onClick={() => capNhatBoLoc("phong_cach", "Hiện đại")}
                              >
                                Hiện đại
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-kieu-dang"
                        >
                          Kiểu dáng
                        </div>
                        <div
                          id="kieu-dang"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-1-column"]} ${styles["filter-4-kieu-dang"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Mặt vuông"
                                onClick={() => capNhatBoLoc("kieu_dang", "Mặt vuông")}
                              >
                                Mặt vuông
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Mặt tròn"
                                onClick={() => capNhatBoLoc("kieu_dang", "Mặt tròn")}
                              >
                                Mặt tròn
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Mặt chữ nhật"
                                onClick={() => capNhatBoLoc("kieu_dang", "Mặt chữ nhật")}
                              >
                                Mặt chữ nhật
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Mặt Oval"
                                onClick={() => capNhatBoLoc("kieu_dang", "Mặt Oval")}
                              >
                                Mặt Oval
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Khác"
                                onClick={() => capNhatBoLoc("kieu_dang", "Khác")}
                              >
                                Khác
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles["field-area"]} ${styles["field-item"]}`}>
                        <div
                          className={`${styles["field-name"]} ${styles.normal} ${styles.field} ${styles["field-opened"]}`}
                          data-id="id-field-xuat-xu-thuong-hieu"
                        >
                          Xuất xứ thương hiệu
                        </div>
                        <div
                          id="xuat-xu-thuong-hieu"
                          className={`${styles["field-label"]} ${styles["filters-in-field"]} ${styles["filters-in-field-0-column"]} ${styles["filter-4-xuat-xu-thuong-hieu"]}`}
                        >
                          <span className={styles.close}>x</span>
                          <div className={`${styles["filters-in-field-inner"]} ${styles.cls}`}>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Nhật Bản"
                                onClick={() => capNhatBoLoc("xuat_xu", "Nhật Bản")}
                              >
                                Nhật Bản
                              </Link>
                            </div>
                            <div className={`${styles.cls} ${styles.item}`}>
                              <Link
                                rel="nofollow"
                                href="#"
                                title="Thụy Sỹ"
                                onClick={() => capNhatBoLoc("xuat_xu", "Thụy Sỹ")}
                              >
                                Thụy Sỹ
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles["field-title"]}>
                    <div className={styles["title-name"]}>
                      <div className={styles["cat-title"]}>
                        <div className={styles["cat-title-main"]} id="cat-dong-ho">
                          <div className={styles["title-icon"]}>
                            <h1> {categoryName === "Đồng hồ" ? categoryName : `Đồng hồ ${categoryName}`}</h1>
                          </div>
                        </div>
                        <div className={styles.clear}></div>
                      </div>
                    </div>

                    <select className={styles["order-select"]} name="order-select" onChange={capNhatSapXep}>
                      <option value="">Sắp xếp theo</option>
                      <option value="asc">Giá từ thấp tới cao</option>
                      <option value="desc">Giá từ cao tới thấp</option>
                      <option value="newest">Mới nhất</option>
                      <option value="hot">Sản phẩm hot</option>
                    </select>
                    <div className={styles.clear}></div>
                  </div>

                  <div className={styles.clear}></div>

                  <section className={styles["products-cat-frame"]}>
                    <div className={styles["products-cat-frame-inner"]}>
                      <div className={styles["product-grid"]}>
                        {/* item-1 */}
                        {sanPhamHienThi.map((product) => {
                          const {
                            _id,
                            ten,
                            ten_san_pham,
                            ma_san_pham,
                            gia_san_pham,
                            gia_giam,
                            hinh_anh,
                            loai,
                            duong_kinh,
                          } = product;
                          const roundDiscount = (discountPercentage) => {
                            const discountLevels = [10, 15, 20, 25, 30, 40, 50];
                            return discountLevels.reduce((prev, curr) =>
                              Math.abs(curr - discountPercentage) < Math.abs(prev - discountPercentage) ? curr : prev
                            );
                          };
                          return (
                            <div key={_id} className={styles.item}>
                              <div className={styles["frame-inner"]}>
                                <figure className={styles["product-image"]}>
                                  <Link href={`/components/product-detail/${_id}`}>
                                    <img
                                      src={`http://localhost:5000/images/${hinh_anh}`}
                                      alt={ten}
                                      width="300"
                                      height="363"
                                      style={{
                                        display: "inline-block",
                                        opacity: "1",
                                      }}
                                    />
                                  </Link>
                                </figure>
                                <h3>
                                  <Link className={styles.name} href={`/san_pham/${_id}`} title={ten}>
                                    <span className={styles["cat-name"]}>{ten_san_pham}</span>
                                    {ma_san_pham}
                                  </Link>
                                </h3>
                                <span className={styles["loai-may"]}>{loai}</span>
                                <span className={styles["row-lm"]}>|</span>
                                <span className={styles["duong-kinh"]}>{duong_kinh}</span>
                                <div className={styles["price-area"]}>
                                  <div className={styles["price-old"]}>
                                    Giá: <span>{gia_san_pham ? gia_san_pham.toLocaleString("vi-VN") : "N/A"}₫</span>
                                  </div>
                                  <div className={styles["price-current"]}>
                                    Giá KM: {gia_giam ? gia_giam.toLocaleString("vi-VN") : "N/A"} ₫
                                  </div>
                                </div>
                                <div className={styles.discount}>
                                  <span>
                                    -{roundDiscount(Math.round(((gia_san_pham - gia_giam) / gia_san_pham) * 100))}%
                                  </span>
                                </div>
                                <div className={styles.clear}></div>
                              </div>

                              <div className={styles.clear}></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  <div className={styles.pagination}>
                    <span
                      title="First page"
                      className={currentPage === 1 ? styles.disabled : styles["other-page"]}
                      onClick={() => currentPage > 1 && thayDoiTrang(1)}
                    >
                      ‹‹
                    </span>

                    <span
                      className={currentPage === 1 ? styles.disabled : styles["other-page"]}
                      onClick={() => currentPage > 1 && thayDoiTrang(currentPage - 1)}
                    >
                      ‹
                    </span>

                    <span className={styles.currentPage}>{`Trang ${currentPage} / ${totalPages || 1}`}</span>

                    <span
                      className={currentPage === totalPages ? styles.disabled : styles["other-page"]}
                      onClick={() => currentPage < totalPages && thayDoiTrang(currentPage + 1)}
                    >
                      ›
                    </span>

                    <span
                      className={currentPage === totalPages ? styles.disabled : styles["other-page"]}
                      onClick={() => currentPage < totalPages && thayDoiTrang(totalPages)}
                    >
                      ››
                    </span>
                  </div>
                </div>
                <div className={styles.clear}></div>

                
                <div className={styles.clear}></div>
                <div className={`${styles.aq_relates} ${styles.content_li}`}></div>
              </div>
            </div>

            <div className={styles.clear}></div>
          </div>
        </div>
      </div>
    </>
  );
}
