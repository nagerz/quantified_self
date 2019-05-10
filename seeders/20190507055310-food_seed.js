'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [
      {
        name: 'cheetos',
        calories: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'apple',
        calories: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'pizza',
        calories: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'hamburger',
        calories: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'hotdog',
        calories: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'french fries',
        calories: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'carrots',
        calories: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'celery',
        calories: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {})
  }
};
