var express = require("express");
var app = express();
const router = express.Router();

var executeQuery = require("../../database/mysql");

//Get All Dishes from dish table
router.get("/getAllDishes", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from dishes";
  let args = [];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Dishes not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, customerDishGet: result });
    }
  });
});

//Get all Restaurants

router.get("/getAllRestaurants", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from restaurant";
  let args = [];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Restaurants not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, allRestaurants: result });
    }
  });
});

module.exports = router;
