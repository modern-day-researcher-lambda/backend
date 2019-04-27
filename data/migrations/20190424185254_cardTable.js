
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', tbl => {
    tbl.increments();
    tbl.string('title')
      .notNullable();
    tbl.string('description')
      .notNullable();
    tbl.string('category')
      .notNullable();
    tbl.string('link')
      .notNullable();
    tbl.boolean('completed');
    tbl.string('created')
      .notNullable();
    tbl.string('updated');
    tbl.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cards');
};
