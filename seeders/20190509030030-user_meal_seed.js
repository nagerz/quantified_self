'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      Promise.all([
        queryInterface.bulkInsert('Users', [
          {
            email: 'user1@email.com',
            password_digest: 'password',
            api_key: 'user1_key',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            email: 'user2@email.com',
            password_digest: 'password',
            api_key: 'user2_key',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            email: 'user3@email.com',
            password_digest: 'password',
            api_key: 'user3_key',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {})
      ])
      .then(() => {
        resolve(queryInterface.bulkInsert('Meals', [
          {
            name: 'Monday Breakfast',
            date: new Date(new Date().setDate(new Date().getDate()-6)),
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Monday Lunch',
            date: new Date(new Date().setDate(new Date().getDate()-6)),
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Monday Dinner',
            date: new Date(new Date().setDate(new Date().getDate()-6)),
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Wednesday Desert',
            date: new Date(new Date().setDate(new Date().getDate()-4)),
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Thursday Snack',
            date: new Date(new Date().setDate(new Date().getDate()-3)),
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Saturday breakfast',
            date: new Date(new Date().setDate(new Date().getDate()-1)),
            UserId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Sunday Brunch',
            date: new Date(),
            UserId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {}))
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Meals', null, {}),
      queryInterface.bulkDelete('Users', null, {})
    ])
  }
};
