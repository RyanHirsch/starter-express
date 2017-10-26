import express from 'express';

const route = express.Router();

route.get('/v1/test', (req, res) => {
  res.send('It is working!');
});

export default route;
