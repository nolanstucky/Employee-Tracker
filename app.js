const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//connection to mysql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "password",
    database: "employeeTrackerDB"
});

