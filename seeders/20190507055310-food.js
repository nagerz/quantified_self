'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all ([
      queryInterface.bulkInsert('Food', [
          {
            id: 1,
            name: 'cheetos',
            calories: 30,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 2,
            name: 'apple',
            calories: 5,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 3,
            name: 'pizza',
            calories: 400,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {})
      ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all ([
      queryInterface.bulkDelete('Food', null, {})
    ])
  }
};
