'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('members_rewards', (table) => {
    table.increments()
    table.integer('member_id').notNullable()
    table.integer('mrewards_id').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('members_rewards')
}
