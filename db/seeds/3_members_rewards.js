exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('members_rewards').del()
    .then(function () {
      // Inserts seed entries
      return knex('members_rewards').insert([{
          id: 1,
          member_id: 1,
          mrewards_id: 1,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
       },
       {
          id: 2,
          member_id: 2,
          mrewards_id: 1,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
        },
        {
          id: 3,
          member_id: 1,
          reward_id: 3,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
        },
        {
          id: 4,
          member_id: 1,
          reward_id: 4,
          created_at: new Date('2017-07-11 14:26:16 UTC'),
          updated_at: new Date('2017-07-11 14:26:16 UTC')
         }
      ]);
    })
    .then(() => {
    return knex.raw(
      "SELECT setval('members_rewards_id_seq', (SELECT MAX(id) FROM members_rewards))"
    );
  });
};
