var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
const fetch = require('node-fetch');
var pry = require('pryjs');

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Food.findAll()
  .then(foods => {
    res.status(200).send(JSON.stringify(foods));
  })
  .catch(error => {
    res.status(500).send({error})
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

router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Food.findOrCreate({where: {name: req.body.name, calories: req.body.calories} })
  .then(food => {
    if (!food){
      res.status(400).send({ error })
    } else {
      res.status(200).send(JSON.stringify(parsedFood(food[0])))
    }
  })
  .catch(error => {
    res.status(500).send({ error })
  })
})

function parsedFood(food) {
    return {"id": food.id,
    "name": food.name,
    "calories": food.calories}
}




// router.post("/", async (req, res, next) => {
//   try {
//     const food =  await Food.findOrCreate({where: {name: req.body.name, calories: req.body.calories} })
//     if (!food) {
//       res.status(400).send({ error })
//     } else {
//       res.status(200).send(JSON.stringify(food))
//     }
//   }
//   catch {
//     res.status(500).send({ error })
//   }
// })

module.exports = router;
