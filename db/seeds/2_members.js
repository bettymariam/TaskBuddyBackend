exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([{
          id: 1,
          name: "Betty",
          user_id: 1,
          points: 15,
          email: 'bettymariam@gmail.com',
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
          id: 2,
          name: "Tom",
          user_id: 1,
          points: 10,
          email: '',
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
        },
        {
           id: 3,
           name: "Rhea",
           user_id: 1,
           points: 5,
           email: '',
           created_at: new Date('2017-07-11 14:26:16 UTC'),
           updated_at: new Date('2017-07-11 14:26:16 UTC')
         },
         {
            id: 4,
            name: "Ryan",
            user_id: 1,
            points: 5,
            email: '',
            created_at: new Date('2017-07-11 14:26:16 UTC'),
            updated_at: new Date('2017-07-11 14:26:16 UTC')
          }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('members_id_seq', (SELECT MAX(id) FROM members))"
      );
  });
};
