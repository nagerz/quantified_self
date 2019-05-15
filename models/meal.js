'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    Meal.hasMany(models.MealFood)
    Meal.hasMany(models.MealRecipe)
    Meal.hasMany(models.UserMeal)
    Meal.belongsToMany(models.Food, {through: models.MealFood, foreignKey: 'MealId'});
    Meal.belongsToMany(models.Recipe, {through: models.MealRecipe, foreignKey: 'MealId'});
    Meal.belongsToMany(models.User, {through: models.UserMeal, foreignKey: 'MealId'});
  };
  return Meal;
};
