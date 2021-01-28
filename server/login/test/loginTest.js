const chai = require('chai');
const chaiHttp = require('chai-http');
const loginServer = require('../app').loginApp;

chai.should();
chai.use(chaiHttp);

describe('Login API', () => {
	describe('POST /api/v1/login', () => {
		it('It should POST login credentials using id', (done) => {
			const user = {
				username: '090219-1173',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const loginMsg = 'Logged in successfully.';

					res.should.have.status(201);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(loginMsg);
					res.body.jwt.should.have.property('token');
					res.body.jwt.expiryNum.should.be.eql(8);
					res.body.jwt.datetimeType.should.be.eql('h');
					res.body.jwt.auth.should.be.a('number');
					done();
				});
		});

		it('It should POST login credentials using email', (done) => {
			const user = {
				username: 'kenneth.karamihan@awsys-i.com',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const loginMsg = 'Logged in successfully.';

					res.should.have.status(201);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(loginMsg);
					res.body.jwt.should.have.property('token');
					res.body.jwt.expiryNum.should.be.eql(8);
					res.body.jwt.datetimeType.should.be.eql('h');
					res.body.jwt.auth.should.be.a('number');
					done();
				});
		});

		it('It should POST login credentials using username', (done) => {
			const user = {
				username: 'kenken',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const loginMsg = 'Logged in successfully.';

					res.should.have.status(201);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(loginMsg);
					res.body.jwt.should.have.property('token');
					res.body.jwt.expiryNum.should.be.eql(8);
					res.body.jwt.datetimeType.should.be.eql('h');
					res.body.jwt.auth.should.be.a('number');
					done();
				});
		});

		it('It should NOT POST login credentials using id with incorrect format', (done) => {
			const user = {
				username: '123456-78901',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							error_message: 'No user with that id/username/email.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});

		it('It should NOT POST login credentials using non-existing id', (done) => {
			const user = {
				username: '123199-9999',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							error_message: 'No user with that id/username/email.',
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
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							error_message: 'No user with that id/username/email.',
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
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							error_message: 'No user with that id/username/email.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});

		it('It should NOT POST login credentials using id with incorrect password', (done) => {
			const user = {
				username: '090219-1173',
				password: 'incorrect',
			};
			chai.request(loginServer)
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							error_message: 'Password incorrect.',
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
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							error_message: 'Password incorrect.',
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
				.post('/api/v1/login')
				.send(user)
				.end((err, res) => {
					const checkObj = {
						success: 0,
						message: 'Login failed.',
						jwt: {
							error_message: 'Password incorrect.',
						},
					};

					res.should.have.status(401);
					res.body.should.be.eql(checkObj);
					done();
				});
		});
	});
});
