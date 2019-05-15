'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MealRecipes', [
      {
        MealId: 1,
        RecipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MealId: 2,
        RecipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MealId: 2,
        RecipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MealId: 3,
        RecipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MealId: 4,
        RecipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MealRecipes', null, {});
  }
};
