/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// Declare ports
const PORT = process.env.PORT || 3004;

// Import Express
const express = require('express');
const emailApp = express();

// Import Dependencies
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// Import Directories
const emailRoute = require('./routes/email.route');
const User = require('./models/user.model');
const initializePassport = require('./passport-config').initialize;

// Initialize Passport Config
// Initialize Passport Config
initializePassport(passport, (_userId) => {
	return User.readUserMgrFin(_userId);
});

const corsOptions = {
	origin: process.env.WEB_URL,
};

emailApp.use(cors(corsOptions));
emailApp.disable('x-powered-by');
emailApp.use(bodyParser.urlencoded({ extended: false }));
emailApp.use(express.json());
emailApp.use(passport.initialize());
emailApp.set('view engine', 'ejs');
emailApp.set('views', 'templates');

emailApp.use('/api/v1', passport.authenticate('jwt', { session: false }), emailRoute);

emailApp.listen(PORT, () => {
	console.log(`Email App listening on port ${PORT}`);
});

module.exports = emailApp;
