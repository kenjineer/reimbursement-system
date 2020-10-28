const dashboard = require('../dashboard');

exports.getDashboard = (req, res) => {
	const msgObj = {
		message: 'Login page loaded.',
	};
	res.status(200).send(msgObj);
};
