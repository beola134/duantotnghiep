const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const DanhMuc = sequelize.define('DanhMuc', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    allowNull: false,
    primaryKey: true
  },
  ten_danh_muc: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  mo_ta: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  hinh_anh: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'danh_muc',
  timestamps: false
});

module.exports = DanhMuc;