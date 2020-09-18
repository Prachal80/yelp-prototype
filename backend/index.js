//import the require dependencies
var express = require("express");
var app = express();
var mysql = require("mysql");
var path = require("path");
var dotenv = require("dotenv").config({
  path: "../.env",
});

// dotenv.config({ path: "./.env" });
var bodyParser = require("body-parser");
// var session = require("express-session");
// var cookieParser = require("cookie-parser");
// var cors = require("cors");
// app.set("view engine", "ejs");

// //use cors to allow cross origin resource sharing
// app.use(cors({ origin: "http://localhost:5000", credentials: true }));

//Establish mysql connection
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

app.get("/", (req, res) => {
  res.send("<h1>Test</h1>");
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

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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

var loginBasePath = require("./src/routes/customer/account");
app.use("/login", loginBasePath);

exports.db = db;
app.listen(5001);
console.log("Server Listening on port 5001");
