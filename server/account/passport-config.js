const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const user = [];

// Get logged-in _userId
exports.getAuthUser = () => {
	return user[0];
};

exports.initialize = (passport) => {
	// Extract JWT from header
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.SESSION_SECRET,
		algorithms: ['HS256'],
	};

	passport.use(
		'jwt',
		new JwtStrategy(options, async (jwtPayload, done) => {
			try {
				// Get _userId from JWT
				user.length = 0;
				user.push(jwtPayload.sub);
				return done(null, user[0]);
			} catch (err) /* istanbul ignore next */ {
				done(err);
			}
		})
	);
};
