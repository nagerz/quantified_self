var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
const fetch = require('node-fetch');

router.get("/:id/foods", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Meal.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name'],
    include: [{model:Food, attributes: ['id', 'name', 'calories'], through: { attributes: []}}]
  })
  .then(meal => {
    if(!meal){
      res.status(404).send({ error: "Requested meal could not be found." });
    }else{
      res.status(200).send(JSON.stringify(meal));
    }
  })
  .catch(error => {
    res.status(404).send({error})
  });
});

module.exports = router;