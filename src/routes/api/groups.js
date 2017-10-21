import express from 'express';
import Group from '../../models/group-model';
import GroupSerializer from '../../serializers/group-serializer';

const route = express.Router();

route.get('/', (req, res) => {
  Group.find()
    .exec()
    .then(groups => {
      res.json(GroupSerializer.serialize(groups));
    });
});

route.get('/:id', (req, res) => {
  Group.findOne({ _id: req.params.id })
    .exec()
    .then(group => {
      res.json(GroupSerializer.serialize(group));
    });
});

export default route;
