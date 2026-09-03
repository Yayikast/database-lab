const express = require("express");

const app = express();

// ex1

app.get("/", (req, res) => {
  res.send("Welcome to CSS326 Lab5!");
});

app.get("/hello", (req, res) => {
  res.send("Hello! This is Yayika");
});

app.get("/data", (req, res) => {
  res.json({ course: "CSS326", year: 3 });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

// type 10.10.102.140:3000 in other device
// IPv4 Address : Port Number
