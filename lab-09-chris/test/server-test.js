'use strict';
/*
## Tests
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure your `/api/simple-resource-name` endpoint responds as described for each condition below:
  * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
  * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
  * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
  * `POST` - test 201, response body like  `{<data>}` for a post request with a valid body
  * `PUT` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
  * `PUT` - test 202, response body like  `{<data>}` for a put request with a valid  id
  * `DELETE` - test 404, responds with 'not found' for valid request made with an id that was not found
  * `DELETE` - test 204, response for a delete request with a valid id
  */
const server = require('../server');
const storage = require('../lib/storage').schema;
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server - Test', () => {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST method', () => {
    describe('/api/song endpoint', () => {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/api/song')
        .send({title: 'test-title', artist: 'test-artist', album: 'test-album'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(`Actual status: ${res.status}`);
          done();
        });
      });
    });

    describe('/wrong endpoint', () => {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.deep.equal(400);
          console.log(`Actual status: ${res.status}`);
          done();
        });
      });
    });
  });

  describe('GET method', () => {
    describe('/api/song endpoint', () => {
      it('should respond with a 200 on proper request', done => {
        console.log('schema is: ', storage.schema);
        chai.request(server)
        .get('/api/song')
        .query({id: storage.item})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(`Actual status: ${res.status}`);
          done();
        });
      });
    });

    describe('/wrong endpoint', () => {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.deep.equal(400);
          console.log(`Actual status: ${res.status}`);
          done();
        });
      });
    });
  });

  after(done => {
    server.close();
    done();
  });
});
