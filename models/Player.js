const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/sequelize');

class Player extends Model {}

Player.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {sequelize: db, modelName: 'player'});

module.exports = Player;