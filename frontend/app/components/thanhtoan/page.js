"use client";
import { useEffect, useState } from "react";
import styles from "./thanhtoan.module.css";
import { jwtDecode } from "jwt-decode";

export default function ThanhToan() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      try {
        const { _id } = jwtDecode(token);
        fetchUserDetails(_id);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const fetchUserDetails = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${_id}`);
      if (!response.ok) {
        throw new Error("Lỗi lấy thông tin người dùng");
      }
      const data = await response.json();
      setUser(data.user);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = cartItems.map((item) => ({ ...item, so_luong: item.so_luong ?? 1 }));
    setCartItems(cartItems);
    calculateTotal(updatedCartItems);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.so_luong * item.gia_giam, 0);
    setTotalAmount(total);
  };

  const handleIncrease = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].so_luong += 1;
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDecrease = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].so_luong > 1) {
      updatedCartItems[index].so_luong -= 1;
      setCartItems(updatedCartItems);
      calculateTotal(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const handleDelete = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // hàm xử lí khi chưa đăng nhập

  const userLogin = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để tiếp tục thanh toán");
      window.location.href = "/components/login";
      return;
    }
    const orderDetails = {
      dia_chi: user.dia_chi,
      id_nguoi_dung: user._id,
      id_phuong_thuc_thanh_toan: null,
      ghi_chu: "",
      chi_tiet_don_hang: cartItems.map((item) => ({
        id_san_pham: item._id,
        so_luong: item.so_luong,
      })),
      ma_voucher: discount || null,
    };
    try {
      const response = await fetch("http://localhost:5000/donhang/donhang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });
      if (!response.ok) {
        throw new Error("Lỗi tạo đơn hàng");
      }
      const data = await response.json();
      console.log(data);
      alert(data.message);
      localStorage.removeItem("cartItems");
      setCartItems([]);
    } catch (error) {
      throw new Error("Lỗi tạo đơn hàng");
    }
  };

  // hàm xử lí voucher

  const applyDiscount = async () => {
    try {
      const response = await fetch(`http://localhost:5000/voucher/ma_voucher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ma_voucher: discountCode }),
      });
      if (!response.ok) {
        throw new Error("Mã giảm giá không hợp lệ");
      }
      const data = await response.json();
      setDiscountValue(data.gia_tri);
      setDiscountCode(discountCode);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.checkoutContainer}>
          <div className={styles.checkoutLeft}>
            <div className={`${styles.box} ${styles.customerInfo}`}>
              <p className={styles.productTitle}>Thông tin khách hàng</p>
              <div className={styles.inputGroup}>
                <input type="email" placeholder="Email" value={user ? user.email : ""} />
                <input type="text" placeholder="Điện thoại" value={user ? user.dien_thoai : ""} />
              </div>
            </div>

            <div className={`${styles.box} ${styles.shippingPaymentInfo}`}>
              <p className={styles.productTitle}>Địa chỉ giao hàng</p>
              <input type="text" placeholder="Họ và tên" value={user ? user.ho_ten : ""} />
              <input type="text" placeholder="Địa chỉ" value={user ? user.dia_chi : ""} />
              <textarea class="textarea" placeholder="Ghi chú"></textarea>
              <div className={styles.paymentMethods}>
                <p className={styles.productTitle}>Địa chỉ giao hàng</p>
                <div className={styles.paymentOptions}>
                  <div className={styles.paymentOption}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSjgeVcZ4-Ce-KW8KlVF1JN88mRv1moJbpUg&s"
                      alt="Thanh toán khi nhận hàng"
                    />
                    <span>Thanh toán khi nhận hàng</span>
                  </div>
                  <div className={styles.paymentOption}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxsoe7iPccCnGraliGFCLCvbg3bO3PDtELQ&s"
                      alt="Thanh toán bằng tài khoản ngân hàng"
                    />
                    <span>Thanh toán bằng tài khoản ngân hàng</span>
                  </div>
                  <div className={styles.paymentOption}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                      alt="Thanh toán bằng VNPay"
                    />
                    <span>Thanh toán bằng VNPay</span>
                  </div>
                  <div className={styles.paymentOption}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzB5_qUPLtN4E3LuVFxMvy92q1Vo10N_m2Q&s"
                      alt="Thanh toán ví điện tử Momo"
                    />
                    <span>Thanh toán ví điện tử Momo</span>
                  </div>
                </div>
              </div>
            </div>
            {cartItems.map((item, index) => (
              <div className={`${styles.box} ${styles.productCard}`}>
                <div className={styles.productInfo}>
                  <div className={styles.productLeft}>
                    <p className={styles.productTitle}>Sản phẩm mua</p>
                    <div className={styles.productImage}>
                      <img src={`http://localhost:5000/images/${item.hinh_anh}`} alt={item.ten_san_pham} />
                    </div>
                  </div>

                  <div style={{ margin: "20px" }} className={styles.productDetails}>
                    <p className={styles.productName}>{item.ten_san_pham}</p>
                    <p className={styles.productModel}>{item.loai}</p>
                    <p className={styles.productCode}>{item.ma_san_pham}</p>
                    <p className={styles.productSize}>Đường kính: {item.duong_kinh}</p>
                  </div>
                </div>
                <div className={styles.productActions}>
                  <div className={styles.quantityPrice}>
                    <div className={styles.quantity}>
                      <button onClick={() => handleDecrease(index)} className={styles.quantityBtn}>
                        -
                      </button>
                      <input type="text" value={item.so_luong} readOnly className={styles.quantityInput} />
                      <button onClick={() => handleIncrease(index)} className={styles.quantityBtn}>
                        +
                      </button>
                    </div>
                    <p className={styles.productPrice}>{item.gia_giam.toLocaleString("vi-VN")}₫</p>
                  </div>
                  <button onClick={() => handleDelete(index)} className={styles.deleteBtn}>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className={styles.cartSummary}>
            <div className={styles.discountCode}>
              <input
                type="text"
                placeholder="Nhập mã..."
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={applyDiscount}>Áp dụng</button>
              <hr />
            </div>
            <div className={styles.orderSummary}>
              <p>
                Tổng tiền hàng: <span className={styles.price}>{totalAmount.toLocaleString("vi-VN")}₫</span>
              </p>
              <p>
                Ưu đãi: <span className={styles.price}>-{(discountValue || 0).toLocaleString("vi-VN")}₫</span>
              </p>
              <p className={styles.totalAmount}>
                Tổng thanh toán: <span className={styles.price}>0₫</span>
              </p>
            </div>
            <button className={styles.checkoutButton} onClick={userLogin}>
              Thanh toán
            </button>
          </aside>
        </div>
      </div>
    </>
  );
}
