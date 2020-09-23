var express = require("express");
const router = express.Router();
const executeQuery = require("../../database/mysql");

router.post("/", (req, res) => {
  console.log("login api ");

  let query = `select * from ${req.body.userType} where email= "${req.body.username}" and password = "${req.body.password}"`;

  executeQuery(query, (flag, result) => {
    res.send({ success: flag, res: result });
  });
});

module.exports = router;
