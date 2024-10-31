"use client";
import { useMemo } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./giohang.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  removeFromCart,
  updateCartItemQuantity,
  setCartItems,
} from "../redux/slices/cartSilce";
import Link from "next/link";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("cartItems");
      if (savedItems) {
        dispatch(setCartItems(JSON.parse(savedItems)));
      }
    }
  }, [dispatch]);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (total, item1) => total + item1.gia_giam * item1.so_luong,
        0
      ),
    [cartItems]
  );
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.cartcontainer}>
              <h2>Giỏ hàng</h2>
              {cartItems.length === 0 ? (
                <div>
                  <img
                    src="/image/item/empty-cart.webp"
                    alt="Giỏ hàng trống"
                    style={{ marginLeft: "100px" }}
                  />
                </div>
              ) : (
                <table className={styles.carttable}>
                  <thead>
                    <tr>
                      <th colSpan="2" className={styles.sp}>
                        Sản phẩm
                      </th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={`http://localhost:5000/images/${item.hinh_anh}`}
                            alt=""
                            width="100px"
                          />
                        </td>
                        <td>{item.ten_san_pham}</td>
                        <td>
                          <div className={styles.quantitycontrol}>
                            <button
                              className={styles.decreasebtn}
                              onClick={() => {
                                if (item.so_luong > 1) {
                                  dispatch(
                                    updateCartItemQuantity({
                                      _id: item._id,
                                      so_luong: item.so_luong - 1,
                                    })
                                  );
                                }
                              }}>
                              -
                            </button>
                            <input
                              min="1"
                              value={item.so_luong}
                              className={styles.quantity}
                              readonly
                            />
                            <button
                              className={styles.increasebtn}
                              onClick={() =>
                                dispatch(
                                  updateCartItemQuantity({
                                    _id: item._id,
                                    so_luong: item.so_luong + 1,
                                  })
                                )
                              }>
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          {item.gia_giam.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>
                          {(item.gia_giam * item.so_luong).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </td>
                        <td name="delete">
                          <button
                            style={{ border: "none", cursor: "pointer" }}
                            onClick={() => dispatch(removeFromCart(item._id))}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{
                                fontSize: "18px",
                                border: "none",
                                color: "red",
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {cartItems.length > 0 && (
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
                <div className={styles.tt}>
                  <p>Tổng tiền hàng:</p>
                  <p>
                    {total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>

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
              <Link href="/components/thanhtoan">
                <button type="button" id={styles.thtt}>
                  Tiến hành thanh toán
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default CartPage;
