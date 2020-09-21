var express = require("express");
const router = express.Router();
const executeQuery = require("../../../database/mysql");

router.post("/", (req, res) => {
  console.log("login api ");
  let query = `select * from restaurant where email= "${req.body.username}" and password = "${req.body.password}"`;

  executeQuery(query, (flag) => {
    res.send({ success: flag });
  });
});

module.exports = router;
