const CMT = require("../models/comment");
const Product = require("../models/product");
const Users = require("../models/users");
//show tất cả bình luận
exports.showAllComment = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const comments = await CMT.findAll({
      limit,
      offset,
    });
    const totalComments = await CMT.count();
    const totalPages = Math.ceil(totalComments / limit);
    res.status(200).json({ comments, totalComments, totalPages, currentPage: page });
    res.status(200).json({ comments });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Lỗi server" });
  }
}
//Bình luận sản phẩm theo _id sản phẩm và _id người dùng
exports.addComment = async (req, res) => {
  try {
    const { id_san_pham, id_nguoi_dung, noi_dung, sao } = req.body;
    //kiểm tra xem sản phẩm và người dùng có tồn tại không
    const product = await Product.findOne({ where: { _id: id_san_pham } });
    const user = await Users.findOne({ where: { _id: id_nguoi_dung } });
    if (!product) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
    }
    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy người dùng" });
    }
    //tạo bình luận
    const comment = await CMT.create({
      noi_dung,
      sao,
      id_nguoi_dung,
      id_san_pham,
    });
    res.status(201).json({ comment });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

//lấy tất cả bình luận theo _id sản phẩm
exports.getAllComment = async (req, res) => {
  try {
    const { id_san_pham } = req.params;
    const { page = 1, limit = 3 } = req.query;
    const offset = (page - 1) * limit;
    // Kiểm tra xem sản phẩm có tồn tại không
    const product = await Product.findOne({ where: { _id: id_san_pham } });
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    // Lấy tất cả bình luận theo _id sản phẩm với phân trang
    const comments = await CMT.findAll({
      where: { id_san_pham },
      limit,
      offset,
    });
    // Lấy thông tin người dùng cho từng bình luận
    const commentsWithUser = await Promise.all(
      comments.map(async (comment) => {
        const user = await Users.findOne({ where: { _id: comment.id_nguoi_dung } });
        return {
          ...comment.dataValues,
          user: user
            ? {
                _id: user._id,
                ten_dang_nhap: user.ten_dang_nhap,
                hinh_anh: user.hinh_anh,
              }
            : null,
        };
      })
    );
    // Tính tổng số bình luận theo _id sản phẩm đó
    const totalComments = await CMT.count({ where: { id_san_pham } });
    const totalPages = Math.ceil(totalComments / limit); // Tổng số trang
    res.status(200).json({
      comments: commentsWithUser,
      totalComments,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

//sửa bình luận theo _id nguoi_dung và _id sản phẩm
exports.editComment = async (req, res) => {
  try {
    const { id_nguoi_dung, id_san_pham } = req.params;
    const { noi_dung, sao } = req.body;
    //kiểm tra xem bình luận có tồn tại không
    const comment = await CMT.findOne({ where: { id_nguoi_dung, id_san_pham } });
    if (!comment) {
      return res.status(400).json({ message: "Không tìm thấy bình luận" });
    }
    //sửa bình luận
    comment.noi_dung = noi_dung;
    comment.sao = sao;
    await comment.save();
    res.status(200).json({ comment });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

