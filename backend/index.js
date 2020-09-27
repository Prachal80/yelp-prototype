//import the require dependencies
var express = require("express");
var cors = require("cors");
var app = express();
var mysql = require("mysql");
var path = require("path");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(saltRounds);
var multer = require("multer");
var dotenv = require("dotenv").config({
  path: "../.env",
});

var bodyParser = require("body-parser");
var session = require("express-session");
// var cookieParser = require("cookie-parser");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(
  "/uploads/restaurant",
  express.static(path.join(__dirname, "/uploads/restaurant"))
);
// //Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// Establish mysql connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to Mysql");
  }
});

var loginBasePath = require("./src/routes/login/account");
app.use("/login", loginBasePath);

var signUpPath = require("./src/routes/signup/signup");
app.use("/signup", signUpPath);

var cusotmerProfile = require("./src/routes/profile/customerProfileUpdate");
app.use("/customerProfile", cusotmerProfile);

var restaurantProfile = require("./src/routes/profile/restaurantProfileUpdate");
app.use("/restaurantProfile", restaurantProfile);

exports.db = db;
app.listen(5001);
console.log("Server Listening on port 5001");
