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
    .whereRaw("LOWER(members.name) LIKE '%' || LOWER(?) || '%'", name)
    .andWhere('members.user_id', id)
    .whereIn('status.name', ['Started', 'In progress'])
    .then(member => res.json(member))
  .catch(err => next(err))
});

module.exports = router;
