import express from 'express';

import users from '../controllers/users';

const routes  = express.Router();

routes.route('/:id')
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

routes.route('/')
  .get(users.list)
  .post(users.create);

module.exports = routes;
