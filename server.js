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
    start();
  })

};

// View All Roles
function viewAllRoles() {
  console.log("viewing all roles");
  const sql = `SELECT * FROM role`;

  db.promise().query(sql) 
  .then(([e]) => {
    console.table(e);
    start();
  })
};

// View All Employees
function viewAllEmployees() {
  console.log("viewing all employees");
  const sql = `SELECT * FROM employee`;

  db.promise().query(sql) 
  .then(([e]) => {
    console.table(e);
    start();
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

//Add a Role
function addRole() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'role_title',
      message: 'What is the name of the new role?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the new role?',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What is the department ID of the new role?',
    }
  ])
  .then (e => {

    const sql = "INSERT INTO role SET ?";

    db.promise().query(sql, e) 
    .then(() => start()
      )

  });
};

//Add an Employee
function addEmployee() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the new employee?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the new employee?',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the role ID of the new employee?',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'What is the manager ID of the new employee?',
    }
  ])
  .then (e => {

    const sql = "INSERT INTO employee SET ?";

    db.promise().query(sql, e) 
    .then(() => start()
      )

  });
};

//Update an Employee Role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: "What is the id of the employee whose role you want to update?",
      },
      {
        type: 'input',
        name: 'new_role',
        message: "What is the new role ID for the employee?",
      },
    ])
    .then(answers => {
      const employeeName = answers.employee_name;
      const newRole = answers.new_role;

      const sql = "UPDATE employees SET role_id = ? WHERE employee_id = ?";

    //   db.promise().query(roleSql, [newRole])
    //     .then(([rows]) => {
    //       if (rows.length === 0) {
    //         console.log("Role not found.");
    //         return;
    //       }
    //       const roleId = rows[0].role_id;

    //       db.promise().query(sql, [roleId, employeeName])
    //         .then(() => {
    //           console.log(`Successfully updated ${employeeName}'s role to ${newRole}`);
    //           start();
    //         })
    //         .catch(error => {
    //           console.error("Error updating employee's role:", error);
    //         });
    //     })
    //     .catch(error => {
    //       console.error("Error fetching role:", error);
    //     });
    // });

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
        case 'add a role':
          addRole();
          break;
        case 'add an employee':
          addEmployee();
          break;
        case 'update an employee role':
          updateEmployeeRole();
        break;
        default:
          console.log('Invalid choice');
          break;
      }
    });
}

// START INQUIRERER
start();