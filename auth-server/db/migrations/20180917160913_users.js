
exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('username').unique().notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
