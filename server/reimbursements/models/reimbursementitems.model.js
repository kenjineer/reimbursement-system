const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const createReimbursementItem = path.join(__dirname, '..', 'db', 'sql', 'createRBIT.sql');
const readReimbursementItems = path.join(__dirname, '..', 'db', 'sql', 'readRBIT.sql');
const updateReimbursementItem = path.join(__dirname, '..', 'db', 'sql', 'updateRBIT.sql');
const deleteReimbursementItems = path.join(__dirname, '..', 'db', 'sql', 'deleteRBIT.sql');

module.exports = class Reimbursement {
	static createReimbursementItem(_reimbursementId, item, qty, cost) {
		const reimbursement = fs.readFileSync(createReimbursementItem).toString();
		return db.execute(reimbursement, [_reimbursementId, item, qty, cost]);
	}

	static readReimbursementItems(_reimbursementIds) {
		const reimbursement = fs.readFileSync(readReimbursementItems).toString();
		return db.execute(reimbursement, [_reimbursementIds]);
	}

	static updateReimbursementItem(item, qty, cost, _itemId, _reimbursementId) {
		const reimbursement = fs.readFileSync(updateReimbursementItem).toString();
		return db.execute(reimbursement, [item, qty, cost, _itemId, _reimbursementId]);
	}

	static deleteReimbursementItems(_reimbursementIds) {
		const reimbursement = fs.readFileSync(deleteReimbursementItems).toString();
		return db.execute(reimbursement, [_reimbursementIds]);
	}
};
