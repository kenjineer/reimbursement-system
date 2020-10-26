const chai = require('chai');
const chaiHttp = require('chai-http');
const loginServer = require('../login').loginApp;

chai.should();
chai.use(chaiHttp);

describe('Login API', () => {
	describe('GET /api/login', () => {
		it('It should GET login page', (done) => {
			chai.request(loginServer)
				.get('/api/login')
				.end((err, res) => {
					const checkObj = {
						message: 'Login page loaded.',
					};

					res.should.have.status(200);
					res.body.should.be.eql(checkObj);
					done();
				});
		});
	});

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
					res.should.have.status(201);
					res.body.user.should.not.be.eql(false);
					res.body.user._userId.should.be.eql(user.username);
					res.body.jwt.should.have.property('token');
					res.body.jwt.expires.should.be.eql('8hr');
					done();
				});
		});

		it('It should POST login credentials using email', (done) => {
			const user = {
				username: 'kckaramihan@gmail.com',
				password: 'kenken',
			};
			chai.request(loginServer)
				.post('/api/login')
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.user.should.not.be.eql(false);
					res.body.user.email.should.be.eql(user.username);
					res.body.jwt.should.have.property('token');
					res.body.jwt.expires.should.be.eql('8hr');
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
					res.should.have.status(201);
					res.body.user.should.not.be.eql(false);
					res.body.user.username.should.be.eql(user.username);
					res.body.jwt.should.have.property('token');
					res.body.jwt.expires.should.be.eql('8hr');
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
						message: 'No user with that id/username/email.',
					};

					res.should.have.status(401);
					res.body.user.should.be.eql(false);
					res.body.jwt.should.be.eql(checkObj);
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
						message: 'No user with that id/username/email.',
					};

					res.should.have.status(401);
					res.body.user.should.be.eql(false);
					res.body.jwt.should.be.eql(checkObj);
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
						message: 'No user with that id/username/email.',
					};

					res.should.have.status(401);
					res.body.user.should.be.eql(false);
					res.body.jwt.should.be.eql(checkObj);
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
						message: 'No user with that id/username/email.',
					};

					res.should.have.status(401);
					res.body.user.should.be.eql(false);
					res.body.jwt.should.be.eql(checkObj);
					done();
				});
		});
	});
});
