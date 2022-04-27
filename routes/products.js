// Imports
const { Product, validateProduct } = require("../models/product");
const express = require("express");
const { request } = require("express");
const router = express.Router();

// ENDPOINTS will go here.

// GET ALL PRODUCTS
// http://localhost:3007/api/products
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    if (!products)
      return res.status(400).send(`No products in this collection.`);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//  GET A PRODUCT by Id  (NOT WORKING, debug)
// http://localhost:3007/api/:productId
router.get("/:productId", async (req, res) => {
  try {
    const id = req.params.productId;
    let product = await Product.findById(id);
    if (!product)
      return res
        .status(400)
        .send(`Product with ObjectId ${id} does not exist!`);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//  POST NEW PRODUCT
// http://localhost:3011/api/products

//POST A NEW PRODUCT
router.post("/", async (req, res) => {
  try {
    //validation checks for the user through validateProduct function from product.js.
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error);

    // Product schema object imported
    let newProduct = await new Product(req.body);
    //updating the database on MongoDB
    await newProduct.save();
    return res.status(201).send(newProduct);
    //    if the request failed
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// PUT an existing PRODUCT
// https://localhost:3011/api/products/:productId
router.put("/:productId", async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error);

    let product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product)
      return res
        .status(400)
        .send(`Product  with Objectid ${req.params.productId} does not exist.`);
    return res.send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE an existing PRODUCT
// https://localhost:3011/api/products/:productId
router.delete("/:productId", async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.productId);
    if (!product)
      return res
        .status(400)
        .send(`Product  with Objectid ${req.params.productId} does not exist.`);
    return res.send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
