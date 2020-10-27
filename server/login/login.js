require('dotenv').config();

// Declare ports
const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.PORT || 6379;

// Import Redis
const redis = require('redis');
const client = redis.createClient(REDIS_PORT);

// Import Express
const express = require('express');
const loginApp = express();

// Import Dependencies
const bodyParser = require('body-parser');
const passport = require('passport');

// Import Directories
const loginRoute = require('./routes/login.route');
const User = require('./models/user.model');
const initializePassport = require('./passport-config');

// Initialize Passport Config
initializePassport(
	passport,
	(_userId) => {
		return User.getUserById(_userId);
	},
	(username) => {
		return User.getUserByUsername(username);
	},
	(email) => {
		return User.getUserByEmail(email);
	}
);

loginApp.disable('x-powered-by');
loginApp.use(bodyParser.urlencoded({ extended: false }));
loginApp.use(express.json());
loginApp.use(passport.initialize());

loginApp.use('/api', loginRoute);

loginApp.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});

module.exports.loginApp = loginApp;
module.exports.passport = passport;
module.exports.client = client;
