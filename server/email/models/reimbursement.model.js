const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const dir = path.join(__dirname, '..', 'db', 'sql');

const readReimbursementsMgr = path.join(dir, 'readRMB-mgr.sql');
const readReimbursementsFin = path.join(dir, 'readRMB-fin.sql');

module.exports = class Reimbursement {
	static readReimbursementsMgr(_reimbursementId, status, _userId) /* istanbul ignore next */ {
		const reimbursement = fs.readFileSync(readReimbursementsMgr).toString();
		return db.execute(reimbursement, [_reimbursementId, status, _userId]);
	}

	static readReimbursementsFin(_reimbursementId) /* istanbul ignore next */ {
		const reimbursement = fs.readFileSync(readReimbursementsFin).toString();
		return db.execute(reimbursement, [_reimbursementId]);
	}
};
