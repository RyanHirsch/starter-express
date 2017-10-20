import express from 'express';
import people from './people';

const route = express.Router();

route.use('/people', people);

export default route;
