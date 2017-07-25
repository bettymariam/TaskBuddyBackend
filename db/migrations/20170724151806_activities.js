'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('activities', (table) => {
    table.increments()
    table.text('description').notNullable()
    table.varchar('category', 50).notNullable()
    table.integer('member_id').notNullable()
    table.integer('user_id').notNullable()
    table.dateTime('completed_date').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('activities')
}
