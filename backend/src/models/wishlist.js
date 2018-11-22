import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

// Creating wishlist schema
const Schema = mongoose.Schema;
var wishListSchema = new Schema({
  buyer_id:String,
  seller_id: {type: String},
  product_id:{type:Date,default:Date.now},
  order_id:String,
 
});

wishListSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Wishlist', wishListSchema);