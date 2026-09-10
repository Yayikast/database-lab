const express = require("express");
const app = express();

const studentsRouter = require("./routes/students.routes");
app.use(express.json());
app.use("/students", studentsRouter);

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// curl -X POST http://localhost:3000/students -H "Content-Type: application/json" -d '{"name":"Daniel","year":3,"major":"Data Science"}'
// curl.exe -X POST http://localhost:3000/students -H "Content-Type: application/json" -d "{\"name\":\"Daniel\",\"year\":3,\"major\":\"Data Science\"}"
