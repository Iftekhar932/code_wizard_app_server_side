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
// this one is working but i want to learn how to do it with query instead of params
/* app.get("/courses/:category", (req, res) => {
  const categoryName = req.params.category;
  const filteredCourses = courseData.filter((c) => c.category == categoryName);
  res.send(filteredCourses);
});
 */
app.get("/courses/:category", (req, res) => {
  const categoryName = req.query.category;
  const filteredCourses = courseData.filter((c) => c.category == categoryName);
  res.send(filteredCourses);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
