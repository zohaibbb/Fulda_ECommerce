import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

var productCategoriesSchema = new Schema({
  name:String,
  description:String
}, {versionKey: false});

productCategoriesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product_categories', productCategoriesSchema);