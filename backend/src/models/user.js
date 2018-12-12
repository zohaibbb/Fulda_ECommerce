import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum : ['buyer', 'seller', 'admin']
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {versionKey: false});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);