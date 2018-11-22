var express = require('express');
var routes = express.Router();

import product from '../controllers/products';

routes.route('/')
	.get(product.list)
  .put(product.update)
  .delete(product.delete);
  
routes.route('/add-product')
	.post(product.create);

routes.route('/:id')
	.get(product.read);
	
routes.route('/:name')
	.get(product.search);
	
module.exports = routes;
