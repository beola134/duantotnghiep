'use client';
import React, {useEffect, useState} from 'react';
import styles from "./search.module.css";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import searchResults from "../layout/header/page";
const cx = classNames.bind(styles)

export default function Search() {

  
  const router = useRouter();
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    };
    const handleProductClick = (productId) => {
    router.push(`/product/${productId}`); 
  };
    return (
        <div className={cx("search-results")}>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((product) => (
              <li
                key={product._id}
                onClick={() => handleProductClick(product._id)} 
                className={cx("product-item")}
              >
                {product.ten_san_pham} - {formatCurrency(product.gia_san_pham)} 
              </li>
            ))}
          </ul>
        ) : (
          <p>Không tìm thấy sản phẩm nào</p>
        )}
      </div>
    );
}