import express from 'express';
import Person from '../../models/person';

const route = express.Router();

route.get('/', (req, res) => {
  Person.find()
    .exec()
    .then(people => {
      res.json({
        data: people,
      });
    });
});

route.get('/:id', (req, res) => {
  Person.findOne({ _id: req.params.id })
    .exec()
    .then(person => {
      res.json({
        data: person,
      });
    });
});

export default route;
