const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const dir = path.join(__dirname, '..', 'db', 'sql');

const readUserEmployee = path.join(dir, 'readUSR-emp.sql');
const readUserMgrFin = path.join(dir, 'readUSR-mgrfin.sql');
const updateUser = path.join(dir, 'updateUSR.sql');

module.exports = class User {
	static readUserEmployee(_userId) {
		const user = fs.readFileSync(readUserEmployee).toString();
		return db.execute(user, [_userId]);
	}

	static readUserMgrFin(_userId) {
		const user = fs.readFileSync(readUserMgrFin).toString();
		return db.execute(user, [_userId]);
	}
};
