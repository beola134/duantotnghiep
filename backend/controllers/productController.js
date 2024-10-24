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
      mau_ma,
      phong_cach,
      kieu_dang,
      xuat_xu,
      danh_muc
    } = req.query;
    console.log(req.query);
    
    let filter = {
      [Op.and]: [],
    };
    filter.loai = { [Op.notIn]: ["Vòng tay", "Trang sức", "Đồng hồ để bàn", "Đồng hồ báo thức"] };
    if (gioi_tinh) {
      filter.gioi_tinh = gioi_tinh;
    }
    if (loai_may) {
      filter.loai_may = loai_may;
    }
    if (duong_kinh) {
      filter.duong_kinh = duong_kinh;
    }
    if (chat_lieu_day) {
      filter.chat_lieu_day = chat_lieu_day;
    }
    if (chat_lieu_vo) {
      filter.chat_lieu_vo = chat_lieu_vo;
    }
    if (mat_kinh) {
      filter.mat_kinh = mat_kinh;
    }
    if (mau_ma) {
      filter.mau_ma = mau_ma;
    }
    if (phong_cach) {
      filter.phong_cach = phong_cach;
    }
    if (kieu_dang) {
      filter.kieu_dang = kieu_dang;
    }
    if (xuat_xu) {
      filter.xuat_xu = xuat_xu;
    }
    if (danh_muc) {
      const category = await Cate.findOne({ where: { danh_muc: danh_muc } });
      console.log("category result",category);
      if (category) {
        filter.id_danh_muc = category._id;
      } else {
        return res.status(404).json({ message:"Danh mục không tồn tại"})
      }
    }
    if (muc_gia) {
      let priceRange;
      switch (muc_gia) {
        case "Dưới 2 triệu":
          priceRange = { [Op.lt]: 2000000 };
          break;
        case "Từ 2 đến 5 triệu":
          priceRange = { [Op.between]: [2000000, 5000000] };
          break;
        case "Từ 5 đến 10 triệu":
          priceRange = { [Op.between]: [5000000, 10000000] };
          break;
        case "Từ 10 đến 20 triệu":
          priceRange = { [Op.between]: [10000000, 20000000] };
          break;
        case "Từ 20 đến 30 triệu":
          priceRange = { [Op.between]: [20000000, 30000000] };
          break;
        case "Từ 30 đến 50 triệu":
          priceRange = { [Op.between]: [30000000, 50000000] };
          break;
        case "Từ 50 đến 100 triệu":
          priceRange = { [Op.between]: [50000000, 100000000] };
          break;
        case "Trên 100 triệu":
          priceRange = { [Op.gt]: 100000000 };
          break;
        default:
          priceRange = null;
          break;
      }
      if (priceRange) {
        if (khuyenmai === "true") {
          filter.gia_giam = priceRange;
        } else {
          filter.gia_san_pham = priceRange;
        }
      }
    }    
    if (khuyenmai) {
      filter[Op.and].push(
        { gia_giam: { [Op.ne]: null } },
        { gia_giam: { [Op.ne]: 0 } },
        Sequelize.literal(
          `ROUND(((gia_san_pham - gia_giam) / gia_san_pham ) * 100, 2 ) = ${khuyenmai}`)
      );
    }
    const products = await Product.findAll({where: filter,
      limit: 20,
    });
    res.json({ products });
  } catch (error) {
    console.log("Error: " ,error);
    res.status(500).json({ error: error.message });
  }
};


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
         loai: {[Op.not]:"Vòng Tay"}
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
      where: { gioi_tinh: "Nữ",
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
    const products = await Product.findAll({
      where: { gioi_tinh: "Đồng Hồ Đôi" },
    });
    res.json({ products });
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
          [Op.notIn]:["Vòng tay","Trang sức"]
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
      return res.status(404).json({message: "khong tìm thấy sản phẩm dưới 2 triệu"})
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
         return product.gia_giam >= 2000000 && product.gia_giam <=5000000;
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
          [Op.notIn]: ["Đồng hồ để bàn","Đồng hồ báo thức"]
        },
        thuong_hieu:{
          [Op.notIn]: ["Đồng hồ treo tường RHYTHM","Đồng hồ treo tường SEIKO"]
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
};
