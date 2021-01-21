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

		it('It should GET user reimbursements when user is authorized.', (done) => {
			chai.request(dashboardServer)
				.get('/api/v1/dashboard')
				.set('Authorization', jwt)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('user').to.be.an('object');
					res.body.should.have.property('ctgReimbursements').to.be.an('array');
					res.body.should.have.property('pndReimbursements').to.be.an('array');
					res.body.should.have.property('rctReimbursements').to.be.an('array');
					res.body.should.have.property('rjtReimbursementCnt').to.be.a('number');
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

		it('It should NOT GET user reimbursements when user is unauthorized.', (done) => {
			chai.request(dashboardServer)
				.get('/api/v1/dashboard')
				.set('Authorization', jwt || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});
});
