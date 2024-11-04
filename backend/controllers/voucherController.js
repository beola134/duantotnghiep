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


////////////////////////////////////




module.exports = {
  addVoucher,getVoucherByCode
};
