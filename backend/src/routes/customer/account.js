var express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("login api ");
});

module.exports = router;
