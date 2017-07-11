
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
        id: 1,
        username: 'betty',
        email: 'bettymariam@gmail.com',
        created_at: new Date('2017-06-16 14:26:16 UTC'),
        updated_at: new Date('2017-06-16 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"
      )
    })
};
