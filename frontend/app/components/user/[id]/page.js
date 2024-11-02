"use client";
import { useState, useEffect } from "react";
import styles from "../user.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const User = ({ params }) => {
  const { id } = params;
  const [userData, setUserData] = useState({
    ten_dang_nhap: "",
    ho_ten: "",
    email: "",
    dia_chi: "",
    dien_thoai: "",
    hinh_anh: "",
  });
  const [orderShow, setOrderShow] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        const data = await res.json();
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    if (activeTab === "orderShow") {
      const fetchOrderShow = async () => {
        try {
          const res = await fetch(`http://localhost:5000/donhang/show/${id}`);
          const data = await res.json();
          if (data.orders && Array.isArray(data.orders)) {
            setOrderShow(data.orders);
          } else {
            setOrderShow([]);
          }
        } catch (error) {
          console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
          setOrderShow([]);
        }
      };
      fetchOrderShow();
    }
  }, [activeTab, id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "orderShow") {
      fetchOrderShow();
    }
  };

  const fetchOrderShow = async () => {
    try {
      const res = await fetch(`http://localhost:5000/donhang/show/${id}`);
      const data = await res.json();
      if (data.orders && Array.isArray(data.orders)) {
        setOrderShow(data.orders);
      } else {
        setOrderShow([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
      setOrderShow([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
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
      const res = await fetch(`http://localhost:5000/users/update/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thông tin thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        setIsEditing(false);
        setAvatarFile(null);
      } else {
        Swal.fire({
          title: "Thất bại",
          text: "Cập nhật thông tin thất bại",
          icon: "error",
          confirmButtonText: "Thử lại",
        });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      Swal.fire({
        title: "Lỗi",
        text: "Có lỗi xảy ra, vui lòng thử lại.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleLayout = () => {
    Cookies.remove("token");
    Swal.fire({
      title: "Đăng xuất thành công",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "/";
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.profilePicture}>
          {/*<img
            src={`http://localhost:5000/images/${userData.hinh_anh}`}
            alt="Avatar"
            className={styles.avatar}
          />*/}
          <img
            src={
              userData.hinh_anh.startsWith("http")
                ? userData.hinh_anh
                : `http://localhost:5000/images/${userData.hinh_anh}`
            }
            width="300"
            height="363"
            style={{ display: "inline-block", opacity: "1" }}
          />
        </div>
        <h3>
          <strong>Tài Khoản Của Tôi</strong>
        </h3>
        <div className={styles.Menu}>
          <p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleTabClick("profile")}>
              Hồ Sơ
            </span>
          </p>

          <p>
            <span style={{ cursor: "pointer" }}>Lịch sử mua hàng</span>
          </p>

          <p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleTabClick("orderShow")}>
              Trạng thái đơn hàng
            </span>
          </p>

          <p style={{ cursor: "pointer" }}>
            <Link href={""} onClick={handleLayout}>
              Đăng xuất
            </Link>
          </p>
        </div>
      </div>
      <div className={styles.profileContent}>
        {activeTab === "profile" && (
          <div>
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
                      Cập nhật
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
        )}
        {activeTab === "orderShow" && (
          <div className={styles.orderShow}>
            <h2>Trạng thái đơn hàng</h2>
            {orderShow.length > 0 ? (
              <ul>
                {orderShow.map((order) => (
                  <li key={order.id}>
                    <p>Mã Đơn Hàng: {order._id}</p>
                    <p>
                      Ngày Đặt:{" "}
                      {new Date(order.thoi_gian_tao).toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                      })}
                    </p>

                    <p>
                      Tổng Giá Trị: {order.tong_tien.toLocaleString("vi-VN")}₫
                    </p>
                    <p>
                      Trạng thái đơn hàng:
                      <span className={styles.trh}>{order.trang_thai}</span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Bạn chưa có đơn hàng.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
