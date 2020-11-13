const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const readUserById = path.join(__dirname, '..', 'db', 'sql', 'readUSR.sql');
const readManagerByDev = path.join(__dirname, '..', 'db', 'sql', 'readUSR-manager.sql');

module.exports = class User {
	static readUserById(_userId) {
		const user = fs.readFileSync(readUserById).toString();
		return db.execute(user, [_userId]);
	}

	static readManagerByDev(_devId) {
		const user = fs.readFileSync(readManagerByDev).toString();
		return db.execute(user, [_devId]);
	}
};
