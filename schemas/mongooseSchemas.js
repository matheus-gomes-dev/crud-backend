const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  title: String,
  body: String,
  date: Date
});

module.exports = Product;
