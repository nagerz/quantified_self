var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var pry = require('pryjs');
const fetch = require('node-fetch');

router.get("/", function(req, res, next) {
  eval(pry.it)
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
    const food =  await Food.findOrCreate({where: {name: req.body.name, calories: req.body.calories} })
    if (!food) {
      res.status(400).send({ error })
    } else {
      res.status(200).send(JSON.stringify(food))
    }
  }
  catch {
    res.status(500).send({ error })
  }
})

module.exports = router;
