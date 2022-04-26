// Imports
const Product = require("../models/product");
const express = require("express");
const router = express.Router();

// ENDPOINTS will go here.

// posting something to DB
router.post("/", async (req, res) => {
  try {
    //    Product schema object imported
    let newProduct = await new Product(req.body);
    //    updating the database on MongoDB
    await newProduct.save();
    return res.status(201).send(newProduct);
    //    if the request failed
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
