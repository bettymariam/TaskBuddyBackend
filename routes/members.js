var express = require('express');
var router = express.Router();
var knex = require('../db');

router.get('/:id', function(req, res, next) {
  //var user = req.session.user.id;
  let id = req.params.id;

  knex('members')
    .where('user_id', id)
    .then(members => res.json(members))
  .catch(err => next(err))
});

router.get('/tasks/:id', function(req, res, next) {
  //var user = req.session.user.id;
  let id = req.params.id;
  let name = req.query.name;
  console.log(id);

  knex('members')
    .select('members.name as membername', 'tasks.name as taskname', 'frequency.name as frequencyname', 'status.name as statusname')
    .innerJoin('tasks_members', 'tasks_members.member_id', 'members.id')
    .innerJoin('tasks', 'tasks.id', 'tasks_members.task_id')
    .innerJoin('frequency', 'frequency.id', 'tasks.frequency_id')
    .innerJoin('status','status.id', 'tasks.status_id')
    .whereRaw("LOWER(members.name) = ?", name)
    .andWhere('members.user_id', id)
    .whereIn('status.name', ['Started', 'In progress'])
    .then(member => res.json(member))
  .catch(err => next(err))
});

//check if a member is assigned to a task
router.get('/:id/task', function(req, res, next) {

  var name =req.query.member_name
  let taskId = req.query.task_id;

  knex('tasks_members')
    .innerJoin('members', 'members.id', 'tasks_members.member_id')
    .whereRaw("LOWER(members.name) = ?", name)
    .andWhere('tasks_members.task_id', taskId)
    .then(result => res.json(result[0]))
  .catch(err => next(err))
});

router.post('/:id/new', function(req, res, next) {
  var userId = req.params.id;
  var newMember = {
    name: req.body.name,
    user_id: userId,
    points: 0,
    email: req.body.email
  }

  knex('members')
    .insert(newMember)
    .then(member => res.json(member))
  .catch(err => next(err))
});

router.post('/:id/addpoints', function(req, res, next) {
  var memberId = req.params.id;
  var points = req.query.points

  knex('members')
    .where('members.id', memberId)
    .increment('points', points)
    .returning('*')
    .then(member => res.json(member))
    .catch(err => next(err))
});


module.exports = router;
