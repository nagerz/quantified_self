'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    api_key: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.UserFood)
    User.hasMany(models.UserMeal)
    User.belongsToMany(models.Food, { through: models.UserFood, foreignKey: 'FoodId'});
    User.belongsToMany(models.Meal, { through: models.UserMeal, foreignKey: 'MealId'});
  };
  return User;
};
