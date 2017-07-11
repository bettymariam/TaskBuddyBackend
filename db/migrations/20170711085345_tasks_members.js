'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('tasks_members', (table) => {
    table.increments()
    table.integer('task_id').notNullable()
    table.integer('member_id').notNullable()
    table.integer('completed_count').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('tasks_members')
}
