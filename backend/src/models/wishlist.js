import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

// Creating wishlist schema
const Schema = mongoose.Schema;
var wishListSchema = new Schema({
  buyer_id:String,
  seller_id: String,
  product_id:String,
  order_id:String,
 
}, {versionKey: false});

wishListSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Wishlist', wishListSchema);