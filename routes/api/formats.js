var express = require('express');
var router = express.Router();
const Format = require('../../models/Format');

/* POST format */
router.post('/', (req, res, next) => {
  Format.create({ name: req.body.name, description: req.body.description}).then(format => {
    res.redirect('/formats');
  }).catch(err => console.log(err));
});

module.exports = router;