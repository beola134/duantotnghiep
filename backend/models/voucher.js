const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Voucher = sequelize.define('Voucher', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),  // Tạo UUID tự động
        allowNull: false,
        primaryKey: true
    },
    ma_voucher: {
        type: DataTypes.STRING(255),  
        allowNull: false
    },
    gia_tri: {
        type: DataTypes.INTEGER,  
        allowNull: true, 
    },
    phan_tram: {
        type: DataTypes.INTEGER,  
        allowNull: true, 
    },
    so_luong: {
        type: DataTypes.INTEGER,  
        allowNull: true, 
    },
    bat_dau: {
        type: DataTypes.DATE, 
        allowNull: true,
    },
    ket_thuc: {
        type: DataTypes.DATE,  
        allowNull: true,

    },
    mo_ta: {
        type: DataTypes.STRING(100),  
        allowNull: true,
    }
}, {
    tableName: 'voucher',  
    timestamps: false  
});

module.exports = Voucher;
