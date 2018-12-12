var express = require('express');
var routes = express.Router();

import product from '../controllers/products';

routes.route('/get-categories')
	.get(product.categories);

routes.route('/')
	.get(product.list)
	.put(product.update);

routes.route('/sales')
	.get(product.sales)

routes.route('/latest')
	.get(product.latest)
  
routes.route('/add-product')
	.post(product.create);

routes.route('/add-image')
	.post(product.addImage);

routes.route('/product-status')
	.post(product.status);

routes.route('/:id')
	.get(product.read)
	.delete(product.delete);
	
module.exports = routes;
