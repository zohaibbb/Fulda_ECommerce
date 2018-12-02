import express from 'express';
import path from 'path';
import users from './users';
import products from './products';
import wishlist from './wishlist';
import response from '../helpers/response';
const routes  = express.Router();
routes.use(response.setHeadersForCORS);

routes.use('/api/users', users);
routes.use('/api/products', products);
routes.use('/api/wishlist', wishlist);
routes.use('/api/userprofile', users);
routes.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

// angular routing
routes.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

routes.use((req, res) => response.sendNotFound(res));

module.exports = routes;
