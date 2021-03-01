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

//function that is called upon once npm start asks the user what they want to do 
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
                "Add Role"
            ]

        }
    ])
    .then(answers =>{
        //switch cases that handles the functions depending on what the user wants to do
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
                updateEmployeeRole();
            break;
            case "Add Department":
                addDepartment();
            break;
            case "Add Role":
                addRole();
            break;
        }
    })
}
//function that shows all employees from database
function viewAllEmployees(){
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department on role.department_id = department.id;",
    function(err, res) {
        if (err) throw err;
        console.table(res)
        init();
    })
}
//function that shows all departments from databas
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
//function that adds an employee based off of user input to database
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
        //grabs the index of roles list and employee list to be able to track id 
        let roleId = showRoles().indexOf(answers.roles) + 1
        let managerId = showEmployees().indexOf(answers.managers) 
        if(managerId===0){
            managerId = null
        }
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: roleId,
                manager_id: managerId

            }, function(err){
                if (err) throw err;
                init();
            })
    })
}
//function that fills an array with all the roles in the database to use id
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
//function that fills an array with all the employees in the database to use id
var names = []
function showEmployees(){
    connection.query("SELECT * FROM employee;",
    function(err, res) {
        if (err) throw err;
        names.push("None");
        for (let i = 0; i < res.length; i++) {

            names.push(res[i].first_name +" "+ res[i].last_name)
        }

    })
    return names;
};
//function that fills an array with all the employees in the database to use id
var namesTwo = []
function showEmployeesTwo(){
    connection.query("SELECT * FROM employee;",
    function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {

            namesTwo.push(res[i].first_name +" "+ res[i].last_name)
        }

    })
    return namesTwo;
};
//function that fills an array with all the departments in the database to use id
var departments = []
function showDepartments(){
    connection.query("SELECT * FROM department;",
    function(err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {

            departments.push(res[i].name)
        }

    })
    return departments;
};
//adds a department based off of the name and id from user input
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
//function that adds a role to the database based off of user input
function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "Please enter the role's title"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Please enter the role's salary"
        },
        {
            type: "list",
            name: "roleDepartmentId",
            message: "Please enter the department's id for the role",
            choices: showDepartments()
        },
    ])
    .then(answers=>{
        let departmentId = showDepartments().indexOf(answers.roleDepartmentId) 
        connection.query("INSERT INTO role SET ?",
            {
                title: answers.roleTitle,
                salary: answers.roleSalary,
                department_id: departmentId

            }, function(err){
                if (err) throw err;
                init();
            })
    })
}
//updates the employee role based off of what the user picks for employee and role array
function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "yourDay",
            message: "How are you doing today?"
        },
        {
            type: "list",
            name: "employee",
            message: "Please choose the employee",
            choices: showEmployeesTwo()
        },
        {
            type: "list",
            name: "roles",
            message: "Please choose their new role",
            choices: showRoles()
        },
    ])
    .then(answers=>{
        let roleId = showRoles().indexOf(answers.roles) + 1
        let employeeId = showEmployeesTwo().indexOf(answers.employee) + 1
        let sql = "UPDATE employee SET role_id = ? WHERE id = ?";
        let data = [roleId, employeeId]
        connection.query(sql, data, 
            function(err){
                if (err) throw err;
                init();
            })
    })
}

