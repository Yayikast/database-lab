-- Exercise 2: A least-privilege app user
-- Database: css326_lab10
-- PART A: run this part while connected as root (your admin connection).
USE css326_lab10;

-- Step 1. Create a user just for the app.
--         (the same password goes into DB_PASS in the .env file, Exercise 3)
CREATE USER 'university_app'@'localhost' IDENTIFIED BY 'Univ_App_Lab10!';

-- Step 2. Grant it only SELECT, INSERT, UPDATE and DELETE on css326_lab10.
GRANT SELECT, INSERT, UPDATE, DELETE
  ON css326_lab10.* TO 'university_app'@'localhost';
-- no DROP, no GRANT OPTION, no access to other databases

-- Step 3. Check what the user is allowed to do.
SHOW GRANTS FOR 'university_app'@'localhost';
-- expect two lines:
--   GRANT USAGE ON *.* TO `university_app`@`localhost`
--   GRANT SELECT, INSERT, UPDATE, DELETE ON `css326_lab10`.* TO `university_app`@`localhost`

-- Step 4. Make a scratch table that we will try to drop as the app user later.
CREATE TABLE IF NOT EXISTS drop_test (id INT);

-- Step 5. Take DELETE away, check again, then give it back.
REVOKE DELETE ON css326_lab10.* FROM 'university_app'@'localhost';
SHOW GRANTS FOR 'university_app'@'localhost';   -- now SELECT, INSERT, UPDATE only
GRANT DELETE ON css326_lab10.* TO 'university_app'@'localhost';
SHOW GRANTS FOR 'university_app'@'localhost';   -- back to SELECT, INSERT, UPDATE, DELETE


-- PART B: in Workbench, create a NEW connection (the + next to MySQL Connections)
-- with Username = university_app, open it, and run the lines below there.
SELECT CURRENT_USER();                 -- should show university_app@localhost
SELECT * FROM css326_lab10.students;   -- should work
DROP TABLE css326_lab10.drop_test;     -- should FAIL with ERROR 1142 (DROP command denied)
-- (We use the scratch table drop_test so nothing important is lost if you run
--  this line in the root connection by mistake.)

-- PART C: point the app at the new user (see Exercise 3: db.js and .env), restart it,
-- and confirm the app still works.
