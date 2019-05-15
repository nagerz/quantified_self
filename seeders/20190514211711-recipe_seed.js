'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Recipes', [
      {
        name: 'Fancy Chicken Recipe',
        calories: 1300,
        url: "chickenurl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tofu Recipe',
        calories: 560,
        url: "tofuurl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pork Recipe',
        calories: 5500,
        url: "porkurl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pasta Recipe',
        calories: 2300,
        url: "pastaurl",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recipes', null, {});
  }
};
