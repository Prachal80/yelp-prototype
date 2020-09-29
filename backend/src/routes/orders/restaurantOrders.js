var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
var executeQuery = require("../../database/mysql");

//Add orders
router.post(
  "/makeOrderCustomer",

  function (req, res) {
    console.log("Inside Order Customer side");
    var host = req.hostname;
    console.log("Hostname", host);

    console.log("CID", req.body.CID);
    console.log("RID", req.body.RID);
    console.log("protocol ", req.protocol);
    console.log("%%%%%%%", req.body);
    var imagepath = req.protocol + "://" + host + ":5001/" + req.file.path;
    console.log("imagepath ", imagepath);
    let query = `insert into orders (dishname , ingredients , price , description , restaurantid , customerid , status, option) values (?,?,?,?,?,?,?,?)`;

    let args = [
      req.body.dishname,
      req.body.ingredients,
      req.body.price,
      req.body.description,
      req.body.RID,
      req.body.CID,
      req.body.status,
      req.body.option,
    ];
    console.log("**********", query);
    console.log(args);

    executeQuery(query, args, (flag, result) => {
      if (!flag) console.log("err", flag);
      else {
        res.send({ success: true, CustomerMakeOrder: result });
        res.redirect("http://localhost:3000/customer/orders");
      }
    });
  }
);

//Get All orders
router.get("/getAllOrders", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from orders where customerid = ?";
  let args = [req.query.CID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------No orders found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, CustomergetOrder: result });
    }
  });
});

//Delete Order
router.post("/deleteOrderCustomers"),
  (req, res) => {
    console.log("Inside changestatus Order Request");
    console.log("Req Body : ", req.body);

    let query = `delete from orders where orderid= ?`;
    args = [req.body.orderid];

    executeQuery(query, args, (flag, result) => {
      if (!flag) console.log("-------No orders found-------");
      else {
        console.log("result ", result);
        res.send({ success: true, CustomerDeleteOrder: result });
      }
    });
  };
