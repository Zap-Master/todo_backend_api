const serverless = require('serverless-http');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const pool = require('./database.js');
const { request, response } = require('express');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/tasks/:userId', function (request, response) {
    const userId = request.params.userId;
    const sql = 'SELECT * FROM todo.Tasks t WHERE t.userId = ?';
    pool.query(sql, [userId],(err, data) => {
        if (err) {
            console.log('Error from MySQL', err);
            response.status(500).send(err);
        } else {
            response.status(200).send(data);
        }
    });
  });

//create new task
app.post('/createTask', (request, response) => {
    const data = request.body;
    const sql = 'insert into todo.Tasks(UserId, TaskName, DueDate, Complete, Description) values (?, ?, ?, ?, ?)';
    pool.query(
        sql,
        [data.userId, data.taskName, data.dueDate, data.complete, data.description],
        (err, results) => {
            if (err) {
                console.log('Error from MySQL', err);
                response.status(500).send(err);
            } else {
                //send back new task
                pool.query(
                    'SELECT * FROM todo.Tasks t WHERE t.taskId = ?',
                    [results.insertId],
                    (err, results) => {
                        if (err) {
                            console.log('Error from MySQL', err);
                            response.status(500).send(err);
                        } else {
                            response.status(201).send(results[0]);
                        }
                    }
                )
            }
        }
    )
})

//update task
app.put('/updateTask/:taskId', (request, response) => {
    const taskId = request.params.taskId;
    const data = request.body;
    const sql = 'UPDATE todo.Tasks SET taskName = ?,  dueDate = ?, complete = ?, description = ? WHERE taskId = ?';
    pool.query(
        sql,
        [data.taskName, data.dueDate, data.complete, data.description, data.taskId],
        (err, results) => {
            if (err) {
                console.log('Error from MySQL', err);
                response.status(500).send(err);
            } else {
                //send back updated task
                pool.query(
                    'SELECT * FROM todo.Tasks t WHERE t.taskId = ?',
                    [data.taskId],
                    (err, results) => {
                        if (err) {
                            console.log('Error from MySQL', err);
                            response.status(500).send(err);
                        } else {
                            response.status(201).send(results[0]);
                        }
                    }
                )
            }
        }
        )
})


module.exports.handler = serverless(app);