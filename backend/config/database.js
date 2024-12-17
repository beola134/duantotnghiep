const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('duan', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false

});

module.exports = sequelize;
