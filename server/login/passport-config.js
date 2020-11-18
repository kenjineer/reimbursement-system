const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');

exports.initialize = (passport, readUserById, readUserByUsername, readUserByEmail) => {
	const authenticateUser = async (username, password, done) => {
		try {
			const isEmail = joi.string().email().validate(username);
			const isId = joi.number().positive().integer().max(1231999999).validate(username);
			let user;

			if (!isEmail.error) {
				const [result] = await readUserByEmail(username);
				user = result[0];
			} else if (!isId.error) {
				const [result] = await readUserById(username);
				user = result[0];
			} else {
				const [result] = await readUserByUsername(username);
				user = result[0];
			}

			if (!user) {
				return done(null, false, { message: 'No user with that id/username/email.' });
			}

			if (await bcrypt.compare(password, user.password)) {
				const issuedJwt = await issueJwt(user);
				return done(null, user, issuedJwt);
			} else {
				return done(null, false, { message: 'Password incorrect.' });
			}
		} catch (err) {
			console.log(err);
			return done(err);
		}
	};

	passport.use('login', new LocalStrategy({ session: false }, authenticateUser));
	passport.serializeUser((user, done) => done(null, user._userId));
	passport.deserializeUser((_userId, done) => {
		try {
			return done(null, readUserById(_userId));
		} catch (err) {
			console.log(err);
			return done(err);
		}
	});
};

const issueJwt = (user) => {
	const _userId = user._userId;
	const expiryNum = 8;
	const datetimeType = 'h';
	const expiresIn = `${expiryNum}${datetimeType}`;
	const payload = {
		sub: _userId,
		iat: Date.now(),
	};

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
