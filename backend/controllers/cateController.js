const Cate = require("../models/cate");
const upload = require("../config/update");
const { Op } = require('sequelize'); // Import Op từ sequelize

// Lấy tất cả danh mục
exports.getAllCates = async (req, res) => {
  try {
    const cates = await Cate.findAll({
      where: {
        _id: {
          [Op.notIn]: [
            '09204055-d105-4c21-90e3-58ee82d2f65a', 
            '92ad8d9a-fba0-48db-a93d-6974bb5a9ed9'
          ]
        }
      }
    });
    res.json({ cates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Hàm xử lý việc thêm danh mục với hình ảnh
exports.addCate = async (req, res) => {
  try {
    // Sử dụng upload.fields để xử lý nhiều hình ảnh
    upload.fields([{ name: "hinh_anh", maxCount: 1 }, { name: "hinh_anh2", maxCount: 1 }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { danh_muc, mo_ta } = req.body;
      const hinh_anh = req.files.hinh_anh ? req.files.hinh_anh[0].originalname : "";
      const hinh_anh2 = req.files.hinh_anh2 ? req.files.hinh_anh2[0].originalname : "";
      const cate = new Cate({ danh_muc, mo_ta, hinh_anh, hinh_anh2 });
      await cate.save();
      res.json({ cate });
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
    upload.fields([{ name: "hinh_anh", maxCount: 1 }, { name: "hinh_anh2", maxCount: 1 }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Cập nhật dữ liệu
      const { danh_muc, mo_ta } = req.body;
      cate.danh_muc = danh_muc || cate.danh_muc;
      cate.mo_ta = mo_ta || cate.mo_ta;

      // Cập nhật hình ảnh nếu có
      if (req.files.hinh_anh && req.files.hinh_anh.length > 0) {
        cate.hinh_anh = req.files.hinh_anh[0].originalname;
      }
      if (req.files.hinh_anh2 && req.files.hinh_anh2.length > 0) {
        cate.hinh_anh2 = req.files.hinh_anh2[0].originalname;
      }

      // Lưu thay đổi
      await cate.save();
      res.json({ cate });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
