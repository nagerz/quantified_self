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

  Food.update = function(req) {
    return new Promise((resolve, reject) => {
      Food.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(food => {
        if (food) {
          food.update({
            name: req.body.food.name,
            calories: req.body.food.calories
          })
          .then(food => {
            food ? resolve(food) : resolve(null)
          })
          .catch(error => {
            resolve({error})
          })
        } else {
          resolve(null)
        }
      })
    })
  }

  return Food;
};
