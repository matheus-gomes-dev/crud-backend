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
      newProduct.save((error, data) => {
        if (error) {
          reject('Error while registering new product!');
        };
        resolve({
          message: 'New product succesfully registered!',
          data,
        });
      });
    });
  },
  update: (id, product) => {
    return new Promise((resolve, reject) => {
      Product.update({ _id: id }, product, { overwrite: true }, (error, data) => {
        if (error) {
          reject('Error while updating product!');
        }
        resolve({
          message: 'Product succesfully updated!',
          data,
        });
      })
    });
  }
}

module.exports = database;
