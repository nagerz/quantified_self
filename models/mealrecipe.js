'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealRecipe = sequelize.define('MealRecipe', {
    MealId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  MealRecipe.associate = function(models) {
    // associations can be defined here
  };
  return MealRecipe;
};