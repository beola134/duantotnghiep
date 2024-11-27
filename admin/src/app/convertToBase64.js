const fs = require("fs");

// Đọc tệp font
const fontPath = "./Roboto-Regular.ttf"; // Đường dẫn đến tệp font
const outputPath = "./Roboto-Regular.base64.js"; // File sẽ xuất ra

// Chuyển font sang Base64
const fontData = fs.readFileSync(fontPath);
const base64Font = fontData.toString("base64");

// Tạo file JS chứa Base64
const result = `
const RobotoRegular = "${base64Font}";
export default RobotoRegular;
`;

fs.writeFileSync(outputPath, result);

console.log(
  "Phông chữ đã được chuyển sang Base64 và lưu vào Roboto-Regular.base64.js"
);
