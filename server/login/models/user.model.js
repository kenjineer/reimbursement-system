const fs = require('fs');
const path = require('path');
const db = require('../db/db.config');

const readUserByEmail = path.join(__dirname, '..', 'db', 'sql', 'readUSR-email.sql');
const readUserById = path.join(__dirname, '..', 'db', 'sql', 'readUSR-id.sql');
const readUserByUsername = path.join(__dirname, '..', 'db', 'sql', 'readUSR-username.sql');

module.exports = class User {
	static getUserById(_userId) {
		const user = fs.readFileSync(readUserById).toString();
		return db.execute(user, [_userId]);
	}

	static getUserByUsername(username) {
		const user = fs.readFileSync(readUserByUsername).toString();
		return db.execute(user, [username]);
	}

	static getUserByEmail(email) {
		const user = fs.readFileSync(readUserByEmail).toString();
		return db.execute(user, [email]);
	}
};
