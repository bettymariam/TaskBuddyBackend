exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mrewards').del()
    .then(function () {
      // Inserts seed entries
      return knex('mrewards').insert([{
          id: 1,
          user_id: 1,
          description: "Good start, you get a five minute massage",
          points_needed: 5,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
          id: 2,
          user_id: 1,
          description: "Keep up the good work! You get candy!",
          points_needed: 10,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
        },
        {
           id: 3,
           user_id: 1,
           description: "Keep up the good work!",
           points_needed: 20,
           created_at: new Date('2017-07-11 14:26:16 UTC'),
           updated_at: new Date('2017-07-11 14:26:16 UTC')
         },
         {
            id: 4,
            user_id: 1,
            description: "Keep up the good work!",
            points_needed: 30,
            created_at: new Date('2017-07-11 14:26:16 UTC'),
            updated_at: new Date('2017-07-11 14:26:16 UTC')
          }
      ]);
    })
    .then(() => {
    return knex.raw(
      "SELECT setval('mrewards_id_seq', (SELECT MAX(id) FROM mrewards))"
    );
  });
};
