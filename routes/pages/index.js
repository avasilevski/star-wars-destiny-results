var express = require('express');
var router = express.Router();
const Battlefield = require('../../models/Battlefield');
const Character = require('../../models/Character');
const Player = require('../../models/Player');
const Result = require('./../../models/Result');
const Format = require('../../models/Format');
const sequelize = require('../../config/sequelize');
const Sequelize = require('sequelize');

/* GET index page. */
router.get('/', async (req, res, next) => {
  try{
    //Wins by player
    var winsByPlayer = await sequelize.query(`
      SELECT pl.name, count(DISTINCT r.id) as win, count(DISTINCT r2.id) as total 
      FROM players as pl left JOIN results as r ON r.winnerId = pl.id left 
      JOIN results as r2 ON r2.playerOneId = pl.id OR r2.playerTwoId = pl.id group by pl.id`, { type: Sequelize.QueryTypes.SELECT });
    
    //Wins by battleground
    var winsByBattlefield = await sequelize.query(`
      SELECT bl.name as battlefield, pl.name, count(res.winnerId) FROM results as res
      INNER JOIN players as pl ON res.winnerId = pl.id
      INNER join battlefields as bl ON bl.id = res.battlefieldId
      WHERE bl.id = 3
      group by winnerId`, { type: Sequelize.QueryTypes.SELECT });

    //Players
    var players = await Player.findAll();

    //Characters by players
    charactersByPlayerOne = await charactersByPlayer(1);
    charactersByPlayerTwo = await charactersByPlayer(2);

  }catch(err){
    console.log(err);
  }
  res.render('layout', { title: 'Dashboard | Index', page: 'pages/_index', charactersByPlayerOne: charactersByPlayerOne, charactersByPlayerTwo: charactersByPlayerTwo, players: players, winsByPlayer: winsByPlayer, winsByBattlefield: winsByBattlefield});
});

/* GET results page. */
router.get('/results', async (req, res, next) => {
  let players = await Player.findAll();
  let characters = await Character.findAll();
  let battlefields = await Battlefield.findAll();
  let formats = await Format.findAll();

  sequelize.query(
    `SELECT results.id, players1.name AS playerOneName, players2.name AS playerTwoName, playersWinner.name AS winnerName, formats.name AS formatName, battlefields.name AS battlefieldName
    FROM results
    INNER JOIN players AS players1 ON results.playerOneId = players1.id
    INNER JOIN players AS players2 ON results.playerTwoId = players2.id
    INNER JOIN players AS playersWinner ON results.winnerId = playersWinner.id
    INNER JOIN formats ON results.formatId = formats.id
    INNER JOIN battlefields ON results.battlefieldId = battlefields.id
    ORDER BY id ASC`, { type: Sequelize.QueryTypes.SELECT })
    .then(results => {
      res.render('layout', { title: 'Dashboard | Results', page: 'pages/_results', results: results, players: players, characters: characters, battlefields: battlefields, formats: formats});
    });
});

/* GET players page. */
router.get('/players', async (req, res, next) => {
  let players = await Player.findAll();
  res.render('layout', { title: 'Dashboard | Players', page: 'pages/_players', players: players});
});

/* GET characters page. */
router.get('/characters', async (req, res, next) => {
  let characters = await Character.findAll();
  res.render('layout', { title: 'Dashboard | Characters', page: 'pages/_characters', characters: characters});
});

/* GET battlefields page. */
router.get('/battlefields', async (req, res, next) => {
  let battlefields = await Battlefield.findAll();
  res.render('layout', { title: 'Dashboard | Battlefields', page: 'pages/_battlefields', battlefields: battlefields});
});

/* GET formats page. */
router.get('/formats', async (req, res, next) => {
  let formats = await Format.findAll();
  res.render('layout', { title: 'Dashboard | Formats', page: 'pages/_formats', formats: formats});
});

/**
 * Fetch characters by player with total played and wins from db, then sort by most played
 */
