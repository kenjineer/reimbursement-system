const mysql = require('mysql2');

const pool = mysql.createPool({
	host: process.env.MYSQL_URL,
	database: process.env.MYSQL_DATABASE,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
});

module.exports = pool.promise();
