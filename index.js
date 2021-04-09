const serverless = require('serverless-http');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

console.log("------" + process.env.DB_NAME + "----------");
console.log("------" + process.env.DB_USER + "----------");
console.log("------" + process.env.DB_PASSWORD + "----------");
console.log("------" + process.env.DB_NAME + "----------");

app.get("/tasks", function (request, response) {
    connection.query("SELECT * FROM Tasks", function (err, data) {
      if (err) {
        console.log("Error from MySQL", err);
        response.status(500).send(err);
      } else {
        response.status(200).send(data);
      }
    });
  });


module.exports.handler = serverless(app);