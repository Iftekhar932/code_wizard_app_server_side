const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// JSON DATA
const courseData = require("./data/data.json");

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/courses", (req, res) => {
  res.send(courseData);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
