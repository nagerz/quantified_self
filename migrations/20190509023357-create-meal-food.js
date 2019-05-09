'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MealFoods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MealId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Meals',
            key: 'id'
          },
        allowNull: false
      },
      FoodId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Food',
            key: 'id'
          },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MealFoods');
  }
};
