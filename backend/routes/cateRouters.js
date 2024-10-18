const express = require("express");
const router = express.Router();
const cateController = require("../controllers/cateController");

//show tất cả thương hiệu
//http://localhost:5000/cate/allcate
router.get("/allcate", cateController.getAllCates);

//show tất cả cate
//http://localhost:5000/cate/allcatess
router.get("/allcatess", cateController.getAllCatess);

//show cate theo id
//http://localhost:5000/cate/allcatess/:id
router.get("/allcatess/:id", cateController.getCateById);

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
