import express from 'express';
import wishlist from '../controllers/wishlist';
const routes = express.Router();

routes.route('/exist')
	.post(wishlist.exist);	

routes.route('/')
	// .get(wishlist.list)
	.post(wishlist.create)
	// .put(wishlist.update);

routes.route('/remove-product')
	.post(wishlist.removeProduct);


routes.route('/:id')
	.get(wishlist.list)
	// .delete(checkout.delete);


module.exports = routes;
