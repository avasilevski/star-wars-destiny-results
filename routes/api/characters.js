var express = require('express');
var router = express.Router();
const Character = require('../../models/Character');

/* POST character */
router.post('/', (req, res, next) => {
  Character.create({ name: req.body.name, color: req.body.color, hp: req.body.hp, faction: req.body.faction, costNormal: req.body.costNormal, costElite: req.body.costElite}).then(character => {
    res.redirect('/characters');
  }).catch(err => console.log(err));
});

module.exports = router;