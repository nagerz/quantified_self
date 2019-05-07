'use strict';
var pry = require('pryjs');

module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  },{});
  Food.associate = function(models) {
    // associations can be defined here
  };

  Food.update = function(id, reqBody) {
    return new Promise((resolve, reject) => {
      Food.findOne({
        where: {
          id: id
        }
      })
      .then(food => {
        if (food) {
          food.update({
            name: reqBody.food.name,
            calories: reqBody.food.calories
          })
          .then(food => {
            food ? resolve(food) : resolve(null)
          })
        } else {
          resolve(null)
        }
      })
    })
  }

  return Food;
};
