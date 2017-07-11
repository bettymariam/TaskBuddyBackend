'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('tasks_rewards', (table) => {
    table.increments()
    table.integer('task_id').notNullable()
    table.integer('reward_id').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('tasks_rewards')
}
