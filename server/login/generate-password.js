const bcrypt = require('bcrypt');

bcrypt.hash('bert', 10, (createErr, hashedPassword) => {
	console.log(hashedPassword);
	bcrypt.compare('bert', hashedPassword, (compareErr, confirm) => {
		console.log(confirm);
	});
});
