import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  mobile_number: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  image_path: {
    type: String
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {versionKey: false});


module.exports = mongoose.model('Profile', profileSchema);
