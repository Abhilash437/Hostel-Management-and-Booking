<h1 align="center">
  <br>
  <a href="#"><img src="https://github.com/Abhilash437/Hostel-Management-and-Booking/blob/master/A.png" alt="Markdownify" width="200"></a>
  <br>
  Hostel Management System
  <br>
</h1>

<h4 align="center">Hostel Management System using MySQL, ReactJS and ExpressJS</h4>

<p align="center">
  <a href="https://expressjs.com">
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
  </a>
  <a href="https://www.mysql.com">
    <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white">
  </a>
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
  </a>
  <a href="https://reactjs.org/docs/getting-started.html">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
</p>

![screenshot](https://github.com/Abhilash437/Hostel-Management-and-Booking/blob/master/Admin04.png)
![screenshot](https://github.com/Abhilash437/Hostel-Management-and-Booking/blob/master/Admin01.png)
![screenshot](https://github.com/Abhilash437/Hostel-Management-and-Booking/blob/master/Admin02.png)
![screenshot](https://github.com/Abhilash437/Hostel-Management-and-Booking/blob/master/Admin03.png)
![screenshot](https://github.com/Abhilash437/Hostel-Management-and-Booking/blob/master/Student03.png)
![screenshot](https://github.com/Abhilash437/Hostel-Management-and-Booking/blob/master/Student02.png)
![screenshot](https://github.com/Abhilash437/Hostel-Management-and-Booking/blob/master/Student01.png)

## Key Features

* Admin dashboard
  - Gives the control over what students see in the client website, adding and deleting room, managing hostel mess and salaries of the staffs in the hostel.
* Student client website
  - Displays the room alloted to the student.
  - Allows the student to choose the roooms.
  - Allows the student to book the room when the portal is open.

## How To Use

You will need to have the latest version of NodeJS installed, Express JS and a functional MySQL server running in the computer. Here are the instructions to run the application.

```bash
# Clone this repository
$ git clone https://github.com/amitmerchant1990/electron-markdownify

# Go into the repository
$ cd Hostel-Management-and-Booking

# Go into the server folder
$ cd server

# Install dependencies
$ npm install

# Go to the function that connects the Mysql server and change the password of MySQL server and username

# Open the terminal and connect to the MySQL server
$ mysql -u [username] -p
$ Enter your password: ***********

# Create a database with the name hostelmanagement
<mysql> CREATE DATABASE hostelmanagement;

# Copy the CREATE TABLE statements from the .sql folder present in the server folder and paste it in the <mysql> terminal to create the tables

# After the tables have been created you can exit the terminal
<mysql> exit;
Bye.

# Run the server
$ nodemon index

# or

$ node index.js

#Go into the client folder in the new terminal
$ cd client

# Install dependencies
$ npm install

# Run the app
$ npm start

# The above steps will deploy the admin dashboard in "http://localhost:3000"

# Go to student-server folder in the new terminal
$ cd student-server

# Install the dependencies
$ npm install

# Go to the function that connects the Mysql server and change the password of MySQL server and username

# Run the server
$ nodemon app

#or

$node app.js

# Go to client-student folder in a new terminal
$ cd client-student

# Install the dependencies
$ npm install

# Run the app
$ npm start

# This will prompt you to use another port instead of 3000 since admin dashboard is already running in that port number, type 'y' in the terminal and hit enter

# This should deploy the student website in "http://localhost:3001"
```


<!-- ## Related

[markdownify-web](https://github.com/amitmerchant1990/markdownify-web) - Web version of Markdownify -->

## License

MIT

---
