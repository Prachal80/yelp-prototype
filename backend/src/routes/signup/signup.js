const e = require("express");
var express = require("express");
const router = express.Router();
const executeQuery = require("../../database/mysql");

router.post("/", (req, res) => {
  console.log("signup api ");

  if (req.body.usetType === "customer") {
    let query = `insert into customer (name, email,password) values ("${req.body.username}","${req.body.email}", "${req.body.password})"`;
    executeQuery(query, (flag) => {
      res.send({ success: flag });
    });
  } else {
    let query = `insert into restaurant (name, email,password, location) values ("${req.body.username}","${req.body.email}", "${req.body.password})","${req.body.location}"`;
    executeQuery(query, (flag) => {
      res.send({ success: flag });
    });
  }
});

module.exports = router;
