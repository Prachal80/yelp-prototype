const e = require("express");
var express = require("express");
const router = express.Router();
const executeQuery = require("../../database/mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", (req, res) => {
  console.log("signup api ");

  if (req.body.userType === "customer") {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      console.log("Customer signup");
      let query = `insert into customer (name, email,password) values (?,?,?)`;
      let args = [req.body.name, req.body.email, hash];
      executeQuery(query, args, (flag, result) => {
        res.send({ success: flag, result });
      });
    });
  } else if (req.body.userType === "restaurant") {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      console.log("Restaurant signup");
      let query = `insert into restaurant (name, email, password, location) values (?,?,?,?)`;
      let args = [req.body.name, req.body.email, hash, req.body.location];
      executeQuery(query, args, (flag, result) => {
        res.send({ success: flag, result });
      });
    });
  }
});

module.exports = router;
