const chai = require('chai');
const chaiHttp = require('chai-http');
const emailServer = require('../app');
const sinon = require('sinon');
const Reimbursement = require('../models/reimbursement.model');
const loginServerUrl = 'http://localhost:3000';

chai.should();
chai.use(chaiHttp);

let jwt;

describe('Email API', () => {
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

		it('It should POST reimbursement approval email when user is authorized.', (done) => {
			const aprReimbursement = [
				[
					{
						_employeeId: '0902191173',
						categoryName: 'Travel',
						purpose: 'Sample Purpose 1',
						totalCost: '1000.00',
						plannedDate: new Date('2021-04-26 04:00:00').toISOString(),
						status: 2,
						approvalDate: new Date('2021-02-04 04:00:00').toISOString(),
						rejectionDate: null,
						createdDate: new Date('2021-02-03 04:00:00').toISOString(),
					},
				],
			];
			sinon.stub(Reimbursement, 'readReimbursementsMgr').resolves(aprReimbursement);
			const _reimbursementId = 1;
			const data = {
				remarks: 'Sample Remarks Approved',
			};
			chai.request(emailServer)
				.post(`/api/v1/email/approval/${_reimbursementId}`)
				.set('Authorization', jwt)
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		}).timeout(5000);

		it('It should POST reimbursement rejection email when user is authorized.', (done) => {
			const rjtReimbursement = [
				[
					{
						_employeeId: '0902191173',
						categoryName: 'Utilities',
						purpose: 'Sample Purpose 2',
						totalCost: '2000.00',
						plannedDate: new Date('2021-04-26 04:00:00').toISOString(),
						status: 0,
						approvalDate: null,
						rejectionDate: new Date('2021-02-04 04:00:00').toISOString(),
						createdDate: new Date('2021-02-03 04:00:00').toISOString(),
					},
				],
			];
			sinon.restore();
			sinon.stub(Reimbursement, 'readReimbursementsMgr').resolves(rjtReimbursement);
			const _reimbursementId = 1;
			const data = {
				remarks: 'Sample Remarks Rejected',
			};
			chai.request(emailServer)
				.post(`/api/v1/email/rejection/${_reimbursementId}`)
				.set('Authorization', jwt)
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		}).timeout(5000);

		it('It should POST reimbursement release email when user is authorized.', (done) => {
			const rlsReimbursement = [
				[
					{
						_employeeId: '0902191173',
						categoryName: 'Travel',
						purpose: 'Sample Purpose 3',
						totalCost: '1500.00',
						plannedDate: new Date('2021-04-26 04:00:00').toISOString(),
						status: 3,
						releaseDate: new Date('2021-02-04 04:00:00').toISOString(),
						createdDate: new Date('2021-02-03 04:00:00').toISOString(),
					},
				],
			];
			sinon.restore();
			sinon.stub(Reimbursement, 'readReimbursementsFin').resolves(rlsReimbursement);
			const _reimbursementId = 1;
			const data = {
				remarks: 'Sample Remarks Released',
			};
			chai.request(emailServer)
				.post(`/api/v1/email/release/${_reimbursementId}`)
				.set('Authorization', jwt)
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					sinon.restore();
					done();
				});
		}).timeout(5000);
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

		it('It should NOT POST reimbursement approval email when user is unauthorized.', (done) => {
			const _reimbursementId = 1;
			const data = {
				remarks: 'Sample Remarks Approved',
			};
			chai.request(emailServer)
				.post(`/api/v1/email/approval/${_reimbursementId}`)
				.set('Authorization', jwt || '')
				.send(data)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT POST reimbursement rejection email when user is unauthorized.', (done) => {
			const _reimbursementId = 1;
			const data = {
				remarks: 'Sample Remarks Rejected',
			};
			chai.request(emailServer)
				.post(`/api/v1/email/rejection/${_reimbursementId}`)
				.set('Authorization', jwt || '')
				.send(data)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT POST reimbursement release email when user is unauthorized.', (done) => {
			const _reimbursementId = 1;
			const data = {
				remarks: 'Sample Remarks Released',
			};
			chai.request(emailServer)
				.post(`/api/v1/email/release/${_reimbursementId}`)
				.set('Authorization', jwt || '')
				.send(data)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});
});
