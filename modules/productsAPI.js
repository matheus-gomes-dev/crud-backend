const Joi = require('joi');
const requestsSchema = require('../schemas/requestsSchemas.js');
const database = require('./database');

const productsAPI = {
  newProduct: (req, res) => {
    Joi.validate(req.body, requestsSchema, error => {
      if (error) {
        res.status(400);
        res.send('A new product must have a name, description, price and category!');
        return;
      }
      database.save(req.body)
      .then(message => {
        res.status(200);
        res.send({ message });
      })
      .catch(message => {
        res.status(500);
        res.send({ message });
      })
    })
  }
}

module.exports = productsAPI;
