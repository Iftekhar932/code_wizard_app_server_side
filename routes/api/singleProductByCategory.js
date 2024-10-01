const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

router.get("/products?category=", productController);

module.exports = router;
