const inquirer = require('inquirer');
const connection = require('./db/connection');

const mainMenu = () => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Update employee managers', 
      'Delete departments', 
      'Exit'
    ],
  }).then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Update employee managers':
        updateEmployeeManagers();
        break;
      case 'Delete departments':
        deleteDepartments();
        break;
      case 'Exit':
        connection.end();
        break;
    }
  });
};

const viewAllDepartments = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewAllRoles = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewAllEmployees = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};
const checkDepartmentId = (departmentId, callback) => {
    const query = 'SELECT * FROM department WHERE id = ?';
    connection.query(query, [departmentId], (err, res) => {
      if (err) throw err;
      if (res.length === 0) {
        console.log('Invalid department ID. Please add the department first.');
        mainMenu();
      } else {
        callback();
      }
    });
  };
  

const addDepartment = () => {
  inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of the new department?',
  }).then((answer) => {
    connection.query('INSERT INTO department SET ?', { name: answer.name }, (err, res) => {
      if (err) throw err;
      console.log('Department added successfully!');
      mainMenu();
    });
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What is the department ID for this role?',
    },
    ]).then((answer) => {
    checkDepartmentId(answer.department_id, () => {
      connection.query('INSERT INTO role SET ?', answer, (err, res) => {
        if (err) throw err;
        console.log('Role added successfully!');
        mainMenu();
      });
    });
  });
};

const checkRoleId = (roleId, callback) => {
    const query = 'SELECT * FROM role WHERE id = ?';
    connection.query(query, [roleId], (err, res) => {
      if (err) throw err;
      if (res.length === 0) {
        console.log('Invalid role ID. Please add the role first.');
        mainMenu();
      } else {
        callback();
      }
    });
  };
  

  const checkManagerId = (managerId, callback) => {
    const query = 'SELECT * FROM employee WHERE id = ?';
    connection.query(query, [managerId], (err, res) => {
      if (err) throw err;
      if (res.length === 0) {
        console.log('Invalid manager ID. Please ensure the manager exists.');
        mainMenu();
      } else {
        callback();
      }
    });
  };
  
  const addEmployee = () => {
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
      if (err) throw err;
  
      const managerChoices = employees.map(emp => ({ name: emp.name, value: emp.id }));
      managerChoices.push({ name: 'None', value: null });
  
      inquirer.prompt([
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
          message: 'What is the role ID for this employee?',
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'Who is the manager for this employee?',
          choices: managerChoices,
        }
      ]).then((answer) => {
        checkRoleId(answer.role_id, () => {
          if (answer.manager_id !== null) {
            checkManagerId(answer.manager_id, () => {
              connection.query('INSERT INTO employee SET ?', answer, (err, res) => {
                if (err) throw err;
                console.log('Employee added successfully!');
                mainMenu();
              });
            });
          } else {
            connection.query('INSERT INTO employee SET ?', answer, (err, res) => {
              if (err) throw err;
              console.log('Employee added successfully!');
              mainMenu();
            });
          }
        });
      });
    });
  };
  
    

const updateEmployeeRole = () => {
    // Fetch existing employees from the database
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
      if (err) throw err;
      
      const employeeChoices = employees.map(emp => ({ name: emp.name, value: emp.id }));
  
      // Fetch existing roles from the database
      connection.query('SELECT id, title FROM role', (err, roles) => {
        if (err) throw err;
        
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
  
        // populate the inquirer choices with real data
        inquirer.prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee\'s role would you like to update?',
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'roleId',
            message: 'Which role do you want to assign to the selected employee?',
            choices: roleChoices,
          }
        ]).then((answer) => {
          connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.roleId, answer.employeeId], (err, res) => {
            if (err) throw err;
            console.log('Updated employee\'s role successfully!');
            mainMenu();
          });
        });
      });
    });
  };
  

const updateEmployeeManagers = () => {
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
      if (err) throw err;
      const employeeChoices = employees.map(emp => ({ name: emp.name, value: emp.id }));
  
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Which employee\'s manager would you like to update?',
          choices: employeeChoices,
        },
        {
          type: 'list',
          name: 'newManagerId',
          message: 'Who is the new manager for the selected employee?',
          choices: [...employeeChoices, { name: 'None', value: null }],
        }
      ]).then((answer) => {
        connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [answer.newManagerId, answer.employeeId], (err, res) => {
          if (err) throw err;
          console.log('Updated employee\'s manager successfully!');
          mainMenu();
        });
      });
    });
  };

  const deleteDepartments = () => {
    connection.query('SELECT id, name FROM department', (err, departments) => {
      if (err) throw err;
      const departmentChoices = departments.map(dep => ({ name: dep.name, value: dep.id }));
  
      inquirer.prompt({
        type: 'list',
        name: 'departmentId',
        message: 'Which department would you like to delete?',
        choices: departmentChoices,
      }).then((answer) => {
        connection.query('DELETE FROM department WHERE id = ?', [answer.departmentId], (err, res) => {
          if (err) throw err;
          console.log('Department deleted successfully!');
          mainMenu();
        });
      });
    });
  };
  
  

mainMenu();
