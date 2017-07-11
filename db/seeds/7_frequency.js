
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('frequency').del()
    .then(function () {
      // Inserts seed entries
      return knex('frequency').insert([{
          id: 1,
          name: "Daily",
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
         id: 2,
         name: "Weekly",
         created_at: new Date('2017-07-11 14:26:16 UTC'),
         updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
         id: 3,
         name: "Monthly",
         created_at: new Date('2017-07-11 14:26:16 UTC'),
         updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
         id: 4,
         name: "Once",
         created_at: new Date('2017-07-11 14:26:16 UTC'),
         updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
         id: 5,
         name: "Random",
         created_at: new Date('2017-07-11 14:26:16 UTC'),
         updated_at: new Date('2017-07-11 14:26:16 UTC')
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('frequency_id_seq', (SELECT MAX(id) FROM frequency))"
      );
    });
};
