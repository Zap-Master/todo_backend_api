# To Do Aplication - Backend

This is the back end API of To Do Application. It consumed by a front end React application [here](https://github.com/Zap-Master/todo-frontend) and connets to a RDS Database.

### Technology Used

This project uses the following technology:

- Serverless Framework
- Express
- SQL
- AWS Lambda
- AWS RDS

### Endpoints

#### POST

[https://kmvoiplith.execute-api.eu-west-2.amazonaws.com/dev/createTask](https://kmvoiplith.execute-api.eu-west-2.amazonaws.com/dev/createTask)

Creates a new task. The data must be sent in the format bellow:

```json
    {
            "taskId": "",
            "userId": 1,
            "taskName": "Call uncle",
            "dueDate": "2021-04-11",
            "complete": 0,
            "description": ""
    }
```

---

#### GET

[https://kmvoiplith.execute-api.eu-west-2.amazonaws.com/dev/tasks/{userId}](https://kmvoiplith.execute-api.eu-west-2.amazonaws.com/dev/tasks/{userId})

Will respond with a list of tasks in the format:

```json
[
    {
        "taskId": 1,
        "userId": 1,
        "taskName": "Make a bed",
        "dueDate": "2021-04-10T00:00:00.000Z",
        "complete": 0,
        "description": "put pajamas under the pillow"
    },
    {
        "taskId": 22,
        "userId": 1,
        "taskName": "Bake a bread",
        "dueDate": "2021-04-11T00:00:00.000Z",
        "complete": 0,
        "description": ""
    }
]
```

---

#### PUT

[https://kmvoiplith.execute-api.eu-west-2.amazonaws.com/dev/updateTask/{taskId}](https://kmvoiplith.execute-api.eu-west-2.amazonaws.com/dev/updateTask/{taskId})

Will amend the task. The data must be sent in the format bellow:

```json
    {
            "taskId": 5,
            "userId": 1,
            "taskName": "Call Noah",
            "dueDate": "2021-05-01",
            "complete": 0,
            "description": ""
    }
```

---

#### DELETE

[https://kmvoiplith.execute-api.eu-west-2.amazonaws.com/dev/deleteTask/{taskId}](https://kmvoiplith.execute-api.eu-west-2.amazonaws.com/dev/deleteTask/{taskId})

Will delete the task