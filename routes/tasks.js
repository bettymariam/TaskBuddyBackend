var express = require('express');
var router = express.Router();
var knex = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('tasks')
    .then(tasks => res.json(tasks))
  .catch(err => next(err))
});

router.get('/alexa/:id', function(req, res, next) {
  const id = req.params.id;
  const frequency = req.query.frequency;

  knex('tasks')
    .innerJoin('frequency', 'frequency.id', 'tasks.frequency_id')
    .innerJoin('status', 'status.id', 'tasks.status_id')
    .select('tasks.name as taskname', 'frequency.name as frequencyname')
    .whereRaw("LOWER(frequency.name) = ?", frequency)
    .andWhere('tasks.user_id', id)
    .andWhere('tasks.house_task', 'true')
    .whereIn('status.name', ['Started', 'In progress'])
    .then(tasks =>  res.json(tasks))
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
        res.json(task_details)
      })
    })
    .catch(err => next(err))
});

router.get('/count/:id', function(req, res, next) {
  //var user = req.session.user.id;
  let id = req.params.id;
  let name = req.query.name;
  let taskname = req.query.taskname;

  knex('members')
    .select('members.name as membername', 'tasks.name as taskname', 'completed_count as count')
    .innerJoin('tasks_members', 'tasks_members.member_id', 'members.id')
    .innerJoin('tasks', 'tasks.id', 'tasks_members.task_id')
    .innerJoin('status','status.id', 'tasks.status_id')
    .whereRaw("LOWER(members.name) = ?", name)
    .whereRaw("LOWER(tasks.name) = ?", taskname)
    .andWhere('members.user_id', id)
    .whereIn('status.name', ['Started', 'In progress'])
    .then(member => res.json(member))
  .catch(err => next(err))
});

// returns info regarding a task given the task name
router.get('/:id/info', function(req, res, next) {
  console.log("in tasks info");
  //var user = req.session.user.id;
  let userId = req.params.id;
  let taskname = req.query.taskname;

  knex('tasks')
    .select('tasks.id as taskId', 'status.name as statusName', 'frequency_id','reward', 'status_id','start_date','house_task', 'points', 'tasks_rewards.reward_id as reward_id')
    .innerJoin('status','status.id', 'tasks.status_id')
    .innerJoin('tasks_rewards', 'tasks_rewards.task_id', 'tasks.id')
    .whereRaw("LOWER(tasks.name) = ?", taskname)
    .andWhere('tasks.user_id', userId)
    .whereIn('status.name', ['Started', 'In progress'])
    .first()
    .then(task => res.json(task))
    .catch(err => next(err))
});

//Add to completed_count when a task is complete
router.post('/:id/completed', function(req, res, next) {
  console.log("in completed");
  var memberId =req.query.member_id
  let taskId = req.query.task_id;

  knex('tasks_members')
    .increment('completed_count', 1)
    .where('tasks_members.task_id', taskId)
    .andWhere('tasks_members.member_id', memberId)
    .returning('*')
    .then(result => res.json(result[0]))
  .catch(err => next(err))
});

module.exports = router;
