const Cate = require("../models/cate");
const CMT = require('../models/comment');
const Product = require('../models/product');
const Users = require("../models/users");
const voucher = require("../models/voucher");
const GhiChu = require("../models/ghichu");
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
// Tính tổng số bình luận dành cho admin
exports.getTotalComments = async (req, res) => {
  try {
    const totalComments = await CMT.count();

    res.json({ totalComments });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};

// Tính tổng số voucher dành cho admin
exports.getTotalVouchersCount = async (req, res) => {
  try {
    const totalVouchers = await Voucher.count();

    res.json({ totalVouchers });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};








