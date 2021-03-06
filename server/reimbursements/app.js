/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// Declare ports
const PORT = process.env.PORT || 3003;

// Import Express
const express = require('express');
const reimbursementApp = express();

// Import Dependencies
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// Import Directories
const reimbursementsRoute = require('./routes/reimbursements.route');
const User = require('./models/user.model');
const initializePassport = require('./passport-config').initialize;

// Initialize Passport Config
initializePassport(passport, (_userId) => {
	return User.readUserById(_userId);
});

const corsOptions = {
	origin: process.env.WEB_URL,
};

reimbursementApp.use(cors(corsOptions));
reimbursementApp.disable('x-powered-by');
reimbursementApp.use(bodyParser.urlencoded({ extended: false }));
reimbursementApp.use(express.json());
reimbursementApp.use(passport.initialize());

reimbursementApp.use(
	'/api/v1',
	passport.authenticate('jwt', { session: false }),
	reimbursementsRoute
);

reimbursementApp.listen(PORT, () => {
	console.log(`Reimbursements App listening on port ${PORT}`);
});

module.exports = reimbursementApp;
