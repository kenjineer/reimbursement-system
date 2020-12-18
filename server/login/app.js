if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// Declare ports
const PORT = process.env.PORT || 3000;

// Import Express
const express = require('express');
const loginApp = express();

// Import Dependencies
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// Import Directories
const loginRoute = require('./routes/login.route');
const User = require('./models/user.model');
const initializePassport = require('./passport-config').initialize;

// Initialize Passport Config
initializePassport(
	passport,
	(_userId) => {
		return User.readUserById(_userId);
	},
	(username) => {
		return User.readUserByUsername(username);
	},
	(email) => {
		return User.readUserByEmail(email);
	}
);

const corsOptions = {
	origin: process.env.WEB_URL,
};

loginApp.use(cors(corsOptions));
loginApp.disable('x-powered-by');
loginApp.use(bodyParser.urlencoded({ extended: false }));
loginApp.use(express.json());
loginApp.use(passport.initialize());

loginApp.use('/api', loginRoute);

loginApp.listen(PORT, () => {
	console.log(`Login App listening on port ${PORT}.`);
});

module.exports.loginApp = loginApp;
module.exports.passport = passport;
