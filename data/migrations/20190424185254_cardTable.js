
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', tbl => {
    tbl.increments();
    tbl.string('title')
      .notNullable();
    tbl.string('description')
      .notNullable();
    tbl.string('category')
      .notNullable()
      .unique();
    tbl.string('link')
      .notNullable();
    tbl.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cards');
};
