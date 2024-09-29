const express = require("express");
const cors = require("cors");
const connectDB = require("./database/mongooseDB.js");
const port = process.env.PORT || 5000;

const app = express();
require("dotenv").config();
app.use(cors());

connectDB();

app.use("/", require("./routes/api/products.js"));

app.listen(port, () => {
  console.log(`RUNNING ON PORT 👉👉 ${port}`);
});
