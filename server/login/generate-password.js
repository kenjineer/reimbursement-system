const bcrypt = require('bcrypt');

bcrypt.hash('yuni', 10, (createErr, hashedPassword) => {
	console.log(hashedPassword);
	bcrypt.compare('yuni', hashedPassword, (compareErr, confirm) => {
		console.log(confirm);
	});
});
