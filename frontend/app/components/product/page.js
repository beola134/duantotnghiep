import styles from "../donghonu/donghonu.module.css";
import Link from "next/link";
export default function Product({ data }) {
  return (
    <>
      {data.map((product) => {
        const {
          _id,
          ten,
          ten_san_pham,
          ma_san_pham,
          gia_san_pham,
          gia_giam,
          hinh_anh,
          loai,
          duong_kinh,
        } = product;

        return (
          <div key={product._id} className={styles.item}>
            <div className={styles["frame-inner"]}>
              <figure className={styles["product-image"]}>
                <Link href={`/components/product-detail/${_id}`}>
                  <img
                    src={`http://localhost:5000/images/${hinh_anh}`}
                    alt={ten}
                    width="300"
                    height="363"
                    style={{ display: "inline-block", opacity: "1" }}
                  />
                </Link>
              </figure>
              <h3>
                <Link className={styles.name} href="#" title={ten}>
                  <span className={styles["cat-name"]}>{ten_san_pham}</span>
                  {ma_san_pham}
                </Link>
              </h3>
              <span className={styles["loai-may"]}>{loai}</span>
              <span className={styles["row-lm"]}>|</span>
              <span className={styles["duong-kinh"]}>{duong_kinh}</span>
              <div className={styles["price-area"]}>
                <div className={styles["price-old"]}>
                  Giá: <span>{gia_san_pham.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className={styles["price-current"]}>
                  Giá KM: {gia_giam.toLocaleString("vi-VN")} ₫
                </div>
              </div>
              <div className={styles.discount}>
                <span>-20%</span>
              </div>
              <div className={styles.clear}></div>
            </div>
            {/* end .frame-inner */}
            <div className={styles.clear}></div>
          </div>
        );
      })}
    </>
  );
}
