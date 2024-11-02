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
            {cartItems.length === 0 ? (
              <div>
                <img
                  src="/image/item/cart-empty(1)"
                  alt="Giỏ hàng trống"
                  style={{
                    width: "350px",
                    marginLeft: "220px",
                  }}
                />
                <div className={styles.mh}>
                  <p style={{ fontSize: "22px", marginBottom: "5px" }}>
                    Giỏ hàng đang trống
                  </p>

                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                    Về cửa hàng để lấp đầu giỏ
                  </p>
                  <Link href={"/"}>
                    {" "}
                    <button className={styles.Btn}></button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h2>Giỏ hàng</h2>
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
              </div>
            )}

            {cartItems.length > 0 && (
              <div>
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
                </div>
                <Link href="/components/thanhtoan">
                  <button type="button" id={styles.thtt}>
                    Tiến hành thanh toán
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default CartPage;
