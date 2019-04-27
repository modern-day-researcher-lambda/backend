
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cards').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {
          title: 'A title',
          description: 'Description here',
          category: 'All',
          link: 'www.google.com',
          completed: false,
          created: new Date(),
          updated: '',
          user_id: 1
        },
        {
          title: 'A New title',
          description: 'Description  goes here',
          category: 'Video',
          link: 'www.google.com',
          completed: false,
          created: new Date(),
          updated: '',
          user_id: 2
        },
        {
          title: 'A New title',
          description: 'Description  goes here',
          category: 'Video',
          link: 'www.google.com',
          completed: false,
          created: new Date(),
          updated: '',
          user_id: 1
        },
      ]);
    });
};
