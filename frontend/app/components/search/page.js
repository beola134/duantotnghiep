"use client";
import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import classNames from "classnames/bind";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const cx = classNames.bind(styles);

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Lấy search params từ URL
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    const query = searchParams.get("query"); // Lấy giá trị của "query" từ URL
    if (query) {
      setSearchQuery(query); // Cập nhật searchQuery để hiển thị

      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/product/timkiem",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query }), // Gửi query đến API
            }
          );

          const data = await response.json();
          console.log("Dữ liệu trả về từ API:", data);
          setResults(data.products); // Cập nhật kết quả tìm kiếm
        } catch (error) {
          console.error("Lỗi khi fetch dữ liệu:", error);
        }
      };

      fetchData();
    }
  }, [searchParams]); // Cập nhật khi URL thay đổi

  console.log("Kết quả tìm kiếm:", results);

  return (
    <div className={cx("search-results")}>
     <h2>
            Có <b>{results.length}</b> sản phẩm với từ khóa: <b>{searchQuery}</b>
        </h2>
      {results.length > 0 ? (
         
        <div className={cx("dongho-list")}>

                {results.map((item) => (
                  <div key={item._id} className={styles.watch}>
                    <div className={styles.discountBadge}>
                      -
                      {Math.floor(((item.gia_san_pham - item.gia_giam) / item.gia_san_pham) * 100)}%
                    </div>
                    <Link href={`/components/product-detail/${item._id}`}>
                      <img
                        src={`http://localhost:5000/images/${item.hinh_anh}`}
                        alt={item.ten_san_pham}
                      />
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
                      <small style={{ textDecoration: "line-through" }}>
                        Giá: {formatCurrency(item.gia_san_pham)}
                      </small>
                    </p>
                    <p>
                      <span className={styles.priceKm}>
                        Giá KM: {formatCurrency(item.gia_giam)}
                      </span>
                    </p>

                  </div>
                  ))}
            </div>
      ) : (
        <p>Không tìm thấy sản phẩm nào</p>
      )}
    </div>
  );
}
