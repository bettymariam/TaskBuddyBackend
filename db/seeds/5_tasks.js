exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([{
          id: 1,
          name: "Vaccum the carpets",
          user_id: 1,
          frequency_id: 2,
          reward: true,
          status_id: 1,
          start_date: '2017-07-11',
          points: 5,
          house_task: true,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
         id: 2,
         name: "twenty minutes of yoga",
         user_id: 1,
         frequency_id: 1,
         reward: true,
         status_id: 1,
         start_date: '2017-07-11',
         points: 5,
         house_task: false,
         created_at: new Date('2017-07-11 14:26:16 UTC'),
         updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
         id: 3,
         name: "Pay electricity & gas bill",
         user_id: 1,
         frequency_id: 3,
         reward: false,
         status_id: 1,
         start_date: '2017-07-11',
         points: 5,
         house_task: false,
         created_at: new Date('2017-07-11 14:26:16 UTC'),
         updated_at: new Date('2017-07-11 14:26:16 UTC')
        },
        {
          id: 4,
          name: "One hour of Math",
          user_id: 1,
          frequency_id: 1,
          reward: true,
          status_id: 1,
          start_date: '2017-07-11',
          points: 5,
          house_task: false,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
        },
        {
          id: 5,
          name: "Do the dishes",
          user_id: 1,
          frequency_id: 1,
          reward: true,
          status_id: 1,
          start_date: '2017-07-11',
          points: 5,
          house_task: true,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
         }
      ]);
    })
    .then(() => {
    return knex.raw(
      "SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks))"
    );
  });
};
