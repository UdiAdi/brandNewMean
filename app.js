const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');



//mongodb connection
const config = require('./config/database');
mongoose.connect(config.database);

//console.log('111' + config.database);

mongoose.connection.on('connected', function(err){
	//console.log('222' + config.database);

	if(err)
		console.log(err);
	else
		console.log(config.database);
});

mongoose.connection.on('open', function(err) {
  	//console.log("333 Mongo server open on " + config.database);
  	if(err)
		console.log(err);
	else
		console.log("Mongo server open on " + config.database);
});

mongoose.connection.on('error', function(err){
	console.log('Error : ', + err);
});

mongoose.connection.on('disconnected', function(){
	console.log('disconnected');
});



// instance of express
const app = express();

const users = require('./routes/users');

// udit deploy 
/////////////////////////////////////////

const port = 3000;
//const port = process.env.PORT || 8000;

/////////////////////////////////////////


app.use(cors());

// static folder for client side
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());



app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// all routing done here
app.use('/users', users);




// starting route ???
app.get('/', function(req, res){
	res.send('Invalid endpoint');
});


// udit deploy 
/////////////////////////////////////////

// app.get('*', function(req, res){
// 	res.sendFile(path.join(__dirname, 'public/index.html'));
// });

/////////////////////////////////////////


// starting up the server
app.listen(port, function(){
	console.log('Server started on port ' + port);
});
