const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const dir = path.join(__dirname, '..', 'db', 'sql');

const createItem = path.join(dir, 'createITM.sql');
const readItems = path.join(dir, 'readITM.sql');
const updateItem = path.join(dir, 'updateITM.sql');
const deleteItem = path.join(dir, 'deleteITM.sql');
const deleteItems = path.join(dir, 'deleteITM-selectedRMB.sql');

module.exports = class Reimbursement {
	static createItem(_reimbursementId, newItem, qty, cost) {
		const item = fs.readFileSync(createItem).toString();
		return db.execute(item, [_reimbursementId, newItem, qty, cost]);
	}

	static readItems(_reimbursementId) {
		const item = fs.readFileSync(readItems).toString();
		return db.execute(item, [_reimbursementId]);
	}

	static updateItem(itemUpdate, qty, cost, _itemId, _reimbursementId) {
		const item = fs.readFileSync(updateItem).toString();
		return db.execute(item, [itemUpdate, qty, cost, _itemId, _reimbursementId]);
	}

	static deleteItem(_itemId, _reimbursementId) {
		const item = fs.readFileSync(deleteItem).toString();
		return db.execute(item, [_itemId, _reimbursementId]);
	}

	static deleteItems(_reimbursementId) {
		const item = fs.readFileSync(deleteItems).toString();
		return db.execute(item, [_reimbursementId]);
	}
};
