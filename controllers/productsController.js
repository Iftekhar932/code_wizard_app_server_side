// mongoose schema
const products = require("../schemas/products.js");

const productsController = async (req, res) => {
  try {
    // await products.find({})
  } catch (error) {
    console.error("🚀 ~ productsController line 8 ~ error:", error);
  }
};

module.exports = productsController;
