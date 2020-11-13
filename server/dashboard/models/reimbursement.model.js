const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const readReimbursementByCategory = path.join(__dirname, '..', 'db', 'sql', 'readRMB-category.sql');
const readReimbursementPending = path.join(__dirname, '..', 'db', 'sql', 'readRMB-pending.sql');
const readReimbursementRecent = path.join(__dirname, '..', 'db', 'sql', 'readRMB-recent.sql');
const readReimbursementRejected = path.join(__dirname, '..', 'db', 'sql', 'readRMB-rejected.sql');

module.exports = class Reimbursement {
	static readReimbursementByCategory(_userId, _managerId) {
		const reimbursement = fs.readFileSync(readReimbursementByCategory).toString();
		return db.execute(reimbursement, [_userId, _managerId]);
	}

	static readReimbursementPending(_userId, _managerId) {
		const reimbursement = fs.readFileSync(readReimbursementPending).toString();
		return db.execute(reimbursement, [_userId, _managerId]);
	}

	static readReimbursementRecent(_userId, _managerId) {
		const reimbursement = fs.readFileSync(readReimbursementRecent).toString();
		return db.execute(reimbursement, [_userId, _managerId]);
	}

	static readReimbursementRejected(_userId, _managerId) {
		const reimbursement = fs.readFileSync(readReimbursementRejected).toString();
		return db.execute(reimbursement, [_userId, _managerId]);
	}
};
