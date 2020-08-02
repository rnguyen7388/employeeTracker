INSERT INTO department(name) VALUES ("Sales");
INSERT INTO department(name) VALUES ("Engineering");
INSERT INTO department(name) VALUES ("Finance");
INSERT INTO department(name) VALUES ("Legal");

INSERT INTO role(title, salary, department_id) VALUES("Sales Lead", "100000", "1");
INSERT INTO role(title, salary, department_id) VALUES("Salesperson", "80000", "1");
INSERT INTO role(title, salary, department_id) VALUES("Lead Engineer", "150000", "2");
INSERT INTO role(title, salary, department_id) VALUES("Software Engineer", "120000", "2");
INSERT INTO role(title, salary, department_id) VALUES("Accountant", "125000", "3");
INSERT INTO role(title, salary, department_id) VALUES("Legal Team Lead", "250000", "4");
INSERT INTO role(title, salary, department_id) VALUES("Lawyer", "190000", "4");

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Moses", "Mason", "1", null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Louie", "Wicks", "2", 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Norman", "Krueger", "2", 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Stacey", "Malone", "3", "2");
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Malik", "Long", "3", "1");
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Adam", "Parsons", "4", "2");
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Megan", "Rosales", "4", "1");