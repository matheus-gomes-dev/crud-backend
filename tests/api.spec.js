const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const config = require('../config/config.js');
const MONGO_URI = config.crudApp.localhost.db;

describe('API tests', () => {

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

  describe('registering a new product', () => {
    it('with valid information should return status 200', done => {
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

    it('without name should return status 400', done => {
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

    it('without description should return status 400', done => {
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

    it('without price should return status 400', done => {
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

    it('without category should return status 400', done => {
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

    it('with an invalid parameter should return status 400', done => {
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

  describe('getting products', () => {
    it('should return status 200', done => {
      request(app)
      .get('/')
      .expect(200, done)
    });

    it('should return the total number of products', done => {
      request(app)
      .get('/')
      .expect(res => {
        res.body = { total: !isNaN(res.body.data.total) }
      })
      .expect(200, { total: true }, done)
    });
  });

});
