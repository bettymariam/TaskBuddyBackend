'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('mrewards', (table) => {
    table.increments()
    table.integer('user_id').notNullable()
    table.text('description').notNullable()
    table.integer('points_needed').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('mrewards')
}
