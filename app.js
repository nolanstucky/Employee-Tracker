const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//connection to mysql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeTrackerDB"
});

connection.connect(function(err){
    if(err) throw err
    console.log("Connected as Id" + connection.threadId)
    init();
})


function init() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Role",
                "Add Employee",
                "Update Employee Role",
                "Add Department",
                "Add Roles"
            ]

        }
    ])
    .then(answers =>{
        switch (answers.choice) {
            case "View All Employees":
                console.log("chris is an idiot")
            break;

        }
    })
}