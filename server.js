const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//inquirer function
function start() {

    inquirer
      .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['view all departments','view all roles', 'view all employees', 'add a department','add a role','add an employee','update an employee role']
        }
      ])
      .then((data) => {
    
        const { action } = data;

        console.log(action);
    
      });
    
    }


// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);

//Connect to server
 app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });


//View All Departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT id, dept_name AS title FROM department`;
    
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

//View All Roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT id, title, department_id, salary AS title FROM role`;
    
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

 //View All Employees
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
 
  //Add Department
  app.post('/api/new-department', ({ body }, res) => {
    const sql = `INSERT INTO department (dept_name)
      VALUES (?)`;
    const params = [body.dept_name];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });
  