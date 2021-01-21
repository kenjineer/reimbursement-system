const login = require('../app');

// ROUTE /api/v1/login
// Verify user login credentials and return the JWT and expiration.
module.exports.postLogin = function (req, res, next) {
	try {
		login.passport.authenticate('login', (err, user, info) => {
			// Failed login response
			let jsonRes = {
				success: 0,
				message: 'Login failed.',
				jwt: info,
			};

			if (user) {
				// Success login response
				jsonRes.success = 1;
				jsonRes.message = 'Logged in successfully.';
				res.status(201).send(jsonRes);
			} else {
				// User unauthorized
				res.status(401).send(jsonRes);
			}
		})(req, res, next);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send({ error_message: 'Cannot connect to database / System Error' });
	}
};
