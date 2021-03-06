DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

-- Apply code to company database
USE company_db;

-- Creates the departments table
CREATE TABLE departments (
    -- Auto increment id integer, set as primary key
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Sets department_name variable characters to 30 
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    -- Sets salary 20 digits and 2 decimals 
    salary DECIMAL(20,2) NOT NULL, 
    department_id INT, 
    -- Department ID relates to ID in departments table 
    FOREIGN KEY (department_id)
            REFERENCES departments(id)
            ON DELETE CASCADE 
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE, 
    manager_id INT,
    FOREIGN KEY (manager_id) 
        REFERENCES employees(id)
        ON DELETE SET NULL
);