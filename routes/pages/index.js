var express = require('express');
var router = express.Router();
const Battlefield = require('../../models/Battlefield');
const Character = require('../../models/Character');

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('layout', { title: 'Dashboard | Index', page: 'inc/_index'});
});

/* GET results page. */
router.get('/results', (req, res, next) => {
  res.render('layout', { title: 'Dashboard | Results', page: 'inc/_results'});
});

/* GET characters page. */
router.get('/characters', (req, res, next) => {
  Character.findAll().then(characters => {
    res.render('layout', { title: 'Dashboard | Characters', page: 'inc/_characters', characters: characters});
  })
});

/* GET battlefields page. */
router.get('/battlefields', (req, res, next) => {
  Battlefield.findAll().then(battlefields => {
    res.render('layout', { title: 'Dashboard | Battlefields', page: 'inc/_battlefields', battlefields: battlefields});
  })
});

module.exports = router;
