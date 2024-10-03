const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;
// mongoose function import
const connectDB = require("./database/mongooseDB.js");
connectDB();

app.use(cors());
app.use("/", require("./routes/api/allProducts.js"));
app.use("/", require("./routes/api/singleProductById.js")); //using id
app.use("/", require("./routes/api/singleProductByCategory.js")); //! see if from client side filter works if can't from here

app.listen(port, () => {
  console.log(`RUNNING ON PORT 👉👉 ${port}`);
});
