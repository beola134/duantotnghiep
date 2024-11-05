const voucher = require("../models/voucher");

//thêm voucher
const addVoucher = async (req, res) => {
  const { ma_voucher, gia_tri, bat_dau, ket_thuc, mo_ta } = req.body;

  try {
    const newVoucher = await voucher.create({
      ma_voucher,
      gia_tri,
      bat_dau,
      ket_thuc,
      mo_ta,
    });

    res.status(201).json(newVoucher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//tìm kiếm voucher theo mã voucher để áp dụng cho đơn hàng dùng phương thức post
const getVoucherByCode = async (req, res) => {
  const { ma_voucher } = req.params;

  try {
    const voucherFound = await voucher.findOne({ ma_voucher: ma_voucher });
    if (voucherFound) {
      res.status(200).json(voucherFound);
    } else {
      res.status(404).json({ message: "Voucher not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const vouchers = await voucher.findAll();
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// cập nhật voucher
const updateVoucher = async (req, res) => {
  const { id } = req.params;
  const { ma_voucher, gia_tri, bat_dau, ket_thuc, mo_ta } = req.body;

  try {
    const voucherToUpdate = await voucher.findOne({ where: { _id: id } });
    
    if (!voucherToUpdate) {
      return res.status(404).json({ error: "Không tìm thấy voucher" });
    }

    voucherToUpdate.ma_voucher = ma_voucher || voucherToUpdate.ma_voucher;
    voucherToUpdate.gia_tri = gia_tri || voucherToUpdate.gia_tri;
    voucherToUpdate.bat_dau = bat_dau || voucherToUpdate.bat_dau;
    voucherToUpdate.ket_thuc = ket_thuc || voucherToUpdate.ket_thuc;
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
