const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const config = require('../config/config.js');
const MONGO_URI = config.crudApp.localhost.db;

describe('POST to register a new product', () => {

  // connect to mongoDB before tests
  before(done => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', error => {
      console.log('Error', error);
    });
  });

  describe('registering a valid new product', () => {
    it('should return status 200', done => {
      request(app)
      .post('/')
      .send({
        "name": "mocked_name",
        "description": "mocked_description",
        "price": 10.34,
        "category": "mocked_category",
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });
  });

  describe('registering a product without name', () => {
    it('should return status 400', done => {
      request(app)
      .post('/')
      .send({
        "description": "mocked_description",
        "price": 10.34,
        "category": "mocked_category",
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });
  });

  describe('registering a product without description', () => {
    it('should return status 400', done => {
      request(app)
      .post('/')
      .send({
        "name": "mocked_name",
        "price": 10.34,
        "category": "mocked_category",
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });
  });

  describe('registering a product without price', () => {
    it('should return status 400', done => {
      request(app)
      .post('/')
      .send({
        "name": "mocked_name",
        "description": "mocked_description",
        "category": "mocked_category",
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });
  });

  describe('registering a product without category', () => {
    it('should return status 400', done => {
      request(app)
      .post('/')
      .send({
        "name": "mocked_name",
        "description": "mocked_description",
        "price": 10.34,
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });
  });

  describe('registering a product with an invalid parameter', () => {
    it('should return status 400', done => {
      request(app)
      .post('/')
      .send({
        "name": "mocked_name",
        "description": "mocked_description",
        "price": "10.34",
        "category": "mocked_category",
        "invalidParameter": "mocked_parameter",
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });
  });

});
