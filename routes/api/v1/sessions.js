var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');

router.post("/", function(req, res, next) {
  if (req.body.email){
    if (req.body.password){
      User.findOne({
        where: {
          email: req.body.email.toLowerCase()
        }
      }).then(function(user){
        if(!user){
          res.setHeader("Content-Type", "application/json");
          res.status(400).send({ error: "email does not match any records" });
        }else{
          bcrypt.compare(req.body.password, user.password_digest, function (err, result) {
            if(result == true){
              res.setHeader("Content-Type", "application/json");
              res.status(200).send(JSON.stringify({api_key: user.api_key}));
            }else{
              res.setHeader("Content-Type", "application/json");
              res.status(400).send({ error: "incorrect password" });
            }
          });
        }
      });
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
