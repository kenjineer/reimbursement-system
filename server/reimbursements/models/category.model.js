const path = require('path');
const fs = require('fs');
const db = require('../db/db.config');

const dir = path.join(__dirname, '..', 'db', 'sql');

const readCategories = path.join(dir, 'readCAT.sql');

module.exports = class Receipt {
	static readCategories() {
		const receipt = fs.readFileSync(readCategories).toString();
		return db.execute(receipt);
	}
};
