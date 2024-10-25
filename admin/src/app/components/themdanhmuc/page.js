'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./themdanhmuc.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";



export default function ThemDanhMuc() {
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productLogo, setProductLogo] = useState(null);
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

   const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    // Kiểm tra nếu các trường bắt buộc chưa được điền
    if (!productName) {
        Swal.fire({
            icon: "warning",
            title: "Thiếu thông tin",
            text: "Vui lòng nhập tên danh mục!",
        });
        return;
    }
    if (!productImage) {
        Swal.fire({
            icon: "warning",
            title: "Thiếu thông tin",
            text: "Vui lòng chọn hình ảnh cho danh mục!",
        });
        return;
    }
    if (!description) {
        Swal.fire({
            icon: "warning",
            title: "Thiếu thông tin",
            text: "Vui lòng nhập mô tả cho danh mục!",
        });
        return;
    }

    const formData = new FormData();
    formData.append("danh_muc", productName);
    formData.append("hinh_anh", productImage);
    formData.append("hinh_anh2", productLogo);
    formData.append("mo_ta", description);

    try {
        const response = await fetch("http://localhost:5000/cate/addcate", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Thêm danh mục thành công!",
            }).then(() => {
                    router.push("/components/danhmuc");
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Có lỗi xảy ra!",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Có lỗi xảy ra!",
        });
    }
};

    return (
      <>
        <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Thêm Danh Mục
          </div>
          <div className={styles.timestamp} id="timestamp"></div>
        </div>
        <div className={styles.bg}>
          <form onSubmit={handleSubmit}>
            <div className={styles.container1}>
              <div className={styles.formGroup}>
                <label htmlFor="product-name">Tên danh mục</label>
                <input
                    type="text"
                    id="product-name"
                    name="product-name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="product-image">Ảnh danh mục</label>
                <input
                    type="file"
                    id="product-image"
                    className="file-input"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="product-logo">Ảnh danh mục 2 (logo)</label>
                <input
                    type="file"
                    id="product-logo"
                    className="file-input"
                    onChange={(e) => setProductLogo(e.target.files[0])}
                />
              </div>
              <div className={styles.formGroup}>
                 <label htmlFor="description">Mô tả danh mục</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <button type="submit" className="btn btn-outline-primary"  onClick={handleSubmit}>
                Thêm
              </button>
              <button type="button" className="btn btn-outline-secondary">Hủy bỏ</button>
            </div>
          </form>
        </div>
      </section>
    </div>
        
      </>
    );

}