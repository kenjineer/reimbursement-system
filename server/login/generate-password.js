const bcrypt = require('bcrypt');

bcrypt.hash('kenken', 10, (createErr, hashedPassword) => {
	console.log(hashedPassword);
	bcrypt.compare('kenken', hashedPassword, (compareErr, confirm) => {
		console.log(confirm);
	});
});
