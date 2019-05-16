var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFood = require('../../../models').MealFood;
const fetch = require('node-fetch');

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

router.get("/", async function(req, res, next) {
  res.setHeader("content-Type", "application/json");
  Meal.findAll({
    order: [['id', 'ASC']],
    attributes: ['id', 'name'],
    include: [{
      model: Food,
      attributes: ['id', 'name', 'calories'],
      through: {
        attributes: []
      }
    }]
  })
  .then(meals => {
    if (!meals) {
      res.status(404).send({
        error: 'There are no meals in the database.'
      })
    } else {
      res.status(200).send(JSON.stringify(meals))
    }
  })
  .catch(error => {
    res.status(500).send({
      error
    })
  })
})

router.post("/:meal_id/foods/:food_id", async function(req, res, next) {
  res.setHeader("content-Type", "application/json");
  Meal.findOne({
    where: {
      id: req.params.meal_id
    },
    attributes: ['id', 'name']
  })
  .then(meal => {
    if (!meal) {
      res.status(404).send({
        error: 'No meal with that ID.'
      })
    } else {
      Food.findOne({
        where: {
          id: req.params.food_id
        },
        attributes: ['id', 'name']
      })
      .then(food => {
        if (!food) {
          res.status(404).send({
            error: 'No food with that ID.'
          })
        }else{
          MealFood.findOrCreate({
            where: {
              MealId: meal.id,
              FoodId: food.id
            }
          })
          .spread((mealfood, created) => {
            if (created) {
              res.status(201).send(JSON.stringify({"message": `Successfully added ${food.name} to ${meal.name}`}))
            }else{
              res.status(400).send({error:"That food already exists for that meal."})
            }
          })
          .catch(error => {
            res.status(400).send({ error: error });
          })
        }
      })
      .catch(error => {
        res.status(400).send({ error: "Invalid request." });
      })
    }
  })
  .catch(error => {
    res.status(400).send({ error: "Invalid request." });
  })
})

router.delete('/:meal_id/foods/:food_id', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  MealFood.destroy({
      where: {
        MealId: req.params.meal_id,
        FoodId: req.params.food_id
      }
  })
  .then(mealfood => {
    if(mealfood) {
      res.status(204).send()
    }else{
      res.status(404).send(JSON.stringify({ error: "Request does not match any records." }))
    }
  })
  .catch(error => {
    res.status(404).send(JSON.stringify({ error: "Invalid request." }))
  })
})

module.exports = router;
