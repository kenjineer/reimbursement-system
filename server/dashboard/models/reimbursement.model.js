const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const readReimbursementRank = path.join(__dirname, '..', 'db', 'sql', 'readRMB-category.sql');
const readReimbursementPending = path.join(__dirname, '..', 'db', 'sql', 'readRMB-pending.sql');
const readReimbursementRecent = path.join(__dirname, '..', 'db', 'sql', 'readRMB-recent.sql');
const readReimbursementRejected = path.join(__dirname, '..', 'db', 'sql', 'readRMB-rejected.sql');

module.exports = class Reimbursement {
	static getCategoryRank(_userId, _managerId) {
		const reimbursement = fs.readFileSync(readReimbursementRank).toString();
		return db.execute(reimbursement, [_userId, _managerId]);
	}

	static getPendings(_userId, _managerId) {
		const reimbursement = fs.readFileSync(readReimbursementPending).toString();
		return db.execute(reimbursement, [_userId, _managerId]);
	}

	static getRecent(_userId, _managerId) {
		const reimbursement = fs.readFileSync(readReimbursementRecent).toString();
		return db.execute(reimbursement, [_userId, _managerId]);
	}

	static getRejected(_userId, _managerId) {
		const reimbursement = fs.readFileSync(readReimbursementRejected).toString();
		return db.execute(reimbursement, [_userId, _managerId]);
	}
};
