var express = require('express');
var routes = express.Router();

import product from '../controllers/products';

routes.route('/get-categories')
	.get(product.categories);

routes.route('/')
	.get(product.list)
  .put(product.update)
  .delete(product.delete);
  
routes.route('/add-product')
	.post(product.create);

routes.route('/:id')
	.get(product.read);
	
module.exports = routes;
