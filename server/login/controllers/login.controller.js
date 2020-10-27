const login = require('../login');

exports.getLogin = (req, res) => {
	const msgObj = {
		message: 'Login page loaded.',
	};
	res.status(200).send(msgObj);
};

exports.postLogin = (req, res, next) => {
	login.passport.authenticate('login', (err, user, info) => {
		let jsonRes = {
			success: 0,
			message: 'Login failed.',
			jwt: info,
		};

		if (err) {
			res.status(500).send(err);
		}
		if (user) {
			jsonRes.success = 1;
			jsonRes.message = 'Logged in successfully.';

			res.status(201).send(jsonRes);
		} else {
			res.status(401).send(jsonRes);
		}
	})(req, res, next);
};
