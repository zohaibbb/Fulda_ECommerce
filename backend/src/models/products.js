import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

var productSchema = new Schema({
	seller_id:String,
  name:String,
  created_at:{type:Date,default:Date.now},
  description:String,
  condition:String,
  approved: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  price: Number,
  image_path: {
    type: String,
    default: ''
  },
  category_id:String
}, {versionKey: false});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
