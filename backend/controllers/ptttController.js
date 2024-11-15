const Pttt = require("../models/pttt");
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

