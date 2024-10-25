"use client";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./giohang.module.css";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/slices/cartSilce";
const CartPage = () => {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const dispatch = useDispatch();

  const total = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.gia_giam * item.so_luong,
        0
      ),
    [cartItems]
  );
  return (
    <>
      <nav className={styles.nav}>
        <div class={styles.container}>
          <div class={styles.content}>
            <div class={styles.cartcontainer}>
              <h2>Giỏ hàng</h2>
              <table className={styles.carttable}>
                <thead>
                  <tr>
                    <th colspan="2">Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={`http://localhost:3000/image/${item.hinh_anh}`}
                          alt=""
                          width="100px"
                        />
                      </td>
                      <td>{item.ten_san_pham}</td>
                      <td>
                        <div className={styles.quantitycontrol}>
                          <button className={styles.decreasebtn}>-</button>
                          <input
                            min="1"
                            type="number"
                            value={item.so_luong}
                            onChange={(e) =>
                              dispatch(
                                updateCartItemQuantity({
                                  _id: item._id,
                                  so_luong: parseInt(e.target.value),
                                })
                              )
                            }
                            className={styles.quantity}
                            readonly
                          />
                          <button className={styles.increasebtn}>+</button>
                        </div>
                      </td>
                      <td>{item.gia_giam.toLocaleString("vi-VN")}</td>
                      <td name="delete">
                        <button
                          onClick={() => dispatch(removeFromCart(item._id))}>
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.sidebar}>
            <h2>ƯU ĐÃI</h2>
            <div className={styles.voucherinput}>
              <input type="text" id="voucher-code" placeholder="Nhập mã..." />
              <button type="button" id="apply-voucher">
                Áp dụng
              </button>
            </div>
            <br />
            <hr />
            <div className={styles.total}>
              {cartItems.map((item) => (
                <div className={styles.tt}>
                  <p>Tổng tiền hàng:</p>
                  <p>
                    {(item.gia_giam * item.so_luong).toLocaleString("vi-VN")}
                  </p>
                </div>
              ))}
              <div className={styles.uudai}>
                <p>Ưu đãi:</p>
                <p>0</p>
              </div>
              <div className={styles.ttt}>
                <p>Tổng thanh toán:</p>
                <p>
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
            <button type="button" id={styles.thtt}>
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default CartPage;
