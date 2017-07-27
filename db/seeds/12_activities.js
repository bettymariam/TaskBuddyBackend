exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activities').del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert([{
          id: 1,
          description: "Twenty minutes of yoga",
          category: "task",
          member_id: 1,
          user_id: 1,
          completed_date: '2017-07-23 14:26:16 UTC',
          created_at: new Date('2017-07-23 14:26:16 UTC'),
          updated_at: new Date('2017-07-23 14:26:16 UTC')
       },
       {
         id: 2,
         description: "You get 1 hour of uninterrupted TV time of your choice",
         category: "reward",
         member_id: 2,
         user_id: 1,
         completed_date: '2017-07-24 14:26:16 UTC',
         created_at: new Date('2017-07-24 14:26:16 UTC'),
         updated_at: new Date('2017-07-24 14:26:16 UTC')
        },
        {
          id: 3,
          description: "Good start",
          category: "mreward",
          member_id: 3,
          user_id: 1,
          completed_date: '2017-07-25 06:26:16 UTC',
          created_at: new Date('2017-07-25 06:26:16 UTC'),
          updated_at: new Date('2017-07-25 06:26:16 UTC')
        },
        {
          id: 4,
          description: "Vacuum the carpets",
          category: "task",
          member_id: 1,
          user_id: 1,
          completed_date: '2017-07-25 16:26:16 UTC',
          created_at: new Date('2017-07-25 16:26:16 UTC'),
          updated_at: new Date('2017-07-25 16:26:16 UTC')
         },
         {
           id: 5,
           description: "Twenty minutes of yoga",
           category: "task",
           member_id: 1,
           user_id: 1,
           completed_date: '2017-07-27 13:26:16 UTC',
           created_at: new Date('2017-07-27 13:26:16 UTC'),
           updated_at: new Date('2017-07-27 13:26:16 UTC')
          }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('activities_id_seq', (SELECT MAX(id) FROM activities))"
      );
  });
};
