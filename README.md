# CSS326 Database Programming Laboratory

My lab work for **CSS326 Database Programming Laboratory** at Sirindhorn International Institute of Technology (SIIT), Thammasat University. This is Year 3, Term 1 (2026).

Over the term the course goes from plain JavaScript to a full Node.js + Express + MySQL web app. Along the way it covers transactions, indexing, security, stored routines, triggers and JSON data.

## Overview

| Area | What's used |
|---|---|
| Language | JavaScript (Node.js, CommonJS) |
| Database | MySQL 8, designed and queried in MySQL Workbench |
| DB driver | [`mysql2/promise`](https://www.npmjs.com/package/mysql2) |
| Web server | [Express](https://expressjs.com/) |
| Front-end | Static HTML/CSS/JS calling the API with `fetch()` |
| Testing APIs | Browser, `curl`, `requests.http` (VS Code REST Client) / Postman |

Two example databases come back again and again:

- **University** (in-class exercises): `students`, `courses`, `enrolments`. This is a many-to-many relationship that goes through the `enrolments` junction table.
- **Bookstore** (homework assignments): `books`, `customers`, `orders`.

So most weeks follow the same pattern: learn a concept on the university schema in class, then apply it on your own to the bookstore schema in the homework.

### Learning path

```
JS basics → data modelling (ERD) → SQL CRUD & queries → Node ↔ MySQL
   → Express REST API → MVC structure (routers/controllers/pool)
   → related data (JOINs, nested routes) → transactions
   → performance & security → stored routines, triggers & JSON
```

## Repository layout

Each week has two folders:

- `WeekN/` holds the in-class lab exercises.
- `WeekN-HW/` holds the homework (lab assignment) for that week.

Later weeks also include the lab sheet PDFs and the instructor's starter project. Each starter comes as a `.zip` and as an extracted folder, and each starter has its own `README.md` with setup steps and a route table.

There are no Week 7 folders, and Week 8 has no `-HW` folder.

## Week by week

### Week 1: JavaScript fundamentals
- **Lab** ([Week1/](Week1/)): first Node script, variables, `if/else` grading, `for` loops, a `setInterval` countdown, catching a `TypeError` with `try/catch`, and a small in-memory student "database" using array methods (`push`, `find`, `filter`).
- **HW** ([Week1-HW/](Week1-HW/)): nine small tasks (`task1.js` … `task9.js`), including template strings, functions, a times table and a countdown.

### Week 2: Data modelling in MySQL Workbench
- **Lab** ([Week2/](Week2/)): designing a first schema (`students`, `course`, `enrollments`) and exporting it as a SQL dump.
- **HW** ([Week2-HW/](Week2-HW/)): an EER model built in MySQL Workbench (`.mwb`).

### Week 3: SQL CRUD & querying
- **Lab** ([Week3/](Week3/)): `CREATE TABLE`, `INSERT`/`UPDATE`/`DELETE`, filtering and sorting, `GROUP BY` / `HAVING`, and `JOIN`s across students, courses and enrolment.
- **HW** ([Week3-HW/](Week3-HW/)): the **bookstore** schema with foreign keys from `orders` to `customers` and `books`, plus CRUD and query tasks and an ER diagram.

### Week 4: Connecting Node.js to MySQL
- **Lab** ([Week4/](Week4/)): `mysql2/promise` connections, `SELECT`, parameterised queries with `?` placeholders (`execute`), reading `insertId` and `affectedRows`, and cleaning up with `try/catch/finally` and `conn.end()`.
- **HW** ([Week4-HW/](Week4-HW/)): the same ideas on the bookstore database (`ex1` … `ex8`). `ex8.js` combines every task into one script.

### Week 5: Building a REST API with Express
- **Lab** ([Week5/](Week5/)): first Express routes (`GET /`, `/hello`, `/data`), `GET /students` and `GET /students/:id` from MySQL, `POST` with `express.json()`, and serving a static front-end from `public/`.
- **HW** ([Week5-HW/](Week5-HW/)): a bookstore API in a single `app.js`, with list/search/create routes plus a simple HTML page.

### Week 6: Structuring a full-stack CRUD app
- **Lab** ([Week6/](Week6/), lab sheet: `CSS326-Lab 6.pdf`): separation of concerns, a shared **connection pool** (`db.js`), **routers** and **controllers**, input validation returning `400`, full CRUD with `PUT`/`DELETE`, and a front-end that lists, adds and deletes with `fetch()`.
- **HW** ([Week6-HW/](Week6-HW/), `CSS326-Lab_Assignment_06.pdf`): the same structure on the bookstore. Tasks cover `getOne` (with 404), `create` (validation), `update`, `remove`, and the front-end.

### Week 8: Working with related data
- **Lab** ([Week8/](Week8/), `CSS326-Lab_Sheet_08.pdf`): multi-table `JOIN`s, `LEFT JOIN` with `GROUP BY`, subqueries (`IN` / `NOT IN`), **views**, nested resource routes such as `/students/:id/courses`, turning flat JOIN rows into nested JSON, and adding/removing many-to-many links safely. Includes the official answer key (`Lab8_Exercise_Answer_Key.pdf`, `Lab8_Exercise_Solution.zip`).

### Week 9: Transactions
- **Lab** ([Week9/](Week9/), `CSS326-Lab_9.pdf`, `CSS326-Lab_Sheet_09.pdf`): course enrolment with limited `seats`. The steps are: rewrite enrol/un-enrol as atomic transactions (`getConnection` → `beginTransaction` → guarded `UPDATE … AND seats > 0` → `INSERT` → `commit`, with `rollback` on error and `release` in `finally`); return `201` / `409` / `500`; then prove it works with a "last-seat race" script (`npm run race`).
- **HW** ([Week9-HW/](Week9-HW/), `CSS326-Lab_Assignment_09.pdf`): bookstore orders that decrease `stock` atomically. You place and cancel orders as transactions in `orderController.js`. Q1 is done in Workbench.

### Week 10: Performance & security
- **Lab** ([Week10/](Week10/), `CSS326-Lab_10.pdf`, `CSS326-Lab_Sheet_10.pdf`): runs on 100,000 extra test rows. Topics:
  1. **Indexes and `EXPLAIN`**: measuring search speed before and after adding an index.
  2. **Least privilege**: a dedicated `university_app` MySQL user instead of root.
  3. **SQL injection**: replacing string-built SQL with `?` placeholders, moving credentials into `.env` with `dotenv`, and returning clean error messages.
  4. **Query tuning.**
- **HW** ([Week10-HW/](Week10-HW/), `CSS326-Lab_Assignment_10.pdf`): the same on a bulk bookstore (50k books, 100k orders). Covers indexing the author search, `EXPLAIN` on a join (Q1–Q3), fixing injection (Q5), and an app user plus `.env` (Q6–Q7).

### Week 11: Stored routines, triggers & NoSQL
- **Lab** ([Week11/](Week11/)):
  - A stored procedure `enrol_student`, a function `course_count`, and an `OUT` parameter.
  - `AFTER INSERT` / `AFTER DELETE` triggers that keep `courses.seats` up to date and `SIGNAL 'course is full'`.
  - Updating the app to `CALL` the procedure, so a seat isn't taken twice.
  - A **JSON column** for course details, with filtering by day.
  - Optionally, a document store for course reviews.
- **HW** ([Week11-HW/](Week11-HW/), `CSS326-Lab_Assignment_11.pdf`): the bookstore version.
  - `place_order` procedure, `order_count` function, and stock-keeping triggers (Q1–Q4).
  - Rewiring the API to use them (Q5).
  - A JSON column for book `format` / `pages` with a format filter (Q6–Q7).

## Running the code

**Prerequisites:** Node.js and a local MySQL 8 server (MySQL Workbench is recommended).

**Weeks 1–5** are single scripts. Install the dependencies at the repo root once, then run any script:

```bash
npm install
```

```bash
node Week4/ex1.js
```

For Weeks 4–5, first create the database by importing that week's `.sql` dump in Workbench. Then check the connection settings (`host`, `user`, `password`, `database`) at the top of the script.

**Weeks 6–11** are self-contained projects. Open the project folder, then:

1. Run that week's SQL setup script(s) in MySQL Workbench. The starter `README.md` says which files to run and in what order.
2. Put your MySQL login in `db.js`. From Week 10 on, it goes in `.env` instead (copy `.env.example`).
3. Install and start:

   ```bash
   npm install
   ```

   ```bash
   npm run dev
   ```

   Week 6 uses `npm start` or `node app.js` instead.

4. Open http://localhost:3000 for the front-end. You can also send the ready-made requests in `requests.http`.

> `.env` files hold real passwords and are git-ignored. Don't commit them.
