import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';
import Product from '../models/products';
import ProductCategories from '../models/product_categories';
import User from '../models/user';

exports.categories = async (req, res) => {
	const categories = await ProductCategories.find();
	console.log(categories);
	res.send(categories);
}

/*Retrieves the list of products*/
exports.list = async (req, res) => {
  const search = req.query;
  console.log('search =>', search);
  let product;
	try{
		if (!search.hasOwnProperty('name')) {
			product = await Product.find();
		}
		else {
			product = await Product.find({ $text: { $search: search.name } })
		}
		if (!product) 
			return res.status(404).send(new Error('Not Found Error', ['Product not found ']));
		else{
			console.log(product);
			res.send(product);
		}
	}catch(err){
		 console.log("Error : While retrieving product");
		 return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to retrieve product']));
		
	}
};

/*Retrieves product by id*/
exports.read = async (req, res) => {
  try{
		let product = await Product.findById(req.params.id);
		if (!product) 
			return res.status(404).send(new Error('Not Found Error', ['Product not found ']));
		else{
			console.log(product);
			res.send(product);
		}
	}catch(err){
		 console.log("Error : While retrieving product");
		 return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to retrieve product']));
		
	}
};
exports.search =  async (req, res) => {
	//Product.find({$or:[{category: req.params.name},{name:req.params.category}]}, function(err, user) 
   const product = await Product.find({'name': req.params.name});
   res.send(product);
  // console.log(product);
	 console.log('test');
	 console.log(req.params.name);	
}

exports.create = async (req, res) => {
  var newProduct = new Product(); 
		
	newProduct.name=req.body.name;
	newProduct.description=req.body.description;
	newProduct.condition=req.body.condition;
	newProduct.price=req.body.price;
	//newProduct.image_path=req.body.image_path;
	// newProduct.image_path='assets/img/prod-img/'+req.body.image_path;
	newProduct.approvalStatus='pending';
	newProduct.seller_id=req.body.seller;
	newProduct.category_id=req.body.category;

	try{
	  let product = await newProduct.save();
		if (!product) 
			return res.send(err);
		else{
			console.log('product added');
			res.send(product);
		}
	}catch(err){
		 console.log("Error : While adding product");
		 return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to add product']));
		
	}
	
  
};

/*Approval of product by Admin*/
exports.approve = async (req, res) => {
	//approvalStatus=req.body.approvalstatus;
	try {
			let product = await Product.findOneAndUpdate(
					{"_id" : req.body.id},
					{$set: {"approvalStatus" : "Approved"}},
					{new : true}
			);
		
			if(!product)
				return res.status(404).send(new Error('Not Found Error', ['Product not found ']));
			else{
				console.log('product added');
				res.send(product);
			}
	
	}catch (error) {
      return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to approve product']));
	}
	
	
};


/*Removes product */
exports.delete = async (req, res) => {
 
	try {
    let product = await Product.findOneAndRemove({_id: req.params.id});

    if (!product) {
      return res.status(404).send(new Error('Not Found Error', ['Product not found ']));
    } else {
			console.log('Product deleted');
      res.status(204).send('Product successfully deleted');
    }
  } catch (err) {
    return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to delete product']));
  }
	
};

/*Update product details*/
exports.update = async (req, res) => {
  // const Product = req.body;
  // delete Product.role;
  // if (!req.currentProduct.canEdit({ _id: req.params.id })) return response.sendForbidden(res);
  // Product.findOneAndUpdate({ _id: req.params.id }, Product, { new: true, runValidators: true }, function(err, Product) {
  //   if (err) return response.sendBadRequest(res, err);
  //   res.json(Product);
  // });
  
};

