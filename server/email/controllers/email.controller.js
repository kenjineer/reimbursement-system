const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const util = require('util');
const User = require('../models/user.model');
const Reimbursement = require('../models/reimbursement.model');
const getAuthUser = require('../passport-config').getAuthUser;

// Transporter config
const CONFIG = {
	host: 'webmail.awsys-i.com',
	port: 25,
};

// ROUTE /api/v1/email/approval/:_reimbursementId
// Send reimbursement approval email to employee.
exports.postApprovalEmail = async (req, res) => {
	// Get Manager information
	const manager = getAuthUser();

	try {
		// Get Approved Reimbursement by _reimbursementId and _managerId
		const [aprReimbursement] = await Reimbursement.readReimbursementsMgr(
			res.params._reimbursementId,
			2,
			manager._userId
		);

		// Get Employee by _employeeId
		const [employee] = await User.readUserEmployee(aprReimbursement[0]._employeeId);

		// Setup mail transporter
		const transporter = nodemailer.createTransport(CONFIG);

		// Render Approval HTML template
		req.app.renderAsync = util.promisify(req.app.render);
		const approvalHtmlBody = await req.app.renderAsync('views/body/approvedMail', {
			pageTitle: 'Approval',
			_reimbursementId: res.params._reimbursementId,
			employee: employee[0],
			aprReimbursement: aprReimbursement[0],
			manager: manager,
			remarks: res.body.remarks,
		});

		// Create mail options
		const mailOptions = {
			from: manager.email, // Sender Address
			to: employee[0].email, // Receiver Address
			subject: '【RTS】Reimbursement Application: Approved', // Subject Line
			html: approvalHtmlBody, // Mail Body
		};

		// Send Approval Mail
		await transporter.sendMail(mailOptions);

		// Return acknowledgement response
		return res.sendStatus(200);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send({ error_message: 'Cannot connect to database / System Error' });
	}
};

// ROUTE /api/v1/email/rejection/:_reimbursementId
// Send reimbursement rejection email to employee.
exports.postRejectionEmail = async (req, res) => {
	// Get Manager information
	const manager = getAuthUser();

	try {
		// Get Approved Reimbursement by _reimbursementId and _managerId
		const [rjtReimbursement] = await Reimbursement.readReimbursementsMgr(
			res.params._reimbursementId,
			0,
			manager._userId
		);

		// Get Employee by _employeeId
		const [employee] = await User.readUserEmployee(rjtReimbursement[0]._employeeId);

		// Setup mail transporter
		const transporter = nodemailer.createTransport(CONFIG);

		// Render Rejection HTML template
		req.app.renderAsync = util.promisify(req.app.render);
		const rejectionHtmlBody = await req.app.renderAsync('views/body/rejectedMail', {
			pageTitle: 'Rejection',
			_reimbursementId: res.params._reimbursementId,
			employee: employee[0],
			rjtReimbursement: rjtReimbursement[0],
			manager: manager,
			remarks: res.body.remarks,
		});

		// Create mail options
		const mailOptions = {
			from: manager.email, // Sender Address
			to: employee[0].email, // Receiver Address
			subject: '【RTS】Reimbursement Application: Rejected', // Subject Line
			html: rejectionHtmlBody, // Mail Body
		};

		// Send Approval Mail
		await transporter.sendMail(mailOptions);

		// Return acknowledgement response
		return res.sendStatus(200);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send({ error_message: 'Cannot send mail / System Error' });
	}
};

// ROUTE /api/v1/email/rejection/:_reimbursementId
// Send reimbursement release email to employee.
exports.postRejectionEmail = async (req, res) => {
	// Get Manager information
	const finOfficer = getAuthUser();

	try {
		// Get Approved Reimbursement by _reimbursementId and _managerId
		const [rlsReimbursement] = await Reimbursement.readReimbursementsMgr(
			res.params._reimbursementId
		);

		// Get Employee by _employeeId
		const [employee] = await User.readUserEmployee(rlsReimbursement[0]._employeeId);

		// Setup mail transporter
		const transporter = nodemailer.createTransport(CONFIG);

		// Render Rejection HTML template
		req.app.renderAsync = util.promisify(req.app.render);
		const releaseHtmlBody = await req.app.renderAsync('views/body/releasedMail', {
			pageTitle: 'Release',
			_reimbursementId: res.params._reimbursementId,
			employee: employee[0],
			rlsReimbursement: rlsReimbursement[0],
			finOfficer: finOfficer,
			remarks: res.body.remarks,
		});

		// Create mail options
		const mailOptions = {
			from: finOfficer.email, // Sender Address
			to: employee[0].email, // Receiver Address
			subject: '【RTS】Reimbursement Application: Released', // Subject Line
			html: releaseHtmlBody, // Mail Body
		};

		// Send Approval Mail
		await transporter.sendMail(mailOptions);

		// Return acknowledgement response
		return res.sendStatus(200);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send({ error_message: 'Cannot send mail / System Error' });
	}
};
