var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var Recipe = require('../../../models').Recipe;
var MealFood = require('../../../models').MealFood;
var MealRecipe = require('../../../models').MealRecipe;
const fetch = require('node-fetch');
var pry = require('pryjs');

router.get("/:id", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Meal.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name'],
    include: [
      {
        model: Food,
        attributes: ['id', 'name', 'calories'],
        through: {
          attributes: []
        }
      },
      {
        model: Recipe,
        attributes: ['id', 'name', 'calories', 'url'],
        through: {
          attributes: []
        }
      }
    ]
  })
  .then(meal => {
    if (!meal) {
      res.status(404).send({
        error: "Requested meal could not be found."
      });
    } else {
      meal = meal.toJSON();
      Meal.totalCalories(meal)
      .then(totalCal => {
        meal.totalCalories = totalCal
        res.status(200).send(JSON.stringify(meal));
      })
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
      through: {attributes: []}
    },
    {
      model: Recipe,
      attributes: ['id', 'name', 'calories', 'url'],
      through: {attributes: []}
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
});

router.post("/:meal_id/recipes", async function(req, res, next) {
  res.setHeader("content-Type", "application/json");
  validateRecipeRequest(req)
  .then(req => {
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
        Recipe.findOrCreate({
          where: {name: req.body.recipe.name},
          defaults: {
            calories: req.body.recipe.calories,
            url: req.body.recipe.url
          },
          attributes: ['id', 'name']
        })
        .then(recipe => {
          if(!recipe) {
            res.status(404).send({error: 'Invalid recipe information.'})
          }else{
            MealRecipe.findOrCreate({
              where: {
                MealId: meal.id,
                RecipeId: recipe[0].id
              }
            })
            .spread((mealrecipe, created) => {
              if (created) {
                res.status(201).send(JSON.stringify({"message": `Successfully added ${recipe[0].name} to ${meal.name}`}))
              }else{
                res.status(400).send({error:"That recipe already exists for that meal."})
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
      res.status(400).send({ error: "Invalid meal request." });
    })
  })
  .catch(error => {
    res.status(404).send(JSON.stringify({ error: error }))
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
});

function validateRecipeRequest(req) {
  return new Promise((resolve, reject) => {
    if (req.body.recipe && req.body.recipe.name && req.body.recipe.calories && req.body.recipe.url){
      if (Number.isInteger(req.body.recipe.calories) === true){
        resolve(req)
      }else{
        error = "Invalid calories. Must be integer."
        reject(error)
      }
    }else{
      error = "Missing/incorrectly formatted recipe information."
      reject(error)
    }
  })
};

module.exports = router;
