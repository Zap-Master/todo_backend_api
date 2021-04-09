const serverless = require('serverless-http');

const express = require('express');
const cors = require('cors');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'todo-db.cky4u41f5sla.eu-west-2.rds.amazonaws.com',
    user: 'root',
    password: 'abc123abc123',
    database: 'todo'
});
const connection = mysql.createConnection({
    host: DB_HOST,
    user: 'DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.get('/tasks', function(req, res) {
    connection.query('select * from todo.Tasks', function(err, data) {
        if (err) {
            console.log('Error from MySQL', err);
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    });
});

module.exports.handler = serverless(app);