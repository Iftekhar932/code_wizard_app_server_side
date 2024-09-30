const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  duration: String,
  image: String,
  ratings: Number,
  category: String,
  subCategory: String,
});

const product = mongoose.model("product", productSchema);
module.exports = product;
