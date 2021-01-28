const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const dir = path.join(__dirname, '..', 'db', 'sql');

const readUserById = path.join(dir, 'readUSR.sql');
const readUserForUpdate = path.join(dir, 'readUSR-update.sql');
const updateUser = path.join(dir, 'updateUSR.sql');

module.exports = class User {
	static readUserById(_userId) {
		const user = fs.readFileSync(readUserById).toString();
		return db.execute(user, [_userId]);
	}

	static readUserForUpdate(_userId) {
		const user = fs.readFileSync(readUserForUpdate).toString();
		return db.execute(user, [_userId]);
	}

	static updateUser(userUpdate, _userId) {
		const user = fs.readFileSync(updateUser).toString();
		return db.execute(user, [
			userUpdate.nickname,
			userUpdate.username,
			userUpdate.password,
			_userId,
		]);
	}
};
