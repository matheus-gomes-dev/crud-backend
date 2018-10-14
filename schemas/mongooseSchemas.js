const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Product = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
});
Product.plugin(mongoosePaginate);

module.exports = Product;