async function charactersByPlayer(id){
  //Characters by player
  try{
    var charactersByPlayerWins = await sequelize.query(`
    select c.name as name, count(c.name) as wins, null as total from characters as c
    join results as r1 on c.id in (r1.playerOneCharacterOneId, r1.playerOneCharacterTwoId, r1.playerOneCharacterThreeId, r1.playerOneCharacterFourId, r1.playerOneCharacterFiveId)
    where r1.playerOneId =` + id +` AND r1.winnerId =` + id +`
    GROUP by c.id
    UNION all
    select c.name as name, count(c.name) as wins, null as total from characters as c
    join results as r1 on c.id in (r1.playerTwoCharacterOneId, r1.playerTwoCharacterTwoId, r1.playerTwoCharacterThreeId, r1.playerTwoCharacterFourId, r1.playerTwoCharacterFiveId)
    where r1.playerTwoId =` + id +` AND r1.winnerId =` + id +`
    GROUP by c.id`, { type: Sequelize.QueryTypes.SELECT });

    var charactersByPlayerTotal = await sequelize.query(`
    select c.name as name, null as wins, count(c.name) as total from characters as c
    join results as r1 on c.id in (r1.playerOneCharacterOneId, r1.playerOneCharacterTwoId, r1.playerOneCharacterThreeId, r1.playerOneCharacterFourId, r1.playerOneCharacterFiveId)
    where r1.playerOneId = ` + id +`
    GROUP by c.id
    UNION ALL
    select c.name as name, null as wins, count(c.name) as total from characters as c
    join results as r1 on c.id in (r1.playerTwoCharacterOneId, r1.playerTwoCharacterTwoId, r1.playerTwoCharacterThreeId, r1.playerTwoCharacterFourId, r1.playerTwoCharacterFiveId)
    where r1.playerTwoId = ` + id +`
    GROUP by c.id`, { type: Sequelize.QueryTypes.SELECT });
  }catch(err){
    console.log(err);
  }
  characters = [];  
  for(let i = 0; i < charactersByPlayerTotal.length; i++){
    for(let j = 0; j < charactersByPlayerWins.length; j++){
      if (charactersByPlayerTotal[i].name == charactersByPlayerWins[j].name){
        let losses = charactersByPlayerTotal[i].total - charactersByPlayerWins[j].wins; 
        let winrate = (charactersByPlayerWins[j].wins / charactersByPlayerTotal[i].total) * 100;
        winrate = winrate.toString();
        winrate = Number(winrate.slice(0, 3));
        character = {
          name: charactersByPlayerTotal[i].name,
          total: charactersByPlayerTotal[i].total,
          wins: charactersByPlayerWins[j].wins,
          losses: losses,
          winrate: winrate
        };
        characters.push(character);
      }
    }
    characters.sort((a, b) => {
      return b.total - a.total;
    });
  }

  return characters;
}

module.exports = router;

// SELECT t.name as PLayer, t.winnes, COUNT(t.id) as total
// FROM
//     (
//     SELECT res1.id as id, count(res1.id) AS winnes, pl1.name as name FROM results as res1
//     INNER JOIN players as pl1 ON pl1.id = res1.id
//     WHERE res1.playerOneId = res1.winnerId
//     UNION ALL
//     SELECT res2.id as id, count(res2.id) AS winnes, pl2.name as name FROM results as res2
//     INNER JOIN players as pl2 ON pl2.id = res2.id
//     WHERE res2.playerTwoId = res2.winnerId
//     ) as t
// GROUP BY id
// ORDER BY COUNT(*) DESC

// select res.id, bt.name as battlefiled, pl1.name as playOne, pl2.name as playTwo, p1.name as firstCharName, p2.name  as secondCahrName, pl3.name as Winner from results as res
// INNER JOIN battlefields as bt on res.battlefieldId = bt.id
// INNER JOIN characters as p1 on res.playerOneCharacterOneId = p1.id
// INNER JOIN characters as p2 on res.playerTwoCharacterOneId = p2.id
// INNER join players as pl1 on res.playerOneId = pl1.id
// INNER join players as pl2 on res.playerTwoId = pl2.id
// INNER join players as pl3 on res.winnerId = pl3.id


// SELECT pl.name, count(res.winnerId) FROM results as res
// INNER JOIN players as pl ON res.winnerId = pl.id
// group by winnerId

// SELECT bl.name as Battleground, pl.name, count(res.winnerId) FROM results as res
// INNER JOIN players as pl ON res.winnerId = pl.id
// INNER join battlefields as bl ON bl.id = res.battlefieldId
// WHERE bl.id = 3
// group by winnerId


//CHAR PLAYER WIN TOTAL
// select c.name as name, null as wins, count(c.name) as total from characters as c
// join results as r1 on c.id in (r1.playerOneCharacterOneId, r1.playerOneCharacterTwoId, r1.playerOneCharacterThreeId, r1.playerOneCharacterFourId, r1.playerOneCharacterFiveId)
// where r1.playerOneId = 1
// GROUP by c.id
// UNION ALL
// select c.name as name, null as wins, count(c.name) as total from characters as c
// join results as r1 on c.id in (r1.playerTwoCharacterOneId, r1.playerTwoCharacterTwoId, r1.playerTwoCharacterThreeId, r1.playerTwoCharacterFourId, r1.playerTwoCharacterFiveId)
// where r1.playerTwoId = 1
// GROUP by c.id
// UNION all
// select c.name as name, count(c.name) as wins, null as total from characters as c
// join results as r1 on c.id in (r1.playerOneCharacterOneId, r1.playerOneCharacterTwoId, r1.playerOneCharacterThreeId, r1.playerOneCharacterFourId, r1.playerOneCharacterFiveId)
// where r1.playerOneId = 1 AND r1.winnerId = 1
// GROUP by c.id
// UNION all
// select c.name as name, count(c.name) as wins, null as total from characters as c
// join results as r1 on c.id in (r1.playerTwoCharacterOneId, r1.playerTwoCharacterTwoId, r1.playerTwoCharacterThreeId, r1.playerTwoCharacterFourId, r1.playerTwoCharacterFiveId)
// where r1.playerTwoId = 1  AND r1.winnerId = 1
// GROUP by c.id