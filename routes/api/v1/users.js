var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
var hat = require('hat');
var pry = require('pryjs');

router.get("/", function(req, res, next) {
  User.findAll()
  .then(users => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(users));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
});

router.get("/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  User.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(user => {
    res.status(200).send(JSON.stringify(user));
  })
  .catch(error => {
    res.status(500).send({error})
  });
});

router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  if (req.body.email){
    if (req.body.password || req.body.password_confirmation){
      if (req.body.password == req.body.password_confirmation){
        bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
          User.create({
            email: req.body.email.toLowerCase(),
            password_digest: hash,
            api_key: hat()
          })
          .then(user => {
            res.status(201).send(JSON.stringify({api_key: user.api_key}));
          })
          .catch(error => {
            res.status(500).send({ error });
          });
        });
      }else{
        res.status(400).send({ error: "passwords don't match" });
      };
    }else{
      res.status(400).send({ error: "must provide password" });
    };
  }else{
    res.status(400).send({ error: "must provide email" });
  };
});

router.post('/calories', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  validateAndFindUser(req)
  .then(user => {
    if(req.query.date){
      var queryDate = new Date(req.query.date)
      var date = queryDate.toLocaleDateString()
      user.dailyCalories(queryDate)
      .then(calories => {
        response = {user: user.id, date: date, calories: calories}
        res.status(200).send(JSON.stringify(response));
      })
    }else{
      res.status(400).send({ error: "Missing date." });
    }
  })
  .catch(error => {
    res.status(400).send({ error: error });
  })
});

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

module.exports = router;
