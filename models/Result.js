const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/sequelize');

class Result extends Model {}

Result.init({
  //Players Name
  playerOneId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  playerTwoId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  //Characters Name
  playerOneCharacterOneId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  playerTwoCharacterOneId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  playerOneCharacterTwoId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerTwoCharacterTwoId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerOneCharacterThreeId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerTwoCharacterThreeId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerOneCharacterFourId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerTwoCharacterFourId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerOneCharacterFiveId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerTwoCharacterFiveId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  //Characters Hp
  playerOneCharacterOneHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  playerTwoCharacterOneHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  playerOneCharacterTwoHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerTwoCharacterTwoHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerOneCharacterThreeHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerTwoCharacterThreeHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerOneCharacterFourHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerTwoCharacterFourHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerOneCharacterFiveHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  playerTwoCharacterFiveHpLeft: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  //Characters IsElite
  playerOneCharacterOneIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  playerTwoCharacterOneIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  playerOneCharacterTwoIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  playerTwoCharacterTwoIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  playerOneCharacterThreeIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  playerTwoCharacterThreeIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  playerOneCharacterFourIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  playerTwoCharacterFourIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  playerOneCharacterFiveIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  playerTwoCharacterFiveIsElite: {
    type: Sequelize.STRING,
    allowNull: true
  },
  //Cards Left
  playerOneCardsLeft: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  playerTwoCardsLeft: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  //Factions ???
  playerOneFaction: {
    type: Sequelize.STRING,
    allowNull: false
  },
  playerTwoFaction: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //winner
  winnerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  //Battlefield
  battlefieldId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  //Game Format
  formatId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {sequelize: db, modelName: 'result'});

module.exports = Result;