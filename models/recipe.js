'use strict';

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    url: DataTypes.STRING
  },{});
  Recipe.associate = function(models) {
    Recipe.hasMany(models.MealRecipe)
    Recipe.belongsToMany(models.Meal, { through: models.MealRecipe, foreignKey: 'RecipeId'});
  };
  return Recipe;
};
