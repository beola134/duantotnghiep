"use client"
import React, { useState, useEffect } from "react";
import styles from "../chinhsuauser.module.css";

const UpdateUser = () => {
  const id = "7a315ae7-8030-4feb-bc17-2aa0bde8525c"; // ID cố định của người dùng
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    ten_dang_nhap: "",
    ho_ten: "",
    email: "",
    dia_chi: "",
    dien_thoai: "",
    hinh_anh: null,
  });

  // Hàm để lấy dữ liệu người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        if (!res.ok) throw new Error("Không thể lấy dữ liệu người dùng");

        const data = await res.json();
        setUser(data);
        setFormData({
          ten_dang_nhap: data.ten_dang_nhap,
          ho_ten: data.ho_ten,
          email: data.email,
          dia_chi: data.dia_chi,
          dien_thoai: data.dien_thoai,
          hinh_anh: data.hinh_anh, // Thiết lập hình ảnh ban đầu
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Hàm xử lý thay đổi dữ liệu từ form
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "hinh_anh") {
      setFormData((prevData) => ({
        ...prevData,
        hinh_anh: files[0], // Lưu file hình ảnh
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    for (const key in formData) {
      updatedData.append(key, formData[key]);
    }

    try {
      const res = await fetch(`http://localhost:5000/users/update/${id}`, {
        method: "PUT",
        body: updatedData, // Gửi FormData
      });

      if (!res.ok) throw new Error("Cập nhật thông tin không thành công");

      const updatedUser = await res.json();
      alert("Cập nhật thông tin thành công!");
      setUser(updatedUser);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className={styles.container}>
      <h2>Cập Nhật Thông Tin Người Dùng</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="ten_dang_nhap">Tên Đăng Nhập:</label>
          <input
            type="text"
            name="ten_dang_nhap"
            value={formData.ten_dang_nhap}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ho_ten">Họ Tên:</label>
          <input
            type="text"
            name="ho_ten"
            value={formData.ho_ten}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dia_chi">Địa Chỉ:</label>
          <input
            type="text"
            name="dia_chi"
            value={formData.dia_chi}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dien_thoai">Số Điện Thoại:</label>
          <input
            type="text"
            name="dien_thoai"
            value={formData.dien_thoai}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hinh_anh">Hình Ảnh:</label>
          <input
            type="file"
            name="hinh_anh"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
