// mongoose schema
const { ObjectId } = require("mongodb");
const product = require("../model/product.js");

// ! ways u can implement to use query, look for it
const productController = async (req, res) => {
  const id = req?.params?.id;
  const query = req?.query;
  console.log(req.params, req.query);

  if (id)
    if (!id || !ObjectId.isValid(id)) {
      return;
    }

  try {
    // if id available then used otherwise all products will be sent
    let products = id
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
