const express = require('express');
const router = express.Router();
const voucher = require('../controllers/voucherController');

//Thêm voucher
//http://localhost:5000/voucher
router.post('/', voucher.addVoucher);

////tìm kiếm voucher theo mã voucher để áp dụng cho đơn hàng dùng phương thức post
//http://localhost:5000/voucher/ma_voucher
router.post('/ma_voucher', voucher.getVoucherByCode);

module.exports = router;