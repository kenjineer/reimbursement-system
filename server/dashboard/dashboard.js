require('dotenv').config();

// Declare ports
const PORT = process.env.PORT || 3001;
const REDIS_PORT = process.env.PORT || 6380;

// Import Redis
const redis = require('redis');
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
const dashboardApp = express();

// Import Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Directories
// const loginRoute = require('./routes/login.route');
// const User = require('./models/user.model');

let corsOptions = {
	origin: process.env.WEB_URL,
};

dashboardApp.use(cors(corsOptions));
dashboardApp.disable('x-powered-by');
dashboardApp.use(bodyParser.urlencoded({ extended: false }));
dashboardApp.use(express.json());

dashboardApp.use('/api/user', loginRoute);

dashboardApp.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});

module.exports.dashboardApp = dashboardApp;
module.exports.client = client;