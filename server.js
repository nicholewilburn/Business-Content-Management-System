const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);

// View All Departments
function viewAllDepartments() {
  console.log("viewing all departments");
  const sql = `SELECT * FROM department`;

  db.promise().query(sql) 
  .then(([e]) => {
    console.table(e);
  })

};

// View All Roles
function viewAllRoles() {
  console.log("viewing all roles");
  const sql = `SELECT * FROM role`;

  db.promise().query(sql) 
  .then(([e]) => {
    console.table(e);
  })
};

// View All Employees
function viewAllEmployees() {
  console.log("viewing all employees");
  const sql = `SELECT * FROM employee`;

  db.promise().query(sql) 
  .then(([e]) => {
    console.table(e);
  })
};

//Add a Department
function addDepartment() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'dept_name',
        message: 'What is the name of the new department?',
      }
    ])
    .then (e => {
  
      const sql = "INSERT INTO department SET ?";
  
      db.promise().query(sql, e) 
      .then(() => start()
        )
  
    });
};

// Function to handle Inquirer actions
function start() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
      }
    ])
    .then((data) => {
      const action = data.action; // Get the user's action

      switch (action) {
        case 'view all departments':
          viewAllDepartments(); 
          break;
        case 'view all roles':
          viewAllRoles();
          break;
        case 'view all employees':
          viewAllEmployees();
          break;
        case 'add a department':
          addDepartment();
          break;
        default:
          console.log('Invalid choice');
          break;
      }
    });
}

// START INQUIRERER
start();