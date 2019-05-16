var express = require("express");
var router = express.Router();
var Recipe = require('../../../models').Recipe;
const fetch = require('node-fetch');

router.get("/", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Recipe.findAll({
    attributes: ['id', 'name', 'calories', 'url']
  })
  .then(recipes => {
    res.status(200).send(JSON.stringify(recipes));
  })
  .catch(error => {
    res.status(500).send({error})
  });
});

router.get("/:id", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  Recipe.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'calories', 'url']
  })
  .then(recipe => {
    if(!recipe){
      res.status(404).send({ error: "Requested recipe could not be found." });
    }else{
      res.status(200).send(JSON.stringify(recipe));
    }
  })
  .catch(error => {
    res.status(404).send({error})
  });
});

router.delete('/:id', async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const recipe = await Recipe.findOne({
      where: { id: req.params.id }
    })
    if (!recipe) {
      res.status(404).send({ error: "Requested recipe could not be found." })
    } else {
      await recipe.destroy()
      res.status(204).send()
    }
  } catch (error) {
    res.status(500).send({error: error})
  }
});

module.exports = router;
