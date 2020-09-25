var multer = require("multer");
var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
var executeQuery = require("../../database/mysql");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });
// app.use("../../uploads", express.static(path.join(__dirname, "/uploads")));
router.post("/updateProfilePic", upload.single("profilePic"), function (
  req,
  res
) {
  console.log("Inside update profile picture");
  var host = req.hostname;
  console.log("Hostname", host);
  console.log("File", req.file);
  console.log("req.file.path", req.file.path);
  console.log("CID", req.body.CID);
  console.log("protocol ", req.protocol);
  var imagepath = req.protocol + "://" + host + ":5001/" + req.file.path;
  console.log("imagepath ", imagepath);

  let query = "update customer set profilepic = ? where id = ?";
  let args = [imagepath, req.body.CID];
  executeQuery(query, args, (flag, result) => {
    // console.log(flag, result);
    if (!flag) console.log("err", flag);
    else {
      res.redirect("http://localhost:3000/customer/profile");
    }
  });
});

router.get("/getCustomerProfile", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from customer where id = ?";
  let args = [req.query.CID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("user not found");
    else {
      console.log("result ", result);
      res.send({ profileData: result });
    }
  });
});

router.post("/updateProfile", (req, res) => {
  console.log("update profile req data ", req.body);
  let query =
    "update customer set name = ?, birthdate = ?, city = ?, state = ?, country = ?, nickname = ?, headline = ?, phone = ?, email = ?, blog = ?, yelpingsince = ?, thingsilove = ?, findmein = ? where id = ?";
  let args = [
    req.body.name,
    req.body.dob,
    req.body.city,
    req.body.state,
    req.body.country,
    req.body.nickname,
    req.body.headline,
    req.body.phone,
    req.body.emailid,
    req.body.blog,
    req.body.yelpingSince,
    req.body.thingsIlove,
    req.body.findMeIn,
    req.body.CID,
  ];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("user not found");
    else {
      console.log("result ", result);
      res.send({ profileData: result });
    }
  });
});

module.exports = router;