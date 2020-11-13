const chai = require('chai');
const chaiHttp = require('chai-http');
const dashboardServer = require('../app');
const loginServerUrl = 'http://localhost:3000';

chai.should();
chai.use(chaiHttp);

let jwt;

describe('Dashboard API', () => {
	describe('Authorized User', () => {
		before((done) => {
			const credentials = {
				username: 902191173,
				password: 'kenken',
			};

			chai.request(loginServerUrl)
				.post('/api/login')
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

		it('It should GET user reimbursements when user is authorized.', (done) => {
			chai.request(dashboardServer)
				.get('/api/dashboard')
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = 'User info retrieved.';

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					res.body.user.should.not.be.eql(undefined);
					res.body.categoryRank.should.not.be.eql(undefined);
					res.body.pendings.should.not.be.eql(undefined);
					res.body.recent.should.not.be.eql(undefined);
					res.body.rejectedCnt.should.not.be.eql(undefined);
					done();
				});
		});
	});

	describe('Unauthorized User', () => {
		beforeEach((done) => {
			const credentials = {
				username: 902191173,
				password: 'incorrect',
			};

			chai.request(loginServerUrl)
				.post('/api/login')
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

		it('It should NOT GET user reimbursements when user is unauthorized.', (done) => {
			chai.request(dashboardServer)
				.get('/api/dashboard')
				.set('Authorization', jwt || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});
});
