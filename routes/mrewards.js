var express = require('express');
var router = express.Router();
var knex = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('mrewards')
    .then(user => res.json(user))
  .catch(err => next(err))
});

router.get('/:id/check', function(req, res, next) {
  let memberId = req.params.id

  knex('members')
    .select('members.name as membername', 'members.points as points')
    .where('members.id', memberId)
    .then(member => {
      console.log("member ", member);
      knex('mrewards')
        .where('points_needed', '<=', member.points)
        .then(rewards => {
          console.log("rewards eligible", rewards);
      })
    })
    .catch(err => next(err))
});

module.exports = router;
// knex('members_rewards')
//   .whereNot('members_rewards.reward_id', rewardsArr)
//   .then(rewardsWon => {
//
//   })
