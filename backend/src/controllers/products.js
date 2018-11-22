import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import Product from '../models/products';


exports.list = async (req, res) => {
  const search = req.query;
  console.log('search =>', search);
  let product;
  if (!search.hasOwnProperty('name')) {
    product = await Product.find();
  }
  else {
    product = await Product.find({ $text: { $search: search.name } })
  }
  res.send(product);
};

exports.read = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.send(err);
   //if (!req.currentProduct.canRead(Product)) return response.sendForbidden(res);
  //   res.json(Product);
  // });
  console.log(product);
  res.send(product);
};

exports.search =  async (req, res) => {
	//Product.find({$or:[{category: req.params.name},{name:req.params.category}]}, function(err, user) 
   const product = await Product.find({'name': req.params.name});
   res.send(product);
  // console.log(product);
	 console.log('test');
	 console.log(req.params.name);
	
	
}

exports.create = function(req, res) {
  var newProduct = new Product(); 
		
	newProduct.name=req.body.name;
	newProduct.description=req.body.description;
	newProduct.condition=req.body.condition;
	newProduct.price=req.body.price;
	newProduct.image_path=req.body.image_path;
	newProduct.approvalStatus=req.body.approvalStatus;
	newProduct.seller_id=req.body.seller;
	newProduct.category_id=req.body.category;

  newProduct.save(function(err) {
    if(err){
			console.log("Error : While adding product");
			return response.sendBadRequest(res, err);
		}else{
			response.sendCreated(res, Product);
		}
		
  });

};

exports.update = function(req, res) {
  // const Product = req.body;
  // delete Product.role;
  // if (!req.currentProduct.canEdit({ _id: req.params.id })) return response.sendForbidden(res);
  // Product.findOneAndUpdate({ _id: req.params.id }, Product, { new: true, runValidators: true }, function(err, Product) {
  //   if (err) return response.sendBadRequest(res, err);
  //   res.json(Product);
  // });
  
};

exports.delete = function(req, res) {
  // Product.remove({ _id: req.params.id }, function(err, Product) {
  //   if (err) return res.send(err);
  //   if (!req.currentProduct.canEdit(Product)) return response.sendForbidden(res);
  //   res.json({ message: 'Product successfully deleted' });
  // });
};

exports.loadProduct = function (req, res, next) {
	Product.findById(req.params.product_id, function(err, product) {
    if (err){
			console.log("Error : While retrieving products details");
      return response.sendNotFound(res);
		}
    if (!req.locals) req.locals = {};
			req.locals.Product = Product;
			next();
  });	

};