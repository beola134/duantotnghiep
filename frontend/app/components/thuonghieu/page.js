"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./thuonghieu.module.css";
export default function Thuonghieu() {
  const [cates, setCates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCates = async () => {
      try {
        const res = await fetch("http://localhost:5000/cate/allcate");
        const data = await res.json();
        setCates(data.cates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCates();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <>
      <div className={styles.container}>
      <h3>THƯƠNG HIỆU NỔI BẬT</h3>
      <br />
      <div className={styles.thuonghieu + ' owl-carousel'}>
        {cates.map((item) => {
          const { _id, hinh_anh2 } = item;
          return (
            <div className={styles.item} key={_id}>
              <Link href="/components/daydongho">
                <img
                  src={`http://localhost:5000/images/${hinh_anh2}`}
                  alt={`Hình ảnh thương hiệu ${_id}`}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <br />
      <h3>TẤT CẢ THƯƠNG HIỆU</h3>
      <br />
      <div className={styles.thuonghieu}>
        {cates.map((item) => {
          const { _id, hinh_anh2 } = item;
          return (
            <div className={styles.item} key={_id}>
              <Link href={`/danh_muc/${_id}`}>
                <img
                  src={`http://localhost:5000/images/${hinh_anh2}`}
                  alt={`Hình ảnh thương hiệu ${_id}`}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}
