CREATE TABLE IF NOT EXISTS students (
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(100) NOT NULL,
`major` VARCHAR(100),
`year` INT,
PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS courses (
`id` INT NOT NULL AUTO_INCREMENT,
`title` VARCHAR(100) NOT NULL,
`credit` CHAR(2),
PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS enrolment (
`id` INT NOT NULL AUTO_INCREMENT,
`student_id` INT,
`course_id` INT,
`grade` CHAR(2),
PRIMARY KEY (`id`));

-- INSERT INTO students (name, major, year) VALUES
-- 	('Somchai','Software Engineering',2),
-- 	('Suda','Data Science',3),
-- 	('Anan','Software Engineering',1),
-- 	('Nicha','Information Technology',4),
-- 	('Krit','Data Science',2),
-- 	('Ploy','Software Engineering',3),
-- 	('Tanya','Information Technology',1),
-- 	('Wichai','Data Science',4);

-- INSERT INTO students (name, major, year) VALUES
-- 	('Som','Software Engineering',4),
-- 	('Apple','Information Technology',2),
-- 	('Pear','Software Engineering',3),
-- 	('Cherry','Data Science',3);

-- INSERT INTO courses (title, credit) VALUES
-- ('Database Programming',3),('Web
-- Development',3),('Algorithms',4),
-- ('Statistics',3),('Operating Systems',4);

-- INSERT INTO enrolment (student_id, course_id, grade) VALUES
-- (1,1,'A'),(1,2,'B+'),(2,1,'A'),(2,4,'B'),(3,2,'C+'),(4,3,'B+'),
-- (4,5,'A'),(5,1,'B'),(5,4,'A'),(6,2,'B+'),(6,3,'C'),(7,5,'B'),(8,1,'A'),(8,4,'A'),
-- (9,5,'A'),(9,1,'B'),(9,3,'A'),(10,2,'B'),(11,3,'C'),(11,5,'B'),(12,1,'A'),(12,4,'B+');
    
SELECT * FROM students;

-- SHOW Tables;
-- DESCRIBE students;
-- DESCRIBE courses;
-- DESCRIBE enrolment;

-- Ex 2

SELECT name, major FROM students;

SELECT name, major FROM students
WHERE major = 'Data Science';

SELECT name, year FROM students
WHERE year BETWEEN 2 AND 3
ORDER BY name;

SELECT name FROM students
WHERE name LIKE '%a';

SELECT name, year FROM students
WHERE year >= 3
LIMIT 3;

-- Ex 3

SELECT COUNT(*) AS num_students FROM students;

SELECT major, COUNT(*) AS num_students FROM students
GROUP BY major;

SELECT major, COUNT(*) AS num_students FROM students
GROUP BY major
HAVING COUNT(*) >= 3;

SELECT major, COUNT(*) AS num_students FROM students
GROUP BY major
HAVING COUNT(*) >= 3
ORDER BY COUNT(*) DESC;

-- Ex 4

SELECT * FROM students
WHERE id = 1;
UPDATE students SET major = 'Data Science'
WHERE id = 1;

SELECT * FROM students
WHERE year = 1;
UPDATE students SET year = year + 1
WHERE year = 1;

SELECT * FROM students
WHERE name = 'Cherry';
DELETE FROM students
WHERE name = 'Cherry';

SELECT * FROM students;
SELECT * FROM enrolment;
SELECT * FROM courses;

-- Ex 5

SELECT s.name, c.title
FROM enrolment e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id;

SELECT s.name, c.title
FROM enrolment e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
WHERE s.id = 9;

SELECT s.name, c.title
FROM enrolment e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
ORDER BY s.name;

SELECT s.name, COUNT(*) AS num_course
FROM enrolment e
JOIN students s ON e.student_id = s.id
GROUP BY e.student_id;







