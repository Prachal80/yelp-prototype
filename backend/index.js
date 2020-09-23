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

// //use express session to maintain session data
// app.use(
//   session({
//     secret: "cmpe273_kafka_passport_mongo",
//     resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration: 5 * 60 * 1000,
//   })
// );

var loginBasePath = require("./src/routes/login/account");
app.use("/login", loginBasePath);

var signUpPath = require("./src/routes/signup/customer/signup");
app.use("/signup", signUpPath);

var profilePic = require("./src/routes/profilepic/profileUpload");
app.use("/profilepic", profilePic);

exports.db = db;
app.listen(5001);
console.log("Server Listening on port 5001");
