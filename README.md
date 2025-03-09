# Task Manager Application

## backend configurations

### clone the repository
git clone (url) <br>
cd (project-folder)

### create .env file

PORT = port_number <br>
DB_HOST= localhost <br>
DB_USER= username<br>
DB_PASSWORD= password<br>
DB_NAME= database_name<br>

**NOTE : mention the .env file in .gitignore file**

### create database

CREATE TABLE tasks ( <br>
    id INT AUTO_INCREMENT PRIMARY KEY, <br>
    title VARCHAR(255) NOT NULL,<br>
    description TEXT,<br>
    status boolean,<br>
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP<br>
);

### To run, 

npm install<br>
npm run dev