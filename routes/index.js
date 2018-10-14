const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const productsAPI = require('../modules/productsAPI');
const config = require('../config/config.js');
const MONGO_URI = config.crudApp.dev.db;

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  router.get('/', productsAPI.getProducts);
  router.post('/', productsAPI.newProduct);
  router.put('/', productsAPI.updateProduct);
  router.delete('/', productsAPI.deleteProduct);
});

module.exports = router;
