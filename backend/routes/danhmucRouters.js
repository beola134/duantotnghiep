const express = require("express");
const router = express.Router();
const danhmucController = require("../controllers/danhmucController");

///tất cả các api liên quan đến danh mục
//show tất cả danh mục
//http://localhost:5000/cate/allcate
router.get("/allcate", danhmucController.getAllCates);

//thêm danh mục
//http://localhost:5000/cate/addcate
router.post("/addcate", danhmucController.addCate);

//xóa danh mục
//http://localhost:5000/cate/deletecate/:id", danhmucController.deleteCate);
router.delete("/deletecate/:id", danhmucController.deleteCate);

//sửa danh mục
//http://localhost:5000/cate/updatecate/:id", danhmucController.updateCate);
router.put("/updatecate/:id", danhmucController.updateCate);

/////////////////////////////////////////////////////////////
//viết api lấy chi tiết từng danh mục
//viết api show tất cả danh mục phân trang tìm kiếm


module.exports = router;