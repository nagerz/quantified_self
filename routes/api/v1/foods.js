var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
const fetch = require('node-fetch');

router.get("/", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Food.findAll({
    attributes: ['id', 'name', 'calories']
  })
  .then(foods => {
    res.status(200).send(JSON.stringify(foods));
  })
  .catch(error => {
    res.status(500).send({error})
  });
});

router.get("/:id", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Food.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'calories']
  })
  .then(food => {
    if(!food){
      res.status(404).send({ error: "Requested food item could not be found." });
    }else{
      res.status(200).send(JSON.stringify(food));
    }
  })
  .catch(error => {
    res.status(404).send({error})
  });
});

router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  const calOrNameErrorMessage = "Name/Calories must be passed in to the body via x-www-form-urlencoded in the format of name or calories as the key and item name or calories count as the value without quotes"
  if (req.body.name === undefined) {
    res.status(400).send(JSON.stringify(calOrNameErrorMessage))
  } else {
    const name = upCase(req.body.name)
    Food.findOrCreate({
        where: {
          name: name,
          calories: req.body.calories
        }
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
});

router.patch("/:id", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  validateRequest(req)
  .then(req => {
    Food.update(req)
    .then(food => {
      if(!food){
        res.status(404).send({ error: "Requested food item could not be found." });
      }else{
        res.status(200).send(JSON.stringify(food));
      }
    })
    .catch(error => {
      //catch failed food update, usually due to name already in use
      res.status(404).send({ error: error.error.errors[0].message })
    });
  })
  .catch(error => {
    //catches invalid request
    res.status(404).send({ error: error });
  })
});

function validateRequest(req) {
  return new Promise((resolve, reject) => {
    if (req.body.food){
      if (req.body.food.name && req.body.food.calories){
        if (Number.isInteger(req.body.food.calories) === true){
          resolve(req)
        }else{
          error = "Invalid calories. Must be integer."
          reject(error)
        }
      }else{
        error = "Missing information."
        reject(error)
      }
    }else{
      error = "Request missing food designation."
      reject(error)
    }
  })
}

function parsedFood(food) {
  return {
    "id": food.id,
    "name": food.name,
    "calories": food.calories
  }
}

function upCase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

module.exports = router;
