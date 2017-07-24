var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/privacy', function(req, res, next) {
  res.render('policy');
});

router.get('/login', function(req,res){
  res.render('index')
})

module.exports = router;
