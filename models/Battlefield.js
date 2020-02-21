const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/sequelize');

class Battlefield extends Model {}

Battlefield.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {sequelize: db, modelName: 'battlefield'});

module.exports = Battlefield;