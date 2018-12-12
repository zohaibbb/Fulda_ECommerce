import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import Wishlist from '../models/wishlist';
import Order from '../models/order';
import Product from '../models/products';
import _ from 'lodash';

exports.removeProduct = async (req, res) => {
	try {
		console.log(req.body);
    let product = await Wishlist.findOneAndRemove(req.body);

    if (!product) {
          return res.status(500).send({status: false, message: "Unable to remove product"});
    } else {
			console.log('Product deleted');
      res.status(204).send({status: true});
    }
  } catch (err) {
    return res.status(500).send({status: false, message: "Something went wrong"});
  }
	
}

/*Retrieving items that are in wishlist */
exports.list = async (req, res) => {
	console.log(req.body);
	try {
		let orders = await Order.find({buyer_id: req.params.id});
		orders = JSON.parse(JSON.stringify(orders));
		for (let order of orders) {
			order.products = [];
			const orderedWishlist = await Wishlist.find({order_id: order._id});
			for  (let ordWish of orderedWishlist) {
				let product = await Product.findById(ordWish.product_id);
				order.products.push(product);
			}
		}

		const where = { buyer_id: req.params.id, order_id: null };
		let wishlist = JSON.parse(JSON.stringify(await Wishlist.find(where)));
		if (!wishlist)
			return res.status(500).send({status: false, message: "Unable to retreive wishlist"});

		for (let i=0;i<wishlist.length;i++) {
			wishlist[i]['product_details'] = await Product.findById(wishlist[i]['product_id']); 
		}
		return res.status(200).send({status: true, message: 'Wishlist items', orders, wishlist});

	} catch (err) {
		console.log("Error : While retrieving wishlist");
		return res.status(500).send({status: false, message: "Something went wrong"});

	}
};

/*Checkout items in wishlist*/
exports.checkout = async (req, res) => {
	const order = await Order.create(req.body);
	if (!order)
		return res.status(400).send({status: false, message: 'Order not created, please try again'});

	await Wishlist.update(
		{_id: { $in: req.body.wishlist } },
		{ $set: { order_id: order._id } },
		{ multi: true }
	);

	await Product.update(
		{_id: { $in: req.body.products } },
		{ $set: { sold: true } },
		{ multi: true }
	)

	const deletedList = await Wishlist.remove({_id: { $nin: req.body.wishlist }, order_id: null });
	console.log('deletedList : ', deletedList);
	return res.status(200).send({status: true, message: 'Order placed successfully'})
};

/*Add product to wishlist*/
exports.create = async (req, res) => {
	try {
		const wishlist = await Wishlist.create(req.body);
		if (!wishlist){
			console.log("Error : Unable to add product to wishlist");
			return res.status(500).send({status: false, message: "Unable to add product to wishlist"});
		}
		res.send(wishlist);
	} catch (err) {
		console.log("Error : While add to wishlist");
		return res.status(500).send({status: false, message: "Something went wrong"});
	}
};

exports.exist = async (req, res) => {
	console.log('exist => ', req.body);
	const exist = await Wishlist.count(req.body);
	return res.send({count: exist});
}
/*Remove product from wishlist*/
exports.delete = async (req, res) => {

	try {
		let wishlist = await Wishlist.findOneAndRemove({ _id: req.params.id });

		if (!wishlist) {
			return res.status(500).send({status: false, message: "Unable to remove item"});
		} else {
			console.log('Product removed from wishlist');
			  res.send({status: true, message: 'Product removed from the wishlist'});
		}
	} catch (err) {
		return res.status(500).send({status: false, message: "Something went wrong"});
	}

};

/*Retrieving items that were purchased by buyer */
exports.buy = async (req, res) => {
	try {
		console.log('buyer order history');
		const where = { buyer_id: req.body.id , order_status: "processed"};
		let order = JSON.parse(JSON.stringify(await Wishlist.find(where)));

		if (!order)
			return res.status(500).send({status: false, message: "Orders not found"});
		else {
			for (let i=0;i<order.length;i++) {
				order[i]['product_details'] = await Product.findById(order[i]['product_id']); 
			}
		
		}
			
			console.log(order);
			res.send(order);

	} catch (err) {
		console.log("Error : While retrieving buyer orders");
		return res.status(500).send({status: false, message: "Something went wrong"});

	}
};

/*Retrieving items that were sold*/
exports.sell = async (req, res) => {
	try {
		console.log('seller order history');
		console.log(req.body.seller_id);
		console.log(req.params.seller_id);
		const where = {seller_id: req.body.seller_id , order_status: "processed"};
		let order = JSON.parse(JSON.stringify(await Wishlist.find(where)));
		if (!order)
			return res.status(500).send({status: false, message: "Orders not found"});
		else {
			for (let i=0;i<order.length;i++) {
				order[i]['product_details'] = await Product.findById(order[i]['product_id']); 
			}
		}
			console.log(order);
			res.send(order);

	} catch (err) {
		console.log("Error : While retrieving seller orders");
		return res.status(500).send({status: false, message: "Something went wrong"});

	}
};
