const Product = require("../models/product");
const upload = require("../config/update");
const Cate = require("../models/cate");
const Category = require("../models/cate");
const { Sequelize,Op } = require("sequelize");

// xử lí phần trăm giá giảm
exports.filtersanphamdongho = async (req, res) => {
  try {
    const {
      gioi_tinh,
      muc_gia,
      khuyenmai,
      loai_may,
      duong_kinh,
      chat_lieu_day,
      chat_lieu_vo,
      mat_kinh,
      mau_mat,
      phong_cach,
      kieu_dang,
      xuat_xu,
      danh_muc,
      limit = 20,
      page = 1,
    } = req.query;
    console.log(req.query);
      
    let filter = {
      [Op.and]: [],
    };
    filter.loai = {
      [Op.notIn]: [
        "Dây đồng hồ",
        "Vòng tay",
        "Trang sức",
        "Đồng hồ để bàn",
        "Đồng hồ báo thức",
      ],
    };
    if (gioi_tinh) {
      switch (gioi_tinh) {
        case "Nam":
          filter.gioi_tinh = "Nam";
          break;
        case "Nữ":
          filter.gioi_tinh = "Nữ";
          break;
        case "Đôi":
          filter.gioi_tinh = "Đôi";
          break;
        default:
          filter.gioi_tinh = gioi_tinh;
          break;
      }
    }
   if (mat_kinh) {
     switch (mat_kinh) {
       case "Sapphire":
         filter.mat_kinh = "Sapphire";
         break;
       case "Mặt kính cứng":
         filter.mat_kinh = "Mặt kính cứng";
         break;
       case "Hardlex Crystal":
         filter.mat_kinh = "Hardlex Crystal";
         break;
       case "Mica":
         filter.mat_kinh = "Mica";
         break;
       case "Kinh Nhựa":
         filter.mat_kinh = "Kinh Nhựa";
         break;
       default:
         filter.mat_kinh = mat_kinh;
         break;
     }
   }

   if (mau_mat) {
     switch (mau_mat) {
       case "Trắng":
         filter.mau_mat = "Trắng";
         break;
       case "Xám":
         filter.mau_mat = "Xám";
         break;
       case "Xanh lam":
         filter.mau_mat = "Xanh lam";
         break;
       case "Khảm trai":
         filter.mau_mat = "Khảm trai";
         break;
       case "Da Cam":
         filter.mau_mat = "Da Cam";
         break;
       case "Nâu":
         filter.mau_mat = "Nâu";
         break;
       case "Hồng":
         filter.mau_mat = "Hồng";
         break;
       case "Đen":
         filter.mau_mat = "Đen";
         break;
       case "Vàng":
         filter.mau_mat = "Vàng";
         break;
       case "Đỏ":
         filter.mau_mat = "Đỏ";
         break;
       case "Xanh Lá":
         filter.mau_mat = "Xanh Lá";
         break;
       default:
         filter.mau_mat = mau_mat;
         break;
     }
   }
   if (loai_may) {
     switch (loai_may) {
       case "Automatic":
         filter.loai_may = "Automatic (Máy cơ tự động)";
         break;
       case "Quartz":
         filter.loai_may = "Quartz (Máy pin - điện tử)";
         break;
       case "Eco-Drive":
         filter.loai_may = "Eco-Drive (Năng lượng ánh sáng)";
         break;
       case "Quartz Chronograph":
         filter.loai_may = "Quartz Chronograph (Máy pin bấm giờ thể thao)";
         break;
       case "Automatic Chronometer":
         filter.loai_may = "Automatic Chronometer (Máy cơ tự động chuẩn COSC)";
         break;
       case "Quartz Chronometer":
         filter.loai_may = "Quartz Chronometer (Máy pin chuẩn COSC)";
         break;
       case "Automatic Chronograph":
         filter.loai_may ="Automatic Chronograph (Máy cơ tự động bấm giờ thể thao)";
         break;
       case "Quartz Solar":
         filter.loai_may = "Quartz Solar (Năng lượng ánh sáng)";
         break;
       case "Manual winding":
         filter.loai_may = "Manual winding (Đồng hồ cơ lên dây cót bằng tay)";
         break;
       default:
         filter.loai_may = loai_may;
         break;
     }
   }

    if (duong_kinh) {
      switch (duong_kinh) {
        case "Dưới 25mm":
          filter.duong_kinh = { [Op.lt]: 25 };
          break;
        case "25mm đến 30mm":
          filter.duong_kinh = { [Op.between]: [25, 30] };
          break;
        case "30mm đến 35mm":
          filter.duong_kinh = { [Op.between]: [30, 35] };
          break;
        case "35mm đến 38mm":
          filter.duong_kinh = { [Op.between]: [35, 38] };
          break;
        case "38mm đến 40mm":
          filter.duong_kinh = { [Op.between]: [38, 40] };
          break;
        case "40mm đến 42mm":
          filter.duong_kinh = { [Op.between]: [40, 42] };
          break;
        case "42mm đến 45mm":
          filter.duong_kinh = { [Op.between]: [42, 45] };
          break;
        case "Từ 45mm trở lên":
          filter.duong_kinh = { [Op.gt]: 45 };
          break;
        default:
          break;
      }
    }
    if (chat_lieu_day) {
      switch (chat_lieu_day) {
        case "Dây da":
          filter.chat_lieu_day = "Dây da";
          break;
        case "Thép không gỉ 316L mạ vàng công nghệ PVD":
          filter.chat_lieu_day = "Thép không gỉ 316L mạ vàng công nghệ PVD";
          break;
        case "Thép không gỉ 316L dạng lưới":
          filter.chat_lieu_day = "Thép không gỉ 316L dạng lưới";
          break;
        case "Thép không gỉ 316L dạng lắc":
          filter.chat_lieu_day = "Thép không gỉ 316L dạng lắc";
          break;
        case "Dây vải":
          filter.chat_lieu_day = "Dây vải";
          break;
        case "Thép không gỉ 316L/ Vàng 18K":
          filter.chat_lieu_day = "Thép không gỉ 316L/ Vàng 18K";
          break;
        case "Thép không gỉ 316L/ Ceramic":
          filter.chat_lieu_day = "Thép không gỉ 316L/ Ceramic";
          break;
        case "Dây cao su":
          filter.chat_lieu_day = "Dây cao su";
          break;
        case "Dây dù":
          filter.chat_lieu_day = "Dây dù";
          break;
        case "Thép không gỉ 316L":
          filter.chat_lieu_day = "Thép không gỉ 316L";
          break;
        case "Thép không gỉ mạ công nghệ PVD":
          filter.chat_lieu_day = "Thép không gỉ mạ công nghệ PVD";
          break;
        case "Titanium":
          filter.chat_lieu_day = "Titanium";
          break;
        case "Titanium mạ vàng công nghệ PVD":
          filter.chat_lieu_day = "Titanium mạ vàng công nghệ PVD";
          break;
        case "Nhựa":
          filter.chat_lieu_day = "Nhựa";
          break;
        default:
          filter.chat_lieu_day = chat_lieu_day;
          break;
      }
    }
    if (chat_lieu_vo) {
      filter.chat_lieu_vo = chat_lieu_vo;
    }
    if (mat_kinh) {
       switch (mat_kinh) {
         case "Sapphire":
           filter.mat_kinh = "Sapphire";
           break;
         case "Mặt kính cứng":
           filter.mat_kinh = "Mặt kính cứng";
           break;
         case "Hardlex Crystal":
           filter.mat_kinh = "Hardlex Crystal";
           break;
         case "Mica":
           filter.mat_kinh = "Mica";
           break;
         case "Kinh Nhựa":
           filter.mat_kinh = "Kinh Nhựa";
           break;
         default:
           filter.mat_kinh = mat_kinh;
           break;
       }
      filter.mat_kinh = mat_kinh;
    }
    if (mau_mat) {
      switch (mau_mat) {
        case "Trắng":
          filter.mau_mat = "Trắng";
          break;
        case "Xám":
          filter.mau_mat = "Xám";
          break;
        case "Xanh lam":
          filter.mau_mat = "Xanh lam";
          break;
        case "Khảm trai":
          filter.mau_mat = "Khảm trai";
          break;
        case "Da Cam":
          filter.mau_mat = "Da Cam";
          break;
        case "Nâu":
          filter.mau_mat = "Nâu";
          break;
        case "Hồng":
          filter.mau_mat = "Hồng";
          break;
        case "Đen":
          filter.mau_mat = "Đen";
          break;
        case "Vàng":
          filter.mau_mat = "Vàng";
          break;
        case "Đỏ":
          filter.mau_mat = "Đỏ";
          break;
        case "Xanh Lá":
          filter.mau_mat = "Xanh Lá";
          break;
        default:
          filter.mau_mat = mau_mat;
          break;
      }
    }
    if (phong_cach) {
      switch (phong_cach) {
        case "Sang trọng":
          filter.phong_cach = "Sang trọng";
          break;
        case "Thể thao":
          filter.phong_cach = "Thể thao";
          break;
        case "Thể thao sang trọng":
          filter.phong_cach = "Thể thao sang trọng";
          break;
        case "Quân đội":
          filter.phong_cach = "Quân đội";
          break;
        case "Thời trang":
          filter.phong_cach = "Thời trang";
          break;
        case "Hiện đại":
          filter.phong_cach = "Hiện đại";
          break;
        default:
          filter.phong_cach = phong_cach;
          break;
      }
    }
    if (kieu_dang) {
      switch (kieu_dang) {
        case "Mặt vuông":
          filter.kieu_dang = "Mặt vuông";
          break;
        case "Mặt tròn":
          filter.kieu_dang = "Mặt tròn";
          break;
        case "Mặt chữ nhật":
          filter.kieu_dang = "Mặt chữ nhật";
          break;
        case "Mặt Oval":
          filter.kieu_dang = "Mặt Oval";
          break;
        default:
           filter.kieu_dang = kieu_dang;
          break;
      }
    }
    if (xuat_xu) {
      switch (xuat_xu) {
        case "Nhật Bản":
          filter.xuat_xu = "Nhật Bản";
          break;
        case "Mỹ":
          filter.xuat_xu = "Mỹ";
          break;
        default:
          filter.xuat_xu = xuat_xu;
          break;
      }
    }
    if (danh_muc) {
      const category = await Cate.findOne({ where: { danh_muc: danh_muc } });
      console.log("category result", category);
      if (category) {
        filter.id_danh_muc = category._id;
      } else {
        return res.status(404).json({ message: "Danh mục không tồn tại" })
      }
    }
    if (muc_gia) {
      let priceRange;
      switch (muc_gia) {
        case "Dưới 2 triệu":
          priceRange = { [Op.lt]: 2000000 };
          break;
        case "Từ 2 triệu đến 5 triệu":
          priceRange = { [Op.between]: [2000000, 5000000] };
          break;
        case "Từ 5 triệu đến 10 triệu":
          priceRange = { [Op.between]: [5000000, 10000000] };
          break;
        case "Từ 10 triệu đến 20 triệu":
          priceRange = { [Op.between]: [10000000, 20000000] };
          break;
        case "Từ 20 triệu đến 30 triệu":
          priceRange = { [Op.between]: [20000000, 30000000] };
          break;
        case "Từ 30 triệu đến 50 triệu":
          priceRange = { [Op.between]: [30000000, 50000000] };
          break;
        case "Từ 50 triệu đến 100 triệu":
          priceRange = { [Op.between]: [50000000, 100000000] };
          break;
        case "Trên 100 triệu":
          priceRange = { [Op.gte]: 100000000 };
          break;
        default:
          priceRange = null;
          break;
      }
      if (priceRange) {
        filter[Op.or] = [
          {
            gia_giam: { ...priceRange, [Op.gt]: 0 },
          },
          {
            [Op.and]: [
              {
                gia_giam: {
                  [Op.or]: [0, null],
                },
              },
              {
                gia_san_pham: priceRange,
              }
            ],
          },
        ];
      }
    }
    if (khuyenmai) {
      const discount = req.query.khuyenmai
        .replace("Giảm", "")
        .replace("%", "");
      filter[Op.and].push(
        { gia_giam: { [Op.ne]: null } },
        { gia_giam: { [Op.ne]: 0 } },
        Sequelize.literal(
          `ROUND(((gia_san_pham - gia_giam) / gia_san_pham ) * 100, 0 ) = ${discount}`
        )
      );
    }
    const productsCount = await Product.count({ where: filter, });
    //sp nhỏ hơn = 20nthif không phần trang
    if (productsCount <= 20) {
      const products = await Product.findAll({ where: filter });
      return res.json({products, totalProducts: productsCount});
    }
    //nếu sp lớn 20 thì phân trang
    const offset = (page - 1) * limit;
    const { rows: products, count: totalProducts } = await Product.findAndCountAll({
      where: filter,
      limit,
      offset,
    })
    // hàm nếu sp lớn hơn thì phân trang
    const totalPages = Math.ceil(totalProducts / limit);
      res.json({
        products,
        currentPage: page,
        totalPages,
        totalProducts,
      });
          `ROUND(((gia_san_pham - gia_giam) / gia_san_pham ) * 100, 0) = ${khuyenmai}`
        )
      );
    }
    
    const products = await Product.findAll({ where: filter, limit:20 });
    res.json({ products });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
}


  // show sản phẩm mới nhất Nam
  exports.getNewProductsMale = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: { [Op.not]: "Vòng Tay" },
        },
        order: [["createdAt", "DESC"]],
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Không có sản phẩm nào" });
      }
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // show sản phẩm mới nhất nu
  exports.getNewProductsFeMale = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          gioi_tinh: "Nữ",
          loai: { [Op.not]: "Vòng Tay" },
        },
        order: [["createdAt", "DESC"]],
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Không có sản phẩm nào" });
      }
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // show sản phẩm mới nhất Đôi
  exports.getNewProductsCouple = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          gioi_tinh: "Đồng Hồ Đôi",
          loai: { [Op.not]: "Vòng Tay" },
        },
        order: [["createdAt", "DESC"]],
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Không có sản phẩm nào" });
      }
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 
  // show sản phẩm mới nhất Nam giới hạn 10 sp
  exports.getNewLimitMale = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: { [Op.not]: "Vòng Tay" },
        },
        order: [["createdAt", "DESC"]],
        limit: 10,
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Không có sản phẩm nào" });
      }
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // show sản phẩm mới nhất nu giới hạn 10 sp
  exports.getNewLimitFeMale = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          gioi_tinh: "Nữ",
          loai: { [Op.not]: "Vòng Tay" },
        },
        order: [["createdAt", "DESC"]],
        limit: 10,
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Không có sản phẩm nào" });
      }
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // show sản phẩm mới nhất Đôi giới hạn 10 sp
  exports.getNewLimitCouple = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          gioi_tinh: "Đồng Hồ Đôi",
          loai: { [Op.not]: "Vòng Tay" },
        },
        order: [["createdAt", "DESC"]],
        limit: 10,
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Không có sản phẩm nào" });
      }
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Lấy danh mục theo giới tính "Nam"
  exports.getMale = async (req, res) => {
    try {
      let { limit = 20, page = 1 } = req.query
      limit = parseInt(limit);
      page = parseInt(page);
      if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
        return res.status(400).json({ message: "Itham số không hợp lệ" });
      }
      const offset = (page - 1) * limit;

      const { rows: products, count: totalProducts } = await Product.findAndCountAll({
        where: { gioi_tinh: "Nam" },
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });
      if (products.length === 0) {
        return res.status(404).json({ message: "Không có sản phẩm nào" });
      }
      const totalPages = Math.ceil(totalProducts / limit);
      if (page > totalPages) {
        return res.status(404).json({ message: "Trang không tồn tại" });
      }
      res.json({
        products,
        currentPage: page,
        totalPages,
        totalProducts,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Lấy danh mục theo giới tính "Nam" 10sp
  exports.getMale10sp = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { gioi_tinh: "Nam" },
        limit: 10,
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Lấy danh mục theo giới tính "Nữ"
  exports.getFeMale = async (req, res) => {
    try {
      let { limit = 20, page = 1 } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
        return res.status(400).json({ message: "Itham số không hợp lệ" });
      }
      const offset = (page - 1) * limit;
      const { rows: products, count: totalProducts } = await Product.findAndCountAll({
        where: {
          gioi_tinh: "Nữ",
          loai: { [Op.not]: "Vòng Tay" }
        },
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });
      if (products.length === 0) {
        return res.status(404).json({ message: "Không có sản phẩm nào" });
      }
      const totalPages = Math.ceil(totalProducts / limit);
      if (page > totalPages) {
        return res.status(404).json({ message: "Trang không tồn tại" });
      }
      res.json({
        products,
        currentPage: page,
        totalPages,
        totalProducts,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Lấy danh mục theo giới tính "Nữ"10sp
  exports.getFeMale10sp = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          gioi_tinh: "Nữ",
        },
        limit: 10,
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Lấy danh mục theo "Đôi"
  exports.getCouple = async (req, res) => {
    try {
      let { limit = 20, page = 1 } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
        return res.status(400).json({ message: "Itham số không hợp lệ" });
      }
      const offset = (page - 1) * limit;
      const { rows: products, count: totalProducts } =
        await Product.findAndCountAll({
          where: { gioi_tinh: "Đồng Hồ Đôi" },
          order: [["createdAt", "DESC"]],
          limit,
          offset,
        });
      if (products.length === 0) {
        return res.status(404).json({ message: "Không có sản phẩm nào" });
      }
      const totalPages = Math.ceil(totalProducts / limit);
      if (page > totalPages) {
        return res.status(404).json({ message: "Trang không tồn tại" });
      }
      res.json({
        products,
        currentPage: page,
        totalPages,
        totalProducts,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Lấy danh mục theo giới tính "đồng hồ đôi"
  exports.getCouple10sp = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { gioi_tinh: "Đồng Hồ Đôi" },
        limit: 10,
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // lấy sản phẩm dưới 2 c
  exports.getProductsUnderTwoMillion = async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: {
            [Op.notIn]: ["Vòng tay", "Trang sức"]
          }
        },
      });
      const products = allProducts.filter(product => {
        if (product.gia_giam > 0) {
          return product.gia_giam < 2000000;
        } else {
          return product.gia_san_pham < 2000000;
        }
      })
      if (products.length === 0) {
        return res.status(404).json({ message: "khong tìm thấy sản phẩm dưới 2 triệu" })
      }
      res.json({ products });
    } catch (error) {
      console.error("sản phẩm nam dưới 2 triệu", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  //lấy sản phẩm từ 2 đến 5 triệu
  exports.getProductstu2den5trieu = async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: {
            [Op.notIn]: ["Vòng tay", "Trang sức"],
          },
        },
      });
      const products = allProducts.filter((product) => {
        if (product.gia_giam > 0) {
          return product.gia_giam >= 2000000 && product.gia_giam <= 5000000;
        } else {
          return (
            product.gia_san_pham >= 2000000 && product.gia_san_pham <= 5000000
          );
        }
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm nào từ 2 đến 5 triệu" });
      }

      res.json({ products });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  //lấy sản phẩm từ 5 đến 10 triệu
  exports.getProductstu5den10trieu = async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: {
            [Op.notIn]: ["Vòng tay", "Trang sức"],
          },
        },
      });
      const products = allProducts.filter((product) => {
        if (product.gia_giam > 0) {
          return product.gia_giam >= 5000000 && product.gia_giam <= 10000000;
        } else {
          return (
            product.gia_san_pham >= 5000000 && product.gia_san_pham <= 10000000
          );
        }
      });

      res.json({ products });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  //lấy sản phẩm từ 10 đến 20 triệu
  exports.getProductstu10den20trieu = async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: {
            [Op.notIn]: ["Vòng tay", "Trang sức"],
          },
        },
      });
      const products = allProducts.filter((product) => {
        if (product.gia_giam > 0) {
          return product.gia_giam >= 10000000 && product.gia_giam <= 20000000;
        } else {
          return (
            product.gia_san_pham >= 10000000 && product.gia_san_pham <= 20000000
          );
        }
      });

      res.json({ products });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  //lấy sản phẩm từ 20 đến 30 triệu
  exports.getProductstu20den30trieu = async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: {
            [Op.notIn]: ["Vòng tay", "Trang sức"],
          },
        },
      });
      const products = allProducts.filter((product) => {
        if (product.gia_giam > 0) {
          return product.gia_giam >= 20000000 && product.gia_giam <= 30000000;
        } else {
          return (
            product.gia_san_pham >= 20000000 && product.gia_san_pham <= 30000000
          );
        }
      });

      res.json({ products });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  //lấy sản phẩm từ 30 đến 50 triệu
  exports.getProductstu30den50trieu = async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: {
            [Op.notIn]: ["Vòng tay", "Trang sức"],
          },
        },
      });
      const products = allProducts.filter((product) => {
        if (product.gia_giam > 0) {
          return product.gia_giam >= 30000000 && product.gia_giam <= 50000000;
        } else {
          return (
            product.gia_san_pham >= 30000000 && product.gia_san_pham <= 50000000
          );
        }
      });

      res.json({ products });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  //lấy sản phẩm từ 50 đến 100 triệu
  exports.getProductstu50den100trieu = async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: {
            [Op.notIn]: ["Vòng tay", "Trang sức"],
          },
        },
      });
      const products = allProducts.filter((product) => {
        if (product.gia_giam > 0) {
          return product.gia_giam >= 50000000 && product.gia_giam <= 100000000;
        } else {
          return (
            product.gia_san_pham >= 50000000 && product.gia_san_pham <= 100000000
          );
        }
      });

      res.json({ products });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  //lấy sản phẩm treen 100 triệu
  exports.getProductsOver100trieu = async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        where: {
          gioi_tinh: "Nam",
          loai: {
            [Op.notIn]: ["Vòng tay", "Trang sức"],
          },
        },
      });
      const products = allProducts.filter((product) => {
        if (product.gia_giam > 0) {
          return product.gia_giam > 100000000;
        } else {
          return product.gia_san_pham > 100000000;
        }
      });
      res.json({ products });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };

 // Lấy lọc theo Đồng hồ báo Thức
  exports.getBaoThuc = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { loai: "Đồng hồ báo thức" },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Lấy lọc theo Đồng hồ để bàn
  exports.getDeBan = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { loai: "Đồng hồ để bàn" },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
