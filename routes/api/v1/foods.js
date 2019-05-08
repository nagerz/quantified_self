var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
const fetch = require('node-fetch');

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Food.findAll()
    .then(foods => {
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.status(500).send({
        error
      })
    });
});

router.get("/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Food.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(food => {
      if (!food) {
        res.status(404).send({
          error: "Requested food item could not be found."
        });
      } else {
        res.status(200).send(JSON.stringify(food));
      }
    })
    .catch(error => {
      res.status(500).send({
        error
      })
    });
});

router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  const calOrNameErrorMessage = "Name/Calories must be passed in to the body via x-www-form-urlencoded in the format of name or calories as the key and item name or calories count as the value without quotes"
  if (req.body.name === undefined) {
    res.status(400).send(JSON.stringify(calOrNameErrorMessage))
  } else {
    const name = downCase(req.body.name)
    Food.findOrCreate({
        where: {name: name},
        defaults: {calories: req.body.calories}
      })
      .then(food => {
        if (!food) {
          res.status(400).send({
            error
          })
        } else {
          res.status(200).send(JSON.stringify(parsedFood(food[0])))
        }
      })
      .catch(error => {
        if (error.message.includes("WHERE parameter")) {
          res.status(400).send(JSON.stringify(calOrNameErrorMessage))
        } else if (typeof(req.body.calories) === "string") {
          res.status(400).send(JSON.stringify("Please pass the calories datatype as a Number"))
        } else {
          res.status(500).send({
            error
          })
        }
      })
  }
})

function parsedFood(food) {
  return {
    "id": food.id,
    "name": food.name,
    "calories": food.calories
  }
}

function downCase(name) {
  return name.toLowerCase()
}

module.exports = router;
