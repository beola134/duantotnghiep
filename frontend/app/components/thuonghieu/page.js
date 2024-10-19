"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./thuonghieu.module.css";

export default function Thuonghieu() {
  const [cates, setCates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < cates.length ? prevIndex + itemsPerPage : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage >= 0
        ? prevIndex - itemsPerPage
        : cates.length - itemsPerPage
    );
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <br />
        <h3>THƯƠNG HIỆU NỔI BẬT</h3>
        <br />
        <div className={styles.slider}>
          <button onClick={prevSlide} className={styles.arrowLeft}>
            ‹
          </button>
          <div className={styles.thuonghieu}>
            {cates
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((item) => {
                const { _id, hinh_anh2 } = item;
                return (
                  <div className={styles.item} key={_id}>
                    <Link href={`/components/chitietdanhmuc/${_id}`}>
                      <img
                        src={`http://localhost:5000/images/${hinh_anh2}`}
                        alt={`Hình ảnh thương hiệu ${_id}`}
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
          <button onClick={nextSlide} className={styles.arrowRight}>
            ›
          </button>
        </div>

        <br />
        <h3>TẤT CẢ THƯƠNG HIỆU</h3>
        <br />
        <div className={styles.thuonghieu}>
          {cates.map((item) => {
            const { _id, hinh_anh2 } = item;
            return (
              <div className={styles.item} key={_id}>
                <Link href={`/components/chitietdanhmuc/${_id}`}>
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