import request from 'supertest';
import expect from 'expect';
import faker from 'faker';

import app from '../../src/app';
import Group from '../../src/models/group';
import db from '../../src/db';

function fakeGroup() {
  return {
    name: `${faker.hacker.noun()}`,
  };
}

describe('Acceptance: /api/groups', () => {
  const testSize = 2;
  const groups = [...Array(testSize)].map(fakeGroup);
  before(() =>
    Group.remove()
      .exec()
      .then(() => {
        const testGroups = groups.map(model => new Group(model).save());
        return Promise.all(testGroups);
      })
  );
  // after(() => db.dropDatabase().then(() => db.close()));
  it('returns expected shape', () =>
    request(app)
      .get('/api/groups')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(resp => {
        expect(resp.body).toBeAn('object');
        expect(resp.body.data).toBeAn('array');
      }));

  it('can GET all groups', () =>
    request(app)
      .get('/api/groups')
      .then(resp => {
        expect(resp.body.data.length).toEqual(testSize);
        resp.body.data.forEach(group => {
          expect(groups.map(x => x.name)).toContain(group.attributes.name);
        });
      }));

  it('can GET a single group', () =>
    Group.findOne()
      .exec()
      .then(group => request(app).get(`/api/groups/${group._id}`)) // eslint-disable-line no-underscore-dangle
      .then(resp => {
        expect(resp.body.data.id).toBeA('string');
      }));
});
