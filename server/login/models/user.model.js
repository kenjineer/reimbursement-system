const fs = require('fs');
const path = require('path');
const db = require('../db/db.config');
const redis = require('../login');

const readUserByEmail = path.join(__dirname, '..', 'db', 'sql', 'readUserByEmail.sql');
const readUserById = path.join(__dirname, '..', 'db', 'sql', 'readUserById.sql');
const readUserByUsername = path.join(__dirname, '..', 'db', 'sql', 'readUserByUsername.sql');

async function cache(key) {
	const { err, data } = await redis.client.get(key);
	if (err) throw err;
	return data;
}

module.exports = class User {
	static async getUserById(_userId) {
		const key = 'readUserById';
		let user = await cache(key);
		if (user) {
			return db.execute(user, [_userId]);
		}

		user = fs.readFileSync(readUserById).toString();

		// Set data to Redis
		redis.client.setex(key, 3600, user);

		return db.execute(user, [_userId]);
	}

	static async getUserByUsername(username) {
		const key = 'readUserByUsername';
		let user = await cache(key);
		if (user) {
			return db.execute(user, [username]);
		}

		user = fs.readFileSync(readUserByUsername).toString();

		// Set data to Redis
		redis.client.setex(key, 3600, user);

		return db.execute(user, [username]);
	}

	static async getUserByEmail(email) {
		const key = 'readUserByEmail';
		let user = await cache(key);
		if (user) {
			return db.execute(user, [email]);
		}

		user = fs.readFileSync(readUserByEmail).toString();

		// Set data to Redis
		redis.client.setex(key, 3600, user);

		return db.execute(user, [email]);
	}
};
