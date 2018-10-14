const mongoose = require('mongoose');

const productSchema = require('../schemas/mongooseSchemas');
const config = require('../config/config.js');
const Product = mongoose.model('Product', productSchema);
const MONGO_URI = config.crudApp.localhost.db;

const database = {
  save: product => {
    return new Promise((resolve, reject) => {
      const newProduct = new Product(product);
      newProduct.save(error => {
        if (error) {
          console.error(error);
          reject('Error while registering new product!');
        };
        resolve('New product succesfully registered!');
      });
    });
  }
}

module.exports = database;
