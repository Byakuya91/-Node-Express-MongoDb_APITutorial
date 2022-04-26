//  What is a Schema?
// A Schema is a set of rules that defines the rules of a single document in in MongoDB.

const mongoose = require("mongoose");
//  Schema for products
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 255 },
  description: { type: String, required: true, minlength: 2 },
  category: { type: String, required: true, minlength: 2, maxlength: 255 },
  price: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now() },
});

//  turn Schema into Javascript class
const Product = mongoose.model("Product", productSchema);

//  export the file

module.exports = Product;
