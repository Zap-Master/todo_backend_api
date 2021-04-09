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

app.get("/tasks/:userId", function (request, response) {
    const userId = request.params.userId;
    const sql = "SELECT * FROM todo.Tasks t WHERE t.userId = ?";
    connection.query(sql, [userId],(err, data) => {
        if (err) {
            console.log("Error from MySQL", err);
            response.status(500).send(err);
        } else {
            response.status(200).send(data);
        }
    });
  });


module.exports.handler = serverless(app);