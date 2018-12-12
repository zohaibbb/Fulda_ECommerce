import Product from '../models/products';
import ProductCategories from '../models/product_categories';
import Profile from '../models/profile';
import Wishlist from '../models/wishlist';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({ //multers disk storage settings
	destination: (req, file, cb) => { cb(null, path.join(__dirname, '../public/assets/img/prod-img/'))},
	filename: (req, file, cb) => { cb(null, req.body.product_id) },
	onFileUploadComplete: (file) => { done = true }
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		let ext = path.extname(file.originalname);
		ext = ext.toLowerCase();
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return cb('Only images are allowed');
		}
		cb(null, true)
	}
}).single('file');

exports.categories = async (req, res) => {
	const categories = await ProductCategories.find();
	if (!categories) {
		return res.status(400).send({status: false, message: 'Categories not found'});
	}
	return res.status(200).send({status: true, message: 'Categories found', categories});
}

/*Retrieves the list of products*/
exports.list = async (req, res) => {
	let product;
	const search = req.query;
	const filter = req.query.filter;
	const where = { deleted: false, sold: false };
	const sort = {};
	if (filter == 'recent') {
		sort.created_at = -1;
	}
	if (filter == 'price_lowest') {
		sort.price = 1;
	}
	if (filter == 'price_highest') {
		sort.price = -1;
	}
	if (filter == 'name_asc') {
		sort.name = 1;
	}
	if (filter == 'name_desc') {
		sort.name = -1;
	}
	if (search && !search.admin) {
		where.approved = true;
	}
	if (search.hasOwnProperty('name')) {
		where['$text'] = { $search: search.name };
	}
	product = await Product.find(where).sort(sort);
	if (!product)
		return res.status(400).send({status: false, message: 'Products not found'});

	return res.status(200).send({status: true, message: 'Products found', product});
};

exports.latest = async (req, res) => {
	const products = await Product.find({approved: true, sold: false, deleted: false}).sort({created_at: -1}).limit(4);
	return res.status(200).send({status: true, message: '4 Products found', products});
}

exports.sales = async (req, res) => {
	console.log(req.query);
	const products = await Product.find({seller_id: req.query.id});
	return res.status(200).send({status: true, message: 'Products found', products});
}

/*Retrieves product by id*/
exports.read = async (req, res) => {
	let product = await Product.findById(req.params.id);
	if (!product)
		return res.status(400).send({status: false, message: "Product not found"});

	product = JSON.parse(JSON.stringify(product));
	const seller = await Profile.findOne({user_id: product.seller_id});
	if (!seller)
	return res.status(400).send({status: false, message: "Product not found"});

	product.seller = seller.name;

	const category = await ProductCategories.findById(product.category_id);
	if (!category)
	return res.status(400).send({status: false, message: "Product not found"});

	product.category = category.name;
	return res.status(200).send({status: true, message: 'Product found', product});
};

/*adds a product image*/
exports.addImage = async (req, res) => {
	try {
		upload(req, res, async (err) => {
			if (err) {
				console.log('try error :', err);
				await Product.findByIdAndRemove(req.body.product_id);
				return res.status(400).send({status: false, err: err});
			}
			await Product.findByIdAndUpdate(
				req.body.product_id, {
					$set: { image_path: `assets/img/prod-img/${req.body.product_id}`}
				});
			return res.status(200).send({ status: true, message: 'Product added successfully' });
		});	
	}
	catch (err) {
		console.log('errr :', err);
		return res.status(400).send({status: false, err: err});
	}
}

/*adds a new product*/
exports.create = async (req, res) => {
	console.log(req.body);
	const product = await Product.create(req.body);
	if (!product)
		return res.status(400).send({status: false, message: 'Product not added, try again!'});

	return res.status(200).send({
		status: true, 
		message: 'Product added successfully', 
		product_id: product._id
	});
}

/*Approval of product by Admin*/
exports.status = async (req, res) => {
	try {
		const product = await Product.update({ '_id': req.body._id }, { $set: { 'approved': !req.body.approved } });
		if (!product)
			return res.status(404).send({ status: false, message: 'Operation failed' });

		return res.status(200).send({ status: true, message: 'Status changed', product: product });
	} catch (error) {
		return res.status(404).send({ status: false, message: 'Something went wrong' });
	}
};

/*Removes product */
exports.delete = async (req, res) => {
	try {
		await Product.update({ _id: req.params.id, sold: false }, { $set: { deleted: true } });
		await Wishlist.remove({product_id: req.params.id, order_id: { $exists: false }});
		console.log('Product deleted');
		res.send({status: true, message: 'Product removed successfully'});
	} catch (err) {
		console.log(err);
		return res.status(500).send({status: false, message: "Something went wrong"});
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

}