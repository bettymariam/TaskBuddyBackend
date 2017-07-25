exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rewards').del()
    .then(function () {
      // Inserts seed entries
      return knex('rewards').insert([{
          id: 1,
          description: "1 hour of uninterrupted TV time of your choice",
          points_needed: 15,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
          id: 2,
          description: "Indulge yourself with an icecream ",
          points_needed: 10,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
        },
        {
           id: 3,
           description: "Good going, you have earned a Netflix movie",
           points_needed: 15,
           created_at: new Date('2017-07-11 14:26:16 UTC'),
           updated_at: new Date('2017-07-11 14:26:16 UTC')
         },
         {
            id: 4,
            description: "You are awesome, now go get a job!",
            points_needed: 5,
            created_at: new Date('2017-07-11 14:26:16 UTC'),
            updated_at: new Date('2017-07-11 14:26:16 UTC')
          }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('rewards_id_seq', (SELECT MAX(id) FROM rewards))"
      );
  });
};
