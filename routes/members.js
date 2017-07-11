var express = require('express');
var router = express.Router();
var knex = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('members')
    .then(user => res.json(user))
  .catch(err => next(err))
});

module.exports = router;
