const Cate = require("../models/cate");
const CMT = require('../models/comment');
const Product = require('../models/product');
const Users = require("../models/users");
const voucher = require("../models/voucher");
const PhuongThucThanhToan = require("../models/pttt");
const Voucher = require("../models/voucher");
const ChiTietDonHang = require("../models/chitietdonhang");
const DonHang = require("../models/donhang");
const { Op } = require('sequelize');
const sequelize = require('../config/database'); 

// Thống kê tổng số sản phẩm
exports.getTotalProducts = async (req, res) => {
    try {
    const getTotalProducts = await Product.count();

    res.json({ getTotalProducts });
    } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
    }
};

//thống kê số lượng sản phẩm
exports.getTotalProductsCount = async (req, res) => {
  try {
    const totalProductsCount = await Product.sum("so_luong");
    res.json({ totalProductsCount });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};

// Thống kê tổng danh mục sản phẩm
exports.getTotalCategories = async (req, res) => {
  try {
    const totalCategories = await Cate.count();

    res.json({ totalCategories });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};

// Tính tổng số người dùng dành cho admin
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await Users.count();

    res.json({ totalUsers });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};
// Tính tổng số đơn hàng dành cho admin
exports.getTotalDonHang = async (req, res) => {
  try {
    const totalOrders = await DonHang.count();

    res.json({ totalOrders });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};

// thống kê doanh thu
exports.getDoanhThu = async (req, res) => {
  try {
    const doanhThu = await DonHang.sum("tong_tien", {
      where: {
        trang_thai: "Giao hàng thành công",
      },
    });
    res.json({ doanhThu });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};

//thông kê dooanh thu donhang theo tháng bằng sơ đồ cột theo 12 tháng
exports.getDoanhThuDonHangTheoThang = async (req, res) => {
  try {
    // Lấy doanh thu theo tháng từ database
    const doanhThuDonHangTheo = await DonHang.findAll({
      attributes: [
        // Lấy tháng từ thời gian tạo đơn hàng
        [sequelize.fn("month", sequelize.col("thoi_gian_tao")), "month"], 
        // Tính tổng doanh thu của các đơn hàng
        [sequelize.fn("sum", sequelize.col("tong_tien")), "total"],
      ],
      where: {
        trang_thai: "Giao hàng thành công", 
      },
      group: [sequelize.fn("month", sequelize.col("thoi_gian_tao"))],
    });

    // Tạo mảng tháng từ 1 đến 12, với doanh thu mặc định là 0
    const doanhThuThang = new Array(12).fill(0);

    // Cập nhật doanh thu cho các tháng có dữ liệu từ kết quả trả về
    doanhThuDonHangTheo.forEach(item => {
      const month = item.get("month") - 1
      const totalRevenue = item.get("total") || 0;
      doanhThuThang[month] = totalRevenue;
    });

    // Trả về kết quả với doanh thu cho tất cả 12 tháng
    const result = doanhThuThang.map((totalRevenue, index) => ({
      month: index + 1,
      totalRevenue,
    }));

    res.json({ doanhThuDonHangTheo: result });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};










