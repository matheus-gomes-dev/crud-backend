const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const config = require('../config/config.js');
const MONGO_TESTS_URI = config.crudApp.dev.tests;
let productId = 0;

describe('API tests', () => {

  // connect to mongoDB before tests
  before(done => {
    mongoose.connect(MONGO_TESTS_URI, { useNewUrlParser: true });
    mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', error => {
      console.log('Error', error);
    });
  });

  // disconnect to mongoDB after tests
  after(() => {
    mongoose.connection.close();
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
        productId = res.body.data.docs[0]._id;
        res.body = { total: !isNaN(res.body.data.total) };
      })
      .expect(200, { total: true }, done)
    });
  });

  describe('updating a product', () => {
    it('with an invalid id should return status 500', done => {
      request(app)
      .put('/?id=0')
      .send({
        "name": "mocked_name",
        "description": "mocked_description",
        "price": "10.34",
        "category": "mocked_category",
      })
      .set('Accept', 'application/json')
      .expect(500)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });

    it('with no name defined should return status 400', done => {
      request(app)
      .put('/')
      .send({
        "description": "mocked_description",
        "price": "10.34",
        "category": "mocked_category",
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });

    it('with no description defined should return status 400', done => {
      request(app)
      .put('/')
      .send({
        "name": "mocked_name",
        "price": "10.34",
        "category": "mocked_category",
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });

    it('with no price defined should return status 400', done => {
      request(app)
      .put('/')
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

    it('with no category defined should return status 400', done => {
      request(app)
      .put('/')
      .send({
        "name": "mocked_name",
        "description": "mocked_description",
        "price": "10.34",
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
      .put('/')
      .send({
        "name": "mocked_name",
        "description": "mocked_description",
        "price": "10.34",
        "category": "mocked_category",
        "invalid_parameter": "mock_invalid",
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });

    it('with valid id and data should return status 200', done => {
      request(app)
      .put(`/?id=${productId}`)
      .send({
        "name": "mocked_name",
        "description": "mocked_description",
        "price": "10.34",
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

  describe('deleting a product', () => {
    it('with invalid id should return status 500', done => {
      request(app)
      .delete(`/?id=0`)
      .expect(500)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });

    it('with valid id should return status 200', done => {
      request(app)
      .delete(`/?id=${productId}`)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
    });
  });

});
