INSERT INTO department (name, id)
VALUE ("Marketing", 1);
INSERT INTO department (name, id)
VALUE ("Human Resources", 2);
INSERT INTO department (name, id)
VALUE ("Sales", 3);
INSERT INTO department (name, id)
VALUE ("Finance", 4);
INSERT INTO department (name, id)
VALUE ("Development", 5);

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Software Developer", 120000, 5);
INSERT INTO role (title, salary, department_id)
VALUE ("HR Representative", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Associate", 40000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 95000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Analyst", 50000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Greg", "Spider", 5, NULL);
INSERT INTO employee  (first_name, last_name, role_id, manager_id)
VALUE ("Joe", "Italian", 2, NULL);
INSERT INTO employee  (first_name, last_name, role_id, manager_id)
VALUE ("Jen", "Jennington", 3, NULL);
INSERT INTO employee  (first_name, last_name, role_id, manager_id)
VALUE ("Chris", "Lockington", 1, NULL);
INSERT INTO employee  (first_name, last_name, role_id, manager_id)
VALUE ("Jayce", "Peetroo", 4, NULL);
