/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// Declare ports
const PORT = process.env.PORT || 3002;

// Import Express
const express = require('express');
const dashboardApp = express();

// Import Dependencies
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// Import Directories
const dashboardRoute = require('./routes/dashboard.route');
const User = require('./models/user.model');
const initializePassport = require('./passport-config').initialize;

// Initialize Passport Config
initializePassport(passport, (_userId) => {
	return User.readUserById(_userId);
});

const corsOptions = {
	origin: process.env.WEB_URL,
};

dashboardApp.use(cors(corsOptions));
dashboardApp.disable('x-powered-by');
dashboardApp.use(bodyParser.urlencoded({ extended: false }));
dashboardApp.use(express.json());
dashboardApp.use(passport.initialize());

dashboardApp.use('/api/v1', passport.authenticate('jwt', { session: false }), dashboardRoute);

dashboardApp.listen(PORT, () => {
	console.log(`Dashboard App listening on port ${PORT}`);
});

module.exports = dashboardApp;
