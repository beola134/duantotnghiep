const express = require("express");
const router = express.Router();
const ThongkeController = require("../controllers/thongkeController");

//thống kế tổng sản phẩm
//http://localhost:5000/thongke/getTotalProducts
router.get("/getTotalProducts", ThongkeController.getTotalProducts);

//tổng số lượng sản phẩm
//http://localhost:5000/thongke/getTotalProductsCount
router.get("/getTotalProductsCount", ThongkeController.getTotalProductsCount)

//tổng danh mục
//http://localhost:5000/thongke/getTotalCategories
router.get("/getTotalCategories", ThongkeController.getTotalCategories);

//tổng user
//http://localhost:5000/thongke/getTotalUsers
router.get("/getTotalUsers", ThongkeController.getTotalUsers);

//tổng đơn hàng
//http://localhost:5000/thongke/getTotalDonHang
router.get("/getTotalDonHang", ThongkeController.getTotalDonHang);

//tổng doanh thu
//http://localhost:5000/thongke/getTotalRevenue
router.get("/getTotalRevenue", ThongkeController.getDoanhThu);

module.exports = router;

