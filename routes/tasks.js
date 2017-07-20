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
  console.log(id,frequency)

  knex('tasks')
    .innerJoin('frequency', 'frequency.id', 'tasks.frequency_id')
    .innerJoin('status', 'status.id', 'tasks.status_id')
    .select('tasks.name as taskname', 'frequency.name as frequencyname')
    .whereRaw("LOWER(frequency.name) LIKE '%' || LOWER(?) || '%' ", frequency)
    .andWhere('tasks.user_id', id)
    .andWhere('tasks.house_task', 'true')
    .whereIn('status.name', ['Started', 'In progress'])
    .then(tasks => {
      res.json(tasks)
    })
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
    .whereRaw("LOWER(members.name) LIKE '%' || LOWER(?) || '%'", name)
    .whereRaw("LOWER(tasks.name) LIKE '%' || LOWER(?) || '%'", taskname)
    .andWhere('members.user_id', id)
    .whereIn('status.name', ['Started', 'In progress'])
    .then(member => res.json(member))
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
    .whereRaw("LOWER(members.name) LIKE '%' || LOWER(?) || '%'", name)
    .whereRaw("LOWER(tasks.name) LIKE '%' || LOWER(?) || '%'", taskname)
    .andWhere('members.user_id', id)
    .whereIn('status.name', ['Started', 'In progress'])
    .then(member => res.json(member))
  .catch(err => next(err))
});

module.exports = router;
