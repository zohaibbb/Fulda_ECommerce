import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

var productSchema = new Schema({
	seller_id:String,
  name:String,
  created_at:{type:Date,default:Date.now},
  description:String,
  condition:String,
  approvalStatus: Boolean,
  price: Number,
  imagePath:String,
  category_id:String
}, {versionKey: false});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
