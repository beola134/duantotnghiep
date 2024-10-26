"use client";
import { useEffect, useState } from "react";
import styles from "./thanhtoan.module.css";
import { jwtDecode } from "jwt-decode";

export default function ThanhToan() {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      const decoded = jwtDecode(token);
      fetchUserDetails(decoded._id);
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
  return (
    <>
      <div className={styles.container}>
        <div className={styles.checkoutContainer}>
          <div className={styles.checkoutLeft}>
            <div className={`${styles.box} ${styles.customerInfo}`}>
              <p className={styles.productTitle}>Thông tin khách hàng</p>
              <div className={styles.inputGroup}>
                <input type="email" placeholder="Email" value={user ? user.email : ""} readOnly />
                <input type="text" placeholder="Điện thoại" />
              </div>
            </div>

            <div className={`${styles.box} ${styles.shippingPaymentInfo}`}>
              <p className={styles.productTitle}>Địa chỉ giao hàng</p>
              <input type="text" placeholder="Họ và tên" />
              <input type="text" placeholder="Địa chỉ" />
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

            <div className={`${styles.box} ${styles.productCard}`}>
              <div className={styles.productInfo}>
                <div className={styles.productLeft}>
                  <p className={styles.productTitle}>Sản phẩm mua</p>
                  <div className={styles.productImage}>
                    <img
                      src="https://donghoduyanh.com/images/products/2023/07/31/resized/an8201-57l_1690775073.jpg"
                      alt="ĐỒNG HỒ NAM ORIENT"
                    />
                  </div>
                </div>
                <div style={{ margin: "20px" }} className={styles.productDetails}>
                  <p className={styles.productName}>ĐỒNG HỒ NAM ORIENT</p>
                  <p className={styles.productModel}>CLASSIC BAMBINO 38 SMALL</p>
                  <p className={styles.productCode}>SECONDS RA-AP0106S30B</p>
                  <p className={styles.productSize}>Đường kính: 38.4mm</p>
                </div>
              </div>
              <div className={styles.productActions}>
                <div className={styles.quantityPrice}>
                  <div className={styles.quantity}>
                    <button className={styles.quantityBtn}>-</button>
                    <input type="text" value="1" className={styles.quantityInput} />
                    <button className={styles.quantityBtn}>+</button>
                  </div>
                  <p className={styles.productPrice}>7.536.000₫</p>
                </div>
                <button className={styles.deleteBtn}>🗑️</button>
              </div>
            </div>
          </div>

          <aside className={styles.cartSummary}>
            <div className={styles.discountCode}>
              <input type="text" placeholder="Nhập mã..." />
              <button>Áp dụng</button>
              <hr />
            </div>
            <div className={styles.orderSummary}>
              <p>
                Tổng tiền hàng: <span className={styles.price}>999.000đ</span>
              </p>
              <p>
                Ưu đãi: <span className={styles.price}>0đ</span>
              </p>
              <p className={styles.totalAmount}>
                Tổng thanh toán: <span className={styles.price}>999.000đ</span>
              </p>
            </div>
            <button className={styles.checkoutButton}>Thanh toán</button>
          </aside>
        </div>
      </div>
    </>
  );
}
