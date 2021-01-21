const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const dir = path.join(__dirname, '..', 'db', 'sql');

const readReimbursementCategorized = path.join(dir, 'readRMB-categorized.sql');
const readReimbursementPending = path.join(dir, 'readRMB-pending.sql');
const readReimbursementRecent = path.join(dir, 'readRMB-recent.sql');
const readReimbursementRejected = path.join(dir, 'readRMB-rejected.sql');

module.exports = class Reimbursement {
	static readReimbursementCategorized(_userId) {
		const reimbursement = fs.readFileSync(readReimbursementCategorized).toString();
		return db.execute(reimbursement, [_userId]);
	}

	static readReimbursementPending(_userId) {
		const reimbursement = fs.readFileSync(readReimbursementPending).toString();
		return db.execute(reimbursement, [_userId]);
	}

	static readReimbursementRecent(_userId) {
		const reimbursement = fs.readFileSync(readReimbursementRecent).toString();
		return db.execute(reimbursement, [_userId]);
	}

	static readReimbursementRejected(_userId) {
		const reimbursement = fs.readFileSync(readReimbursementRejected).toString();
		return db.execute(reimbursement, [_userId]);
	}
};
