"use client";
import { useState, useEffect } from "react";
import styles from "./user.module.css";
import Link from "next/link";

const User = () => {
  const userId = params._id // ID người dùng hiện tại
  const [userData, setUserData] = useState({
    ten_dang_nhap: "",
    ho_ten: "",
    email: "",
    dia_chi: "",
    dien_thoai: "",
    hinh_anh: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${userId}`);
        const data = await res.json();
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]); // Lưu file ảnh
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("ten_dang_nhap", userData.ten_dang_nhap);
    formData.append("ho_ten", userData.ho_ten);
    formData.append("email", userData.email);
    formData.append("dia_chi", userData.dia_chi);
    formData.append("dien_thoai", userData.dien_thoai);
    if (avatarFile) {
      formData.append("hinh_anh", avatarFile);
    }
    try {
      const res = await fetch(`http://localhost:5000/users/update/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Cập nhật thông tin thành công");
        setIsEditing(false);
        setAvatarFile(null);
      } else {
        alert("Cập nhật thông tin thất bại");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Cập nhật thông tin thất bại");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.profilePicture}>
          <img
            src={`/image/item/${userData.hinh_anh} `}
            alt="Avatar"
            className={styles.avatar}
          />
        </div>
        <h3>
          <strong>Tài Khoản Của Tôi</strong>
        </h3>
        <div className={styles.Menu}>
          <p>
            <Link href={"/"}>Hồ Sơ</Link>
          </p>

          <p>
            <Link href={""}>Lịch sử mua hàng</Link>
          </p>

          <p>
            <Link href={""}>Trạng thái đơn hàng</Link>
          </p>

          <p>
            <Link href={""}>Đăng xuất</Link>
          </p>
        </div>
      </div>
      <div className={styles.profileContent}>
        <h2>Hồ Sơ Người Dùng</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="username">Tên đăng nhập:</label>
            <input
              type="text"
              id="username"
              name="ten_dang_nhap"
              value={userData.ten_dang_nhap}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Họ và tên:</label>
            <input
              type="text"
              id="name"
              name="ho_ten"
              value={userData.ho_ten}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="adress">Địa chỉ:</label>
            <input
              type="text"
              id="dia_chi"
              name="dia_chi"
              value={userData.dia_chi}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              type="text"
              id="dien_thoai"
              name="dien_thoai"
              value={userData.dien_thoai}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {isEditing ? (
            <>
              <div className={styles.pro}>
                <div className={styles.formGroup}>
                  <label htmlFor="avatar">Chọn ảnh đại diện:</label>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleSave}
                  className="save-button">
                  Lưu
                </button>
              </div>
            </>
          ) : (
            <div className={styles.pro}>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="edit-button">
                Chỉnh sửa
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default User;
