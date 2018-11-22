import mongoose from 'mongoose';
import res from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import User from '../models/user';
//const User = mongoose.model('user');

exports.list = async (req, res) => {
  const user = await User.find();
  res.send(user);
  console.log(user);
};

exports.read = function(req, res) {
 User.findById(req.params.id, function(err, user) {
  if (err) return res.send(err);
 if (!req.currentUser.canRead(user)) return res.sendForbidden(res);
 res.json(user);
   });
};

exports.create = function(req, res) {
  // const newUser = new User(req.body);
  // newUser.role = 'user';
  // newUser.save(function(err, user) {
  //   if (err) return res.sendBadRequest(res, err);
  //   res.sendCreated(res, user);
  // });
};

exports.update = function(req, res) {
  // const user = req.body;
  // delete user.role;
  // if (!req.currentUser.canEdit({ _id: req.params.id })) return res.sendForbidden(res);
  // User.findOneAndUpdate({ _id: req.params.id }, user, { new: true, runValidators: true }, function(err, user) {
  //   if (err) return res.sendBadRequest(res, err);
  //   res.json(user);
  // });
};

exports.delete = function(req, res) {
  // User.remove({ _id: req.params.id }, function(err, user) {
  //   if (err) return res.send(err);
  //   if (!req.currentUser.canEdit(user)) return res.sendForbidden(res);
  //   res.json({ message: 'User successfully deleted' });
  // });
};

exports.loadUser = function (req, res, next) {
  // User.findById(req.params.userId, function (err, user) {
  //   if (err) return res.sendNotFound(res);
  //   if (!req.locals) req.locals = {};
  //   req.locals.user = user;
  //   next();
  // });
};