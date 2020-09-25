const e = require("express");
var express = require("express");
const router = express.Router();
const executeQuery = require("../../database/mysql");

router.post("/", (req, res) => {
  console.log("signup api ");

  if (req.body.userType === "customer") {
    let query = `insert into customer (name, email,password) values ("${req.body.name}","${req.body.email}", "${req.body.password}")`;
    let args = [];
    executeQuery(query, args, (flag, result) => {
      res.send({ success: flag, result });
    });
  } else if (req.body.userType === "restaurant") {
    let query = `insert into restaurant (name, email,password, location) values ("${req.body.username}","${req.body.email}", "${req.body.password}","${req.body.location}")`;
    let args = [];
    executeQuery(query, args, (flag, result) => {
      res.send({ success: flag, result });
    });
  }
});

module.exports = router;
