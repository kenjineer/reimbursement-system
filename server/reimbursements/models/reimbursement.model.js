const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const createReimbursement = path.join(__dirname, '..', 'db', 'sql', 'createRMB.sql');
const readReimbursements = path.join(__dirname, '..', 'db', 'sql', 'readRMB.sql');
const updateReimbursement = path.join(__dirname, '..', 'db', 'sql', 'updateRMB.sql');
const deleteReimbursements = path.join(__dirname, '..', 'db', 'sql', 'deleteRMB.sql');

module.exports = class Reimbursement {
	static createReimbursement(
		_userId,
		_managerId,
		_categoryId,
		purpose,
		totalCost,
		plannedDate,
		remarks
	) {
		const reimbursement = fs.readFileSync(createReimbursement).toString();
		return db.execute(reimbursement, [
			_userId,
			_managerId,
			_categoryId,
			purpose,
			totalCost,
			plannedDate,
			remarks,
		]);
	}

	static readReimbursements(_userId) {
		const reimbursement = fs.readFileSync(readReimbursements).toString();
		return db.execute(reimbursement, [_userId]);
	}

	static updateReimbursement(
		_categoryId,
		purpose,
		totalCost,
		plannedDate,
		submittedDate,
		remarks,
		_reimbursementId,
		_userId
	) {
		const reimbursement = fs.readFileSync(updateReimbursement).toString();
		return db.execute(reimbursement, [
			_categoryId,
			purpose,
			totalCost,
			plannedDate,
			submittedDate,
			remarks,
			_reimbursementId,
			_userId,
		]);
	}

	static deleteReimbursements(_reimbursementIds) {
		const reimbursement = fs.readFileSync(deleteReimbursements).toString();
		return db.execute(reimbursement, [_reimbursementIds]);
	}
};
