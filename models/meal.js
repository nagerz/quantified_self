'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    Meal.hasMany(models.MealFood)
    //Meal.belongsToMany(models.Food, { through: 'MealFood', as: 'Food' });
    Meal.belongsToMany(models.Food, {through: models.MealFood, foreignKey: 'MealId'});
  };
  return Meal;
};
