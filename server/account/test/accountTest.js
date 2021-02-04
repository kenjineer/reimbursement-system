const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const accountServer = require('../app');
const db = require('../db/db.config');
const loginServerUrl = 'http://localhost:3000';
const usersDBDump = path.join(__dirname, 'db_dump', 'Users_Dump20210201.sql');

chai.should();
chai.use(chaiHttp);

let jwt;

describe('Account API', () => {
	describe('Authorized User', () => {
		before((done) => {
			const credentials = {
				username: '0902191173',
				password: 'kenken',
			};

			chai.request(loginServerUrl)
				.post('/api/v1/login')
				.send(credentials)
				.end((err, res) => {
					if (err) {
						console.log(err);
					} else {
						jwt = res.body.jwt.token;
					}

					done();
				});
		});

		it('It should GET user account info when user is authorized.', (done) => {
			const account = {
				account: {
					_userId: '0902191173',
					devName: 'Development B',
					officeCode: 'MKT 3F',
					positionName: 'Assistant Research and Development Engineer',
					nickname: 'Ken',
					firstname: 'Kenneth',
					middlename: 'Caro',
					lastname: 'Karamihan',
					suffix: null,
					username: 'kenken',
					email: 'kenneth.karamihan@awsys-i.com',
					gender: 0,
				},
			};

			chai.request(accountServer)
				.get('/api/v1/account')
				.set('Authorization', jwt)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.eql(account);
					done();
				});
		});

		it('It should PUT user account info with new password when user is authorized.', (done) => {
			const account = {
				nickname: 'Kenny',
				username: 'kenny',
				password: 'kennykenny',
			};

			chai.request(accountServer)
				.put('/api/v1/account')
				.set('Authorization', jwt)
				.send(account)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it('It should PUT user account info without password when user is authorized.', (done) => {
			const account = {
				nickname: 'Kenny',
				username: 'kenny',
				password: '',
			};

			chai.request(accountServer)
				.put('/api/v1/account')
				.set('Authorization', jwt)
				.send(account)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});

	describe('Unauthorized User', () => {
		beforeEach((done) => {
			const credentials = {
				username: '0902191173',
				password: 'incorrect',
			};

			chai.request(loginServerUrl)
				.post('/api/v1/login')
				.send(credentials)
				.end((err, res) => {
					if (err) {
						console.log(err);
					} else {
						jwt = res.body.jwt.token;
					}

					done();
				});
		});

		it('It should NOT GET user account info when user is unauthorized.', (done) => {
			chai.request(accountServer)
				.get('/api/v1/account')
				.set('Authorization', jwt || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT PUT user account info with new password when user is unauthorized.', (done) => {
			const account = {
				account: {
					_userId: '0902191173',
					devName: 'Development B',
					officeCode: 'MKT 3F',
					positionName: 'Assistant Research and Development Engineer',
					nickname: 'Ken',
					firstname: 'Kenneth',
					middlename: 'Caro',
					lastname: 'Karamihan',
					suffix: null,
					username: 'kenken',
					email: 'kenneth.karamihan@awsys-i.com',
					gender: 0,
				},
			};

			chai.request(accountServer)
				.put('/api/v1/account')
				.set('Authorization', jwt || '')
				.send(account)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT PUT user account info with new password when user is unauthorized.', (done) => {
			const account = {
				nickname: 'Kenny',
				username: 'kenny',
				password: 'kennykenny',
			};

			chai.request(accountServer)
				.put('/api/v1/dashboard')
				.set('Authorization', jwt || '')
				.send(account)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT PUT user account info without password when user is unauthorized.', (done) => {
			const account = {
				nickname: 'Kenny',
				username: 'kenny',
				password: '',
			};

			chai.request(accountServer)
				.put('/api/v1/dashboard')
				.set('Authorization', jwt || '')
				.send(account)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});
});
