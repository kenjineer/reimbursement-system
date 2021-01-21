const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const dir = path.join(__dirname, '..', 'db', 'sql');

const createItem = path.join(dir, 'createRBIT.sql');
const readItems = path.join(dir, 'readITM.sql');
const updateItem = path.join(dir, 'updateRBIT.sql');
const deleteItem = path.join(dir, 'deleteRBIT.sql');
const deleteItems = path.join(dir, 'deleteRBIT-selectedRMB.sql');

module.exports = class Reimbursement {
	static createItem(_reimbursementId, item, qty, cost) {
		const item = fs.readFileSync(createItem).toString();
		return db.execute(item, [_reimbursementId, item, qty, cost]);
	}

	static readItems(_reimbursementId) {
		const item = fs.readFileSync(readItems).toString();
		return db.execute(item, [_reimbursementId]);
	}

	static updateItem(item, qty, cost, _itemId, _reimbursementId) {
		const item = fs.readFileSync(updateItem).toString();
		return db.execute(item, [item, qty, cost, _itemId, _reimbursementId]);
	}

	static deleteItem(_itemId, _reimbursementId) {
		const item = fs.readFileSync(deleteItem).toString();
		return db.execute(item, [_itemId, _reimbursementId]);
	}

	static deleteItems(_reimbursementIds) {
		const item = fs.readFileSync(deleteItems).toString();
		return db.execute(item, [_reimbursementIds]);
	}
};
