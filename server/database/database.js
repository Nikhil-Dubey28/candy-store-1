// database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('candy', 'root', 'Fifa#2255', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
