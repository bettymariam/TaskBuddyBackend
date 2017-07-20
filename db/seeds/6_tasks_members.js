exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks_members').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks_members').insert([{
          id: 1,
          task_id: 1,
          member_id: 1,
          completed_count: 1,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
          id: 2,
          task_id: 1,
          member_id: 2,
          completed_count: 2,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
          id: 3,
          task_id: 1,
          member_id: 3,
          completed_count: 0,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
          id: 4,
          task_id: 1,
          member_id: 4,
          completed_count: 0,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
          id: 5,
          task_id: 2,
          member_id: 1,
          completed_count: 0,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
        },
        {
          id: 6,
          task_id: 3,
          member_id: 2,
          completed_count: 0,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
        },
        {
          id: 7,
          task_id: 2,
          member_id: 3,
          completed_count: 1,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
         },
         {
           id: 8,
           task_id: 4,
           member_id: 3,
           completed_count: 1,
           created_at: new Date('2017-07-11 14:26:16 UTC'),
           updated_at: new Date('2017-07-11 14:26:16 UTC')
         },
         {
           id: 9,
           task_id: 4,
           member_id: 4,
           completed_count: 1,
           created_at: new Date('2017-07-11 14:26:16 UTC'),
           updated_at: new Date('2017-07-11 14:26:16 UTC')
          }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tasks_members_id_seq', (SELECT MAX(id) FROM tasks_members))"
      );
  });
};
