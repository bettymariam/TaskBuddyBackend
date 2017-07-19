var express = require('express');
var router = express.Router();
var knex = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('tasks')
    .then(tasks => res.json(tasks))
  .catch(err => next(err))
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const task_details = {};
  knex('tasks')
    .select('tasks.id','tasks.name as task_name','frequency.name as frequency_name','status.name as status_name','start_date','tasks.points', 'tasks.reward', 'rewards.id as reward_id','rewards.name as reward_name', 'rewards.points_needed')
    .innerJoin('tasks_rewards', 'tasks_rewards.id', 'tasks.id')
    .innerJoin('rewards', 'rewards.id', 'tasks_rewards.reward_id')
    .innerJoin('frequency','frequency.id','tasks.frequency_id')
    .innerJoin('status','status.id','tasks.status_id')
    .where('tasks.id', id)
    .then(task => {
      task_details.task = task;
      knex('members')
      .select('members.id as member_id', 'members.email', 'tasks_members.completed_count')
      .innerJoin('tasks_members', 'tasks_members.member_id', 'members.id' )
      .where('tasks_members.task_id',id)
      .then(members => {
        task_details.members = members;
        console.log(task_details)
        res.json(task_details)
      })
    })
    .catch(err => next(err))
});

module.exports = router;
