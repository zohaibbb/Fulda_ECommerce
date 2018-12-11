import Product from '../models/products';
import ProductCategories from '../models/product_categories';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({ //multers disk storage settings
	destination: (req, file, cb) => { cb(null, './src/public/assets/img/prod-img/') },
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
	console.log(categories);
	res.send(categories);
}

/*Retrieves the list of products*/
exports.list = async (req, res) => {
	let product;
	const search = req.query;
	const where = { deleted: false };
	if (search && !search.admin) {
		where.approved = true;
	}
	if (search.hasOwnProperty('name')) {
		where['$text'] = { $search: search.name };
	}

	try {
		product = await Product.find(where);
		if (!product)
			return res.status(404).send(new Error('Not Found Error', ['Product not found ']));

		res.send(product);
		
	} catch (err) {
		console.log("Error : While retrieving product");
		return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to retrieve product']));
	}
};

/*Retrieves product by id*/
exports.read = async (req, res) => {
	try {
		let product = await Product.findById(req.params.id);
		if (!product)
			return res.status(500).send({status: false, message: "Product not found"});
		else {
			console.log(product);
			res.send(product);
		}
	} catch (err) {
		console.log("Error : While retrieving product");
		return res.status(500).send({status: false, message: "Something went wrong"});

	}
};

/*adds a product image*/
exports.addImage = async (req, res) => {
	upload(req, res, async (err) => {
		if (err) {
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


/*adds a new product*/
exports.create = async (req, res) => {
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
		const product = await Product.update({ '_id': req.params.id }, { $set: { 'deleted': true } });
		if (!product) {
			return res.status(500).send({status: false, message: "Unable to remove product"});
		}
		console.log('Product deleted');
		res.send({status: true, message: 'Product removed successfully'});
	} catch (err) {
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