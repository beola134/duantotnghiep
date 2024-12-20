const Cate = require("../models/danhmuc");
const upload = require("../config/update");
const { Op } = require("sequelize");

// lấy danh mục theo ID
exports.getCateById = async (req, res) => {
  try {
    const cates = await Cate.findOne({ where: { _id: req.params.id } });
    if (!cates) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }
    res.json({ cates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả danh mục với phân trang
exports.getAlldk = async (req, res) => {
  try {
    // Lấy các tham số từ query, với giá trị mặc định cho limit và page
    const { limit = 4, page = 1, ten_danh_muc = "" } = req.query;
    const offset = (page - 1) * limit;
    const searchCondition = ten_danh_muc ? { ten_danh_muc: { [Op.like]: `%${ten_danh_muc}%` } } : {};
    const { rows: cates, count: totalCates } = await Cate.findAndCountAll({
      where: searchCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(totalCates / limit);
    if (!cates || cates.length === 0) {
      return res.status(200).json({
        cates: [],
        currentPage: parseInt(page),
        totalPages: 0,
        totalCates: 0,
        message: "Không tìm thấy danh mục",
      });
    }

    res.status(200).json({
      cates,
      currentPage: parseInt(page),
      totalPages,
      totalCates,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hàm xử lý việc thêm danh mục với hình ảnh
exports.addCate = async (req, res) => {
  try {
    upload.single("hinh_anh")(req, res, async (err) => {
      //nếu có lỗi khi upload file thì trả
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { ten_danh_muc, mo_ta } = req.body;
      const hinh_anh = req.file ? req.file.originalname : "";
      const cate = new Cate({ ten_danh_muc, mo_ta, hinh_anh });
      await cate.save();
      res.json(cate);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hàm xử lý việc xóa danh mục
exports.deleteCate = async (req, res) => {
  try {
    const cate = await Cate.findOne({ where: { _id: req.params.id } });
    if (!cate) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }
    await cate.destroy();
    res.json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hàm xử lý việc cập nhật danh mục
exports.updateCate = async (req, res) => {
  try {
    // Tìm danh mục theo ID
    const cate = await Cate.findOne({ where: { _id: req.params.id } });
    if (!cate) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }
    // Xử lý upload ảnh
    upload.single("hinh_anh")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      // Cập nhật dữ liệu
      const { ten_danh_muc, mo_ta } = req.body;
      cate.ten_danh_muc = ten_danh_muc || cate.ten_danh_muc;
      cate.mo_ta = mo_ta || cate.mo_ta;
      cate.hinh_anh = req.file ? req.file.originalname : cate.hinh_anh;
      // Lưu thay đổi
      await cate.save();
      res.json(cate);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// danh muc
exports.getAllCateadmin = async (req, res) => {
  try {
    const cates = await Cate.findAll({});
    res.json({ cates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};