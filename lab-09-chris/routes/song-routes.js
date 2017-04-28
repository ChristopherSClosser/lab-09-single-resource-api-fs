'use strict';

const storage = require('../lib/storage');
const Song = require('../model/song');
const debug = require('debug')('http:server');
const Router = require('../lib/router');
const router = new Router();

router.get('/api/song', function(req, res) {
  debug('GET /api/song');
  if(req.url.query.id) {
    storage.fetchItem('song', req.url.query.id)
    .then(song => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(song));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('NOT FOUND');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('BAD REQUEST');
  res.end();
});

router.post('/api/song', (req, res) => {
  debug('POST /api/song');
  // console.log(req.body);
  try {
    let newSong = new Song(req.body.title, req.body.artist, req.body.album);

    storage.createItem('song', newSong)
    .then(newSong => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(newSong));
      res.end();
    });
  } catch(e) {

    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('BAD REQUEST');
    res.end();
  }
});

router.put('/api/song', (req, res) => {
  debug('PUT /api/song');
  // console.log(req.body.);
  storage.updateItem('song', req.body.id, req.body)
  .then(song => {
    res.writeHead(202, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(song));
    res.end();
  })
  .catch(err => {
    console.error(err);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('NOT FOUND');
    res.end();
  });
  return;
});

router.delete('/api/song', (req, res) => {
  debug('DELETE /api/song');
  // console.log(req.body);
  if(req.url.query.id) {
    storage.deleteItem('song', req.url.query.id)
    .then(() => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write('deleted record');
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('NOT FOUND');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('BAD REQUEST');
  res.end();
});
