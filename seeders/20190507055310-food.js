'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all ([
      queryInterface.bulkInsert('Foods', [
          {
            id: 1,
            name: 'Cheetos',
            calories: 30,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 2,
            name: 'Apple',
            calories: 5,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 3,
            name: 'Pizza',
            calories: 400,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {})
      ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all ([
      queryInterface.bulkDelete('Foods', null, {})
    ])
  }
};
