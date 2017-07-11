'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('rewards', (table) => {
    table.increments()
    table.text('name').notNullable()
    table.integer('points_needed').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('rewards')
}
