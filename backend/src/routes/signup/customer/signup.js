var express = require("express");
const router = express.Router();
const executeQuery = require("../../../database/mysql");

router.post("/", (req, res) => {
  console.log("signup api ");
  let query = `insert into yelp.customer (name, email,password) values ("${req.body.username}","${req.body.email}", "${req.body.password}`;

  executeQuery(query, (flag) => {
    res.send({ success: flag, data });
  });
});

module.exports = router;
