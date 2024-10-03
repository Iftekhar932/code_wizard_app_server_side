const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  ratings: { type: Number, required: true },
  subCategory: { type: String, required: true },
});
// productSchema.index({ title: "text", description: "text", category: "text" });

const product = mongoose.model("product", productSchema);
module.exports = product;
