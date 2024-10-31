const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//show sản phẩm mới nhất theo gioi_tinh nam
//http://localhost:5000/product/filtersanphamdongho
router.get("/filtersanphamdongho", productController.filtersanphamdongho);

//show sản phẩm mới nhất theo gioi_tinh nam limit 10
//http://localhost:5000/product/limit/gioitinh-nam
router.get("/limit/gioitinh-nam", productController.getNewLimitMale);

//show sản phẩm mới nhất theo gioi_tinh nam
//http://localhost:5000/product/new/gioitinh-nam
router.get("/new/gioitinh-nam", productController.getNewProductsMale);

//show sản phẩm theo giới tính nam
//http://localhost:5000/product/allsp/gioitinh-nam
router.get("/allsp/gioitinh-nam", productController.getMale);

//show sản phẩm theo giới tính nam10sp
//http://localhost:5000/product/allsp/gioitinh-nam10sp
router.get("/allsp/gioitinh-nam10sp", productController.getMale10sp);

//show sản phẩm mới nhất theo gioi_tinh nu limit 10
//http://localhost:5000/product/limit/gioitinh-nu
router.get("/limit/gioitinh-nu", productController.getNewLimitFeMale);

//show sản phẩm mới nhất theo gioi_tinh nữ
//http://localhost:5000/product/new/gioitinh-nu
router.get("/new/gioitinh-nu", productController.getNewProductsFeMale);

//show sản phẩm theo giới tính nữ
//http://localhost:5000/product/allsp/gioitinh-nu
router.get("/allsp/gioitinh-nu", productController.getFeMale);

//show sản phẩm theo giới tính nu10sp
//http://localhost:5000/product/allsp/gioitinh-nu10sp
router.get("/allsp/gioitinh-nu10sp", productController.getFeMale10sp);

//http://localhost:5000/product/allsp/doi
router.get("/allsp/doi", productController.getCouple);

//http://localhost:5000/product/allsp/doi10sp"
router.get("/allsp/doi10sp", productController.getCouple10sp);

//show sản phẩm mới nhất theo gioi_tinh doi limit 10
//http://localhost:5000/product/limit/doi
router.get("/limit/doi", productController.getNewLimitCouple);

//show sản phẩm mới nhất theo doi
//http://localhost:5000/product/new/doi
router.get("/new/doi", productController.getNewProductsCouple);

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

// show sản phẩm theo dây đồng hồ 
//http://localhost:5000/product/filterDayDongHo"
router.get("/filterDayDongHo", productController.filterDayDongHo);

// show sản phẩm theo đồng hồ để bàn
//http://localhost:5000/product/filterDeBan"
router.get("/filterDeBan", productController.filterDeBan);

// show sản phẩm theo đồng hồ báo thức
//http://localhost:5000/product/filterBaoThuc"
router.get("/filterBaoThuc", productController.filterBaoThuc);

// show sản phẩm theo đồng hồ treo tuong
//http://localhost:5000/product/filterTreoTuong"
router.get("/filterTreoTuong", productController.filterTreoTuong);

// show sản phẩm thêm chất liệu dây da
//http://localhost:5000/product/allsp/getChatLieuDayDa"
router.get("/allsp/getChatLieuDayDa", productController.getChatLieuDayDa);

// show sản phẩm thêm chất liệu dây dù
//http://localhost:5000/product/allsp/getChatLieuDayDu"
router.get("/allsp/getChatLieuDayDu", productController.getChatLieuDayDu);

// show sản phẩm thêm chất liệu dây caosu
//http://localhost:5000/product/allsp/getChatLieuDayCaoSu"
router.get("/allsp/getChatLieuDayCaoSu", productController.getChatLieuDayCaoSu);

// show sản phẩm thêm Xuất xứ TS
//http://localhost:5000/product/allsp/getXuatXuTS"
router.get("/allsp/getXuatXuTS", productController.getXuatXuTS);

// show sản phẩm thêm Xuất xứ TD
//http://localhost:5000/product/allsp/getXuatXuTD"
router.get("/allsp/getXuatXuTD", productController.getXuatXuTD);

// show sản phẩm thêm Xuất xứ NB
//http://localhost:5000/product/allsp/getXuatXuNB"
router.get("/allsp/getXuatXuNB", productController.getXuatXuNB);

// show sản phẩm thêm Xuất xứ Mỹ
//http://localhost:5000/product/allsp/getXuatXuMy"
router.get("/allsp/getXuatXuMy", productController.getXuatXuMy);

// Show sản phẩm theo id danh mục  vòng tay trang sức
//http://localhost:5000/product/category/loai/:id/"
router.get("/category/loai/:id/", productController.getProdctsCateLoai);

module.exports = router;
