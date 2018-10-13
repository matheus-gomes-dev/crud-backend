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
    })
  })

  describe('GET /', function () {
    it('check if API is working', function (done) {
      request(app)
        .get('/')
        .expect(200, {
          message: 'api is working'
        }, done);
    });
  });
})
