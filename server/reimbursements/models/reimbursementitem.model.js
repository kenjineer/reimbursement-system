const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const createReimbursementItem = path.join(__dirname, '..', 'db', 'sql', 'createRBIT.sql');
const readReimbursementItems = path.join(__dirname, '..', 'db', 'sql', 'readRBIT.sql');
const updateReimbursementItem = path.join(__dirname, '..', 'db', 'sql', 'updateRBIT.sql');
const deleteReimbursementItem = path.join(__dirname, '..', 'db', 'sql', 'deleteRBIT.sql');
const deleteReimbursementItems = path.join(
	__dirname,
	'..',
	'db',
	'sql',
	'deleteRBIT-selectedRMB.sql'
);

module.exports = class Reimbursement {
	static createReimbursementItem(_reimbursementId, item, qty, cost) {
		const reimbursementItem = fs.readFileSync(createReimbursementItem).toString();
		return db.execute(reimbursementItem, [_reimbursementId, item, qty, cost]);
	}

	static readReimbursementItems(_reimbursementId, _userId) {
		const reimbursementItem = fs.readFileSync(readReimbursementItems).toString();
		return db.execute(reimbursementItem, [_reimbursementId, _userId]);
	}

	static updateReimbursementItem(item, qty, cost, _itemId, _reimbursementId) {
		const reimbursementItem = fs.readFileSync(updateReimbursementItem).toString();
		return db.execute(reimbursementItem, [item, qty, cost, _itemId, _reimbursementId]);
	}

	static deleteReimbursementItem(_itemId, _reimbursementId) {
		const reimbursementItem = fs.readFileSync(deleteReimbursementItem).toString();
		return db.execute(reimbursementItem, [_itemId, _reimbursementId]);
	}

	static deleteReimbursementItems(_reimbursementIds) {
		const reimbursementItem = fs.readFileSync(deleteReimbursementItems).toString();
		return db.execute(reimbursementItem, [_reimbursementIds]);
	}
};
