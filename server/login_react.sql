

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



DROP TABLE `admin`;

CREATE TABLE `admin` (
  `id` int(3) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `admin` (`id`, `email`, `password`, `date`) VALUES
(1,'abhilashhathwar20@gmail.com','$2a$12$KZF2EK6kJOUo3YQUtUQAj.KNNnt4b0rz7vpdfo/gA3LRbRYl9AhmK','2023-01-07 09:51:38');

ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `admin`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;



DROP TABLE `students`;

CREATE TABLE `students` (
  usn varchar(20) NOT NULL,
  studentName varchar(100) NOT NULL,
  studentEmail varchar(100) NOT NULL,
  branch varchar(100) NOT NULL,
  semester varchar(100) NOT NULL,
  studentAddress varchar(500) NOT NULL,
  phoneNo varchar(20) NOT NULL,
  aadhar varchar(20) NOT NULL,
  guardianName varchar(100) NOT NULL, 
  guardianPhno varchar(20) NOT NULL,
  FOREIGN KEY(usn) REFERENCES users(usn) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `students`
  ADD PRIMARY KEY (`usn`);


DROP TABLE `rooms`;

CREATE TABLE `rooms` (
  roomNo int NOT NULL,
  noOccupants int NOT NULL,
  bookingStatus BIT DEFAULT NULL,
  price bigint NOT NULL
);

ALTER TABLE `rooms`
  ADD PRIMARY KEY (`roomNo`);


DROP TABLE `hostelBooking`;

CREATE TABLE `hostelBooking` (
  roomId int NOT NULL,
  usn varchar(100) NOT NULL,
  bookingDate date NOT NULL,
  utrNo varchar(100) NOT NULL,
  FOREIGN KEY(usn) REFERENCES students(usn) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(roomId) REFERENCES rooms(roomNo) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `hostelBooking`
  ADD PRIMARY KEY (`usn`);

COMMIT;


CREATE TABLE `staffs` (
  staffId varchar(20) NOT NULL,
  staffName varchar(20) NOT NULL,
  staffType varchar(20) NOT NULL,
  staffPhNo varchar(20) NOT NULL,
  staffAddress varchar(20) NOT NULL,
  staffSalaryPerMonth bigint NOT NULL
);

ALTER TABLE `staffs`
  ADD PRIMARY KEY (`staffId`);

COMMIT;

CREATE TABLE `mess` (
  weekDay varchar(20) NOT NULL,
  breakfast varchar(100) NOT NULL,
  lunch varchar(100) NOT NULL,
  snacks varchar(100) DEFAULT NULL,
  dinner varchar(100) DEFAULT NULL,
  price bigint NOT NULL
);

ALTER TABLE `mess`
  ADD PRIMARY KEY (`weekDay`);

COMMIT;

CREATE TABLE `users` (
  usn varchar(20) NOT NULL,
  pass varchar(20) NOT NULL
);

ALTER TABLE `users`
  ADD PRIMARY KEY (`usn`);

COMMIT;

DELIMITER $$

CREATE TRIGGER `user_insert_students`
AFTER INSERT ON `users`
FOR EACH ROW
BEGIN
  DECLARE Userusn varchar(20);
  SELECT usn INTO Userusn from `users` where usn = NEW.usn;
  INSERT INTO `students` VALUES(Userusn,"new","new","new","new","new","new","new","new","new");
END;
$$
DELIMITER ;