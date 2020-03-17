var express = require('express');
var router = express.Router();
const Player = require('../../models/Player');

/* POST battlefield */
router.post('/', (req, res, next) => {
  Player.create({ name: req.body.name}).then(player => {
    res.redirect('/players');
  }).catch(err => console.log(err));
});

/* DELETE battlefield */
router.delete('/', (req, res, next) => {
  Player.destroy({ where: {id: req.body.id}}).then(player => {
    res.redirect('/players');
  }).catch(err => console.log(err));
});


module.exports = router;