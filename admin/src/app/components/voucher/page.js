"use client";
import Link from "next/link";
import styles from "./voucher.module.css";
import { useState, useEffect } from "react";

export default function VoucherPage() {
  const [vouchers, setvouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalVouchers, setTotalVouchers] = useState(0);
  const itemsPerPage = 5;

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchvouchers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/voucher/getAllVouchers?page=${currentPage}&ma_voucher=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Lỗi không thể tải dữ liệu");
      }
      const data = await response.json();
      setTotalPage(data.totalPage || 1);
      setvouchers(data.vouchers);
      setTotalVouchers(data.totalVouchers);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchVouchers = debounce(fetchvouchers, 300);

  useEffect(() => {
    debouncedFetchVouchers();
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    console.log("Current page:", page);
    console.log("Total Pages:", totalPage);
    setCurrentPage(1);
  };

  const deleteVoucher = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/voucher/deleteVoucher/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setvouchers(vouchers.filter((voucher) => voucher._id !== id));
        alert("Voucher đã được xóa thành công!");
      } else {
        alert("Có lỗi xảy ra khi xóa voucher.");
      }
    } catch (error) {
      console.error("Error deleting voucher:", error);
      alert("Có lỗi xảy ra khi xóa voucher.");
    }
  };

  const startVoucherIndex = (currentPage - 1) * itemsPerPage + 1;
  const endVoucherIndex = Math.min(currentPage * itemsPerPage, totalVouchers);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Có lỗi xảy ra: {error.message}</div>;

  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Danh Sách Vouchers
          </div>
          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
              <Link href="/components/themvoucher" className={styles.sp}>
                <i className="fas fa-plus"></i> Tạo mới voucher
              </Link>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.sp2}>
                &nbsp;
                <i className="fas fa-file-upload"></i> Tải từ file
              </button>
              &nbsp;
              <button className={styles.sp3}>
                <i className="fas fa-print"></i> In dữ liệu
              </button>
              &nbsp;
              <button className={styles.sp4}>
                <i className="fas fa-copy"></i> Sao chép
              </button>
              &nbsp;
              <button className={styles.sp5}>
                &nbsp;
                <i className="fas fa-file-excel"></i> Xuất Excel
              </button>
              &nbsp;
              <button className={styles.sp6}>
                <i className="fas fa-file-pdf"></i> Xuất PDF
              </button>
              &nbsp;
            </div>{" "}
          </div>

          <div className={styles.tableControls}>
            <div className={styles.search}>
              <label htmlFor="search" style={{ fontWeight: "bold" }}>
                Tìm kiếm:
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Nhập mã voucher..."
              />
            </div>
          </div>

          <table id="productTable" className={styles.productTable}>
            <thead>
              <tr>
                <th style={{ width: "3%" }}>
                  <input type="checkbox" id="selectAll" />
                </th>
                <th style={{ width: "12%", textAlign: "center" }}>
                  Id Voucher
                </th>
                <th style={{ width: "12%", textAlign: "center" }}>
                  Mã Voucher
                </th>
                <th style={{ width: "12%", textAlign: "center" }}>Giá trị</th>
                <th style={{ width: "12%", textAlign: "center" }}>Phần trăm</th>
                <th style={{ width: "12%", textAlign: "center" }}>Số Lượng</th>
                <th style={{ width: "12%", textAlign: "center" }}>
                  Ngày bắt đầu
                </th>
                <th style={{ width: "10%", textAlign: "center" }}>
                  Ngày kết thúc
                </th>
                <th style={{ width: "10%", textAlign: "center" }}>Mô tả</th>
                <th style={{ width: "10%", textAlign: "center" }}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => {
                const {
                  _id,
                  ma_voucher,
                  gia_tri,
                  phan_tram,
                  so_luong,
                  bat_dau,
                  ket_thuc,
                  mo_ta,
                } = voucher;

                return (
                  <tr key={_id}>
                    <td>
                      <input type="checkbox" className={styles.rowCheckbox} />
                    </td>
                    <td>{_id}</td>
                    <td style={{ textAlign: "center" }}>{ma_voucher}</td>
                    <td style={{ textAlign: "center" }}>{gia_tri}</td>
                    <td style={{ textAlign: "center" }}>{phan_tram}</td>
                    <td style={{ textAlign: "center" }}>{so_luong}</td>
                    <td style={{ textAlign: "center" }}>{bat_dau}</td>
                    <td style={{ textAlign: "center" }}>{ket_thuc}</td>
                    <td style={{ textAlign: "center" }}>{mo_ta}</td>
                    <td style={{ textAlign: "center" }}>
                      <Link
                        href={`/components/suavoucher/${_id}`}
                        className={`${styles.btn} ${styles.edit}`}>
                        ✏️
                      </Link>
                      &nbsp;
                      <button
                        className={`${styles.btn} ${styles.delete}`}
                        id="deleteButton"
                        onClick={() => deleteVoucher(_id)}>
                        🗑️
                      </button>
                      &nbsp;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>
              Hiện {startVoucherIndex} đến {endVoucherIndex} của
              {totalVouchers} sản phẩm
            </span>
            <div className={styles.paginationControls}>
              <button
                className={`${styles.paginationButton} ${
                  currentPage === 1 ? styles.disabled : styles["other-page"]
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}>
                ‹
              </button>
              <button className={styles.paginationButton}>
                {`Trang ${currentPage} / ${totalPage}`}
              </button>
              <button
                className={`${styles.paginationButton} ${
                  currentPage === totalPage
                    ? styles.disabled
                    : styles["other-page"]
                }`}
                onClick={() =>
                  currentPage < totalPage && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPage}>
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
