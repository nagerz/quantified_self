'use strict';

module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  },{});
  Food.associate = function(models) {
    Food.belongsToMany(models.Meal, { through: models.MealFood, foreignKey: 'FoodId'});
  };

  Food.update = function(req) {
    return new Promise((resolve, reject) => {
      Food.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'name', 'calories']
      })
      .then(food => {
        if (food) {
          food.update({
            name: req.body.food.name,
            calories: req.body.food.calories,
          })
          .then(food => {
            food ? resolve(food) : resolve(null)
          })
          .catch(error => {
            //update fails, likely due to name already in use
            reject({error})
          })
        } else {
          //existing food not found
          resolve(null)
        }
      })
      .catch(error => {
        //unknown find food error
        reject(error)
      })
    })
  }

  return Food;
};
