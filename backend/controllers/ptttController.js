const Pttt = require("../models/pttt");
const axios = require('axios').default; 
const CryptoJS = require('crypto-js'); 
const moment = require('moment'); 
const qs = require('qs');
//them phuong thuc thanh toan
exports.addPttt = async (req, res) => {
  try {
    const { _id, ten_phuong_thuc } = req.body;
    if (!ten_phuong_thuc) {
      return res.status(400).json({ message: "không tìm thấy tên pttt" });
    }
    const pttt = await Pttt.create({ _id, ten_phuong_thuc });
    res.status(201).json({pttt});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//thanh toán momo 
exports.thanhToanMomo = async (req, res) => {
  const { amount, orderId } = req.body;
  const accessKey = 'F8BBA842ECF85';
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  const orderInfo = 'pay with MoMo';
  const partnerCode = 'MOMO';
  const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  const requestType = "payWithMethod";
  const requestId = orderId || partnerCode + new Date().getTime();
  const extraData = '';
  const orderGroupId = '';
  const autoCapture = true;
  const lang = 'vi';

  // tạo chuỗi chữ ký
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  // Log raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);

  // Generate signature
  const crypto = require('crypto');
  const signature = crypto.createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  // JSON object to send to MoMo endpoint
  const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature
  });

  // Axios options
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  };

  try {
    const result = await axios(options);
    console.log(result);
    res.status(200).json({ message: "success", data: result.data });
  } catch (error) {
    console.error("Error during MoMo payment:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};


//thanh toan zalo pay
//callback
exports.callback = async (req, res) => {
  let result = {};
  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr);
      console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
};

//KIEM TRA TRANG THAI DON HANG
exports.checkOrderStatus = async (req, res) => {
  const app_trans_id = req.params.app_trans_id;
  let postData = {
    app_id: config.app_id,
    app_trans_id: app_trans_id, // Input your app_trans_id
}

let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


let postConfig = {
    method: 'post',
    url: "	https://sb-openapi.zalopay.vn/v2/query",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
};
try {
  const result = await axios(postConfig);
  return res.status(200).json(result.data);
  
} catch (error) {
  console.log(error.message);  
}
}

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

exports.zaloPay = async (req, res) => {
  const embed_data = {
    redirecturl: "http://localhost:3001",
  };
  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
    app_user: "user123",
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 50000,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: "https://e10b-171-243-49-49.ngrok-free.app/pttt/callback"
  };
  const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error.message);
  }
};

