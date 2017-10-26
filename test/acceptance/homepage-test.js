import request from 'supertest';
import expect from 'expect';

import app from '../../src/app';

describe('Acceptance: /', () => {
  it('returns expected shape', () =>
    request(app)
      .get('/info')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(resp => {
        expect(resp.body).toBeAn('object');
        expect(resp.body.version).toBeA('string');
        expect(resp.body.alive).toBeA('boolean');
      }));
});
