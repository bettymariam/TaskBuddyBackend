var express = require('express');
var router = express.Router();
var knex = require('../db')

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  let userId = req.params.id;

  knex('activities')
    .where('user_id', userId)
    .then(activities => res.json(activities))
  .catch(err => next(err))
});

router.get('/:id/member', function(req, res, next) {
  let userId = req.params.id;
  let memberId = req.query.member_id;

  knex('activities')
    .where('user_id', userId)
    .andWhere('member_id', memberId)
    .then(activities => res.json(activities))
  .catch(err => next(err))
});

router.get('/:id/rewards', function(req, res, next) {
  let userId = req.params.id;

  knex('activities')
    .where('user_id', userId)
    .andWhere('category', '<>', 'task')
    .then(activities => res.json(activities))
  .catch(err => next(err))
});

router.post('/:id', function(req, res, next) {
  var userId = req.params.id;
  var newActivity = {
    description: req.body.description,
    category: req.body.category,
    member_id: req.body.member_id,
    completed_date: new Date()
  }

  knex('rewards')
    .insert(newActivity)
    .returning('*')
    .then(activity => res.json(activity))
  .catch(err => next(err))
});

module.exports = router;
