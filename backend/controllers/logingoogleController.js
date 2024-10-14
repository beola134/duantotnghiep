require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const Users = require("../models/users");

//client_id của google
const client_id = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(client_id);

// 
async function verifyGoogleToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: client_id
    });
    const payload = ticket.getPayload();
    return payload;
}

// Đang nhập bằng google
const googleLogin = async (req, res) => {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);
    const { email, name,given_name, sub,picture } = payload;
    let account = await Users.findOne({ where: { email, googleId: sub } }); 
    if (account) {
        return res.status(200).json({ message: 'Login success', account });
    }
    // Nếu chưa tồn tại, tạo mới tài khoản
    account = await Users.create({
        ho_ten: name,
        ten_dang_nhap: given_name,
        mat_khau: sub,
        hinh_anh: picture,
        email,
        quyen: '2',
        googleId: sub
    });
    
    return res.status(200).json({ message: 'Login success', account });
};

module.exports = { googleLogin };
