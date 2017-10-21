import request from 'supertest';
import expect from 'expect';
import faker from 'faker';

import app from '../../src/app';
import Person from '../../src/models/person-model';

function fakePerson() {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  };
}

describe('Acceptance: /api/people', () => {
  const testSize = 4;
  const people = [...Array(testSize)].map(fakePerson);
  before(() =>
    Person.remove()
      .exec()
      .then(() => {
        const testPeople = people.map(model => new Person(model).save());
        return Promise.all(testPeople);
      })
  );

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
        expect(resp.body.data.length).toEqual(testSize);
        resp.body.data.forEach(person => {
          expect(people.map(x => x.name)).toContain(person.attributes.name);
        });
      }));

  it('can GET a single person', () =>
    Person.findOne()
      .exec()
      .then(person => request(app).get(`/api/people/${person._id}`)) // eslint-disable-line no-underscore-dangle
      .then(resp => {
        expect(resp.body.data.id).toBeA('string');
      }));
});
