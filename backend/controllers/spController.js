// Lấy tất cả sản phẩm
const Product = require("../models/product");
const upload = require("../config/update");
const Cate = require("../models/cate");
const Category = require("../models/cate");
const { Sequelize,Op } = require("sequelize");

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  //show sản phẩm theo danh mục show lun thông tin danh mục sản phẩm
  exports.getProductsByCate = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          id_danh_muc: req.params.id,
          loai: {
            [Op.notIn]: ["Vòng Tay", "Trang Sức"],
          },
        },
      });

      const cate = await Category.findOne({ where: { _id: req.params.id } });

      res.json({ products, cate });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Chi tiết sản phẩm theo id
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findOne({ where: { _id: req.params.id } });
      if (!product) {
        return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
      }
      //show lun danh mục sản phẩm
      const cate = await Category.findOne({ where: { _id: product.id_danh_muc } });
      res.json({ product, cate });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Thêm sản phẩm
  exports.addProduct = async (req, res) => {
    try {
      // Xử lý upload file
      upload.single("hinh_anh")(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });
        const {
          ten_san_pham,
          ten,
          gia_san_pham,
          gia_giam,
          mo_ta,
          ma_san_pham,
          do_chiu_nuoc,
          xuat_xu,
          gioi_tinh,
          so_luong,
          loai_may,
          loai,
          duong_kinh,
          chat_lieu_day,
          chat_lieu_vo,
          mat_kinh,
          mau_mat,
          phong_cach,
          kieu_dang,
          thuong_hieu,
          size_day,
          mau_day,
          do_dai_day,
          id_danh_muc: categoryId,
        } = req.body;
        const hinh_anh = req.file ? req.file.originalname : "";
        // Kiểm tra danh mục
        if (!categoryId || !(await Cate.findOne({ where: { _id: categoryId } }))) {
          return res.status(400).json({ error: "ID danh mục không hợp lệ" });
        }
        // Tạo và lưu sản phẩm
        const product = await Product.create({
          ten_san_pham,
          ten,
          gia_san_pham,
          gia_giam,
          hinh_anh,
          mo_ta,
          ma_san_pham,
          do_chiu_nuoc,
          xuat_xu,
          gioi_tinh,
          so_luong,
          loai_may,
          loai,
          duong_kinh,
          chat_lieu_day,
          chat_lieu_vo,
          mat_kinh,
          mau_mat,
          phong_cach,
          kieu_dang,
          thuong_hieu,
          size_day,
          mau_day,
          do_dai_day,
          id_danh_muc: categoryId,
        });
        res.json({ product });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Xóa sản phẩm
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findOne({ where: { _id: req.params.id } });
      if (!product) {
        return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
      }
      await product.destroy();
      res.json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //cập nhật sản phẩm
  exports.updateProduct = async (req, res) => {
    try {
      // Tìm sản phẩm theo ID
      const product = await Product.findOne({ where: { _id: req.params.id } });
      if (!product) {
        return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
      }
      // Xử lý upload ảnh
      upload.single("hinh_anh")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        const {
          ten_san_pham,
          ten,
          gia_san_pham,
          gia_giam,
          mo_ta,
          ma_san_pham,
          do_chiu_nuoc,
          xuat_xu,
          gioi_tinh,
          so_luong,
          loai_may,
          loai,
          duong_kinh,
          chat_lieu_day,
          chat_lieu_vo,
          mat_kinh,
          mau_mat,
          phong_cach,
          kieu_dang,
          thuong_hieu,
          size_day,
          mau_day,
          do_dai_day,
          id_danh_muc: categoryId,
        } = req.body;
        const hinh_anh = req.file ? req.file.originalname : product.hinh_anh;
        // Kiểm tra danh mục
        if (!categoryId || !(await Cate.findOne({ where: { _id: categoryId } }))) {
          return res.status(400).json({ error: "ID danh mục không hợp lệ" });
        }
        // Cập nhật sản phẩm
        await product.update({
          ten_san_pham,
          ten,
          gia_san_pham,
          gia_giam,
          hinh_anh,
          mo_ta,
          ma_san_pham,
          do_chiu_nuoc,
          xuat_xu,
          gioi_tinh,
          so_luong,
          loai_may,
          loai,
          duong_kinh,
          chat_lieu_day,
          chat_lieu_vo,
          mat_kinh,
          mau_mat,
          phong_cach,
          kieu_dang,
          thuong_hieu,
          size_day,
          mau_day,
          do_dai_day,
          id_danh_muc: categoryId,
        });
        res.json({ product });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //phân trang sản phẩm
  exports.getProductsByPage = async (req, res) => {
    try {
      const { page = 1, limit = 2 } = req.query;
      const products = await Product.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
      });
      if (products.count === 0) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      res.json({ products });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  // Tìm kiếm sản phẩm
  exports.searchProducts = async (req, res) => {
    try {
      const { query } = req.body;
      // Tìm danh mục theo tên
      const categories = await Category.findAll({
        where: {
          danh_muc: {
            [Op.like]: `%${query}%`,
          },
        },
      });
      // Tìm sản phẩm theo tên hoặc theo danh mục
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            { ten_san_pham: { [Op.like]: `%${query}%` } },
            { id_danh_muc: categories.map((category) => category._id) }, // Tìm theo danh mục
          ],
        },
      });

      return res.json({ products });
    } catch (error) {
      console.error("Error searching products:", error);
      return res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm" });
    }
  }
