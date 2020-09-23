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
  //   UPDATE `yelp`.`customer` SET `profilePic` = 'http://localhost:5001/uploads/profilePic-1600788593610.jpg' WHERE (`id` = '1');
  //   query = `update yelp.customer set profilePic = "${imagepath}" where (id = ${req.body.CID})`;
  // `update owner set name='${name}',email='${email}',restaurantname='${restaurant}',phone='${phone}',cuisine='${cuisine}' where email='${email}'`

  let query = "update customer set profilePic = ? where id = ?";
  let args = [imagepath, req.body.CID];
  executeQuery(query, args, (flag, result) => {
    // console.log(flag, result);
    if (!flag) console.log("err", flag);
    else {
      res.redirect("http://localhost:3000/customer/profile");
    }
  });
});

module.exports = router;
