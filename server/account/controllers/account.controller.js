const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const getAuthUser = require('../passport-config').getAuthUser;

// ROUTE /api/v1/account/
// Get and return user account information by _userId.
exports.getUserAccount = async (req, res) => {
	// Get logged-in _userId
	const _userId = getAuthUser();

	try {
		// Get user information
		const [user] = await User.readUserById(_userId);

		// User Account response object
		const jsonRes = {
			account: user[0],
		};

		return res.status(200).send(jsonRes);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send({ error_message: 'Cannot connect to database / System Error' });
	}
};

// ROUTE /api/v1/account/
// Get and update user account information.
exports.putUserAccount = async (req, res) => {
	// Get logged-in _userId
	const _userId = getAuthUser();

	try {
		// Get user information
		const [user] = await User.readUserForUpdate(_userId);

		// Update user object
		user[0].nickname = req.body.nickname;
		user[0].username = req.body.username;

		if (!(await bcrypt.compare(req.body.password, user[0].password))) {
			const newPassword = await bcrypt.hash(req.body.password, 10);
			console.log(user[0], newPassword);
			user[0].password = newPassword;
		}

		// Update User by _userId
		await User.updateUser(user[0], _userId);

		// Return acknowledgement response
		return res.status(200).send();
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send({ error_message: 'Cannot connect to database / System Error' });
	}
};
