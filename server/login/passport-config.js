const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');

exports.initialize = (passport, readUserById, readUserByUsername, readUserByEmail) => {
	const authenticateUser = async (username, password, done) => {
		try {
			// Validate credential type
			const isEmail = joi.string().email().validate(username);
			const isNum = joi.number().validate(username.replace('-', ''));
			const isId = joi.string().min(7).max(10).validate(username.replace('-', ''));
			let user;

			if (!isEmail.error) {
				// Validated as email successfully
				const [result] = await readUserByEmail(username);
				user = result[0];
			} else if (!isNum.error && !isId.error) {
				// Validated as _userId successfully
				const [result] = await readUserById(isId.value);
				user = result[0];
			} else {
				// Validated as username
				const [result] = await readUserByUsername(username);
				user = result[0];
			}

			if (!user) {
				// Validate user existence
				return done(null, false, { error_message: 'No user with that id/username/email.' });
			}

			if (await bcrypt.compare(password, user.password)) {
				// Validate login password
				const issuedJwt = await issueJwt(user);
				return done(null, user, issuedJwt);
			} else {
				return done(null, false, { error_message: 'Password incorrect.' });
			}
		} catch (err) /* istanbul ignore next */ {
			console.log(err);
			return done(err);
		}
	};

	passport.use('login', new LocalStrategy({ session: false }, authenticateUser));
	passport.serializeUser((user, done) => done(null, user._userId));
};

const issueJwt = (user) => {
	const _userId = user._userId;
	const expiryNum = 8;
	const datetimeType = 'h';
	const expiresIn = `${expiryNum}${datetimeType}`;

	// Create JWT payload
	const payload = {
		sub: _userId,
		iat: Date.now(),
	};

	// Create a signed JWT with payload
	const signedToken = jwt.sign(payload, process.env.SESSION_SECRET, {
		expiresIn: expiresIn,
		algorithm: 'HS256',
	});

	return {
		token: `Bearer ${signedToken}`,
		expiryNum: expiryNum,
		datetimeType: datetimeType,
	};
};
