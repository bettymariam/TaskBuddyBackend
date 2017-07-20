
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rewards').del()
    .then(function () {
      // Inserts seed entries
      return knex('rewards').insert([{
          id: 1,
          name: "You get 1 hour of uninterrupted TV time of your choice",
          points_needed: 5,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
          id: 2,
          name: "You can indulge yourself with an icecream ",
          points_needed: 10,
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
