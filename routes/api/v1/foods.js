var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;

var pry = require('pryjs');
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
  return Food.findOne({
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
    res.status(500).send({error})
  });
});

router.patch("/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  validateRequest(req)
  .then(req => {
    if(req.body.food && req.body.food.name && req.body.food.calories){
      Food.update(req)
      .then(food => {
        if(!food){
          res.status(404).send({ error: "Requested food item could not be found." });
        }else if(food.error){
          res.status(404).send({ error: food.error.errors[0].message});
        }else{
          res.status(200).send(JSON.stringify(food));
        }
      })
      .catch(error => {
        res.status(500).send({error})
      });
    }else{
      res.status(400).send({ error: "Request formatted incorrectly and/or missing information." });
    }
  })
  .catch(error => {
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

module.exports = router;
