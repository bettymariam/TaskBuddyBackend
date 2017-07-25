exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activities').del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert([{
          id: 1,
          description: "20 minutes of yoga",
          category: "task",
          member_id: 1,
          user_id: 1,
          completed_date: '2017-07-20',
          created_at: new Date('2017-07-20 14:26:16 UTC'),
          updated_at: new Date('2017-07-20 14:26:16 UTC')
       },
       {
         id: 2,
         description: "You get 1 hour of uninterrupted TV time of your choice",
         category: "reward",
         member_id: 2,
         user_id: 1,
         completed_date: '2017-07-20',
         created_at: new Date('2017-07-20 14:26:16 UTC'),
         updated_at: new Date('2017-07-20 14:26:16 UTC')
        },
        {
          id: 3,
          description: "Good start",
          category: "mreward",
          member_id: 3,
          user_id: 1,
          completed_date: '2017-07-20',
          created_at: new Date('2017-07-20 14:26:16 UTC'),
          updated_at: new Date('2017-07-20 14:26:16 UTC')
        },
        {
          id: 4,
          description: "Math Homework",
          category: "task",
          member_id: 3,
          user_id: 1,
          completed_date: '2017-07-20',
          created_at: new Date('2017-07-20 14:26:16 UTC'),
          updated_at: new Date('2017-07-20 14:26:16 UTC')
         },
         {
           id: 5,
           description: "Math Homework",
           category: "task",
           member_id: 4,
           user_id: 1,
           completed_date: '2017-07-20',
           created_at: new Date('2017-07-20 14:26:16 UTC'),
           updated_at: new Date('2017-07-20 14:26:16 UTC')
          },
          {
            id: 6,
            description: "Vacuum the carpets",
            category: "task",
            member_id: 2,
            user_id: 1,
            completed_date: '2017-07-20',
            created_at: new Date('2017-07-20 14:26:16 UTC'),
            updated_at: new Date('2017-07-20 14:26:16 UTC')
           },
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('activities_id_seq', (SELECT MAX(id) FROM activities))"
      );
  });
};
