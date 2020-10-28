const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

function initialize(passport, getUserById) {
	const authenticateUser = async (jwtPayload, done) => {
		const [result] = await getUserById(jwtPayload.sub);
		let user = result[0];

		if (!user) {
			return done(null, false, { message: 'User not authorized!' });
		} else {
			return done(null, user);
		}
	};

	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.SESSION_SECRET,
		algorithms: ['HS256'],
	};

	passport.use('jwt', new JwtStrategy(options, authenticateUser));
}

module.exports = initialize;
