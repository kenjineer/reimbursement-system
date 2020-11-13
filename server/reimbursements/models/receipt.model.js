const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const createReceipt = path.join(__dirname, '..', 'db', 'sql', 'createRCT.sql');
const readReceipts = path.join(__dirname, '..', 'db', 'sql', 'readRCT.sql');
const deleteReceipt = path.join(__dirname, '..', 'db', 'sql', 'deleteRCT.sql');

module.exports = class Receipt {
	static createReceipt(_reimbursementId, fileName, image) {
		const receipt = fs.readFileSync(createReceipt).toString();
		return db.execute(receipt, [_reimbursementId, fileName, image]);
	}

	static readReceipts(_reimbursementId) {
		const receipt = fs.readFileSync(readReceipts).toString();
		return db.execute(receipt, [_reimbursementId]);
	}

	static deleteReceipt(_receiptId, _reimbursementId) {
		const receipt = fs.readFileSync(deleteReceipt).toString();
		return db.execute(receipt, [_receiptId, _reimbursementId]);
	}
};
