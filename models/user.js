var pry = require('pryjs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    api_key: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Meal)
  };

  User.prototype.dailyCalories = function(date) {
    return new Promise((resolve, reject) => {
      var queryDate = new Date(date.toLocaleDateString())
      this.getMeals({
        where: {date: queryDate},
      })
      .then(meals => {
        var calories = 0
        meals.forEach(meal => {
          meal.totalCalories()
          .then(mealCals => {
            calories += mealCals
          })
        })
        //Breaks here. Can't get the calories
        resolve(calories)
      })
    })
  }
  return User;
};
