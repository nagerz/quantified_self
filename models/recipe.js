'use strict';

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  },{});
  Recipe.associate = function(models) {
    Recipe.hasMany(models.MealRecipe)
    Recipe.hasMany(models.UserRecipe)
    Recipe.belongsToMany(models.Meal, { through: models.MealRecipe, foreignKey: 'FoodId'});
  };
  return Recipe;
};
