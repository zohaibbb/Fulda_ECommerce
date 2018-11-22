import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

const Wishlist = mongoose.model('Wishlist');

exports.list = async (req, res) => {
  const wishlist = await Wishlist.find();
  response.send(wishlist);
	console.log(wishlist);
};

exports.read = function(req, res) {
	const wishlist = await Wishlist.findById(req.params.id);
  response.send(wishlist);
	console.log(wishlist);
	
  // Wishlist.findById(req.params.id, function(err, user) {
  //   if (err) return response.sendNotFound(res);
  //   if (!req.currentWishlist.canRead(user)) return response.sendForbidden(res);
  //   res.json(user);
  // });
};

exports.create = function(req, res) {
	var newWishlist = new Wishlist(); 
		
	newWishlist.buyer_id=req.body.buyer;
	newWishlist.seller_id=req.body.seller;
	newWishlist.product_id=req.body.product;
	newWishlist.order_id=req.body.order;
	

  newWishlist.save(function(err) {
		if(err){
			console.log("Error : While adding product to wishList");
			return res.status(500).send(err);
		}else{
			res.redirect("/wishList");
		}
		
	});
	
	
	
  // const newWishlist = new Wishlist(req.body);
  // newWishlist.role = 'user';
  // newWishlist.save(function(err, user) {
  //   if (err) return response.sendBadRequest(res, err);
  //   response.sendCreated(res, user);
  // });
};

exports.update = function(req, res) {
  // const user = req.body;
  // delete user.role;
  // if (!req.currentWishlist.canEdit({ _id: req.params.id })) return response.sendForbidden(res);
  // Wishlist.findOneAndUpdate({ _id: req.params.id }, user, { new: true, runValidators: true }, function(err, user) {
  //   if (err) return response.sendBadRequest(res, err);
  //   res.json(user);
  // });
};

exports.delete = function(req, res) {
  // Wishlist.remove({ _id: req.params.id }, function(err, user) {
  //   if (err) return res.send(err);
  //   if (!req.currentWishlist.canEdit(user)) return response.sendForbidden(res);
  //   res.json({ message: 'Wishlist successfully deleted' });
  // });
};

exports.loadWishlist = function (req, res, next) {
  // Wishlist.findById(req.params.userId, function (err, user) {
  //   if (err) return response.sendNotFound(res);
  //   if (!req.locals) req.locals = {};
  //   req.locals.user = user;
  //   next();
  // });
};