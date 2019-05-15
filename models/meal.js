var pry = require('pryjs');

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

  Meal.totalCalories = function(meal) {
    return new Promise((resolve, reject) => {
      var total = 0
      meal.Food.forEach(food => {
        total += food.calories
      })
      meal.Recipes.forEach(recipe => {
        total += recipe.calories
      })
      resolve(total);
    })
  };

  return Meal;
};
