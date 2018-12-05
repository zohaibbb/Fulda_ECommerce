import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';



const Schema = mongoose.Schema;

var ProfileSchema = new Schema({  
    firstname: {type: String,required: true },
    lastname: { type: String, required: true},
    mobilenumber:{ type: String, required: true},
    address:{ type: String},
    imagepath:{ type: String},
    rate:{ type: Number, default: 0 },
    userid: {type: Schema.Types.ObjectId,ref: 'User',required: true}
  }, {versionKey: false});

ProfileSchema.plugin(mongoosePaginate);

module.exports = {
    Profile: mongoose.model('Profile',ProfileSchema)
  }
  