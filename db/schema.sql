DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
