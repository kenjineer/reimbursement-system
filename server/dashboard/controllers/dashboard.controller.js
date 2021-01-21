const Reimbursement = require('../models/reimbursement.model');
const User = require('../models/user.model');
const getAuthUser = require('../passport-config').getAuthUser;

// ROUTE /api/v1/dashboard
// Get and return categorized, pending, recent and rejected reimbursement, and user information.
exports.getUserDashboard = async (req, res) => {
	// Get user information
	const user = getAuthUser();

	try {
		// Get reimbursement information
		const [ctgReimbursements] = await Reimbursement.readReimbursementCategorized(user._userId);
		const [pndReimbursements] = await Reimbursement.readReimbursementPending(user._userId);
		const [rctReimbursements] = await Reimbursement.readReimbursementRecent(user._userId);
		const [rjtReimbursements] = await Reimbursement.readReimbursementRejected(user._userId);

		// Dashboard response object
		const jsonRes = {
			user: user,
			ctgReimbursements: ctgReimbursements,
			pndReimbursements: pndReimbursements,
			rctReimbursements: rctReimbursements,
			rjtReimbursementCnt: rjtReimbursements[0].cnt,
		};

		return res.status(200).send(jsonRes);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send({ error_message: 'Cannot connect to database / System Error' });
	}
};
