const Reimbursements = require('../models/reimbursement.model');
const User = require('../models/user.model');
const getAuthUser = require('../passport-config').getAuthUser;

exports.getUserReimbursements = async (req, res) => {
	const user = getAuthUser();

	try {
		const [manager] = await User.getManagerByDev(user._devId);

		if (manager[0]) {
			const [reimbursements] = await Reimbursements.getReimbursements(
				user._userId,
				manager[0]._userId
			);

			const jsonRes = {
				success: 1,
				message: 'User info retrieved.',
				user: user,
				reimbursements: reimbursements,
			};

			return res.status(200).send(jsonRes);
		}
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};
