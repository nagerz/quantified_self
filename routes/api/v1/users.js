var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
var hat = require('hat');

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  User.findAll()
    .then(users => {
      res.status(200).send(JSON.stringify(users));
    })
    .catch(error => {
      res.status(500).send({error})
    });
});

router.get("/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(user => {
    if(!user){
      res.status(400).send({error: "User doesn't exist."})
    }else{
      res.status(200).send(JSON.stringify(user));
    }
  })
  .catch(error => {
    res.status(500).send({error})
  });
});

router.post("/", function(req, res, next) {
  if (req.body.email){
    if (req.body.password && req.body.password_confirmation){
      if (req.body.password == req.body.password_confirmation){
        bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
          User.create({
            email: req.body.email.toLowerCase(),
            password_digest: hash,
            api_key: hat()
          })
          .then(user => {
            res.setHeader("Content-Type", "application/json");
            res.status(201).send(JSON.stringify({api_key: user.api_key}));
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(400).send({ error: "Email taken." });
          });
        });
      }else{
        res.setHeader("Content-Type", "application/json");
        res.status(400).send({ error: "passwords don't match" });
      };
    }else{
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error: "must provide password" });
    };
  }else{
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error: "must provide email" });
  };
});

module.exports = router;
