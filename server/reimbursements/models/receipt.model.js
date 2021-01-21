const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const dir = path.join(__dirname, '..', 'db', 'sql');

const createReceipt = path.join(dir, 'createRCT.sql');
const readReceipts = path.join(dir, 'readRCT.sql');
const deleteReceipt = path.join(dir, 'deleteRCT.sql');
const deleteReceipts = path.join(dir, 'deleteRCT-selectedRMB.sql');

module.exports = class Receipt {
	static createReceipt(_reimbursementId, type, fileName, image) {
		const receipt = fs.readFileSync(createReceipt).toString();
		return db.execute(receipt, [_reimbursementId, type, fileName, image]);
	}

	static readReceipts(_reimbursementId) {
		const receipt = fs.readFileSync(readReceipts).toString();
		return db.execute(receipt, [_reimbursementId]);
	}

	static deleteReceipt(_receiptId, _reimbursementId) {
		const receipt = fs.readFileSync(deleteReceipt).toString();
		return db.execute(receipt, [_receiptId, _reimbursementId]);
	}

	static deleteReceipts(_reimbursementIds) {
		const receipt = fs.readFileSync(deleteReceipts).toString();
		return db.execute(receipt, [_reimbursementIds]);
	}
};
