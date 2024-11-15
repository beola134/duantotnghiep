const express = require('express');
const router = express.Router();
const ptttController = require('../controllers/ptttController');
//http://localhost:5000/pttt/add-pttt
router.post('/add-pttt', ptttController.addPttt);

//http://localhost:5000/pttt/thanh-toan-momo
router.post('/thanh-toan-momo', ptttController.thanhToanMomo);

module.exports = router;