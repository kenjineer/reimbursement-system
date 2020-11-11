const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const user = [];

exports.getAuthUser = () => {
	return user[0];
};

exports.initialize = (passport, getUserById) => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.SESSION_SECRET,
		algorithms: ['HS256'],
	};

	passport.use(
		'jwt',
		new JwtStrategy(options, async (jwtPayload, done) => {
			try {
				const [result] = await getUserById(jwtPayload.sub);
				user.push(result[0]);
				return done(null, user[0]);
			} catch (err) {
				done(err);
			}
		})
	);
};
