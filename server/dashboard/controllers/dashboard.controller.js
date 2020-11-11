const Reimbursements = require('../models/reimbursement.model');
const User = require('../models/user.model');
const getAuthUser = require('../passport-config').getAuthUser;

exports.getUserDashboard = async (req, res) => {
	const user = getAuthUser();

	try {
		const [manager] = await User.getManagerByDev(user._devId);

		if (manager[0]) {
			const [categoryRank] = await Reimbursements.getCategoryRank(
				user._userId,
				manager[0]._userId
			);
			const [pendings] = await Reimbursements.getPendings(user._userId, manager[0]._userId);
			const [recent] = await Reimbursements.getRecent(user._userId, manager[0]._userId);
			const [rejectedCnt] = await Reimbursements.getRejected(
				user._userId,
				manager[0]._userId
			);

			const jsonRes = {
				success: 1,
				message: 'User info retrieved.',
				user: user,
				categoryRank: categoryRank,
				pendings: pendings,
				recent: recent,
				rejectedCnt: rejectedCnt[0].cnt,
			};

			return res.status(200).send(jsonRes);
		}
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};
