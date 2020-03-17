const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/sequelize');

class Format extends Model {}

Format.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, {sequelize: db, modelName: 'format'});

module.exports = Format;