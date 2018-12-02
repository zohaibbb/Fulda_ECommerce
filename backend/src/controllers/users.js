import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import UserAndProfile from '../models/user';

var User = UserAndProfile.User;
var Profile = UserAndProfile.Profile;

//const User = mongoose.model('user');

exports.list = async (req, res) => {
  const user = await User.find();
  response.send(user);
  console.log(user);
};

exports.read = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return response.send(err);
    if (!req.currentUser.canRead(user)) return response.sendForbidden(res);
    res.json(user);
  });
};

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