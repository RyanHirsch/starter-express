import express from 'express';
import Person from '../../models/person';
import PersonSerializer from '../../serializers/person-serializer';

const route = express.Router();

route.get('/', (req, res) => {
  Person.find()
    .exec()
    .then(people => {
      res.json(PersonSerializer.serialize(people));
    });
});

route.get('/:id', (req, res) => {
  Person.findOne({ _id: req.params.id })
    .exec()
    .then(person => {
      res.json(PersonSerializer.serialize(person));
    });
});

export default route;
