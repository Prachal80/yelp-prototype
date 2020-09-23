const db = require("../../index");
// const mysql = require("mysql");

function executeQuery(query, args, callback) {
  //   console.log("db", db);
  db.db.query(query, args, (err, res) => {
    if (err) console.log("err,", err);
    else {
      console.log("response ", res);
      if (res) {
        console.log("Query executed");
        callback(true, res);
      } else {
        callback(false, null);
      }
    }
  });
}

module.exports = executeQuery;
