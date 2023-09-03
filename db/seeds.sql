-- Seed data for department table
INSERT INTO department (name) VALUES
('Engineering'),
('HR'),
('Finance');

-- Seed data for role table
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 90000, 1),
('HR Manager', 85000, 2),
('Accountant', 80000, 3);

-- Seed data for employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Emily', 'Johnson', 3, 1);
