require('dotenv').config();

// Declare ports
const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.PORT || 6379;

// Import Redis
const redis = require('redis');
const RedisServer = require('redis-server');
const server = new RedisServer(REDIS_PORT);
const client = redis.createClient(REDIS_PORT);
server.open((err) => {
	if (err === null) {
		console.log(`Redis server is up on port ${REDIS_PORT}.`);
	}
});
client.on('ready', function (err) {
	console.log('Redis up! Now connecting the client...');
});

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

let corsOptions = {
	origin: process.env.WEB_URL,
};

loginApp.use(cors(corsOptions));
loginApp.disable('x-powered-by');
loginApp.use(bodyParser.urlencoded({ extended: false }));
loginApp.use(express.json());
loginApp.use(passport.initialize());

loginApp.use('/api/user', loginRoute);

loginApp.listen(PORT, () => {
	console.log(`App listening on port ${PORT}.`);
});

module.exports.loginApp = loginApp;
module.exports.passport = passport;
module.exports.client = client;
