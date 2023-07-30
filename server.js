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


//function for connection

const connect = async () => {

// Connect to database
const db = await mysql.createConnection(
  {
    host: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);

//Connect to server
  await app.listen(PORT, () => {
    console.log(`Server running on port http://localhost/${PORT}`);
  });

  await start();

  process.exit(0);
}

connect();