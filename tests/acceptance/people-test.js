import request from 'supertest';
import expect from 'expect';
import faker from 'faker';

import app from '../../src/app';
import Person from '../../src/models/person';

function fakePerson() {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  };
}

describe('Acceptance: /api/people', () => {
  const people = [...Array(4)].map(fakePerson);
  before(() => {
    return Person.remove()
      .exec()
      .then(() => {
        const testPeople = people.map(model => new Person(model).save());
        return Promise.all(testPeople);
      });
  });
  it('returns expected shape', () =>
    request(app)
      .get('/api/people')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(resp => {
        expect(resp.body).toBeAn('object');
        expect(resp.body.data).toBeAn('array');
      }));

  it('can GET all people', () =>
    request(app)
      .get('/api/people')
      .then(resp => {
        expect(resp.body.data.length).toEqual(4);
        expect(resp.body.data).toEqual(people);
      }));
});
