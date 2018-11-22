var express = require('express');
var routes = express.Router();

import wishlist from '../controllers/wishlist';

routes.post('/addToWishList', function(req, res, next) {
		
	
        var newWishlist = new WishList(); 
		
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
        
});

routes.get('/wishList', function(req, res, next) {
       
	   WishList.find(function(err, WishList){
            if(err){
				console.log("Error : While retreiving wishList");
				return res.status(500).send(err);
			}else{
				return res.json(WishList);
			}
        });
});

module.exports = routes;