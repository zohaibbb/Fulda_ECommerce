import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const orderSchema = new Schema({
  total: {
    type: Number,
    required: true
  },
  buyer_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {versionKey: false});


module.exports = mongoose.model('Order', orderSchema);
