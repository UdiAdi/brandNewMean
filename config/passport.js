const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const config =  require('../config/database');

module.exports = function(passport){
	let opts = {};
	
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = config.secret;

	//console.log(opts);
	//console.log('Udit here :) ');

	passport.use(new JwtStrategy(opts, function(jwt_payload, done){
		
		//console.log('**************yoyo**************** ');
		//console.log(jwt_payload);
		//console.log('**************yoyo**************** ');

		User.getUserById(jwt_payload._id, function(err, user){
			if(err){
				//console.log('**************err**************** ');
				return done(err, false);
			}
			if(user){
				//console.log('**************user present**************** ');
				return done(null, user);
			}
			else{
				//console.log('**************password mismatch?**************** ');
				return done(null, false);
			}
		});
	}));
};