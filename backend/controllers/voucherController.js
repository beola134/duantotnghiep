const voucher = require("../models/voucher");
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); //; // Adjust the path as necessary
const { Op } = require("sequelize");


//thêm voucher
const addVoucher = async (req, res) => {
  const { ma_voucher, gia_tri,phan_tram,so_luong, bat_dau, ket_thuc, mo_ta } = req.body;

  try {
    const newVoucher = await voucher.create({
      ma_voucher,
      gia_tri,
      phan_tram,
      so_luong,
      bat_dau,
      ket_thuc,
      mo_ta,
    });

    res.status(201).json(newVoucher);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
    
  }
};

//tìm kiếm voucher theo mã voucher để áp dụng cho đơn hàng dùng phương thức post
const getVoucherByCode = async (req, res) => {
  const { ma_voucher } = req.body;

  try {
    const voucherFound = await voucher.findOne({ where: { ma_voucher } });
    if (!voucherFound) {
      return res.status(404).json({ error: "Không tìm thấy voucher" });
    }
    //kiểm tra xem voucher có còn hạn không
    const currentDate = new Date();
    if (new Date(voucherFound.bat_dau) > currentDate || new Date(voucherFound.ket_thuc) < currentDate) {
      return res.status(404).json({ error: "Voucher đã hết hạn" });
    }
    res.status(200).json(voucherFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
    
  }
};
/////////////////////////////////////////

// lấy voucher theo ID
const getVoucherById = async (req, res) => {
  const { id } = req.params;

  try {
    const voucherFound = await voucher.findOne({ where: { _id: id } });
    if (voucherFound) {
      res.status(200).json(voucherFound);
    } else {
      res.status(404).json({ message: "Voucher not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
                              
// show all vouchers
const getAllVouchers = async (req, res) => {
  try {
    const { ma_voucher, limit = 2, page = 1 } = req.query;

    let filter = {
      [Op.and]: [],
    };

    if (ma_voucher) {
      filter[Op.and].push({ ma_voucher: { [Op.like]: `%${ma_voucher}%` } });
    }

    const offset = (page - 1) * limit;
    const { rows: vouchers, count: totalVouchers } =
      await voucher.findAndCountAll({
        where: filter,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

    const totalPages = Math.ceil(totalVouchers / limit);
if (!voucher || vouchers.length === 0) {
  return res.status(200).json({
    vouchers: [],
    currentPage: parseInt(page),
    totalPages: 0,
    totalVouchers: 0,
    message: "Không tìm thấy voucher",
  });
}
    
    res.status(200).json({
      vouchers,
      currentPage: parseInt(page),
      totalPages,
      totalVouchers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// cập nhật voucher
const updateVoucher = async (req, res) => {
  const { id } = req.params;
  const { ma_voucher, gia_tri, bat_dau, ket_thuc,so_luong,phan_tram, mo_ta } = req.body;

  try {
    const voucherToUpdate = await voucher.findOne({ where: { _id: id } });
    
    if (!voucherToUpdate) {
      return res.status(404).json({ error: "Không tìm thấy voucher" });
    }

    voucherToUpdate.ma_voucher = ma_voucher || voucherToUpdate.ma_voucher;
    voucherToUpdate.gia_tri = gia_tri || voucherToUpdate.gia_tri;
    voucherToUpdate.bat_dau = bat_dau || voucherToUpdate.bat_dau;
    voucherToUpdate.ket_thuc = ket_thuc || voucherToUpdate.ket_thuc;
    voucherToUpdate.so_luong = so_luong || voucherToUpdate.so_luong;
    voucherToUpdate.phan_tram = phan_tram || voucherToUpdate.phan_tram;
    voucherToUpdate.mo_ta = mo_ta || voucherToUpdate.mo_ta;

    await voucherToUpdate.save();

    res.status(200).json({ message: "Cập nhật thành công", voucher: voucherToUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// xóa voucher
// Hàm xử lý việc xóa danh mục
const deleteVouCher = async (req, res) => {
    const { id } = req.params;
  try {
    const voucherToDelete = await voucher.findOne({ where: { _id: id } });
    if (!voucherToDelete) {
      return res.status(404).json({ error: "Không tìm thấy voucher" });
    }
    await voucherToDelete.destroy();
    res.json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 


////////////////////////////////////



module.exports = {
  addVoucher,
  getVoucherByCode,
  getAllVouchers,
  updateVoucher,
  deleteVouCher,
  getVoucherById,
};
