DROP DATABASE IF EXISTS medical_center;
CREATE DATABASE medical_center;

\c medical_center;


CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  speciality TEXT NOT NULL,
  availability boolean
);

CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  first_visit_symptoms TEXT
 );

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INT NOT NULL REFERENCES patients,
  doctor_id INT NOT NULL REFERENCES doctors,
  date_ DATE NOT NULL
);

CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY, 
  appointment_id INT NOT NULL REFERENCES appointments,
  drug INT REFERENCES drugs,
  doctor_instructions TEXT
);

CREATE TABLE drugs (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  brand TEXT NOT NULL
);



INSERT INTO doctors
    (first_name, last_name, speciality, availability)
VALUES 
    ('Ferdinand', 'de Saussurre', 'traumatologist', TRUE),
    ('Lucy', 'Doe', 'urologist', FALSE),
    ('Mad', 'Max', 'butchery', TRUE);


INSERT INTO patients 
    (first_name, last_name, first_visit_symptoms)
VALUES 
    ('Bob', 'Chow', 'pain in the back'),
    ('Lisa', 'Rowe', 'severe cough'),
    ('Pete', 'Holmes', 'incontrolable laugh');

INSERT INTO appointments
    (patient_id, doctor_id, date_)
VALUES
    (1, 2, '2019-02-12'),
    (1, 3, '2005-02-12'),
    (3, 3, '2021-02-12');

INSERT INTO prescriptions 
    (appointment_id, drug, doctor_instructions)
VALUES 
    (1, 2, 'one every 3 hours'),
    (2, 1, 'take in the morning'),
    (3, 3, '10 every 2 hours');

INSERT INTO drugs
    (description, brand)
VALUES 
    ('heals every muscle', 'Healthy'),
    ('semiconductor energetic for bones', 'Brandy'),
    ('calcium and potasium', 'Calsius');


-- some queries:--
SELECT * 
FROM appointments
JOIN doctors ON appointments.doctor_id=doctors.id
JOIN patients ON appointments.patient_id=patients.id

SELECT * FROM prescriptions 
JOIN drugs ON prescriptions.drug=drugs.id;

