const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const bodyParser = require('body-parser');

const config =  require('../config/database');

// register
router.post('/register', function(req, res, next){
	let newUser = new User({
		name : req.body.name,
		email : req.body.email,
		username : req.body.username,
		password : req.body.password,
		faaltu : req.body.faaltu
	});

	User.getUserByUsername(newUser.username, function(err, user){
		if(user){
			res.json({success : false, msg : "user already exists...failed to register"});
		}
		else{
			User.addUser(newUser, function(err, user){
				if(err){
					res.json({success : false, msg : "error...failed to register"});
				}
				else{
					res.json({success : true, msg : "User registered"});
				}
			});
		}
	});

});



router.post('/authenticate', function(req, res, next){
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, function(err, user){
		if(err)
			throw err;
		if(!user){
			return res.json({success : false, msg : 'User not found'});
		}

		User.comparePassword(password, user.password, function(err, isMatch){
			if(err)
				throw err;
			if(isMatch){
				const token = jwt.sign(user.toJSON(), config.secret, {expiresIn : 604800});
				res.json({
					success : true,
					token : 'JWT ' + token,
					user : {
						id : user._id,
						name : user.name,
						username : user.username,
						email : user.email
					}
				});
			}
			else{
				res.json({success : false, msg : "Password doesn't match"});
			}
		});
	});
});

router.get('/profile', passport.authenticate('jwt', {session : false}), function(req, res, next){
	res.json({user : req.user});
});





router.post('/usersearch/:id', function(req, res, next){

const iddd = req.param.id;
console.log('udit' + iddd);

//alert('inside usersearch');
console.log('inside usersearch');


	const sq = req.body.srch;
	console.log(sq);
	User.getUserByUsername(sq, function(err, userrr){
		if(err)
			throw err;
		if(!userrr){
			console.log('not foundd!!');
			return res.json({success : false, msg : 'User not found'});
		}
		else{
			console.log('Foundd!!');
			return res.json({success : true, userrr : { id : userrr.id, name : userrr.name, username : userrr.username}});	
		}
	});

	//res.json({'haha' : 'hoho'});
});


// router.get('/usersearch/:id', function(req, res, next){

// console.log(id);
// alert(id);

// console.log('inside usersearch id wala');
// alert('inside usersearch id wala');

// 	// const sq = req.body.srch;
// 	// console.log(sq);
// 	// User.getUserByUsername(sq, function(err, userrr){
// 	// 	if(err)
// 	// 		throw err;
// 	// 	if(!userrr){
// 	// 		console.log('not foundd!!');
// 	// 		return res.json({success : false, msg : 'User not found'});
// 	// 	}
// 	// 	else{
// 	// 		console.log('Foundd!!');
// 	// 		return res.json({success : true, userrr : { id : userrr.id, name : userrr.name, username : userrr.username}});	
// 	// 	}
// 	// });

// 	//res.json({'haha' : 'hoho'});
// });





module.exports = router;