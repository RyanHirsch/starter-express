import express from 'express';
import Person from '../../models/person';
const route = express.Router();

route.use('/', (req, res) => {
  Person.find()
    .exec()
    .then(people => {
      res.json({
        data: people,
      });
    });
});

export default route;
