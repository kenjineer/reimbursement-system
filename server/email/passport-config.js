const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const user = [];

// Get logged-in user information
exports.getAuthUser = () => {
	return user[0];
};

exports.initialize = (passport, readUserMgrFin) => {
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
				// Get user information by _userId
				user.length = 0;
				const [result] = await readUserMgrFin(jwtPayload.sub);
				user.push(result[0]);
				return done(null, user[0]);
			} catch (err) /* istanbul ignore next */ {
				done(err);
			}
		})
	);
};
