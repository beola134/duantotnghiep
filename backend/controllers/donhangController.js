const GhiChu = require("../models/ghichu");
const PhuongThucThanhToan = require("../models/pttt");
const Product = require("../models/product");
const Users = require("../models/users");
const Voucher = require("../models/voucher");
const { v4: uuidv4 } = require("uuid"); // Import UUID v4
const { Op } = require("sequelize"); // Import Sequelize operators
const { DonHang, ChiTietDonHang } = require("../models");

const addDonHang = async (req, res) => {
  let {
    dia_chi,
    tong_tien,
    trang_thai,
    da_thanh_toan,
    phi_ship,
    thoi_gian_tao,
    id_nguoi_dung,
    id_phuong_thuc_thanh_toan,
    ghi_chu,
    chi_tiet_don_hang,
    ma_voucher,
  } = req.body;

  try {
    let totalAmount = 0;
    if (chi_tiet_don_hang && chi_tiet_don_hang.length > 0) {
      for (const ct of chi_tiet_don_hang) {
        const product = await Product.findByPk(ct.id_san_pham);
        if (product) {
          if (product.so_luong < ct.so_luong) {
            throw new Error(
              `Số lượng sản phẩm ${product.ten_san_pham} không đủ`
            );
          }
          const price = product.gia_giam > 0 ? product.gia_giam : product.gia_san_pham;
          totalAmount += price * ct.so_luong;
          product.so_luong -= ct.so_luong;
          await product.save();
        } else {
          throw new Error(`Sản phẩm với ID ${ct.id_san_pham} không tồn tại`);
        }
      }
    }

    // totalAmount += 30000;

    let voucher = null;
    if (ma_voucher) {
      voucher = await Voucher.findOne({
        where: {
          ma_voucher,
          bat_dau: {
            [Op.lte]: new Date(),
          },
          ket_thuc: {
            [Op.gte]: new Date(),
          },
        },
      });
    }

    if (voucher) {
      totalAmount -= voucher.gia_tri;
    }
    totalAmount = Math.max(totalAmount, 0);
    da_thanh_toan = totalAmount === 0;
    const donHang = await DonHang.create({
      _id: uuidv4(),
      dia_chi,
      tong_tien: totalAmount,
      trang_thai: "Chờ xác nhận",
      da_thanh_toan: totalAmount,
      phi_ship: 30000,
      thoi_gian_tao,
      id_nguoi_dung,
      id_phuong_thuc_thanh_toan: id_phuong_thuc_thanh_toan || null,
      ghi_chu,
      id_voucher: voucher ? voucher._id : null,
    });

    if (chi_tiet_don_hang && chi_tiet_don_hang.length > 0) {
      const chiTietPromises = chi_tiet_don_hang.map(async (ct) => {
        const product = await Product.findByPk(ct.id_san_pham);
        if (product) {
          await ChiTietDonHang.create({
            gia_san_pham: product.gia_giam > 0 ? product.gia_giam : product.gia_san_pham,
            ten_san_pham: product.ten_san_pham,
            so_luong: ct.so_luong,
            id_don_hang: donHang._id,
            id_san_pham: ct.id_san_pham,
          });
        }
      });
      await Promise.all(chiTietPromises);
    }

    res
      .status(201)
      .json({ message: "Đơn hàng đã được thêm thành công", donHang });
  } catch (error) {
    console.error("Lỗi khi thêm đơn hàng:", error);
    res.status(500).json({ message: "Lỗi khi thêm đơn hàng", error });
  }
};

//show tất cả đơn hàng
const getAllDonHang = async (req, res) => {
  try {
    const donHangs = await DonHang.findAll();
    if (donHangs.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    } 
    return res.status(200).json({donHangs});
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi, vui lòng thử lại sau." });
  }
}

//cập nhật trạng thái đơn hàng
const updateDonHang = async (req, res) => {
  const { id } = req.params;
  const { trang_thai } = req.body;
  try {
    const donHang = await DonHang.findByPk(id);
    if (!donHang) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    donHang.trang_thai = trang_thai;
    await donHang.save();
    res.json({ message: "Cập nhật trạng thái đơn hàng thành công", donHang });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật trạng thái đơn hàng", error });
  }
};

//show all don hang theo id_nguoi_dung khi login
const getAllDonHangByUserId = async (req, res) => {
  try {
    const { id_nguoi_dung } = req.params;

    // Lấy tất cả đơn hàng theo id_nguoi_dung
    const orders = await DonHang.findAll({
      where: { id_nguoi_dung },
      include: [
        {
          model: ChiTietDonHang,
          as: "chiTietDonHangs",
          include: {
            model: Product,
            as: "product",
          },
        },
        {
          model: PhuongThucThanhToan,
          as: "phuongThucThanhToan",
          attributes: ["ten_phuong_thuc"],
        },
      ],
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng cho người dùng này." });
    }

    return res.status(200).json({orders});
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi, vui lòng thử lại sau." });
  }
};

//xem lịch sử mua hàng theo id_nguoi_dung khi login khi trang_thai là giao hàng thành công
const getDonHangByUserId = async (req, res) => {
  try {
    const { id_nguoi_dung } = req.params;

    // Lấy tất cả đơn hàng theo id_nguoi_dung
    const donHangs = await DonHang.findAll({
      where: { id_nguoi_dung, trang_thai: "Giao hàng thành công" },
      include: [
        {
          model: ChiTietDonHang,
          as: "chiTietDonHangs",
          include: {
            model: Product,
            as: "product",
          },
        },
        {
          model: PhuongThucThanhToan,
          as: "phuongThucThanhToan",
          attributes: ["ten_phuong_thuc"],
        },
      ],
    });

    if (donHangs.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng cho người dùng này." });
    }

    return res.status(200).json({donHangs});
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi, vui lòng thử lại sau." });
  }
};

///show chi tiết đơn hàng

module.exports = {
  addDonHang,
  updateDonHang,
  getAllDonHangByUserId,
  getDonHangByUserId,
  getAllDonHang,
};
