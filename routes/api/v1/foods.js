var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var pry = require('pryjs');
const fetch = require('node-fetch');

router.get("/", function(req, res, next) {
  Food.findAll()
    .then(foods => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.post("/", async (req, res, next) => {
  try {
    eval(pry.it)
    const food = Food.findOrCreate({name: req.query.food.name, calories: req.query.food.calories})
    if (!food) {
      res.status(400).send({ error })
    } else {
      res.status(200).send(food)
    }
  }
  catch {
    res.status(500).send({ error })
  }
})

module.exports = router;
