const chai = require('chai');
const chaiHttp = require('chai-http');
const loginServer = require('../app').loginApp;

chai.should();
chai.use(chaiHttp);

describe('Login API', () => {
	describe('POST /api/login', () => {
		it('It should POST login credentials using id', (done) => {
			const user = {
				username: 902191173,
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const loginMsg = 'Logged in successfully.';

					res.should.have.status(201);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(loginMsg);
					res.body.jwt.should.have.property('token');
					res.body.jwt.expiryNum.should.be.eql(8);
					res.body.jwt.datetimeType.should.be.eql('h');
					done();
				});
		});

		it('It should POST login credentials using email', (done) => {
			const user = {
				username: 'kenneth.karamihan@awsys-i.com',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const loginMsg = 'Logged in successfully.';

					res.should.have.status(201);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(loginMsg);
					res.body.jwt.should.have.property('token');
					res.body.jwt.expiryNum.should.be.eql(8);
					res.body.jwt.datetimeType.should.be.eql('h');
					done();
				});
		});

		it('It should POST login credentials using username', (done) => {
			const user = {
				username: 'kenken',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const loginMsg = 'Logged in successfully.';

					res.should.have.status(201);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(loginMsg);
					res.body.jwt.should.have.property('token');
					res.body.jwt.expiryNum.should.be.eql(8);
					res.body.jwt.datetimeType.should.be.eql('h');
					done();
				});
		});

		it('It should NOT POST login credentials using id greater than 10 digits', (done) => {
			const user = {
				username: 12345678901,
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							message: 'No user with that id/username/email.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});

		it('It should NOT POST login credentials using non-existing id', (done) => {
			const user = {
				username: 1231999999,
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							message: 'No user with that id/username/email.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});

		it('It should NOT POST login credentials using non-existing email', (done) => {
			const user = {
				username: 'aoka@gmail.com',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							message: 'No user with that id/username/email.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});

		it('It should NOT POST login credentials using non-existing username', (done) => {
			const user = {
				username: 'tototot',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							message: 'No user with that id/username/email.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});

		it('It should NOT POST login credentials using id with incorrect password', (done) => {
			const user = {
				username: 902191173,
				password: 'incorrect',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							message: 'Password incorrect.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});

		it('It should NOT POST login credentials using email with incorrect password', (done) => {
			const user = {
				username: 'kenneth.karamihan@awsys-i.com',
				password: 'incorrect',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							message: 'Password incorrect.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});

		it('It should NOT POST login credentials using username with incorrect password', (done) => {
			const user = {
				username: 'kenken',
				password: 'incorrect',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							message: 'Password incorrect.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});
	});
});
