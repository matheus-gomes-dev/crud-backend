const request = require('supertest');
const app = require('../app');


// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });

describe('GET /', function () {
  it('check if API is working', function (done) {
    request(app)
      .get('/')
      .expect(200, {
        message: 'api is working'
      }, done);
  });
});
