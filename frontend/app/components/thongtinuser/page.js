"use client";
import React from "react";
import styles from "./TTuser.module.css";
import { useState, useEffect } from "react";

const TTuser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/users/8906b2f7-e21f-490f-aca5-13d4ed377fa1"
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  if (!user) {
    return <p>Người dùng không tồn tại.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <img
          src="/image/item/picture1.jpg"
          alt="Avatar"
          className={styles.avatar}
          width={120}
          height={120}
        />
        <h2 className={styles.username}>Tên Đăng Nhập:{user.ten_dang_nhap}</h2>
        <h3 className={styles.name}>Họ Tên: {user.ho_ten}</h3>
        <p className={styles.email}>Email: {user.email}</p>
        <p className={styles.address}>Địa Chỉ: {user.dia_chi}</p>
        <p className={styles.phone}>Số Điện Thoại: {user.dien_thoai}</p>
      </div>
    </div>
  );
};

export default TTuser;
