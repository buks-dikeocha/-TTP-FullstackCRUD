// here we will define all of our configutations, so that we can use postgres here

// bring our project's private variables from .env
// use process.env.[name]
require("dotenv").config()

// postgres Pool is the tool we use to help communicate with our database
const Pool = require("pg").Pool;
const pool = new Pool({
    user: `${process.env.DB_USER}`,       // your postgres username
    password: `${process.env.DB_PASSWORD}`,   // your postgres password
    host: "localhost",      // localhost, for local hosting :) (React)
    port: process.env.DB_PORT,             // postgres port, 5432 by default
    database: `${process.env.DB_NAME}`   // the database we are interacting with
})

module.exports = pool; // let other files use me