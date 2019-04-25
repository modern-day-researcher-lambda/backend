
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {title: 'All'},
      ]);
    });
};
