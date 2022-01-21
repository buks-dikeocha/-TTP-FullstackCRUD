const express = require("express")
const cors = require("cors")
const compression = require("compression")
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const pool = require("./db") // db exported itself
const {emailIsValid, passwordIsValid} = require("./validation")
const { response, request } = require("express")
// const { response, request } = require("express")

const app = express()

app.use(cors())
app.use(express.json())
app.use(compression())
app.use(bodyParser.json())

//#region task CRUD ops

// create a task
app.post("/todolist", async (request, response) => { // handles post requests at this path
    try {
        const { task } = request.body // destructure an object
        
        // .query to write sql commands
        const newTask = await pool.query(`
            INSERT INTO todo (task) VALUES ($1) RETURNING *
        `, [task])

        response.json(newTask.rows[0]) // set what response will be
    } catch (error) {
        console.error(error.message)
    }
})

// get all tasks
app.get("/todolist", async (request, response) => {
    try {
        const allTasks = await pool.query("SELECT * FROM todo")
        response.json(allTasks.rows)
    } catch (error) {
        console.error(error.message)
    }    
})

// get one task
// : for dynamic urls
app.get("/todolist/:id", async (request, response) => {
    try {
        // use params to access url variables
        const { id } = request.params

        const task = await pool.query("SELECT * FROM todo WHERE taskID = $1", [id])
        response.json(task.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// update a task
app.put("/todolist/:id", async (request, response) => {
    try {
        const { id } = request.params
        const { task } = request.body

        const updatedTask = await pool.query(`
            UPDATE todo
            SET task = $1
            WHERE taskID = $2
            RETURNING *
        `, [task, id])

        response.json("Task updated!")
    } catch (error) {
        console.error(error)
    }
})

// delete a task
app.delete("/todolist/:id", async (request, response) => {
    try {
        const { id } = request.params
        
        const toDelete = await pool.query("DELETE FROM todo WHERE taskID = $1", [id])
        response.json("Task deleted!")
    } catch (error) {
        console.error(error)
    }
})

//#endregion

//#region user sign up

app.post("/signup", async (request, response) => {
    try {
        const { username, email, password } = request.body;

        let errors = {} // will store email/password errors if any

        if (!emailIsValid(email)) {
            errors.email = "Invalid email. Review or change your email."
        }

        if (!passwordIsValid(password)) {
            errors.password = "Password must have at least one lowercase letter, one uppercase letter, one number and one symbol. Must also be more than 8 characters."
        }

        // make sure email is not in use
        const usingEmail = await pool.query(`
            SELECT * FROM users WHERE email = $1
        `, [email])

        if (usingEmail.rows.length > 0) {
            errors.email = "Email is already in use."
        }

        // if any email/password errors, send the error
        if (Object.keys(errors).length > 0) {
            return response.status(400).json(errors)
        }

        const salt = await bcrypt.genSalt(10) // generate chars to add to the password, extra security
        const hashedPassword = await bcrypt.hash(password, salt) // apply bcrypt hash

        //create user
        const newUser = await pool.query(`
            INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
            RETURNING *
        `, [username, email, hashedPassword])

        response.json(newUser.rows[0])
    } catch (error) {
        response.status(500).json({error: "Error 500: server-side error"})
        console.error(error.message)
    }
})

// app.post("/", createUser)

//#endregion

//#region user log in

// const login = 
app.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body
        
        let errors = {}

        const emailLookup = await pool.query(`
            SELECT * FROM users WHERE email = $1
        `, [email])

        if (emailLookup.rows.length > 0) {
            const passwordMatch = await bcrypt.compare(password, emailLookup.rows[0].password)
            if (!passwordMatch) {
                errors.password = "Password is incorrect."
            }
        }
        else {
            errors.email = "Email is not registered."
        }

        if (Object.keys(errors).length > 0) {
            return response.status(400).json(errors)
        }

        response.json(emailLookup.rows[0])
    } catch (error) {
        response.status(500).json({ error: "Something went worng." })
        console.log(error.message)
    }
})

//#endregion

app.listen(5000, () => {
    console.log("opened on 5000")
})

/*

SQL COMMANDS

INSERT INTO [table] ([columns]) VALUES ([values])
SELECT [item/*] FROM [table] WHERE [condition]
UDPATE [table] SET [column] WHERE [condition (likely id?)]
DELETE FROM [table] WHERE [condition]

*/