CREATE TABLE hospitals (
 hospital_id INT PRIMARY KEY AUTO_INCREMENT, 
name VARCHAR(255) NOT NULL, 
location VARCHAR(255) NOT NULL, 
contact_number VARCHAR(20), 
has_emergency boolean,
capacity INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 

);

CREATE TABLE doctors ( 
doctor_id INT PRIMARY KEY AUTO_INCREMENT, 
first_name VARCHAR(50),
 last_name VARCHAR(50), 
specialization VARCHAR(100), available_from TIME, available_to TIME,
 status ENUM('Available', 'Off Duty'), 
time_per_pateint,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

CREATE TABLE patients ( 
patient_id INT PRIMARY KEY AUTO_INCREMENT, 
first_name VARCHAR(50), last_name VARCHAR(50), 
dob DATE,
 gender ENUM('Male', 'Female', 'Other'), c
ontact_number VARCHAR(15), 
email VARCHAR(100), 
insurance_provider VARCHAR(100),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Ontario heath card number varchar(100)
 );


CREATE TABLE appointments ( 
appointment_id INT PRIMARY KEY AUTO_INCREMENT, 
patient_id INT, doctor_id INT, 
scheduled_time DATETIME, 
check_in_time DATETIME, 
seen_by_doctor_time DATETIME NULL,
 completed_time DATETIME NULL, 
status ENUM('Scheduled', 'Checked In', 'In Progress', 'Completed', 'Cancelled'),
 FOREIGN KEY (patient_id) REFERENCES patients(patient_id), 
FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );