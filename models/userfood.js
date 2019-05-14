'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFood = sequelize.define('UserFood', {
    UserId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {});
  UserFood.associate = function(models) {
    // associations can be defined here
  };
  return UserFood;
};