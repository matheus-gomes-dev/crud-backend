const mongoose = require('mongoose');

const productSchema = require('../schemas/mongooseSchemas');
const config = require('../config/config.js');
const Product = mongoose.model('Product', productSchema);
const MONGO_URI = config.crudApp.localhost.db;

const database = {
  find: (queryData, page) => {
    return new Promise((resolve, reject) => {
      Product.paginate(
        queryData,
        { page, limit: 5 },
        (error, result) => {
          if (error) {
            console.error(error);
            reject('Error while searching for products!');
          };
          resolve(result);
        }
      )
    });
  },
  save: product => {
    return new Promise((resolve, reject) => {
      const newProduct = new Product(product);
      newProduct.save((error, result) => {
        if (error) {
          console.error(error);
          reject('Error while registering new product!');
        };
        resolve({
          message: 'New product succesfully registered!',
          data: result,
        });
      });
    });
  }
}

module.exports = database;
