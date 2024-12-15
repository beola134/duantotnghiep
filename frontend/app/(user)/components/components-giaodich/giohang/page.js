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
import Swal from "sweetalert2";

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

  const ktra = async (items, newQuantity) => {
    const reponse = await fetch(
      `http://localhost:5000/product/check/${items._id}?quantity=${newQuantity}`
    );
    const data = await reponse.json();
    if (!reponse.ok) {
      Swal.fire({
        title: "Không đủ hàng",
        text: `Sản phẩm: ${items.ten_san_pham} Không đủ số lượng `,
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    let canProceed = true;
    for (const item of cartItems) {
      const isStockAvailable = await ktra(item, item.so_luong);
      if (!isStockAvailable) {
        canProceed = false;
        break; // dừng lại nếu 1 sản phẩm không đủ hàng
      }
    }
    if (canProceed) {
      window.location.href = "/components/components-giaodich/thanhtoan";
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={`{styles.content} phone-sm:mt-[15px]`}>
            {cartItems.length === 0 ? (
              <div>
                <img
                  className="lg:ml-[220px] phone-sm:ml-[0px] sm:ml-0 md:ml-[0px]"
                  src="/image/item/cart-empty(1)"
                  alt="Giỏ hàng trống"
                  style={{
                    width: "350px",
                  }}
                />
                <div className={`${styles.mh} lg:text-[22px] text-[14px]`}>
                  <p className="mb-[5px] phone-sm:mb-[15px]">
                    Giỏ hàng đang trống
                  </p>

                  <p
                    className="phone-sm:hidden"
                    style={{ fontSize: "14px", marginBottom: "5px" }}>
                    Về cửa hàng để lấp đầy giỏ
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
                <br />
                <div className="phone-sm:hidden">
                  <table className={`${styles.carttable} `}>
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
                                onClick={async () => {
                                  if (item.so_luong > 1) {
                                    const isStockAvailable = await ktra(
                                      item,
                                      item.so_luong - 1
                                    );
                                    if (isStockAvailable) {
                                      dispatch(
                                        updateCartItemQuantity({
                                          _id: item._id,
                                          so_luong: item.so_luong - 1,
                                        })
                                      );
                                    }
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
                                onClick={async () => {
                                  const isStockAvailable = await ktra(
                                    item,
                                    item.so_luong + 1
                                  );
                                  if (isStockAvailable) {
                                    dispatch(
                                      updateCartItemQuantity({
                                        _id: item._id,
                                        so_luong: item.so_luong + 1,
                                      })
                                    );
                                  }
                                }}>
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            {(item.gia_giam > 0
                              ? item.gia_giam
                              : item.gia_san_pham
                            ).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>

                          <td>
                            {(
                              (item.gia_giam > 0
                                ? item.gia_giam
                                : item.gia_san_pham) * item.so_luong
                            ).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td name="delete">
                            <button
                              style={{ border: "none", cursor: "pointer" }}
                              onClick={() =>
                                Swal.fire({
                                  title: "Bạn có chắc muốn xóa sản phẩm này?",
                                  text: "Hành động này không thể hoàn tác!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#d33",
                                  cancelButtonColor: "#3085d6",
                                  confirmButtonText: "Xóa",
                                  cancelButtonText: "Hủy",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    dispatch(removeFromCart(item._id)); // Gọi action để xóa sản phẩm
                                    Swal.fire(
                                      "Đã xóa!",
                                      "Sản phẩm đã được xóa khỏi giỏ hàng.",
                                      "success"
                                    );
                                  }
                                })
                              }>
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

                <div className="block lg:hidden">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col border rounded-lg p-4 mb-4">
                      <div  className="flex items-center">
                        <img
                          src={`http://localhost:5000/images/${item.hinh_anh}`}
                          alt=""
                          width="100px"
                          className="mr-4"
                        />
                        <div className="flex-1">
                          <p  className="font-bold">{item.ten_san_pham}</p>
                          <p  className="text-sm">
                            Giá:{" "}
                            {(item.gia_giam > 0
                              ? item.gia_giam
                              : item.gia_san_pham
                            ).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                          <p  className="text-sm">
                            Tổng:{" "}
                            {(
                              (item.gia_giam > 0
                                ? item.gia_giam
                                : item.gia_san_pham) * item.so_luong
                            ).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className={styles.quantitycontrol}>
                        <button
                          className={styles.decreasebtn}
                          onClick={async () => {
                            if (item.so_luong > 1) {
                              const isStockAvailable = await ktra(
                                item,
                                item.so_luong - 1
                              );
                              if (isStockAvailable) {
                                dispatch(
                                  updateCartItemQuantity({
                                    _id: item._id,
                                    so_luong: item.so_luong - 1,
                                  })
                                );
                              }
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
                          onClick={async () => {
                            const isStockAvailable = await ktra(
                              item,
                              item.so_luong + 1
                            );
                            if (isStockAvailable) {
                              dispatch(
                                updateCartItemQuantity({
                                  _id: item._id,
                                  so_luong: item.so_luong + 1,
                                })
                              );
                            }
                          }}>
                          +
                        </button>
                      </div>
                      <button
                        style={{
                          marginLeft: "95%",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          Swal.fire({
                            title: "Bạn có chắc muốn xóa sản phẩm này?",
                            text: "Hành động này không thể hoàn tác!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Xóa",
                            cancelButtonText: "Hủy",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(removeFromCart(item._id)); // Gọi action để xóa sản phẩm
                              Swal.fire(
                                "Đã xóa!",
                                "Sản phẩm đã được xóa khỏi giỏ hàng.",
                                "success"
                              );
                            }
                          })
                        }>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{
                            fontSize: "18px",
                            border: "none",
                            color: "red",
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
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
                <Link href="">
                  <button
                  className="mt-10 ml-[200%] phone-sm:ml-[10px] sm:ml-[10px] md:ml-[10px]"
                    type="button"
                    id={styles.thtt}
                    onClick={handleCheckout}>
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
