// mongoose schema
const { ObjectId } = require("mongodb");
const product = require("../model/product.js");

// ! ways u can implement to use query, look for it
const productController = async (req, res) => {
  const id = req?.params?.id;
  const searchQuery = req?.query?.searchQuery;
  console.log(id, searchQuery);

  // checking with mongoose ObjectId method if the id pattern is valid

  try {
    let resultProducts;

    if (ObjectId.isValid(id)) {
      resultProducts = await product.find({
        _id: ObjectId(id),
      });
      resultProducts
        ? res.status(200).send(resultProducts)
        : res.status(404).send({ error: "No products found" });
    } else if (searchQuery) {
      // ! incomplete query search feature, just querying the title, but i need it to query description also
      resultProducts = await product.find({ $text: { $search: searchQuery } });
      resultProducts
        ? res.status(200).send(resultProducts)
        : res.status(404).send({ error: "No products found" });
    } else {
      resultProducts = await product.find();
      res.status(200).send(resultProducts);
    }

    // if resultProducts is not empty then send otherwise 404
    /* 
    resultProducts
      ? res.status(200).send(resultProducts)
      : res.status(404).send({ error: "No products found" }); 
      */
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = productController;
