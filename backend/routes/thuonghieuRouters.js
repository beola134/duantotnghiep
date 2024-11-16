const express = require("express");
const router = express.Router();
const thuonghieuController = require("../controllers/thuonghieuController");
//test sua lôi push cho son
//test sua loi push cho son 2

//show tất cả thương hiệu
//http://localhost:5000/cate/allcate
router.get("/allcate", cateController.getAllCates);

//show tất cả cate
//http://localhost:5000/cate/allcatess
router.get("/allcatess", thuonghieuController.getAllThuongHieu);

//show cate theo id
//http://localhost:5000/cate/allcatess/:id
router.get("/allcatess/:id", thuonghieuController.getthuonghieuById);

//thêm danh mục
//http://localhost:5000/cate/addcate
router.post("/addcate", cateController.addCate);

//xóa danh mục
//http://localhost:5000/cate/deletecate
router.delete("/deletecate/:id", cateController.deleteCate);

//sửa danh mục
//http://localhost:5000/cate/updatecate
router.put("/updatecate/:id", cateController.updateCate);

module.exports = router;
