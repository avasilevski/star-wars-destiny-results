var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('layout', { title: 'Dashboard | Index', page: 'inc/_index'});
});

/* GET results page. */
router.get('/results', (req, res, next) => {
  res.render('layout', { title: 'Dashboard | Results', page: 'inc/_results'});
});

module.exports = router;
