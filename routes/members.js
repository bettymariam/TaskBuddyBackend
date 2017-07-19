var express = require('express');
var router = express.Router();
var knex = require('../db')

/* GET users listing. */

router.get('/:id', function(req, res, next) {
  //var user = req.session.user.id;
  var id = req.params.id
  //console.log("user", user.id)
  knex('members')
    .where('user_id', id)
    .then(members => res.json(members))
  .catch(err => next(err))
});

module.exports = router;