// Lấy lọc theo Đồng hồ treo tường
  exports.getTreoTuong = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { loai: "Đồng hồ treo tường" },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


  // Lấy danh mục theo chat liệu dây da
  exports.getChatLieuDayDa = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { chat_lieu_day: "Dây da" },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Lấy danh mục theo chat liệu dây dù
  exports.getChatLieuDayDu = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { chat_lieu_day: "Dây dù" },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Lấy danh mục theo chat liệu dây caosu
  exports.getChatLieuDayCaoSu = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { chat_lieu_day: "Dây cao su" },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Lấy danh mục theo xuatxuTS
  exports.getXuatXuTS = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          xuat_xu: "Thụy Sỹ",
          loai: { [Op.not]: "Trang sức" }
        },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Lấy danh mục theo xuatxuTD
  exports.getXuatXuTD = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          xuat_xu: "Thụy Điển",
          loai: { [Op.not]: "Trang sức" }
        },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Lấy danh mục theo xuatxuNB
  exports.getXuatXuNB = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          xuat_xu: "Nhật Bản",
          loai: {
            [Op.notIn]: ["Đồng hồ để bàn", "Đồng hồ báo thức"]
          },
          thuong_hieu: {
            [Op.notIn]: ["Đồng hồ treo tường RHYTHM", "Đồng hồ treo tường SEIKO"]
          }
        },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Lấy danh mục theo xuatxuNB
  exports.getXuatXuMy = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { xuat_xu: "Mỹ" },
      });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Show sản phẩm theo id danh mục  vòng tay trang sức
  exports.getProdctsCateLoai = async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          id_danh_muc: req.params.id,
          loai: {
            [Op.in]: ["Vòng Tay", "Trang Sức"],
          },
        },
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }

      const cate = await Category.findOne({ where: { _id: req.params.id } });

      res.json({ products, cate });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Lấy tất cả sản phẩm
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

