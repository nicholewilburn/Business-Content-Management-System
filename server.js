const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// app.use(express.urlencoded({ extended: false }));

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
// app.get('/api/departments', (req, res) => {
  const sql = `SELECT * FROM department`;

  db.promise().query(sql) 
  .then(([e]) => {
    console.table(e);
  })

  // db.query(sql, (err, rows) => {
  //   if (err) {
  //     res.status(500).json({ error: err.message });
  //     return;
  //   }
    // res.json({
    //   message: 'success',
    //   data: rows
    // });
  // });
// });

};

// View All Roles
function viewAllRoles() {
// app.get('/api/roles', (req, res) => {
  const sql = `SELECT * FROM role`;

  db.promise().query(sql) 
  .then(([e]) => {
    console.table(e);
  })

  // db.query(sql, (err, rows) => {
  //   if (err) {
  //     res.status(500).json({ error: err.message });
  //     return;
  //   }
  //   res.json({
  //     message: 'success',
  //     data: rows
  //   });
  // });
// });
};

// View All Employees
app.get('/api/employees', (req, res) => {
  const sql = `SELECT id, first_name, last_name, roles_id, manager_id AS title FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Add Department
function addDepartment() {
// app.post('/api/new-department', (req, res) => {
  // const params = [req.body.dept_name];

  inquirer
  .prompt([
    {
      type: 'input',
      name: 'deptName',
      message: 'What is the name of the new department?',
    }
  ])
  .then (e => {

    const sql = `INSERT INTO department (dept_name) SET ?`;

    db.promise().query(sql, e.deptName) 
    .then(([e]) => {
    console.log(e);
      })

  })

  // db.promise().query(sql, params) 
  // .then(([e]) => {



  //   // console.table(e);
  // })

  // db.query(sql, params, (err, result) => {
  //   if (err) {
  //     res.status(400).json({ error: err.message });
  //     return;
  //   }
  //   res.json({
  //     message: 'success',
  //     data: req.body
  //   });
  // });
// });
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

// LISTEN FOR PORT
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// START INQUIRERER
start();