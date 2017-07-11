
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks_rewards').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks_rewards').insert([{
          id: 1,
          task_id: 1,
          reward_id: 1,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
         id: 2,
         task_id: 2,
         reward_id: 2,
         created_at: new Date('2017-07-11 14:26:16 UTC'),
         updated_at: new Date('2017-07-11 14:26:16 UTC')
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tasks_rewards_id_seq', (SELECT MAX(id) FROM tasks_rewards))"
      );
  });
};
