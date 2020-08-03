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
        "Remove Employee",
        "Update Employee Role",
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
      case "Remove Employee":
        removeEmployee();
        break;
      case "Update Employee Role":
        updateEmpRole();
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
    
  })
}