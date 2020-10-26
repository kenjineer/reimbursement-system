const login = require('../login');

exports.getLogin = (req, res) => {
	const msgObj = {
		message: 'Login page loaded.',
	};
	res.status(200).send(msgObj);
};

exports.postLogin = (req, res, next) => {
	login.passport.authenticate('login', (err, user, info) => {
		const jsonRes = {
			user: user,
			jwt: info,
		};

		if (err) {
			throw err;
		}
		if (user) {
			res.status(201).send(jsonRes);
		} else {
			res.status(401).send(jsonRes);
		}
	})(req, res, next);
};
