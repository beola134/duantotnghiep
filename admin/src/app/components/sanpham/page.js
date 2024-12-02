"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./sanpham.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
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

  const exportToExcel = async () => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xuất dữ liệu ra file Excel?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xuất",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let currentPage = 1;
          let totalPages = 1;
          const allProducts = [];
          while (currentPage <= totalPages) {
            const response = await fetch(
              `http://localhost:5000/product/allsp?page=${currentPage}`
            );
            const data = await response.json();
            allProducts.push(...data.products);
            totalPages = data.totalPages;
            currentPage++;
          }
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("Danh sách sản phẩm");
          worksheet.columns =  [
            { header: "ID sản phẩm", dataKey: "_id", width:20 },
            { header: "Tên sản phẩm", dataKey: "ten_san_pham", width:30 },
            { header: "Ảnh sản phẩm", dataKey: "hinh_anh", width:30 },
            { header: "Số lượng", dataKey: "so_luong", width:20 },
            { header: "Giá tiền", dataKey: "gia_san_pham", width:30 },
            { header: "Giá giảm", dataKey: "gia_giam", width:30 },
            { header: "Mã sản phẩm", dataKey: "ma_san_pham", width:30 },
          ];
          worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "FFFFFF" } };
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "0070C0" },
            };
            cell.alignment = { vertical: "middle", horizontal: "center" };
          });
          await Promise.all(
            allProducts.map(async (product, index) => {
              worksheet.addRow({
                _id: product._id,
                ten_san_pham: product.ten_san_pham,
                hinh_anh: product.hinh_anh,
                so_luong: product.so_luong,
                gia_san_pham: product.gia_san_pham,
                gia_giam: product.gia_giam,
                ma_san_pham: product.ma_san_pham,
              });
              const response = await fetch(
                `http://localhost:5000/images/${product.hinh_anh}`
              );
              if (!response.ok) {
                throw new Error(`Không thể tải ảnh từ URL: ${product.hinh_anh}`);
              }
              const imageBuffer = await response.arrayBuffer();
              const imageExtension = product.hinh_anh.split(".").pop();
              const imageId = workbook.addImage({
                buffer: imageBuffer,
                extension: imageExtension === "png" ? "png" : "jpeg",
              });
              const rowNumber = index + 2;
              worksheet.addImage(imageId, {
                tl: { col: 3.2, row: rowNumber - 0.8 },
                ext: { width: 50, height: 50 },
              });
              const currentRow = worksheet.getRow(rowNumber);
              currentRow.height = 50;
            })
          );
          worksheet.eachRow((row) => {
            row.eachCell((cell) => {
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
            });
          });
          const buffer = await workbook.xlsx.writeBuffer();
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "danh_muc.xlsx";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          Swal.fire({
            title: "Thành công",
            text: "Dữ liệu đã được xuất ra file Excel!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Lỗi khi xuất Excel:", error);
          Swal.fire({
            title: "Lỗi",
            text: "Không thể xuất file Excel. Vui lòng thử lại!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
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

    try {
      let currentPage = 1;
      let totalPages = 1;
      const allProducts = [];

      // Fetch all pages of products
      while (currentPage <= totalPages) {
        const response = await fetch(
          `http://localhost:5000/product/allsp?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch page ${currentPage}: ${response.statusText}`
          );
        }
        const data = await response.json();
        allProducts.push(...data.products);
        totalPages = data.totalPages;
        currentPage++;
      }

      // Sort products by ID (optional)
      const sortedProducts = [...allProducts].sort((a, b) => {
        return a._id.localeCompare(b._id);
      });

      // Load all product images
      const images = await Promise.all(
        sortedProducts.map((product) => {
          if (product.hinh_anh) {
            const imageUrl = `http://localhost:5000/images/${product.hinh_anh}`;
            return new Promise((resolve) => {
              const img = new Image();
              img.crossOrigin = "Anonymous";
              img.src = imageUrl;
              img.onload = () => {
                resolve({
                  id: product._id,
                  img: img,
                });
              };
              img.onerror = () => {
                console.error(`Không thể tải ảnh từ URL: ${imageUrl}`);
                resolve({
                  id: product._id,
                  img: null,
                });
              };
            });
          }
          return Promise.resolve({ id: product._id, img: null });
        })
      );

      // Generate the PDF table
      doc.autoTable({
        head: [
          [
            "ID sản phẩm",
            "Tên sản phẩm",
            "Ảnh sản phẩm",
            "Số lượng",
            "Giá tiền",
            "Giá giảm",
            "Mã sản phẩm",
          ],
        ],
        body: sortedProducts.map((product) => [
          product._id,
          product.ten_san_pham,
          product.hinh_anh ? "Hình ảnh" : "Không có",
          product.so_luong,
          product.gia_san_pham,
          product.gia_giam,
          product.ma_san_pham,
        ]),
        startY: 20,
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
        didDrawCell: (data) => {
          if (data.column.index === 2 && data.cell.raw === "Hình ảnh") {
            const rowIndex = data.row.index;
            const imageData = images.find(
              (img) => img.id === sortedProducts[rowIndex]._id
            );

            if (imageData && imageData.img) {
              const img = imageData.img;
              const imgWidth = 30;
              const imgHeight = 30;
              const posX = data.cell.x + (data.cell.width - imgWidth) / 2;
              const posY = data.cell.y + 1;

              // Convert Image to Data URL
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              const imgData = canvas.toDataURL(
                img.src.endsWith(".png") ? "image/png" : "image/jpeg"
              );

              doc.addImage(
                imgData,
                img.src.endsWith(".png") ? "PNG" : "JPEG",
                posX,
                posY,
                imgWidth,
                imgHeight
              );
            }
          }
        },
      });

      const date = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.text(`Ngày xuất: ${date}`, 10, doc.internal.pageSize.height - 10);
      doc.save("sanpham.pdf");

      Swal.fire({
        title: "Thành công",
        text: "Dữ liệu và hình ảnh đã được xuất ra PDF!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
      Swal.fire({
        title: "Lỗi",
        text: "Không thể xuất file PDF. Vui lòng thử lại!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
        const response = await fetch(
          `http://localhost:5000/product/xoasp/${id}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error("Lỗi khi xóa sản phẩm");
        }
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );

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
          {products.length > 0 ? (
            <table id="productTable" className={styles.productTable}>
              <thead>
                <tr>
                  <th style={{ width: "15%", textAlign: "center" }}>
                    ID sản phẩm
                  </th>
                  <th style={{ width: "20%", textAlign: "center" }}>
                    Tên sản phẩm
                  </th>
                  <th style={{ width: "10%", textAlign: "center" }}>Ảnh</th>
                  <th style={{ width: "10%", textAlign: "center" }}>
                    Số lượng
                  </th>
                  <th style={{ width: "10%", textAlign: "center" }}>
                    Giá tiền
                  </th>
                  <th style={{ width: "10%", textAlign: "center" }}>
                    Giá giảm
                  </th>
                  <th style={{ width: "15%", textAlign: "center" }}>
                    Mã sản phẩm
                  </th>
                  <th style={{ width: "15%", textAlign: "center" }}>
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const {
                    _id,
                    ten_san_pham,
                    ma_san_pham,
                    gia_san_pham,
                    gia_giam,
                    hinh_anh,
                    so_luong,
                  } = product;

                  return (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td>{ten_san_pham}</td>
                      <td>
                        <img
                          src={`http://localhost:5000/images/${hinh_anh}`}
                          alt="Sản phẩm"
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>{so_luong}</td>
                      <td style={{ textAlign: "center" }}>
                        {gia_san_pham.toLocaleString("vi-VN")}₫
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {gia_giam.toLocaleString("vi-VN")}₫
                      </td>
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
                        <button
                          className={`${styles.btn} ${styles.delete}`}
                          onClick={() => deleteProduct(_id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              Không tìm thấy sản phẩm.
            </p>
          )}
          <div className={styles.pagination}>
            <span>
              Hiện {startProductIndex} đến {endProductIndex} của {totalProducts}{" "}
              sản phẩm
            </span>
            <div className={styles.paginationControls}>
              <button
                className={`${styles.paginationButton} ${
                  currentPage === 1 ? styles.disabled : styles["other-page"]
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button className={styles.paginationButton}>
                {`Trang ${currentPage} / ${totalPage}`}
              </button>
              <button
                className={`${styles.paginationButton} ${
                  currentPage === totalPage
                    ? styles.disabled
                    : styles["other-page"]
                }`}
                onClick={() =>
                  currentPage < totalPage && handlePageChange(currentPage + 1)
                }
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
