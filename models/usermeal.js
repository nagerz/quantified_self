'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMeal = sequelize.define('UserMeal', {
    UserId: DataTypes.INTEGER,
    MealId: DataTypes.INTEGER
  }, {});
  UserMeal.associate = function(models) {
    // associations can be defined here
  };
  return UserMeal;
};