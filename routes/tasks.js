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

// router.post('/:id', function(req, res, next) {
//   //var user = req.session.user.id;
//   let id = req.params.id;
//   let name = req.query.name;
//   let taskname = req.query.taskname;
//   let results ={};
//
//   console.log("params", id, name, taskname)
//
//   knex('members')
//     .select('members.id as memberId','members.name as membername', 'tasks.id as taskId','tasks.name as taskname', 'completed_count as count', 'tasks_members.id as taskmemberId', 'tasks.reward as hasreward')
//     .innerJoin('tasks_members', 'tasks_members.member_id', 'members.id')
//     .innerJoin('tasks', 'tasks.id', 'tasks_members.task_id')
//     .innerJoin('status','status.id', 'tasks.status_id')
//     .whereRaw("LOWER(members.name) LIKE '%' || LOWER(?) || '%'", name)
//     .whereRaw("LOWER(tasks.name) LIKE '%' || LOWER(?) || '%'", taskname)
//     .andWhere('members.user_id', id)
//     .whereIn('status.name', ['Started', 'In progress'])
//     .then(member => {
//       console.log("member", member);
//       if (member.length){
//         var task_id = member.taskId;
//         var member_id = member.memberId;
//         var completed_count = member.count + 1
//         results.info = member;
//       } else {
//         res.json(member)
//       }
//       knex('tasks_members')
//       .insert({task_id, member_id, completed_count}, "*")
//       .returning(['id', 'task_id', 'member_id'])
//       .then((result) => {
//         console.log("task completed", member);
//         results.update = result;
//         if (results.info.hasreward){
//           knex('tasks_rewards')
//           .select('rewards.name as rewardname', 'rewards.points_needed as pointsneeded', 'rewards.id as rewardId', 'tasks.points as points' )
//           .innerJoin('rewards', 'rewards.id', 'tasks_rewards.reward_id')
//           .innerJoin('tasks', 'tasks.id', 'tasks_rewards.task_id')
//           .where('tasks.id', result.task_id)
//           .then((result) =>{
//             console.log("reward associated with the task", result);
//             let total_points = result.length * result.points;
//             console.log("total points", total_points);
//             results.rewards = result;
//             if (total_points >= result.points_needed) {
//               knex('claimed_rewards')
//               .insert({member_id: results.update.member_id, reward_id: result.rewardId}, "*")
//               .returning(['id', 'member_id', 'reward_id'])
//               .then((result) => {
//                 console.log("reward claimed", result);
//                 results.claimed_rewards = result;
//                 console.log("results", results);
//               })
//             }
//             res.json(results)
//           })
//
//         } else {
//           res.json(results)
//         }
//     })
//     .catch(err => next(err))
// });

module.exports = router;
