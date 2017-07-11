'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('members', (table) => {
    table.increments()
    table.varchar('name', 50).notNullable()
    table.integer('user_id').notNullable()
    table.integer('points').notNullable()
    table.varchar('email', 50)
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('members')
}
