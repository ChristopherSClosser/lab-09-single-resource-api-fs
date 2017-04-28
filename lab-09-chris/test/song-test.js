'use strict';

const Song = require('../model/song');
const expect = require('chai').expect;

describe('Song model', () => {
  it('should make a new song', done => {
    this.newSong = new Song('wat', 'yo', 'up');
    console.log(this.newSong);
    expect(this).to.equal(Object (this.newSong));
    it('should have title property', () => {
      expect(this.newSong.title).to.equal('wat');
      done();
    });
  });
});
