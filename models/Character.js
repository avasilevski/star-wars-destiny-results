const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/sequelize');

class Character extends Model {}

Character.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hp: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  faction: {
    type: Sequelize.STRING,
    allowNull: false
  },
  costNormal: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  costElite: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
}, {sequelize: db, modelName: 'character'});

module.exports = Character;