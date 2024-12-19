const ThuongHieu = require("../models/thuonghieu");
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

exports.getNewUsersToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const usersToday = await Users.findAll({
      where: {
        createdAt: {
          [Op.gte]: today,
        },
        quyen:{
          [Op.ne]: 1
        }
      },
      order: [["createdAt", "DESC"]],
    });

    if (usersToday.length === 0) {
     console.log(usersToday, "Không có người dùng mới hôm nay");
     
    }

    res.status(200).json({ usersToday });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Hiển thị tất cả đơn hàng với hình ảnh và tên người dùng
exports.getAllOrdersWithUserDetails = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); 

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const orders = await DonHang.findAll({
      where: {
        thoi_gian_tao: { 
          [Op.between]: [todayStart, todayEnd], 
        },
      },
    });

    const result = await Promise.all(
      orders.map(async (order) => {
        const user = await Users.findOne({ where: { _id: order.id_nguoi_dung } });
        return {
          ...order. dataValues,
          user: user
            ? {
              _id: user._id,
              ho_ten: user.ho_ten,
              email: user.email,
              hinh_anh: user.hinh_anh,
            }
            : null,
        }
      })
    );
    res.status(200).json({ orders: result });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};


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

// Thống kê tổng thương hiệu sản phẩm
exports.getTotalThuonghieu = async (req, res) => {
  try {
    const totalThuonghieu = await ThuongHieu.count();

    res.json({ totalThuonghieu });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
}

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
    const totalOrders = await DonHang.count({
      where: { trang_thai: "Giao hàng thành công" },
    })
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


//thống kê sản phẩm bán chạy nhất theo biễu đồ cột và trạng thái là giao hàng thành công
exports.getSanPhamBanChayNhat = async (req, res) => {
  try {
    const topProducts = await ChiTietDonHang.findAll({
      attributes: [
        "id_san_pham",
        [sequelize.fn("sum", sequelize.col("so_luong")), "total"],
      ],
      include: [
        {
          model: DonHang,
          as: "DonHang",
          attributes: [],
          where: {
            trang_thai: "Giao hàng thành công",
          },
        },
      ],
      group: ["id_san_pham"],
      order: [[sequelize.literal("total"), "DESC"]],
      limit: 5,
    });

    const result = await Promise.all(
      topProducts.map(async (product) => {
        const productDetail = await Product.findByPk(product.id_san_pham);
        return {
          id_san_pham: product.id_san_pham,
          ten_san_pham: productDetail.ten_san_pham,
          total: product.get("total"),
        };
      })
    );

    res.json({ topProducts: result });
    
  } catch (error) {
    
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
}


exports.getDoanhThuDonHangTheoThoiGian = async (req, res) => {
  // Lấy giá trị 'period' từ query string (ví dụ: day, month, year)
  const { period } = req.query; 
    // Kiểm tra giá trị 'period' có hợp lệ không (phải là day, month, hoặc year)
  if (!['day', 'month', 'year'].includes(period)) {
    return res.status(400).json({ error: 'Không hợp lệ phải là ngày tháng năm' });
  }
  try {
    //lấy doanh thu theo ngày, tháng, năm
    let attributes = [];
    let group = [];
        // Xác định cột cần lấy và cách nhóm dữ liệu dựa vào 'period'
    switch (period) {
      case 'day':
        attributes = [
          // Lấy ngày từ 'thoi_gian_tao'
          [sequelize.fn("day", sequelize.col("thoi_gian_tao")), "day"],
           // Tính tổng doanh thu ('tong_tien')
          [sequelize.fn("sum", sequelize.col("tong_tien")), "total"],
        ];
        // Nhóm dữ liệu theo ngày
        group = [sequelize.fn("day", sequelize.col("thoi_gian_tao"))];
        break;
      case 'month':
        attributes = [
          [sequelize.fn("month", sequelize.col("thoi_gian_tao")), "month"],
          [sequelize.fn("sum", sequelize.col("tong_tien")), "total"],
        ];
        group = [sequelize.fn("month", sequelize.col("thoi_gian_tao"))];
        break;
      case 'year':
        attributes = [
          [sequelize.fn("year", sequelize.col("thoi_gian_tao")), "year"],
          [sequelize.fn("sum", sequelize.col("tong_tien")), "total"],
        ];
        group = [sequelize.fn("year", sequelize.col("thoi_gian_tao"))];
        break;
      default:
        break;
    }
    const doanhThuDonHangTheo = await DonHang.findAll({
      attributes,
      where: {
        trang_thai: "Giao hàng thành công",
      },
      group,
    });

    let result = [];
    // Xử lý kết quả tùy theo "period"
    switch (period) {
      case 'day':
        const doanhThuNgay = new Array(31).fill(0);
        doanhThuDonHangTheo.forEach(item => {
          const day = item.get("day") - 1;
          const totalRevenue = parseFloat(item.get("total")) || 0;// Lấy tổng doanh thu, nếu không có thì gán 0
          // Kiểm tra ngày có hợp lệ không (từ 0 đến 30)
          if (day >= 0 && day < 31) {
            // Gán doanh thu vào mảng theo ngày
            doanhThuNgay[day] = totalRevenue;
          }
        });
        // Tạo mảng kết quả với ngày và doanh thu tương ứng
        result = doanhThuNgay.map((totalRevenue, index) => ({
          // Ngày bắt đầu từ 1, nên cần cộng thêm 1
          day: index + 1,
          // Doanh thu tương ứng
          totalRevenue,
        }));
        break;
      case 'month':
        ///
        const doanhThuThang = new Array(12).fill(0);
        doanhThuDonHangTheo.forEach(item => {
          const month = item.get("month") - 1;
          const totalRevenue = parseFloat(item.get("total")) || 0;
          if (month >= 0 && month < 12) {
            doanhThuThang[month] = totalRevenue;
          }
        });
        result = doanhThuThang.map((totalRevenue, index) => ({
          month: index + 1,
          totalRevenue,
        }));
        break;
      case 'year':
        // Lấy danh sách các năm từ kết quả truy vấn
        const years = doanhThuDonHangTheo.map(item => item.get("year"));
        // Tìm năm nhỏ nhất và lớn nhất
        const minYear = Math.min(...years);
        //tìm năm lớn nhất
        const maxYear = Math.max(...years);
        const numberOfYears = maxYear - minYear + 1;
        const doanhThuNam = Array.from({ length: numberOfYears }, (_, i) => ({
          //tạo danh sách năm
          year: minYear + i,
          //tổng doanh thu
          totalRevenue: 0,
        }));

        doanhThuDonHangTheo.forEach(item => {
          const year = item.get("year");
          //lấy tổng doanh thu từ kết quả truy vấn hoặc gán 0 nếu không có
          const totalRevenue = parseFloat(item.get("total")) || 0;
          //tìm vị trí của năm trong mảng doanhThuNam
          const index = year - minYear;
          if (index >= 0 && index < doanhThuNam.length) {
            //gán tổng doanh thu vào mảng
            doanhThuNam[index].totalRevenue = totalRevenue;
          }
        });

        result = doanhThuNam;
        break;
      default:
        result = [];
    }

    res.json({ doanhThuDonHangTheo: result });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};



//thonng kê tong so luong nguoi_dung trong tuan dung sum
exports.getNewUsersThisWeek = async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const totalUsersInWeek = await Users.count({
      where: {
        createdAt: {
          [Op.gte]: firstDayOfWeek,
        },
      },
    });
    res.json({ totalUsersInWeek });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};



