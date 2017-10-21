import express from 'express';
import people from './people';
import groups from './groups';

const route = express.Router();

route.use('/people', people);
route.use('/groups', groups);

export default route;
