import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

var productSchema = new Schema({
  name:String,
  created_at: {
    type: Date, 
    default: Date.now
  },
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
  sold: {
    type: Boolean,
    default: false
  },
  category_id:String,
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {versionKey: false});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
