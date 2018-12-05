import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';
import User from '../models/user';
import Profile from '../models/profile';

//const User = mongoose.model('user');

//fetch userProfile by id

exports.read = async (req, res) => {
  console.log(Profile);
  try{
    let profile = await Profile.findById(req.params.id);
    console.log("User Profile is"+ profile);
		if (!profile) 
			return res.status(404).send(new Error('Not Found Error', ['Profile not found ']));
		else{
			console.log(profile);
			res.send(profile);
		}
	}catch(err){
		 console.log("Error : While retrieving user");
		 return res.status(500).send(new Error('Unknown server error', ['Unknown server error when trying to retrieve product']));
		
	}
};

//which error code to return if the user is not logged in


exports.create = function (req, res) {

  const newUser = new User();
  newUser.password = req.body.plainPassword;
  newUser.role = req.body.role;
  newUser.email = req.body.email;
  // newUser.role = 'user';
  newUser.save(function (err, user) {
    if (err) {
      console.log("err", err)
      return res.json(err);
    }
    console.log("user", user)
    const newUserProfile = new Profile();
    newUserProfile.firstname = req.body.firstname;
    newUserProfile.lastname = req.body.lastname;
    newUserProfile.mobilenumber = req.body.mobilenumber;
    newUserProfile.address = req.body.address;
    newUserProfile.rate = req.body.rate;
    newUserProfile.userid = user._id;

    newUserProfile.save(function (err, userProfile) {
      if (err) {
        console.log("err", err)
        return res.json(err);
      }
      console.log("userProfile", userProfile)
      response.sendCreated(res, userProfile);
    });
  });
};

exports.update = function (req, res) {
  // const user = req.body;
  // delete user.role;
  // if (!req.currentUser.canEdit({ _id: req.params.id })) return response.sendForbidden(res);
  // User.findOneAndUpdate({ _id: req.params.id }, user, { new: true, runValidators: true }, function(err, user) {
  //   if (err) return response.sendBadRequest(res, err);
  //   res.json(user);
  // });
};

exports.delete = function (req, res) {
  // User.remove({ _id: req.params.id }, function(err, user) {
  //   if (err) return response.send(err);
  //   if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);
  //   res.json({ message: 'User successfully deleted' });
  // });
};

exports.loadUser = function (req, res, next) {
  // User.findById(req.params.userId, function (err, user) {
  //   if (err) return response.sendNotFound(res);
  //   if (!req.locals) req.locals = {};
  //   req.locals.user = user;
  //   next();
  // });
};