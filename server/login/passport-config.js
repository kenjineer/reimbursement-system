const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');

function initialize(passport, getUserById, getUserByUsername, getUserByEmail) {
	const authenticateUser = async (username, password, done) => {
		const isEmail = joi.string().email().validate(username);
		const isId = joi.number().positive().integer().max(1231999999).validate(username);
		let user;

		if (!isEmail.error) {
			const [result] = await getUserByEmail(username);
			user = result[0];
		} else if (!isId.error) {
			const [result] = await getUserById(username);
			user = result[0];
		} else {
			const [result] = await getUserByUsername(username);
			user = result[0];
		}

		if (!user) {
			return done(null, false, { message: 'No user with that id/username/email.' });
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				const issuedJwt = await issueJwt(user);
				return done(null, user, issuedJwt);
			} else {
				return done(null, false, { message: 'Password incorrect.' });
			}
		} catch (e) {
			return done(e);
		}
	};

	passport.use('login', new LocalStrategy({ session: false }, authenticateUser));
	passport.serializeUser((user, done) => done(null, user._userId));
	passport.deserializeUser((_userId, done) => {
		return done(null, getUserById(_userId));
	});

	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.SESSION_SECRET,
		algorithms: ['HS256'],
	};

	passport.use('jwt', new JwtStrategy(options, authenticateUser));
}

function issueJwt(user) {
	const _userId = user._userId;
	const expiresIn = '8hr';
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
		expires: expiresIn,
	};
}

module.exports = initialize;
