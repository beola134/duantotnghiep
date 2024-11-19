const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const ThuongHieu = sequelize.define('ThuongHieu', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true
    },
    thuong_hieu: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    mo_ta: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    hinh_anh: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    hinh_anh2:{
        type: DataTypes.STRING(255),
        allowNull: true

    }
}, {
    tableName: 'thuong_hieu',
    timestamps: false
});

module.exports = ThuongHieu;
