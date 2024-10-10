const express = require('express');
const router = express.Router();
const ptttController = require('../controllers/ptttController');
//http://localhost:5000/pttt/add-pttt
router.post('/add-pttt', ptttController.addPttt);

module.exports = router;