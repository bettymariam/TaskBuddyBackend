var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('http://localhost:3001');
});

router.get('/privacy', function(req, res, next) {
  res.render('policy');
});

module.exports = router;
