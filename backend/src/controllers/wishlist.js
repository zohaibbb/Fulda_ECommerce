import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import Wishlist from '../models/wishlist';
import Product from '../models/products';


exports.removeProduct = async (req, res) => {
	try {
    let product = await Wishlist.findOneAndRemove(req.body);

    if (!product) {
      return res.status(404).send(new Error('Not Found Error', ['Product not found ']));
    } else {
			console.log('Product deleted');
      res.status(204).send({status: true});
    }
  } catch (err) {
    return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to delete product']));
  }
	
}


/*Retrieving items that are in wishlist */
exports.list = async (req, res) => {
	try {
		console.log('hello');
		const where = { buyer_id: req.params.id };
		let wishlist = JSON.parse(JSON.stringify(await Wishlist.find(where)));
		if (!wishlist)
			return res.status(404).send(new Error('Not Found Error', ['Wishlist not found ']));
		else {
			for (let i=0;i<wishlist.length;i++) {
				wishlist[i]['product_details'] = await Product.findById(wishlist[i]['product_id']); 
			}
		}
			console.log(wishlist);
			res.send(wishlist);

	} catch (err) {
		console.log("Error : While retrieving wishlist");
		return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to retrieve wishlist']));

	}
};

/*Add product to wishlist*/

exports.create = async (req, res) => {
	try {
		const wishlist = await Wishlist.create(req.body);
		if (!wishlist)
			return res.send(err);
		
		res.send(wishlist);
	} catch (err) {
		console.log("Error : While retrieving wishlist");
		return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to add product to wishlist']));
	}
};

exports.exist = async (req, res) => {
	const exist = await Wishlist.count(req.body);
	return res.send({count: exist});
}
/*Remove product from wishlist*/
exports.delete = async (req, res) => {

	try {
		let wishlist = await Wishlist.findOneAndRemove({ _id: req.params.id });

		if (!wishlist) {
			return res.status(404).send(new Error('Not Found Error', ['Wishlist item not found ']));
		} else {
			console.log('Product removed from wishlist');
			res.status(204).send('Product removed from wishlist');
		}
	} catch (err) {
		return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying remove product from wishlist']));
	}

};

