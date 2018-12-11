import express from 'express';
import wishlist from '../controllers/wishlist';
const routes = express.Router();

routes.route('/exist')
	.post(wishlist.exist);	

routes.route('/')
	.post(wishlist.create);

routes.route('/remove-product')
	.post(wishlist.removeProduct);

routes.route('/checkout')
	.post(wishlist.checkout);

routes.route('/:id')
	.get(wishlist.list);

routes.route('/buyer-history')
		.post(wishlist.buy);

routes.route('/seller-history')
		.post(wishlist.sell);
	


module.exports = routes;
