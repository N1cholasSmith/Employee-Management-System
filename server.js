require('dotenv').config();
const db = require('./db/index.js');
const { prompt } = require('inquirer');
require('console.table');
const util = require('util');

// INITIAL PROMPTS  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const startMenu = async () => {
    try {

        const options = [
            "View all Departments", "View all Roles",
            "View all Employees", "Add a Department",
            "Add a Role", "Add an Employee", 
            "Update an Employee", "More Choices", "Exit"
        ]; 
    
        const initialQuestions = [{
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: options
        }];


        const answers = await prompt(initialQuestions)
    
        switch(answers.choice) {
            case "View all Departments":
                await viewDepartments();
                break;
    
            case "View all Roles":
                await viewRoles();
                break;
    
            case "View all Employees":
                await viewEmployees();
                break;
    
            case "Add a Department":
                await addDepartment();
                break;
            
            case "Add a Role":
                await addRole();
                break;
    
            case  "Add an Employee":
                await addEmployee();
                break;
    
            case "Update an Employee":
                await updateEmployee();
                break;
    
            case "More Choices": 
                await moreChoices();
                break;
    
            default: 
                // Clear inquirer terminal & ends the function
                console.clear();
                process.exit();
            return; 
        };
    } catch(err) {
        console.error("An error occurred:", err)
    }
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
            startMenu();
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

startMenu();
};

// ______________________________________________________________________________________________________________________
// VIEW
// VIEW DEPARTMENTS  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
viewDepartments = () => {
    try {
        db.viewDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.table(departments);
    })
    .then(() => startMenu());
    } catch(err) {
        console.error("An error occurred:", err)
    }
};

// VIEW ROLES  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
viewRoles = () => {
    try {
        db.viewRoles()
    .then(([rows]) => {
        let roles = rows;
        console.table(roles);
    })
    .then(() => startMenu()); 
    } catch(err) {
        console.error("An error occurred:", err);
    };
};

// VIEW EMPLOYEES  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
viewEmployees = () => {
    try {
        db.viewEmployees()   
   .then(([rows]) => {
       let employees = rows;
       console.table(employees);
   })
   .then(() => startMenu());
   } catch(err) {
       console.error("An error occurred:", err);
   };
};

// ______________________________________________________________________________________________________________________
// ADD
// ADD DEPARTMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
addDepartment = () => {

    try {
        const addDepartment = [{
      type: "text",
      name: "department",
      message: "What is the department name?",        
  }];
  prompt(addDepartment)
  .then(({department}) => {
      console.log(department);
      db.createDepartment(department)
      .then(() => {
          console.log(`Added ${department} Department`)
      })
      .then(() => viewDepartments());
  });
  } catch(err) {
      console.error("An error occurred:", err);
  };
};

// ADD ROLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
addRole = () => {

    try {
        const addRole = [
        {
            type: "text",
            name: "id",
            message: "What is the role id? It must be a number",
            validate: (input) => {
                let userInput = parseInt(input);
                return !Number.isNaN(userInput);
            }
            
        },
        {
            type: "text",
            name: "role",
            message: "What is the title?",        
        },
        {
            type: "text",
            name: "salary",
            message: "What is the salary? (Can have up to two decimals)",
            validate: (input) => {
                let userInput = parseInt(input);
                return !Number.isNaN(userInput);
            }
        },
        {
            type: "text",
            name: "departmentId",
            message: "What is the department ID?",
            default: "NULL"
        },
    ];
    prompt(addRole)
    .then((role) => {
        console.log(role);
        db.createRole(role)
        .then(() => {
            console.log(`Added role ${role}`)
        })
        .then(() => viewRoles());
    });
    } catch(err) {
        console.error("An error occurred:", err);
    }
    
};

// ADD EMPLOYEE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
addEmployee = () => {
    try {

        //query db to display all managers 
        db.getManagers()
        .then(([rows]) => {
            let managers = rows;
    
            // query db to display all roles 
            db.viewRoles()
            .then(([roles]) => {
                const managerChoices = [
                    {
                        // In the event that the added employee is a manager
                        name: "No manager",
                        value: "NULL"
                    },
                ]
    
                // Push all managers from db into managerChoice array
                managers.forEach((manager) => {
                    managerChoices.push({
                        name: manager.first_name  + " " + manager.last_name,
                        value: manager.id                  
                    });
                });
    
               const addEmployee = [
                {
                    type: "text",
                    name: "first",
                    message: "What is the employee's first name?",        
                },
                {
                    type: "text",
                    name: "last",
                    message: "What is the employee's last name?",
                },
                {
                    type: "list",
                    name: "roleId",
                    message: "What is the role?",
                    choices: 
                        // for every choice an array 
                    roles.map((role) => {
                        // roles array contains all the coloumns & 
                        return {
                            name: role.title,
                            value: role.id
                        };
                    })
                },
                {
                    type: "list",
                    name: "managerId",
                    message: "Who is the manager?",
                    choices: managerChoices
                },
            ];  
            prompt(addEmployee)
            .then((employee) => {
                console.log(employee);
                db.createEmployee(employee)
                .then(() => {
                    console.log(`Added employee ${employee}`)
                })
                .then(() => viewEmployees());
    
                });
            });
        });
    } catch (err) {
       console.error("An error occurred:", err);
    }
};

// ______________________________________________________________________________________________________________________
// UPDATE
// UPDATE EMPLOYEE DETAILS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function updateEmployee() {
    try {

        const employees =  await db.viewEmployees();
        // console.table(employees[0]);                //-----------------------------------------
    
        const employeeChoices =  employees[0].map((employees) => {
            return { 
                name: employees.first_name + " " + employees.last_name,
                value: employees.id
            }; 
        });
    
        const selectedEmployee = await prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee would you like to update?",
                choices: employeeChoices
            },
        ]);
    
        const roles = await db.viewRoles();
        // console.table(roles[0]);                    //---------------------------------------------
    
        const roleChoices = roles[0].map((role) => {
            return {
                name: role.title,
                value: role.id
            }
        });
    
        const newRole = await prompt([
            {
                type: "list",
                name: "roleId",
                message: "What is their new role?",
                choices: roleChoices
            },
        ]);
        
        // console.table(selectedEmployee)               //------------------------------------------
        // console.table(newRole)                        //------------------------------------------
        await db.updateEmployeeDb(selectedEmployee, newRole)
        await viewEmployees();
    } catch(err) {
        console.error("An error occurred:", err);
    };
};

// ______________________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________________
//  DELETE FUNCTIONS




init();

module.exports = { startMenu }