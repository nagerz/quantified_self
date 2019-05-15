'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealRecipe = sequelize.define('MealRecipe', {
    MealId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  MealRecipe.associate = function(models) {
    MealRecipe.belongsTo(models.Meal);
    MealRecipe.belongsTo(models.Recipe);
  };
  return MealRecipe;
};
