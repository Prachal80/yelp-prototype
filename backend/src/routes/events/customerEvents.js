var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
var executeQuery = require("../../database/mysql");

//Get All unregistered Events
router.get("/getAllEvents", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from Events order by eventdate asc";
  let args = [];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Events not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, customerEventsGet: result });
    }
  });
});

//Get Single Event
router.get("/getSingleEvent", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from Events where eventid =?";
  let args = [req.query.eventid];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Events not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, customerEventDetails: result });
    }
  });
});

//Get Registered Events
router.get("/getRegisteredEvents", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from registrations where customerid = ?";
  let args = [req.query.CID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Customer Registrations not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, getRegisteredEvents: result });
    }
  });
});

//Register for event
router.post("/registerEventCustomer", (req, res) => {
  console.log("Register event data ", req.body);

  let query = `insert into registrations (eventname, eventdescription,eventtime,eventdate,eventlocation,hashtags,restaurantname,restaurantid,customername,customerid) values (
    ?,?,?,?,?,?,?,?,?,?)`;

  let args = [
    req.body.eventname,
    req.body.eventdescription,
    req.body.eventtime,
    req.body.eventdate,
    req.body.eventlocation,
    req.body.hashtags,
    req.body.restaurantname,
    req.body.restaurantid,
    req.body.customername,
    req.body.customerid,
  ];
  console.log("**********", query, "!!!!!!!!!!!!!!", args);

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("err", flag);
    else {
      res.send({ success: true, customerEventAdd: result });
    }
  });
});

module.exports = router;
