var express = require('express');
var router = express.Router();
var knex = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('mrewards')
    .then(user => res.json(user))
  .catch(err => next(err))
});

router.get('/:id/eligible', function(req, res, next) {
  let user_id = req.params.id
  let memberId = req.query.member_id
  knex.raw(`select * from mrewards where id not in (select mrewards_id from members_rewards where member_id = ${memberId}) and user_id = ${user_id}`)
    .then(rewards => {
      res.json(rewards.rows);
    })
    .catch(err => next(err))
});

router.post('/:id', function(req, res, next) {
  var userId = req.params.id;
  var newmReward = {
    user_id : userId,
    description: req.body.description,
    points_needed : req.body.points_needed
  }

  knex('rewards')
    .insert({newReward})
    .returning('*')
    .then(reward => res.json(reward))
  .catch(err => next(err))
});

//claim mrewards
router.post('/:id/claim', function(req, res, next) {
  var userId = req.params.id;
  var memberReward = {
    member_id : req.query.member_id,
    mrewards_id: req.query.mrewards_id
  }

  knex('members_rewards')
    .insert({memberReward})
    .returning('*')
    .then(reward => res.json(reward))
  .catch(err => next(err))
});


module.exports = router;
