const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

router.get("/products?searchQuery=", productController);

module.exports = router;
