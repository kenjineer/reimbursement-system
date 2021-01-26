const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const dir = path.join(__dirname, '..', 'db', 'sql');

const createReimbursement = path.join(dir, 'createRMB.sql');
const readReimbursementsEmp = path.join(dir, 'readRMB-emp.sql');
const readReimbursementsMgr = path.join(dir, 'readRMB-mgr.sql');
const readReimbursementsFin = path.join(dir, 'readRMB-fin.sql');
const updateReimbursement = path.join(dir, 'updateRMB.sql');
const updateReimbursementApprove = path.join(dir, 'updateRMB-approve.sql');
const updateReimbursementReject = path.join(dir, 'updateRMB-reject.sql');
const updateReimbursementRelease = path.join(dir, 'updateRMB-release.sql');
const deleteReimbursement = path.join(dir, 'deleteRMB.sql');

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

	static readReimbursementsEmp(_userId) {
		const reimbursement = fs.readFileSync(readReimbursementsEmp).toString();
		return db.execute(reimbursement, [_userId]);
	}

	static readReimbursementsMgr(_userId) {
		const reimbursement = fs.readFileSync(readReimbursementsMgr).toString();
		return db.execute(reimbursement, [_userId]);
	}

	static readReimbursementsFin(_userId) {
		const reimbursement = fs.readFileSync(readReimbursementsFin).toString();
		return db.execute(reimbursement, [_userId]);
	}

	static updateReimbursement(
		_categoryId,
		purpose,
		totalCost,
		plannedDate,
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
			remarks,
			_reimbursementId,
			_userId,
		]);
	}

	static updateReimbursementApprove(_reimbursementId) {
		const reimbursement = fs.readFileSync(updateReimbursementApprove).toString();
		return db.execute(reimbursement, [_reimbursementId]);
	}

	static updateReimbursementReject(_reimbursementId) {
		const reimbursement = fs.readFileSync(updateReimbursementReject).toString();
		return db.execute(reimbursement, [_reimbursementId]);
	}

	static updateReimbursementRelease(_reimbursementId) {
		const reimbursement = fs.readFileSync(updateReimbursementRelease).toString();
		return db.execute(reimbursement, [_reimbursementId]);
	}

	static deleteReimbursement(_reimbursementId) {
		const reimbursement = fs.readFileSync(deleteReimbursement).toString();
		return db.execute(reimbursement, [_reimbursementId]);
	}
};
