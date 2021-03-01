const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

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
                "View All Departments",
                "View All Roles",
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
                viewAllEmployees();
            break;
            case "View All Departments":
                viewDepartments();
            break;
            case "View All Roles":
                viewRoles();
            break;
            case "Add Employee":
                addEmployee();
            break;
            case "Update Employee Role":
                addRole();
            break;
            case "Add Department":
                addDepartment();
            break;
            case "Update Employee Role":
                updateEmployeeRole();
            break;
        }
    })
}

function viewAllEmployees(){
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department on role.department_id = department.id;",
    function(err, res) {
        if (err) throw err;
        console.table(res)
        init();
    })
}

function viewDepartments(){
    connection.query("SELECT * FROM department;",
    function(err, res) {
        if (err) throw err;
        console.table(res)
        init();
    })
}

function viewRoles(){
    connection.query("SELECT * FROM role;",
    function(err, res) {
        if (err) throw err;
        console.table(res)
        init();
    })
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter first name"
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter last name"
        },
        {
            type: "list",
            name: "roles",
            message: "Please choose a role",
            choices: showRoles()
        },
        {
            type: "list",
            name: "managers",
            message: "Please choose a manager",
            choices: showEmployees()
        },
    ])
    .then(answers=>{
        let roleId = showRoles().indexOf(answers.roles) + 1
        let managerId = showEmployees().indexOf(answers.managers) 
        if(managerId===0){
            managerId = null
        }
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: 3,
                manager_id: null

            }, function(err){
                if (err) throw err;
                init();
            })
    })
}
var roles = []
function showRoles(){
    connection.query("SELECT * FROM role;",
    function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roles.push(res[i].title)
        }
    })
    return roles;
};
var names = []
function showEmployees(){
    connection.query("SELECT * FROM employee;",
    function(err, res) {
        if (err) throw err;
        names.push("No manager");
        for (let i = 0; i < res.length; i++) {

            names.push(res[i].first_name +" "+ res[i].last_name)
        }

    })
    return names;
};

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "Please enter the department's name"
        },
        {
            type: "input",
            name: "departmentId",
            message: "Please enter the department's id"
        },
    ])
    .then(answers=>{
        connection.query("INSERT INTO department SET ?",
            {
                name: answers.departmentName,
                id: answers.departmentId

            }, function(err){
                if (err) throw err;
                init();
            })
    })
}