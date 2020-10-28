const login = require('../login');
const db = require('../db/db.config');

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
			login.client.end(true);
			db.end();
			res.status(201).send(jsonRes);
		} else {
			res.status(401).send(jsonRes);
		}
	})(req, res, next);
};
