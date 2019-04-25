
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
    tbl.boolean('completed');
    tbl.string('created')
      .notNullable()
      .unique();
    tbl.string('updated')
      .notNullable()
      .unique();
    tbl.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users');
    tbl.integer('category_id')
      .notNullable()
      .references('id')
      .inTable('category');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cards');
};
