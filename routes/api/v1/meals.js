var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var Recipe = require('../../../models').Recipe;
var MealFood = require('../../../models').MealFood;
var MealRecipe = require('../../../models').MealRecipe;
var User = require('../../../models').User;
const fetch = require('node-fetch');

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
      res.status(404).send({ error: "Requested meal could not be found." });
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
    res.status(404).send({error: error})
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
      addTotalCalories(meals)
      .then(meals => {
        res.status(200).send(meals)
      })
    }
  })
  .catch(error => {
    res.status(500).send({error: "test 3"})
  })
})

router.post("/", async function(req, res, next) {
  res.setHeader("content-Type", "application/json");
  validateMealRequest(req)
  .then(req => {
    validateAndFindUser(req)
    .then(user => {
      var date = new Date(req.body.date)
      Meal.findOrCreate({
        where: {
          UserId: user.id,
          name: req.body.name
        },
        defaults: {
          date: date
        },
        attributes: ['id', 'name', 'date', 'UserId']
      })
      .spread((meal, created) => {
        if (created) {
          res.status(201).send(JSON.stringify(parsedMeal(meal)))
        }else{
          res.status(400).send({error:"That meal already exists for that user."})
        }
      })
      .catch(error => {
        res.status(400).send({ error: "Meal creation error." });
      })
    })
    .catch(error => {
      res.status(400).send({ error: error });
    })
  })
  .catch(error => {
    res.status(400).send(JSON.stringify({ error: error }))
  })
});

router.post("/:meal_id/foods/:food_id", async function(req, res, next) {
  res.setHeader("content-Type", "application/json");
  validateAndFindUser(req)
  .then(user => {
    Meal.findOne({
      where: {
        UserId: user.id,
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
      res.status(400).send({ error: "Invalid meal request. No meal for that user." });
    })
  })
  .catch(error => {
    res.status(400).send(JSON.stringify({ error: error }))
  })
});

router.post("/:meal_id/recipes", async function(req, res, next) {
  res.setHeader("content-Type", "application/json");
  validateRecipeRequest(req)
  .then(req => {
    validateAndFindUser(req)
    .then(user => {
      Meal.findOne({
        where: {
          UserId: user.id,
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
      res.status(400).send(JSON.stringify({ error: error }))
    })
  })
  .catch(error => {
    res.status(404).send({error: error})
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

router.delete('/:meal_id/recipes/:recipe_id', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  MealRecipe.destroy({
    where: {
      MealId: req.params.meal_id,
      RecipeId: req.params.recipe_id
    }
  })
  .then(mealrecipe => {
    if(mealrecipe) {
      res.status(204).send()
    }else{
      res.status(404).send(JSON.stringify({ error: "Request does not match any records." }))
    }
  })
  .catch(error => {
    res.status(404).send(JSON.stringify({ error: "Invalid request." }))
  })
});

function validateMealRequest(req) {
  return new Promise((resolve, reject) => {
    if (req.body.name && req.body.date){
      var date = new Date(req.body.date)
      if (date instanceof Date && !isNaN(date.valueOf()) == true){
        resolve(req)
      }else{
        error = "Invalid date."
        reject(error)
      }
    }else{
      error = "Missing name and/or date."
      reject(error)
    }
  })
};

function validateAndFindUser(req){
  return new Promise((resolve, reject) => {
    if (req.body.api_key){
      User.findOne({
        where: {
          api_key: req.body.api_key
        }
      })
      .then(user => {
        if(!user){
          reject("unauthorized");
        }else{
          resolve(user)
        }
      })
      .catch(error => {
        reject("User find error")
      })
    }else{
      reject("unauthorized");
    }
  })
};

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

function addTotalCalories(meals) {
  return new Promise((resolve, reject) => {
    var calMeals = []
    meals.map(meal => {
      meal = meal.toJSON();
      Meal.totalCalories(meal)
      .then(totalCal => {
        meal.totalCalories = totalCal
        calMeals.push(meal)
      })
    })
    resolve(calMeals)
  })
};

function parsedMeal(meal) {
  return {
    "id": meal.id,
    "name": meal.name,
    "date": meal.date,
    "UserId": meal.UserId
  }
};

module.exports = router;
