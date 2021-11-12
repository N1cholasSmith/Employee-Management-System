require('dotenv').config();
// const db = require('./db/connection.js');
const inquirer = require('inquirer');
require('console.table');
const util = require('util');




// Sets Port environment to variable PORT or 3001 
const PORT = process.env.PORT || 3001;

// ..............................................................................
const mysql = require('mysql2');
const { allowedNodeEnvironmentFlags } = require('process');

// Connect to database 
const db = mysql.createConnection(
    {
        // MySQL username,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: "p@ssword",
      database: process.env.DB_NAME
    },
    console.log(`Connected to the company_db database.`)
);

db.connect(err => {
    if (err) throw err;
});

// module.exports = db; 
// ........................................................................................................
db.query = util.promisify(db.query)

// INITIAL PROMPTS  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
userPrompts = () => {
    inquirer.prompt({
        type: "list",
        message: "Welcome to your Employee Management System, what would you like to do?",
        choices: ["View all Departments", "View all Roles",
                "View all Employees", "Add a Department",
                "Add a Role", "Add an Employee", "Update an Employee", "Other Options?"],
        name: "userChoice"
    }).then((choices) => {
        if(choices.userChoice === "View all Departments"){
            viewAllDepartments();
        } else if (choices.userChoice === "View all Roles"){
            viewAllRoles();
        } else if (choices.userChoice === "View all Employees"){
            viewAllEmployees();
        } else if (choices.userChoice === "Add a Department"){
            addDepartment();
        } else if (choices.userChoice === "Add a job Role"){
            addRole();
        } else if (choices.userChoice === "Add an Employee"){
            addEmployee();
        } else if (choices.userChoice === "Update an Employee"){
            updateEmployee();
        } else if (choices.userChoice === "Other Options?"){
            moreChoices();
        }
    })
};

// MORE CHOICES/PROMPTS  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
moreChoices = () => {
    inquirer.prompt({
        type: "list",
        message: "Other Options:",
        choices: ["Update Employee Manager", "View Employees by Manager",
                "View Employees by Departments", "Delete Department","Delete Role","Delete Employee",
                "View the Total Utlizied Budget of a Department", "Go Back"],
        name: "userChoice"
    }).then((choices) => {
        // Each choice will lead to a different function 
        if(choices.userChoice === "Update Employee Manager"){
            updateEmployeeManager();
        } else if (choices.userChoice === "View Employees by Manager"){
            viewEmployeeManager();
        } else if (choices.userChoice === "View Employees by Departments"){
            viewEmployeeDepartments();
        } else if (choices.userChoice === "Delete Department"){
            deleteDepartment();
        } else if (choices.userChoice === "Delete Role"){
            deleteRole();
        } else if (choices.userChoice === "Delete Employee"){
            deleteEmployee();
        } else {
            userPrompts();
        }
    })
};

// INIT FUNCTION  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function init () {
    console.log(`

    ___________________________________________________________________________________________________________

                                    THE PROFESSIONAL EMPLOYEE MANAGEMENT SYSTEM

                        Please input your Companies information via prompts to dynamically 
                           generate, update and delete to/from your Companies Database.
    ___________________________________________________________________________________________________________
    
    `)

userPrompts();
};

// ______________________________________________________________________________________________________________________
// VIEW
// VIEW DEPARTMENTS  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
viewAllDepartments = () => {
    db.query("Select * from departments") 
        .then (data => {
            console.table(data)
        })
}
// VIEW ROLES  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
viewAllRoles = () => {
    db.query("Select * from roles") 
        .then (data => {
            console.table(data)
        })
}
// VIEW EMPLOYEES  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
viewAllEmployees = () => {
    db.query("Select * from employees") 
        .then (data => {
            console.table(data)
        })
}
// ______________________________________________________________________________________________________________________
// ADD
// ADD DEPARTMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
addDepartment = () => {

    const addDepartment = [
        {
            type:"text",
            message:"What Department would you like to add?",
            name: "departmentAdd"
        },
        {
            type:"text",
            message:"What is the Department ID?",
            name: "departmentID"
        }
    ];
    prompt(addDepartment)
    .then((department)=> {
        db.createDepartment(department)
        .then(() => {
            console.log(`Add Department ${department}`)
        })
        .then(() => {
            userPrompts();
        })
    })

}
// ADD ROLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
addRole = () => {

    const addRole = [
        {
            type:"text",
            message:"What is the role ID?",
            name: "roleID"
        },
        {
            type:"text",
            message:"What is the Title of the role?",
            name: "roleTitle"
        },
        {
            type:"text",
            message:"What is the Salary for this role?",
            name: "roleSalary"
        },
        {
            type:"text",
            message:"What is the Salary for this role?",
            name: "roleDepartmen"
        },
    ]
    prompt(addRole)
    .then((role)=> {
        db.createRole(role)
        .then(() => {
            console.log(`Add ${role} Role`)
        })
        .then(() => {
            userPrompts();
        });
    });
    
}
// ADD EMPLOYEE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
addEmployee = () => {

    const addEmployee = [
        {
            type:"text",
            message:"What is the Employees ID?",
            name: "employeeID"
        },
        {
            type:"text",
            message:"Employees FIRST Name?",
            name: "employeeFirstName"
        },
        {
            type:"text",
            message:"Employees LAST Name?",
            name: "employeeLastName"
        },
        {
            type:"text",
            message:"Employees ROLE ID?",
            name: "employeeRoleID"
        },
        {
            type:"text",
            message:"Employees MANAGER ID?",
            name: "employeeMangerID"
        }
    ]
    prompt(addEmployee)
    .then((employee)=> {
        db.createRole(employee)
        .then(() => {
            console.log(`Add Employee - ${employee}`)
        })
        .then(() => {
            userPrompts();
        });
    });
}
// ______________________________________________________________________________________________________________________
// UPDATE
// UPDATE EMPLOYEE DETAILS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// ______________________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________________


init();