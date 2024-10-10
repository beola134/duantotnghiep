const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//show sản phẩm mới nhất theo gioi_tinh nam 
//http://localhost:5000/product/new/gioitinh-nam
router.get("/new/gioitinh-nam", productController.getNewProductsMale);

//show sản phẩm theo giới tính nam
//http://localhost:5000/product/allsp/gioitinh-nam
router.get("/allsp/gioitinh-nam", productController.getMale);

//show sản phẩm theo giới tính nam10sp
//http://localhost:5000/product/allsp/gioitinh-nam10sp
router.get("/allsp/gioitinh-nam10sp", productController.getMale10sp);

//show sản phẩm mới nhất theo gioi_tinh nữ 
//http://localhost:5000/product/new/gioitinh-nu
router.get("/new/gioitinh-nu", productController.getNewProductsFeMale)

//show sản phẩm theo giới tính nữ
//http://localhost:5000/product/allsp/gioitinh-nu
router.get("/allsp/gioitinh-nu", productController.getFeMale);

//show sản phẩm theo giới tính nu10sp
//http://localhost:5000/product/allsp/gioitinh-nu10sp
router.get("/allsp/gioitinh-nu10sp", productController.getFeMale10sp);

//http://localhost:5000/product/allsp/doi"
router.get("/allsp/doi", productController.getCouple);

//http://localhost:5000/product/allsp/doi10sp"
router.get("/allsp/doi10sp", productController.getCouple10sp);

//show sản phẩm mới nhất theo doi
//http://localhost:5000/product/new/doi
router.get("/new/doi", productController.getNewProductsCouple)

//show sản phẩm theo giá dưới 2 củ
//http://localhost:5000/product/allsp/underTwomillion
router.get("/allsp/underTwomillion", productController.getProductsUnderTwoMillion);

//show sản phẩm theo giá từ 2 dến 5 triệu
//http://localhost:5000/product/tu2den5
router.get("/tu2den5", productController.getProductstu2den5trieu);

//show sản phẩm theo giá từ 5 dến 10 triệu
//http://localhost:5000/product/tu5den10
router.get("/tu5den10", productController.getProductstu5den10trieu);

//show sản phẩm theo giá từ 10 dến 20 triệu
//http://localhost:5000/product/tu10den20
router.get("/tu10den20", productController.getProductstu10den20trieu);

//show sản phẩm theo giá từ 20 dến 30 triệu
//http://localhost:5000/product/tu20den30
router.get("/tu20den30", productController.getProductstu20den30trieu);

//show sản phẩm theo giá từ 30 dến 50 triệu
//http://localhost:5000/product/tu30den50
router.get("/tu30den50", productController.getProductstu30den50trieu);

//show sản phẩm theo giá từ 50 dến 100 triệu
//http://localhost:5000/product/tu50den100
router.get("/tu50den100", productController.getProductstu50den100trieu);

//show sản phẩm theo giá trên 100 triệu
//http://localhost:5000/product/over100
router.get("/over100", productController.getProductsOver100trieu);

// show sản phẩm thêm chất liệu dây da
//http://localhost:5000/product/allsp/getChatLieuDayDa"
router.get("/allsp/getChatLieuDayDa", productController.getChatLieuDayDa);

// show sản phẩm thêm chất liệu dây dù
//http://localhost:5000/product/allsp/getChatLieuDayDu"
router.get("/allsp/getChatLieuDayDu", productController.getChatLieuDayDu)


//show tất cả sản phẩm
//http://localhost:5000/product/allsp
router.get("/allsp", productController.getAllProducts);

//show sản phẩm theo danh mục
//http://localhost:5000/product/category/:id
router.get("/category/:id", productController.getProductsByCate);

//chi tiết sản phẩm theo id
//http://localhost:5000/product/chitietsp/:id
router.get("/chitietsp/:id", productController.getProductById);

//thêm sản phẩm
//http://localhost:5000/product/themsp
router.post("/themsp", productController.addProduct);

//xóa sản phẩm
//http://localhost:5000/product/xoasp/:id
router.delete("/xoasp/:id", productController.deleteProduct);

//sửa sản phẩm
//http://localhost:5000/product/capnhatsp/:id
router.put("/capnhatsp/:id", productController.updateProduct);

//phân trang sản phẩm
//http://localhost:5000/product/phantrang?page=1&limit=5
router.get("/phantrang", productController.getProductsByPage);

//api tìm kiếm sản phẩm bằng cách nhập tên sản phẩm và tên danh mục
//http://localhost:5000/product/timkiem
router.post("/timkiem", productController.searchProducts);


module.exports = router;
