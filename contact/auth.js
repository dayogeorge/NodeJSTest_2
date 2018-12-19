var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/signUp_db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  passwordconfirmation: {
    type: String
  }
});

var User = mongoose.model('myuser', userSchema);

router.post('/signup', function(req, res, next) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var passwordconfirmation = req.body.passwordconfirmation;

	var newuser = new User();
	newuser.email = email;
	newuser.username = username;
	newuser.password = password;
	newuser.passwordconfirmation = passwordconfirmation;
	newuser.save(function(err, savedUser) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		res.send('Signup Successful');
	});
});

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({username: username, password: password}, function(err, user) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		if(!user) {
			return res.status(404).send();
		}
		req.session.user = user;
		res.send('Login Successful');
	});
}); 

router.get('/HomeScreen', function(req, res) {
	if(!req.session.user) {
		return res.status(401).send();
	}
	return res.status(200).send("WELCOME")
})

module.exports = router;

