var express = require('express');
var router = express.Router();
var knex = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('rewards')
    .then(user => res.json(user))
  .catch(err => next(err))
});

router.get('/eligible', function(req, res, next) {
  let memberId = req.query.member_id
  let taskId = req.query.task_id

  knex.raw(`select * from rewards where id not in (select reward_id from claimed_rewards where member_id = ${memberId}) and id in (select reward_id from tasks_rewards where task_id = ${taskId})`)
    .then(rewards =>res.json(rewards.rows))
    .catch(err => next(err))
});

router.post('/claim', function(req, res, next) {
  console.log("in claim");
  var newReward = {
    member_id: req.query.member_id,
    reward_id: req.query.reward_id
  }

  knex('claimed_rewards')
    .insert(newReward)
    .returning('*')
    .then(reward =>  res.json(reward))
  .catch(err => next(err))
});


router.post('/:id', function(req, res, next) {
  var userId = req.params.id;
  var newReward = {
    description : req.body.name,
    points_needed : req.body.points_needed
  }

  knex('rewards')
    .insert({newReward})
    .returning('*')
    .then(reward => res.json(reward))
  .catch(err => next(err))
});



module.exports = router;
