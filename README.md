# CSS326 Database Programming Laboratory

Lab work for **CSS326 Database Programming Laboratory** at Sirindhorn International Institute of Technology (SIIT), Thammasat University · **Aug – Nov 2026**

## Course summary

Database programming for web applications, from relational design and SQL to a Node.js/Express REST API backed by MySQL.

- **Design and SQL:** ER modelling, keys and constraints, many-to-many junction tables, joins, aggregation, subqueries and views.
- **Application layer:** Express REST APIs with routers, controllers, a shared connection pool, input validation and correct HTTP status codes.
- **Data integrity:** ACID transactions with commit/rollback and guarded updates, verified under concurrent requests.
- **Security:** parameterised queries against SQL injection, least-privilege database users, and credentials kept in environment variables.
- **Performance:** index design, validated with `EXPLAIN` on datasets of 100,000+ rows.
- **Server-side logic:** stored procedures, functions, triggers and JSON columns.

Each concept was applied twice: in class on a **university** schema (`students`, `courses`, `enrolments`), then independently on a **bookstore** schema (`books`, `customers`, `orders`) as the weekly assignment.

| Area | Tools |
|---|---|
| Language | JavaScript (Node.js) |
| Database | MySQL 8, MySQL Workbench (EER modelling, queries, `EXPLAIN`) |
| Back-end | Express, [`mysql2/promise`](https://www.npmjs.com/package/mysql2), `dotenv` |
| Front-end | HTML/CSS/JS with `fetch()` and the DOM |
| API testing | Browser, `curl`, VS Code REST Client (`requests.http`) |

```
JS basics → data modelling (ERD) → SQL CRUD & queries → Node ↔ MySQL
   → Express REST API → routers / controllers / pool → SQL practice
   → related data (JOINs, views, nested routes) → transactions
   → performance & security → stored routines, triggers & JSON
```

## Week by week

### Week 1: JavaScript fundamentals
- Variables, `if/else`, loops, functions, arrow functions and template strings.
- Array methods (`push`, `find`, `filter`) on a small in-memory student list.
- Timers with `setInterval`, and handling errors with `try/catch`.
- Work: [Week1/](Week1/), [Week1-HW/](Week1-HW/) (nine small tasks)

### Week 2: Data modelling
- Turning requirements into an **ER diagram**: entities, attributes, primary and foreign keys.
- 1:N and M:N relationships, and why M:N needs a **junction table**.
- Building the model in MySQL Workbench and exporting it as SQL.
- Work: [Week2/](Week2/), [Week2-HW/](Week2-HW/) (EER model, `.mwb`)

### Week 3: SQL CRUD and queries
- `CREATE TABLE` with constraints: `PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL`, `UNIQUE`.
- `INSERT`, `UPDATE` and `DELETE`, and why a `WHERE` clause matters.
- Filtering, sorting, `GROUP BY` / `HAVING` with aggregates, and `JOIN`s across tables.
- Work: [Week3/](Week3/), [Week3-HW/](Week3-HW/) (bookstore schema + ER diagram)

### Week 4: Connecting Node.js to MySQL
- Opening connections with `mysql2/promise` and `async/await`.
- **Parameterised queries** with `?` placeholders instead of building SQL strings.
- Reading `insertId` and `affectedRows`, and closing connections in `finally`.
- Work: [Week4/](Week4/), [Week4-HW/](Week4-HW/) (`ex1` … `ex8`)

### Week 5: REST APIs with Express
- How HTTP works: URLs, methods (GET/POST/PUT/DELETE) mapped to CRUD, JSON responses.
- Express routes, `req.params` vs `req.query` vs `req.body`, and middleware (`express.json()`, `express.static`).
- Serving a static front-end that calls the API with `fetch()`.
- Work: [Week5/](Week5/), [Week5-HW/](Week5-HW/) (bookstore API)

### Week 6: Structuring a full-stack CRUD app
- **Separation of concerns**: `db.js` (connection pool), `routes/`, `controllers/`, `public/`.
- Full CRUD, with input validation before touching the database.
- Returning the right status codes: `200`, `201`, `204`, `400`, `404` and `500`.
- A front-end that lists, adds and deletes records and refreshes the page data.
- Work: [Week6/](Week6/), [Week6-HW/](Week6-HW/)

### Week 7: SQL practice
- SQL command types: DDL (structure), DML (data), DCL (permissions) and TCL (transactions).
- `DISTINCT`, `LIMIT`, `BETWEEN`, `LIKE`, `CONCAT`, and handling `NULL` correctly with `IS NULL`.
- Practiced in MySQL Workbench; no folder in this repository.

### Week 8: Working with related data
- Multi-table `JOIN`s, and `LEFT JOIN` + `GROUP BY` to include rows with zero matches.
- Subqueries with `IN` / `NOT IN`, and **views** to save common queries.
- Nested API routes such as `/students/:id/courses`, with flat JOIN rows turned into nested JSON.
- Adding and removing many-to-many links safely (`409` for duplicates).
- Work: [Week8/](Week8/)

### Week 9: Transactions
- **ACID** and why a multi-step change has to succeed or fail as one unit.
- The transaction pattern in Node: `getConnection` → `beginTransaction` → `commit`, with `rollback` on error and `release` in `finally`.
- Guarded updates (`UPDATE … WHERE seats > 0`) to prevent overselling, verified with a concurrent "last-seat race" script.
- Work: [Week9/](Week9/), [Week9-HW/](Week9-HW/) (orders that reduce book stock atomically)

### Week 10: Performance and security
- **Indexes**: measuring a search before and after with `EXPLAIN`, and which conditions stop an index from being used.
- **SQL injection**: seeing an attack work on string-built SQL, then fixing it with placeholders.
- **Least privilege**: a dedicated app user with only the permissions it needs, instead of `root`.
- Keeping credentials in `.env` with `dotenv`, and returning clean error messages.
- Work: [Week10/](Week10/), [Week10-HW/](Week10-HW/) (bookstore with 50k books and 100k orders)

### Week 11: Stored routines, triggers and JSON
- **Stored procedures** (`IN`/`OUT` parameters) and **functions**, called from Node with `CALL`.
- **Triggers** that keep counters up to date and block invalid changes with `SIGNAL`.
- **JSON columns** for flexible data, with filtering on JSON fields.
- Work: [Week11/](Week11/), [Week11-HW/](Week11-HW/) (`place_order` procedure, stock triggers, JSON book formats)

## Repository layout

- `WeekN/`: the in-class lab exercises.
- `WeekN-HW/`: the homework assignment for that week. Week 8 has no homework.

From Week 6 on, folders include the lab sheet PDFs and starter projects provided by the course instructor. The completed exercises and assignments are my own work.

## Running the code

**Prerequisites:** Node.js and a local MySQL 8 server (MySQL Workbench recommended).

**Weeks 1–5** are single scripts. Install the dependencies at the repo root once:

```bash
npm install
```

Then run any script:

```bash
node Week4/ex1.js
```

For Weeks 4–5, first import that week's `.sql` dump in Workbench and check the connection settings at the top of the script.

**Weeks 6–11** are self-contained projects. In the project folder:

1. Run that week's SQL setup script(s) in MySQL Workbench. The starter `README.md` lists the order.
2. Put your MySQL login in `db.js`. From Week 10 on, use `.env` instead (copy `.env.example`).
3. Install and start:

   ```bash
   npm install
   ```

   ```bash
   npm run dev
   ```

   Week 6 uses `npm start` instead.

4. Open http://localhost:3000, or send the requests in `requests.http`.

> `.env` files hold real passwords and are git-ignored. Don't commit them.
