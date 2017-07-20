'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments()
    table.varchar('name', 255).notNullable()
    table.integer('user_id').notNullable()
    table.integer('frequency_id').notNullable()
    table.boolean('reward').notNullable()
    table.integer('status_id').notNullable()
    table.dateTime('start_date').notNullable()
    table.boolean('house_task').notNullable()
    table.integer('points').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('tasks')
}
