'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('claimed_rewards', (table) => {
    table.increments()
    table.integer('member_id').notNullable()
    table.integer('reward_id').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('claimed_rewards')
}
