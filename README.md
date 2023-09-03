# EMPLOYEE-TRACKER

## Table of Contents

1. [Description](#Description)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [Features](#Features)
5. [Tech Stack](#Tech-Stack)
6. [Contribute](#Contribute)
7. [License](#License)

## Description

Employee Tracker is a CLI (Command Line Interface) application built with Node.js, MySQL, and Inquirer. It allows business owners to manage essential details of their workforce by tracking roles, departments, and individual employees within the company.

Example Demo Vide: https://sendspark.com/share/o2bmyp16viwrh4a4

## Installation

1. To get started, clone this repository to your local machine.

```bash
git clone https://github.com/rameenq/EMPLOYEE-TRACKER.git
```

2. Navigate to the cloned repository.

```bash
cd EMPLOYEE-TRACKER
```

3. Install the necessary npm packages.

```bash
npm install
```

4. Finally, make sure MySQL is running and execute the schema file to create the required database and tables.

```bash
mysql -u root -p < db/schema.sql
```

5. (Optional) Populate the database with sample data.

```bash
mysql -u root -p < db/seeds.sql
```

## Usage

Run the application by entering the following command:

```bash
node index.js
```

Follow the prompts to:

- Add departments, roles, and employees.
- View departments, roles, and employees.
- Update roles and employee details.

## Features

- User-friendly CLI interface.
- Ability to add new departments, roles, and employees.
- Ability to view existing departments, roles, and employees.
- Ability to update existing roles and employee details.

## Tech Stack

- Node.js
- MySQL
- Inquirer.js
- JavaScript

## Contribute

Contributions are welcome! Fork this repo, create a new branch, and submit a pull request. For major changes, please open an issue first to discuss what you'd like to add.

## License

This project is licensed under the MIT License.

---
