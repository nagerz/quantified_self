var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

router.get("/recipes", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  validateSearchRequest(req)
  .then(req => {
    const mealType = req.query.mealType;
    const query = req.query.query;
    fetchRecipes(mealType, query)
    .then(recipes => {

      res.status(200).send(recipes)
    })
    .catch(error => {

      res.status(404).send(JSON.stringify({ error: "Failed to retrieve recipes. Check query." }))
    })
  })
  .catch(error => {
    res.status(404).send(JSON.stringify({ error: error }))
  })
});

function validateSearchRequest(req) {
  return new Promise((resolve, reject) => {
    if (req.query.mealType && req.query.query){
      if (req.query.mealType == "boring"){
        req.query.mealType = '';
        resolve(req)
      }else if(req.query.mealType == "bang-for-your-buck" || req.query.mealType == "heart-attack"){
        resolve(req)
      }else{
        error = "Invalid meal type."
        reject(error)
      }
    }else{
      error = "Missing mealType and/or query."
      reject(error)
    }
  })
};

function fetchRecipes(mealType, query){
  let service = "https://sq-recipe-service.herokuapp.com/api/v1/recipes/"
  let url = service + mealType + '?query=' + query

  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => {
      if(response.status == 200){
        resolve(response.json())
      }else{
        reject(result.error_message)
      }
    })
  })
};

module.exports = router;
