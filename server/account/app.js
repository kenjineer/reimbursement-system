/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// Declare ports
const PORT = process.env.PORT || 3001;

// Import Express
const express = require('express');
const accountApp = express();

// Import Dependencies
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// Import Directories
const accountRoute = require('./routes/account.route');
const initializePassport = require('./passport-config').initialize;

// Initialize Passport Config
initializePassport(passport);

const corsOptions = {
	origin: process.env.WEB_URL,
};

accountApp.use(cors(corsOptions));
accountApp.disable('x-powered-by');
accountApp.use(bodyParser.urlencoded({ extended: false }));
accountApp.use(express.json());
accountApp.use(passport.initialize());

accountApp.use('/api/v1', passport.authenticate('jwt', { session: false }), accountRoute);

accountApp.listen(PORT, () => {
	console.log(`Account App listening on port ${PORT}`);
});

module.exports = accountApp;
