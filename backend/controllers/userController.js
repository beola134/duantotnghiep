const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../config/update");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize"); // Import Op từ Sequelize
require("dotenv").config();

//// API lấy thông tin người dùng theo id
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// API lấy thông tin tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const resetPasswordExpire = Date.now() + 2 * 60 * 1000;
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = new Date(resetPasswordExpire); //
    await user.save();

    const resetUrl = `http://localhost:3000/users/resetpassword/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nguyentantai612004@gmail.com",
        pass: "dmez voqj ozar xfzw",
      },
    });

    const mailOptions = {
      from: "nguyentantai612004@gmail.com",
      to: email,
      subject: "Đặt lại mật khẩu",
      html: `
          <div style="border: 1px solid #ddd; padding: 20px; margin: 20px auto; max-width: 600px; border-radius: 10px;">
                  <div style="text-align: center;">
                  <img src="https://nhaantoan.com/wp-content/uploads/2017/02/reset-password.png" alt="GitLab" width="50" />
                  <h2>Xin chào, ${user.ten_dang_nhap}!</h2>
                  <p>Ai đó (có thể là bạn) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
                  <p>Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua email này.</p>
                  <p>Nếu không, nhấp vào nút bên dưới để đặt lại mật khẩu:</p>
                  <a href="${resetUrl}" style="padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
          </div>
          <div style="margin-top: 20px; text-align: center;">
                    <p>Mọi người đều có thể đóng góp</p>
                    <a href="https://about.gitlab.com/">GitLab Blog</a> · 
                    <a href="https://twitter.com/gitlab">Twitter</a> · 
                    <a href="https://facebook.com/gitlab">Facebook</a> · 
                    <a href="https://linkedin.com/company/gitlab">LinkedIn</a>
          </div>
      </div>

                  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Lỗi gửi email:", error);
        return res.status(500).json({ message: "Lỗi máy chủ" });
      }
      console.log("Email đã được gửi: " + info.response);
      res.status(200).json({ message: "Email đã được gửi" });
    });
  } catch (error) {
    console.error("Lỗi máy chủ:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    const user = await Users.findOne({
      where: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    const { mat_khau } = req.body;
    if (!mat_khau) {
      return res.status(400).json({ message: "Mật khẩu không được để trống" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(mat_khau, salt);
    user.mat_khau = hashPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Đặt lại mật khẩu thành công" });
  } catch (error) {
    console.error("Lỗi máy chủ:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Đăng ký tài khoản

exports.register = async (req, res) => {
  try {
    const { ten_dang_nhap, mat_khau, nhap_lai_mat_khau, email } = req.body;
    const hinh_anh = req.file ? req.file.filename : null;
    const quyen = req.body.quyen || "2";
    // Kiểm tra mật khẩu và nhập lại mật khẩu có khớp không
    if (mat_khau !== nhap_lai_mat_khau) {
      return res.status(400).json({
        message: "Mật khẩu và nhập lại mật khẩu không khớp",
      });
    }
    // Kiểm tra email đã tồn tại
    const emailExist = await Users.findOne({ where: { email } });
    if (emailExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }
    // Tạo mật khẩu bảo mật
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(mat_khau, salt);
    // Tạo mã OTP ngẫu nhiên
    const otp = crypto.randomInt(100000, 999999);
    // Tạo thời gian hết hạn cho mã OTP 10 phút
    const otpExpires = Date.now() + 10 * 60 * 1000;
    // Tạo người dùng mới và lưu mã OTP vào cơ sở dữ liệu
    const user = await Users.create({
      ten_dang_nhap,
      mat_khau: hashPassword,
      email,
      hinh_anh,
      quyen,
      otp,
      otpExpires,
    });

    // Cấu hình gửi email OTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nguyentantai612004@gmail.com",
        pass: "dmez voqj ozar xfzw",
      },
    });

    const mailOptions = {
      from: "nguyentantai612004@gmail.com",
      to: email,
      subject: "Mã OTP xác thực tài khoản",
      text: `Mã OTP của bạn là: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    // Thiết lập hẹn giờ xóa tài khoản sau 10phút nếu không được xác thực
    setTimeout(async () => {
      const user = await Users.findOne({ where: { email } });
      if (user.otpExpires < Date.now()) {
        await user.destroy();
      }
    }, 10 * 60 * 1000);

    res.status(200).json({
      message: "Đăng ký tài khoản thành công. Vui lòng kiểm tra email để nhận mã OTP.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//kiểm tra mã otp và xác thực tài khoản
exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    // Tìm người dùng với mã OTP
    const user = await Users.findOne({ where: { otp } });
    if (!user) {
      return res.status(400).json({
        message: "Mã OTP không đúng",
      });
    }
    // Kiểm tra thời gian hết hạn của OTP
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "Mã OTP đã hết hạn",
      });
    }
    // Xác thực thành công, xóa mã OTP sau khi xác thực
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    res.status(200).json({
      message: "Xác thực OTP thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// login tài khoản bằng email và mật khẩu
exports.login = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;
    // Kiểm tra xem email đã được sử dụng chưa
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }
    // Kiểm tra mật khẩu
    const validPass = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!validPass) {
      return res.status(400).json({
        message: "Mật khẩu không hợp lệ",
      });
    }
    // Tạo và gửi token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const userInfo = {
      _id: user._id,
      ten_dang_nhap: user.ten_dang_nhap,
      ho_ten: user.ho_ten,
      email: user.email,
      dia_chi: user.dia_chi,
      dien_thoai: user.dien_thoai,
      hinh_anh: user.hinh_anh,
      id_quyen: user.id_quyen,
    };

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: userInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// API đổi mật khẩu theo email và mat_khau
exports.changePassword = async (req, res) => {
  try {
    const { email, mat_khau, mat_khau_moi } = req.body;
    // Kiểm tra xem email đã được sử dụng chưa
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: "Email không tổn tại",
      });
    }
    // Kiểm tra mật khẩu cũ
    const validPass = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!validPass) {
      return res.status(400).json({
        message: "Mật khẩu không hợp lệ",
      });
    }
    // Tạo mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(mat_khau_moi, salt);
    // Cập nhật mật khẩu mới
    user.mat_khau = hashPassword;
    await user.save();
    res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//cập nhật user hinh_anh dùng thư viện multer

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    }
    const hinh_anh = req.file ? req.file.filename : user.hinh_anh;
    const { ten_dang_nhap, ho_ten, email, dia_chi, dien_thoai } = req.body;
    user.ten_dang_nhap = ten_dang_nhap || user.ten_dang_nhap;
    user.ho_ten = ho_ten || user.ho_ten;
    user.email = email || user.email;
    user.dia_chi = dia_chi || user.dia_chi;
    user.dien_thoai = dien_thoai || user.dien_thoai;
    user.hinh_anh = hinh_anh;
    await user.save();
    res.status(200).json({
      message: "Cập nhật người dùng thành công",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
