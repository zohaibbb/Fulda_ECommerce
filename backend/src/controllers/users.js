import User from '../models/user';
import Profile from '../models/profile';
import _ from 'lodash';

exports.list = async (req, res) => {
  
  const search = req.query;
  console.log('search =>', search);
  let user;
	try{
		if (!search.hasOwnProperty('name')) {
			user = await User.find({deleted: false});
		}
		else {
			user = await User.find({ $text: { $search: search.name }, deleted: false })
		}
		if (!user) 
			return res.status(404).send({status: false, message: "No user found"});
		else{
			console.log(user);
			res.send(user);
		}
	}catch(err){
		 console.log("Error : While retrieving users");
		 return res.status(500).send({status: false, message: "Something went wrong"});
		
	}
};

exports.changePassword = async (req, res) => {
  const user = await User.update({ username: req.body.username }, { $set: { password: req.body.password }});
  console.log('change password  =>', user);
  if (!user) 
    res.send({status: false, message: 'Something went wrong'});
  
  res.send({status: true, message: 'Password Changed Successful'});
}

exports.login = async (req, res) => {
  try {
    console.log('login =>', req.body);
    let user = await User.findOne(req.body);
    console.log('login =>', user);
    if (!user) 
      return res.status(400).send({status: false, message: 'Incorrect credentials'});
  
    return res.status(200).send({status: true, message: 'Login Successful', user: _.omit(user, ['password'])});
  }
  catch (err) {
    console.log('errrr : ', err);
  }
}
exports.create = async (req, res) => {
  console.log('req.body => ', req.body);
  let params = req.body;
  const user = await User.create(req.body);
  if (!user) 
    return res.status(404).send(new Error('Registration Unsuccessful'));

  console.log('user => ', user);
  console.log('params => ', params);
  params['user_id'] = _.pick(user, ['_id']);
  const profile = await Profile.create(req.body);
  if (!profile) 
    return res.status(404).send(new Error('Registration Unsuccessful'));

  console.log('profile => ', profile);

  res.send({status: true, message: 'Signup Successful'});
};

exports.read = async function(req, res) {
 let user = await User.findById(req.params.id);
 if (!user) 
  return res.status(404).send({status: false, message: "No user found"});

  user = JSON.parse(JSON.stringify(user));
  user.profile = await Profile.findOne({user_id: user._id});
  if (!user.profile) 
    return res.status(404).send({status: false, message: "No user found"});

  return res.status(200).send({status: true, message: "Profile found", user});
};


exports.update = async (req, res) => {
  const profile = await Profile.findByIdAndUpdate(req.body.profile_id, { $set: req.body })
  if (!profile) 
    return res.status(404).send({status: false, message: "Profile not updated"});

  console.log(profile);
  return res.status(200).send({status: true, message: "Profile updated"});
};

exports.delete = async (req, res) => {
	try {
		const user = await User.update({ '_id': req.params.id }, { $set: { 'deleted': true } });
		if (!user) {
			return res.status(500).send({status: false, message: "Unable to remove user"});
		}
		console.log('User deleted');
		res.send({status: true, message: 'User removed successfully'});
	} catch (err) {
		return res.status(500).send({status: false, message: "Something went wrong"});
	}
};

exports.loadUser = function (req, res, next) {
  // User.findById(req.params.userId, function (err, user) {
  //   if (err) return res.sendNotFound(res);
  //   if (!req.locals) req.locals = {};
  //   req.locals.user = user;
  //   next();
  // });
};