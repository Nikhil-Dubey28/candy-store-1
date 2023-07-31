const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const Candy = sequelize.define('user',{
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
    allowNull: false,
    },
    quantity : {
        type : Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = Candy
