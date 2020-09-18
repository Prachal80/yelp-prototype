const db = require("../../index");
// const mysql = require("mysql");

function executeQuery(query, callback) {
  //   console.log("db", db);
  db.db.query(query, (err, res) => {
    if (err) console.log("err,", err);
    else {
      if (res.length) {
        console.log("Query executed");
        callback(true);
      } else {
        callback(false);
      }
    }
  });
}

module.exports = executeQuery;
