"use client";
import { useEffect, useState } from "react";
import styles from "./thanhtoan.module.css";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export default function ThanhToan() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState(""); // Loại giảm giá (phần trăm hoặc số tiền)
  const [isDiscountApplied, setIsDiscountApplied] = useState(false); // Kiểm tra mã giảm giá đã được áp dụng chưa
  const [note, setNote] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Lấy thông tin người dùng từ token
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

  // Lấy thông tin người dùng từ server
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

  // Lấy thông tin giỏ hàng từ localStorage
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = cartItems.map((item) => ({ ...item, so_luong: item.so_luong ?? 1 }));
    setCartItems(cartItems);
    calculateTotal(updatedCartItems);
  }, []);
  // Tính tổng tiền
  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.so_luong * (item.gia_giam > 0 ? item.gia_giam : item.gia_san_pham),
      0
    );
    let finalTotal = total;
    if (discountType === "gia_tri") {
      finalTotal -= discountValue;
    } else if (discountType === "phan_tram") {
      finalTotal -= (total * discountValue) / 100;
    }
    setTotalAmount(finalTotal);
  };
  // Tăng giảm số lượng sản phẩm
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
  // Xóa sản phẩm khỏi giỏ hàng
  const handleDelete = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Tạo đơn hàng và kiểm tra xem có đăng nhập không
  const userLogin = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Vui lòng đăng nhập để tiếp tục thanh toán",
      }).then(() => {
        window.location.href = "/components/login?redirect=thanhtoan";
      });
      return false;
    }
    return true;
  };

  const applyDiscount = async () => {
    if (isDiscountApplied) return;
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
      if (data.gia_tri) {
        setDiscountValue(data.gia_tri);
        setDiscountType("gia_tri");
      } else if (data.phan_tram) {
        setDiscountValue(data.phan_tram);
        setDiscountType("phan_tram");
      }
      calculateTotal(cartItems);
      setIsDiscountApplied(true); // Đánh dấu mã giảm giá đã được áp dụng
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message,
      });
      console.log(error);
    }
  };

  // Kiểm tra xem sản phẩm còn hàng không
  const ktra = async () => {
    for (const items of cartItems) {
      const reponse = await fetch(`http://localhost:5000/product/check/${items._id}?quantity=${items.so_luong}`);
      if (!reponse.ok) {
        Swal.fire({
          title: "Không đủ hàng",
          text: `Sản phẩm: ${items.ten_san_pham} Không đủ số lượng`,
          icon: "error",
          confirmButtonText: "OK",
        });
        return false;
      }
    }
    return true;
  };

  const handleClick = async () => {
    const isLoggedIn = await userLogin(); // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!isLoggedIn) return;

    const isStockAvailable = await ktra();
    if (!isStockAvailable) return;

    const orderDetails = {
      dia_chi: user.dia_chi,
      id_nguoi_dung: user._id,
      id_phuong_thuc_thanh_toan: selectedPaymentMethod,
      ghi_chu: note,
      chi_tiet_don_hang: cartItems.map((item) => ({
        id_san_pham: item._id,
        so_luong: item.so_luong,
      })),
      ma_voucher: discountCode || null,
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
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: data.message,
      });
      localStorage.setItem("cartItems", JSON.stringify([]));
      setCartItems([]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Lỗi tạo đơn hàng",
      });
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
                <input type="email" placeholder="Email" value={user ? user.email : ""} readOnly />
                <input type="text" placeholder="Điện thoại" value={user ? user.dien_thoai : ""} readOnly />
              </div>
            </div>

            <div className={`${styles.box} ${styles.shippingPaymentInfo}`}>
              <p className={styles.productTitle}>Địa chỉ giao hàng</p>
              <input type="text" placeholder="Họ và tên" value={user ? user.ho_ten : ""} readOnly />
              <input type="text" placeholder="Địa chỉ" value={user ? user.dia_chi : ""} readOnly />
              <textarea
                className={styles.textarea}
                placeholder="Ghi chú"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <div className={styles.paymentMethods}>
                <p className={styles.productTitle}>Phương thức thanh toán </p>
                <div className={styles.paymentOptions}>
                  <button
                    className={`${styles.paymentOption} ${selectedPaymentMethod === 1 ? styles.selected : ""}`}
                    onClick={() => setSelectedPaymentMethod(1)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSjgeVcZ4-Ce-KW8KlVF1JN88mRv1moJbpUg&s"
                      alt="Thanh toán khi nhận hàng"
                    />
                    <span>Thanh toán khi nhận hàng</span>
                  </button>
                  <button
                    className={`${styles.paymentOption} ${selectedPaymentMethod === 2 ? styles.selected : ""}`}
                    onClick={() => setSelectedPaymentMethod(2)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxsoe7iPccCnGraliGFCLCvbg3bO3PDtELQ&s"
                      alt="Thanh toán bằng tài khoản ngân hàng"
                    />
                    <span>Thanh toán bằng tài khoản ngân hàng</span>
                  </button>
                  <button
                    className={`${styles.paymentOption} ${selectedPaymentMethod === 3 ? styles.selected : ""}`}
                    onClick={() => setSelectedPaymentMethod(3)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                      alt="Thanh toán bằng VNPay"
                    />
                    <span>Thanh toán bằng VNPay</span>
                  </button>
                  <button
                    className={`${styles.paymentOption} ${selectedPaymentMethod === 4 ? styles.selected : ""}`}
                    onClick={() => setSelectedPaymentMethod(4)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzB5_qUPLtN4E3LuVFxMvy92q1Vo10N_m2Q&s"
                      alt="Thanh toán ví điện tử Momo"
                    />
                    <span>Thanh toán ví điện tử Momo</span>
                  </button>
                </div>
              </div>
            </div>
            {cartItems.map((item, index) => (
              <div className={`${styles.box} ${styles.productCard}`} key={item._id}>
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
                    <p className={styles.productPrice}>
                      {(item.gia_giam > 0 ? item.gia_giam : item.gia_san_pham).toLocaleString("vi-VN")}₫
                    </p>
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
              <button onClick={applyDiscount} disabled={isDiscountApplied}>
                Áp dụng
              </button>
              <hr />
            </div>
            <div className={styles.orderSummary}>
              <p>
                Tổng tiền hàng:
                <span className={styles.price}>
                  {cartItems
                    .reduce(
                      (sum, item) => sum + item.so_luong * (item.gia_giam > 0 ? item.gia_giam : item.gia_san_pham),
                      0
                    )
                    .toLocaleString("vi-VN")}
                  ₫
                </span>
              </p>
              <p>
                Ưu đãi:
                <span className={styles.price}>
                  {discountType === "phan_tram" ? `-${discountValue}%` : `-${discountValue.toLocaleString("vi-VN")}₫`}
                </span>
              </p>

              <p>
                Phí vận chuyển:
                <span className={styles.price}>
                  {totalAmount > 1000000 ? "Miễn phí" : "30.000₫"}
                </span>
              </p>
              <p className={styles.totalAmount}>
                Tổng thanh toán:
                <span className={styles.price}>
                  {(
                    totalAmount - (discountType === "phan_tram" ? (totalAmount * discountValue) / 100 : discountValue)
                  ).toLocaleString("vi-VN")}
                  ₫
                </span>
              </p>
            </div>
            <button className={styles.checkoutButton} onClick={handleClick}>
              Thanh toán
            </button>
          </aside>
        </div>
      </div>
    </>
  );
}
