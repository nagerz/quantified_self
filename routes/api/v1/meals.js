var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
const fetch = require('node-fetch');
var pry = require('pryjs');


router.get("/:id/foods", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Meal.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'name'],
      include: [{
        model: Food,
        attributes: ['id', 'name', 'calories'],
        through: {
          attributes: []
        }
      }]
    })
    .then(meal => {
      if (!meal) {
        res.status(404).send({
          error: "Requested meal could not be found."
        });
      } else {
        res.status(200).send(JSON.stringify(meal));
      }
    })
    .catch(error => {
      res.status(404).send({
        error
      })
    });
});

router.delete('/:id/foods/:id', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  const mealIdParam = req.params.id
  Meal.findOne({
      where: {
        id: mealIdParam
      },
      include: [{
        model: Food
      }]
    })
    .then(meal => {
      const foodIdParam = req.url.slice(9)
      meal.dataValues.Food.forEach(function(food) {
        eval(pry.it)
        if (food.dataValues.id === foodIdParam) {
          MealFood.destroy({
            where: {
              MealId: mealIdParam,
              FoodId: foodIdParam
            }
          })
          // resolve promise
          // send response
        } else {
          // return eror about food record not found
        }
        // Catch statments
      })





      if (!meal) {
        res.status(404).send({
          error: "Requested record could not be found."
        });
      } else {
        res.status(200).send(JSON.stringify(meal));
      }
    })
    .catch(error => {
      res.status(404).send({
        error
      })
    });
})

module.exports = router;
