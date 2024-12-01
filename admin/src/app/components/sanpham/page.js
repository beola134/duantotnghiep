"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./sanpham.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import RobotoRegular from "./Roboto-Regular.base64";
export default function SanPham() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 5;

  const printData = () => {
    window.print();
  };

  const exportToExcel = () => {
    const table = document.getElementById("productTable");
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, "products.xlsx");

    Swal.fire({
      title: "Thành công",
      text: "Dữ liệu đã được xuất ra Excel!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const exportToPDF = async () => {
    const doc = new jsPDF();
    doc.addFileToVFS("Roboto-Regular.ttf", RobotoRegular);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");
  
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text("Danh sách sản phẩm", 10, 10);
  
    // Hàm chuyển đổi ảnh URL sang base64
    const getBase64ImageFromURL = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const base64 = canvas.toDataURL("image/png", 1.0);
          resolve(base64);
        };
        img.onerror = (error) => reject(error);
      });
    };
  
    const imageCache = {};
    for (const product of products) {
      if (product.hinh_anh) {
        const imageUrl = `http://localhost:5000/images/${product.hinh_anh}`;
        try {
          const base64Image = await getBase64ImageFromURL(imageUrl);
          imageCache[product.hinh_anh] = base64Image;
        } catch (error) {
          console.error(`Không thể tải ảnh: ${imageUrl}`, error);
        }
      }
    }
   // Thêm một hàng trống vào đầu bảng
   const dataTable = [
    // Hàng trống đầu tiên
    { _id: "", ten_san_pham: "",  hinh_anh: "",so_luong: "", gia_san_pham: "", gia_giam: "", ma_san_pham: "", }, // Hàng trống

    // Dữ liệu các hàng tiếp theo
    ...products.map((product) => ({
      _id: product._id,
      ten_san_pham: product.ten_san_pham,
      so_luong: product.so_luong,
      gia_san_pham: product.gia_san_pham.toLocaleString("vi-VN") + "₫",
      gia_giam: product.gia_giam.toLocaleString("vi-VN") + "₫",
      ma_san_pham: product.ma_san_pham,
      hinh_anh: product.hinh_anh
    })),
  ];

  
    // Tạo bảng PDF
    doc.autoTable({
      body: dataTable,
      styles: {
        font: "Roboto",
        fontSize: 10,
        cellPadding: 4,
        valign: "middle",
        halign: "center",
        textColor: 20,
        lineColor: [200, 200, 200],
      },
      headStyles: {
        fillColor: [0, 112, 192],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 20 },
        1: { halign: "left", cellWidth: 30 },
        2: { halign: "center", cellWidth: 30 },
        3: { halign: "center", cellWidth: 20 },
        4: { halign: "center", cellWidth: 30 },
        5: { halign: "center", cellWidth: 30 },
        6: { halign: "center", cellWidth: 30 },
      },
      columns: [
        { header: "ID sản phẩm", dataKey: "_id" },
        { header: "Tên sản phẩm", dataKey: "ten_san_pham" },
        { header: "Ảnh sản phẩm", dataKey: "hinh_anh" },
        { header: "Số lượng", dataKey: "so_luong" },
        { header: "Giá tiền", dataKey: "gia_san_pham" },
        { header: "Giá giảm", dataKey: "gia_giam" },
        { header: "Mã sản phẩm", dataKey: "ma_san_pham" },
      ],
      didDrawCell: (data) => {
        if (data.row.index > 0) {
          const rowIndex = data.row.index - 1; 
          const item = products[rowIndex];
        // Thêm hình ảnh vào cột "Ảnh sản phẩm"
        if (item && item.hinh_anh && imageCache[item.hinh_anh] && data.column.index === 2) {
          const base64Image = imageCache[item.hinh_anh];
          const yPosition = data.cell.y + data.cell.height / 2 - 30 / 2;
  
          doc.addImage(
            base64Image,
            "PNG",
            data.cell.x + data.cell.width / 2 - 15, // Căn giữa ảnh trong ô
            yPosition,
            30, // Chiều rộng ảnh
            30  // Chiều cao ảnh
          );
        }
      }
      },
      startY: 20, // Vị trí bắt đầu của bảng
      margin: { top: 30 },
    });
  
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Ngày xuất: ${date}`, 10, doc.internal.pageSize.height - 10);
    doc.save("DanhSachSanPham.pdf");
  
    Swal.fire({
      title: "Thành công",
      text: "Dữ liệu và hình ảnh đã được xuất ra PDF!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/product/allsp?page=${currentPage}&ten_san_pham=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Lỗi không thể tải dữ liệu");
      }
      const data = await response.json();
      setTotalPage(data.totalPage || 1);
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchProducts = debounce(fetchProducts, 300);

  useEffect(() => {
    debouncedFetchProducts();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startProductIndex = (currentPage - 1) * itemsPerPage + 1;
  const endProductIndex = Math.min(currentPage * itemsPerPage, totalProducts);

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/product/xoasp/${id}`, { method: "DELETE" });
        if (!response.ok) {
          throw new Error("Lỗi khi xóa sản phẩm");
        }
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));

        Swal.fire({
          title: "Thành công",
          text: "Sản phẩm đã được xóa thành công!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          title: "Lỗi",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className={styles.SidebarContainer}>
      <section id={styles.content}>
        <div className={styles.header1}>
          <div className={styles.title} style={{ fontWeight: "bold" }}>
            Danh Sách Sản Phẩm
          </div>
        </div>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.actions}>
              <Link href="/components/themsanpham" className={styles.sp}>
                <i className="fas fa-plus"></i> Tạo mới sản phẩm
              </Link>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.sp3} onClick={printData}>
                <i className="fas fa-print"></i> In dữ liệu
              </button>
              &nbsp;
              <button className={styles.sp5} onClick={exportToExcel}>
                &nbsp;
                <i className="fas fa-file-excel"></i> Xuất Excel
              </button>
              &nbsp;
              <button className={styles.sp6} onClick={exportToPDF}>
                <i className="fas fa-file-pdf"></i> Xuất PDF
              </button>
              &nbsp;
            </div>
          </div>
          <div className={styles.tableControls}>
            <div className={styles.search}>
              <label htmlFor="search" style={{ fontWeight: "bold" }}>
                Tìm kiếm:
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Nhập tên sản phẩm..."
              />
            </div>
          </div>
          <table id="productTable" className={styles.productTable}>
            <thead>
              <tr>
                <th style={{ width: "15%", textAlign: "center" }}>ID sản phẩm</th>
                <th style={{ width: "20%", textAlign: "center" }}>Tên sản phẩm</th>
                <th style={{ width: "10%", textAlign: "center" }}>Ảnh</th>
                <th style={{ width: "10%", textAlign: "center" }}>Số lượng</th>
                <th style={{ width: "10%", textAlign: "center" }}>Giá tiền</th>
                <th style={{ width: "10%", textAlign: "center" }}>Giá giảm</th>
                <th style={{ width: "15%", textAlign: "center" }}>Mã sản phẩm</th>
                <th style={{ width: "15%", textAlign: "center" }}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const { _id, ten_san_pham, ma_san_pham, gia_san_pham, gia_giam, hinh_anh, so_luong } = product;

                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{ten_san_pham}</td>
                    <td>
                      <img src={`http://localhost:5000/images/${hinh_anh}`} alt="Sản phẩm" />
                    </td>
                    <td style={{ textAlign: "center" }}>{so_luong}</td>
                    <td style={{ textAlign: "center" }}>{gia_san_pham.toLocaleString("vi-VN")}₫</td>
                    <td style={{ textAlign: "center" }}>{gia_giam.toLocaleString("vi-VN")}₫</td>
                    <td style={{ textAlign: "center" }}>{ma_san_pham}</td>
                    <td>
                      {" "}
                      &nbsp; &nbsp; &nbsp;
                      <Link
                        style={{ textAlign: "center" }}
                        href={`/components/suasanpham/${_id}`}
                        className={`${styles.btn} ${styles.edit}`}
                      >
                        ✏️
                      </Link>{" "}
                      &nbsp;
                      <button className={`${styles.btn} ${styles.delete}`} onClick={() => deleteProduct(_id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <span>
              Hiện {startProductIndex} đến {endProductIndex} của {totalProducts} sản phẩm
            </span>
            <div className={styles.paginationControls}>
              <button
                className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : styles["other-page"]}`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button className={styles.paginationButton}>{`Trang ${currentPage} / ${totalPage}`}</button>
              <button
                className={`${styles.paginationButton} ${
                  currentPage === totalPage ? styles.disabled : styles["other-page"]
                }`}
                onClick={() => currentPage < totalPage && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
