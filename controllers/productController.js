// mongoose schema
const { ObjectId } = require("mongodb");
const product = require("../model/product.js");

const productController = async (req, res) => {
  const id = req.params.id;

  try {
    // if id available then used
    const products = id
      ? await product.find({
          _id: ObjectId(id),
        })
      : await product.find();

    // if products available then send with in response otherwise error message
    products
      ? res.status(200).send(products)
      : res.status(404).send({ error: "No products found" });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = productController;
