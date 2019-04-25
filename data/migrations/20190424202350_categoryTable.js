
exports.up = function(knex, Promise) {
  return knex.schema.createTable('category', tbl =>{
    tbl.increments();
    tbl.string('title')
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('category');
};
