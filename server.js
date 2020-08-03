const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

const connection = mysql.createConnection ({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mapleb0x",
  database: "employee_trackerdb"
});

connection.connect(err => {
  if (err) throw err;
  console.log(`Connect on thread ${connection.threadId}`)
  initialPrompts();
})

function initialPrompts() {
  inquirer.prompt([
    {
      name: "action",
      message: "What do you want to do?",
      type: "list",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Role",
        "Add Department",
        "EXIT"
      ]
    }
  ]).then(answer => {
    switch (answer.action) {
      case "View All Employees":
        viewAllEmp();
        break;
      case "View All Departments":
        viewDepartment();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Add Role":
        addRole();
        break;
      case "Add Department":
        addDepartment();
        break;
      default:
        connection.end();
        process.exit();
    }
  });
}

function viewAllEmp() {
  const queryString = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id";
  connection.query(queryString, (err, results) => {
    console.log("\n\n List of all employees: \n")
    console.table(results);
  })
  initialPrompts();

}

function viewDepartment() {
  connection.query("SELECT * FROM department", (err, results) => {
    console.log("\n\n List of all departments: \n");
    console.table(results);
  })
  initialPrompts();
}

function viewAllRoles() {
  connection.query("SELECT * FROM role", (err, results) => {
    console.log("\n\n List of all roles: \n");
    console.log(results);
  })
  initialPrompts();
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "Enter employee's first name:",
        type: "input"
      },
      {
        name: "last_name",
        message: "Enter employee's last name:",
        type: "input"
      },
      {
        name: "addRole",
        message: "Enter role for employee:",
        type: "input"
      },
      {
      name: "manager_id",
      message: "Enter if there is a manager id",
      type: "input"
      }
    ]).then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.addRole,
          manager_id: answer.manager_id
        },
        function(err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
          initialPrompts();
        },
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "employee_role",
        message: "Enter employee's role:",
        type: "input"
      },
      {
        name: "salary",
        message: "Enter employee's salary:",
        type: "input"
      },
      {
        name: "department_id",
        message: "Choose a department ID for the employee:",
        type: "input"
      }
    ]).then((answer) => {
      connection.query("INSERT INTO role SET ?", {
        role: answer.employee_role,
        salary: answer.salary,
        department_id: answer.department_id
      })
    })
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        message: "Enter a new department",
        type: "input"
      }
    ]).then(function(answer) {
      connection.query("INSERT INTO department SET ?", {
        name: answer.department
      })
      connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        console.table(results)
        initialPrompts();
      })
    })
}

