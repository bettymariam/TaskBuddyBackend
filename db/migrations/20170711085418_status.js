'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('status', (table) => {
    table.increments()
    table.varchar('name', 255).notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('status')
}
