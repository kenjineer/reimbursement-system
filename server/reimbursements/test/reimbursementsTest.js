const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const sinon = require('sinon');
const reimbursementsServer = require('../app');
const axios = require('axios');
const loginServerUrl = 'http://localhost:3000';

chai.should();
chai.use(chaiHttp);

let jwtEmp;
let jwtMgr;
let jwtFin;

describe('Reimbursement API', () => {
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
						jwtEmp = res.body.jwt.token;
					}

					done();
				});
		});

		before((done) => {
			const credentials = {
				username: 'bert',
				password: 'bert',
			};

			chai.request(loginServerUrl)
				.post('/api/v1/login')
				.send(credentials)
				.end((err, res) => {
					if (err) {
						console.log(err);
					} else {
						jwtMgr = res.body.jwt.token;
					}

					done();
				});
		});

		before((done) => {
			const credentials = {
				username: 'eunice',
				password: 'yuniyuni',
			};

			chai.request(loginServerUrl)
				.post('/api/v1/login')
				.send(credentials)
				.end((err, res) => {
					if (err) {
						console.log(err);
					} else {
						jwtFin = res.body.jwt.token;
					}

					done();
				});
		});

		it('It should GET user reimbursements when user is authorized as employee.', (done) => {
			const authority = 0;
			const data = {
				reimbursements: [
					{
						_reimbursementId: 1,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 9,
						categoryName: 'Travel',
						purpose: 'Sample Purpose 1',
						totalCost: '1500.50',
						plannedDate: new Date('2021-01-29 12:00:00').toISOString(),
						status: 3,
						approvalDate: new Date('2021-01-29 11:48:37').toISOString(),
						rejectionDate: null,
						releaseDate: new Date('2021-01-29 11:52:33').toISOString(),
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:45:16').toISOString(),
					},
					{
						_reimbursementId: 2,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 8,
						categoryName: 'Rent or Lease',
						purpose: 'Sample Purpose 2',
						totalCost: '1500.00',
						plannedDate: new Date('2021-02-01 12:00:00').toISOString(),
						status: 0,
						approvalDate: null,
						rejectionDate: new Date('2021-01-29 11:50:20').toISOString(),
						releaseDate: null,
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:46:16').toISOString(),
					},
					{
						_reimbursementId: 3,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 10,
						categoryName: 'Utilities',
						purpose: 'Sample Purpose 3',
						totalCost: '790.50',
						plannedDate: new Date('2021-02-02 12:00:00').toISOString(),
						status: 1,
						approvalDate: null,
						rejectionDate: null,
						releaseDate: null,
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:48:03').toISOString(),
					},
				],
			};

			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/user/${authority}`)
				.set('Authorization', jwtEmp)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.eql(data);
					done();
				});
		});

		it('It should GET user reimbursements when user is authorized as manager.', (done) => {
			const authority = 1;
			const data = {
				reimbursements: [
					{
						_reimbursementId: 1,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 9,
						categoryName: 'Travel',
						purpose: 'Sample Purpose 1',
						totalCost: '1500.50',
						plannedDate: new Date('2021-01-29 12:00:00').toISOString(),
						status: 3,
						approvalDate: new Date('2021-01-29 11:48:37').toISOString(),
						rejectionDate: null,
						releaseDate: new Date('2021-01-29 11:52:33').toISOString(),
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:45:16').toISOString(),
					},
					{
						_reimbursementId: 2,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 8,
						categoryName: 'Rent or Lease',
						purpose: 'Sample Purpose 2',
						totalCost: '1500.00',
						plannedDate: new Date('2021-02-01 12:00:00').toISOString(),
						status: 0,
						approvalDate: null,
						rejectionDate: new Date('2021-01-29 11:50:20').toISOString(),
						releaseDate: null,
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:46:16').toISOString(),
					},
					{
						_reimbursementId: 3,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 10,
						categoryName: 'Utilities',
						purpose: 'Sample Purpose 3',
						totalCost: '790.50',
						plannedDate: new Date('2021-02-02 12:00:00').toISOString(),
						status: 1,
						approvalDate: null,
						rejectionDate: null,
						releaseDate: null,
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:48:03').toISOString(),
					},
				],
			};

			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/user/${authority}`)
				.set('Authorization', jwtMgr)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.eql(data);
					done();
				});
		});

		it('It should GET user reimbursements when user is authorized as finance officer.', (done) => {
			const authority = 2;
			const data = {
				reimbursements: [
					{
						_reimbursementId: 1,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 9,
						categoryName: 'Travel',
						purpose: 'Sample Purpose 1',
						totalCost: '1500.50',
						plannedDate: new Date('2021-01-29 12:00:00').toISOString(),
						status: 3,
						approvalDate: new Date('2021-01-29 11:48:37').toISOString(),
						rejectionDate: null,
						releaseDate: new Date('2021-01-29 11:52:33').toISOString(),
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:45:16').toISOString(),
					},
				],
			};

			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/user/${authority}`)
				.set('Authorization', jwtFin)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.eql(data);
					done();
				});
		});

		it('It should NOT GET user reimbursements when user is authorized with invalid authority.', (done) => {
			const authority = 1;
			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/user/${authority}`)
				.set('Authorization', jwtEmp)
				.end((err, res) => {
					const error_message = 'Unauthorized! User authority level not recognized.';

					res.should.have.status(401);
					res.body.error_message.should.be.eql(error_message);
					done();
				});
		});

		it('It should GET user reimbursement items when user is authorized.', (done) => {
			const _reimbursementId = 1;
			const data = {
				rmbItems: [
					{
						_itemId: 1,
						item: 'Sample Item 1',
						qty: 1,
						cost: '1000.00',
					},
					{
						_itemId: 2,
						item: 'Sample Item 2',
						qty: 2,
						cost: '250.25',
					},
				],
			};
			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/${_reimbursementId}/items`)
				.set('Authorization', jwtEmp)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.eql(data);
					done();
				});
		});

		it('It should GET user reimbursement receipts when user is authorized.', (done) => {
			const _reimbursementId = 1;
			const data = {
				_receiptId: 1,
				type: 'image/jpg',
				fileName: '1611891916362_rtsph_Gas Receipt.jpg',
			};
			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/${_reimbursementId}/receipts`)
				.set('Authorization', jwtEmp)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.rmbReceipts[0]._receiptId.should.be.eql(data._receiptId);
					res.body.rmbReceipts[0].type.should.be.eql(data.type);
					res.body.rmbReceipts[0].fileName.should.be.eql(data.fileName);
					res.body.rmbReceipts[0].image.should.be.an('object');
					done();
				});
		});

		it('It should GET category list when user is authorized.', (done) => {
			const data = {
				rmbCategories: [
					{
						_categoryId: 1,
						categoryName: 'Advertising',
					},
					{
						_categoryId: 2,
						categoryName: 'Car & Truck Expenses',
					},
					{
						_categoryId: 3,
						categoryName: 'Contractors',
					},
					{
						_categoryId: 4,
						categoryName: 'Education & Training',
					},
					{
						_categoryId: 5,
						categoryName: 'Employee Benefits',
					},
					{
						_categoryId: 6,
						categoryName: 'Meals & Entertainment',
					},
					{
						_categoryId: 7,
						categoryName: 'Office Expenses & Postage',
					},
					{
						_categoryId: 8,
						categoryName: 'Rent or Lease',
					},
					{
						_categoryId: 9,
						categoryName: 'Travel',
					},
					{
						_categoryId: 10,
						categoryName: 'Utilities',
					},
				],
			};
			chai.request(reimbursementsServer)
				.get('/api/v1/reimbursements/categories')
				.set('Authorization', jwtEmp)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.eql(data);
					done();
				});
		});

		it('It should POST new user reimbursement when user is authorized.', (done) => {
			const data = {
				newReimbursement: {
					_categoryId: 9,
					purpose: 'Fetch AWS Laptop',
					totalCost: '1300.00',
					plannedDate: '2021-04-26 04:00:00',
					remarks: '行ってきます',
				},
				newItems: [
					{
						item: 'Gas',
						qty: 1,
						cost: '1000.00',
					},
					{
						item: 'Toll Fee',
						qty: 2,
						cost: '150.00',
					},
				],
			};

			const gas = fs.readFileSync(path.join(__dirname, 'img', 'Gas Receipt.jpg'));
			const toll = fs.readFileSync(path.join(__dirname, 'img', 'Toll Receipt.jpg'));

			chai.request(reimbursementsServer)
				.post('/api/v1/reimbursements/new')
				.set('Authorization', jwtEmp)
				.field('Content-Type', 'multipart/form-data')
				.field('data', JSON.stringify(data))
				.attach('files', gas, 'Gas Receipt.jpg')
				.attach('files', toll, 'Toll Receipt.jpg')
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it('It should PUT user reimbursement when user is authorized.', (done) => {
			const _reimbursementId = 4;
			const data = {
				updatedReimbursement: {
					_categoryId: 6,
					purpose: 'Lunch Meeting',
					totalCost: '450.75',
					plannedDate: '2021-04-25 04:00:00',
					remarks: '食べましょう',
				},
				updatedItems: [
					{
						_itemId: 6,
						item: 'Food',
						qty: 3,
						cost: '100.00',
						isNew: 0,
						isRemove: 0,
					},
					{
						_itemId: 7,
						item: 'Toll Fee',
						qty: 2,
						cost: '150.00',
						isNew: 0,
						isRemove: 1,
					},
					{
						item: 'Drinks',
						qty: 2,
						cost: '50.25',
						isNew: 1,
						isRemove: 0,
					},
				],
				deletedReceipts: [5, 6],
			};

			const food = fs.readFileSync(path.join(__dirname, 'img', 'Food Receipt.jpg'));
			const rent = fs.readFileSync(path.join(__dirname, 'img', 'Drinks Receipt.jpg'));

			chai.request(reimbursementsServer)
				.put(`/api/v1/reimbursements/${_reimbursementId}`)
				.set('Authorization', jwtEmp)
				.field('Content-Type', 'multipart/form-data')
				.field('data', JSON.stringify(data))
				.attach('files', food, 'Food Receipt.jpg')
				.attach('files', rent, 'Rent Receipt.jpg')
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it('It should DELETE selected user reimbursement item when user is authorized.', (done) => {
			const _reimbursementId = 4;
			const _itemId = 6;
			chai.request(reimbursementsServer)
				.delete(`/api/v1/reimbursements/${_reimbursementId}/items/${_itemId}`)
				.set('Authorization', jwtEmp)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it('It should DELETE selected user reimbursement receipts when user is authorized.', (done) => {
			const _reimbursementId = 4;
			const _receiptId = 7;
			chai.request(reimbursementsServer)
				.delete(`/api/v1/reimbursements/${_reimbursementId}/receipts/${_receiptId}`)
				.set('Authorization', jwtEmp)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it('It should DELETE selected user reimbursement for cancellation when user is authorized.', (done) => {
			const _reimbursementId = 4;
			chai.request(reimbursementsServer)
				.delete(`/api/v1/reimbursements/${_reimbursementId}`)
				.set('Authorization', jwtEmp)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it("It should PUT selected user reimbursement's status to approved when user is authorized.", (done) => {
			sinon.stub(axios, 'post').resolves(Promise.resolve());
			const _reimbursementId = 3;
			const statusFlag = 2;
			const data = {
				remarks: 'Sample Remarks Approved',
			};
			chai.request(reimbursementsServer)
				.put(`/api/v1/reimbursements/${_reimbursementId}/status/${statusFlag}`)
				.set('Authorization', jwtEmp)
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it("It should PUT selected user reimbursement's status to rejected when user is authorized.", (done) => {
			const _reimbursementId = 3;
			const statusFlag = 0;
			const data = {
				remarks: 'Sample Remarks Rejected',
			};
			chai.request(reimbursementsServer)
				.put(`/api/v1/reimbursements/${_reimbursementId}/status/${statusFlag}`)
				.set('Authorization', jwtEmp)
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it("It should PUT selected user reimbursement's status to released when user is authorized.", (done) => {
			const _reimbursementId = 3;
			const statusFlag = 3;
			const data = {
				remarks: 'Sample Remarks Released',
			};
			chai.request(reimbursementsServer)
				.put(`/api/v1/reimbursements/${_reimbursementId}/status/${statusFlag}`)
				.set('Authorization', jwtEmp)
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					sinon.restore();
					done();
				});
		});
	});

	describe('Unauthorized User', () => {
		beforeEach((done) => {
			const credentials = {
				username: '902191173',
				password: 'incorrect',
			};

			chai.request(loginServerUrl)
				.post('/api/v1/login')
				.send(credentials)
				.end((err, res) => {
					if (err) {
						console.log(err);
					} else {
						jwtEmp = res.body.jwt.token;
					}

					done();
				});
		});

		it('It should NOT GET user reimbursements when user is unauthorized as employee.', (done) => {
			const authority = 0;
			const data = {
				reimbursements: [
					{
						_reimbursementId: 1,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 9,
						categoryName: 'Travel',
						purpose: 'Sample Purpose 1',
						totalCost: '1500.50',
						plannedDate: new Date('2021-01-29 12:00:00').toISOString(),
						status: 3,
						approvalDate: new Date('2021-01-29 11:48:37').toISOString(),
						rejectionDate: null,
						releaseDate: new Date('2021-01-29 11:52:33').toISOString(),
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:45:16').toISOString(),
					},
					{
						_reimbursementId: 2,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 8,
						categoryName: 'Rent or Lease',
						purpose: 'Sample Purpose 2',
						totalCost: '1500.00',
						plannedDate: new Date('2021-02-01 12:00:00').toISOString(),
						status: 0,
						approvalDate: null,
						rejectionDate: new Date('2021-01-29 11:50:20').toISOString(),
						releaseDate: null,
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:46:16').toISOString(),
					},
					{
						_reimbursementId: 3,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 10,
						categoryName: 'Utilities',
						purpose: 'Sample Purpose 3',
						totalCost: '790.50',
						plannedDate: new Date('2021-02-02 12:00:00').toISOString(),
						status: 1,
						approvalDate: null,
						rejectionDate: null,
						releaseDate: null,
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:48:03').toISOString(),
					},
				],
			};

			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/user/${authority}`)
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.not.be.eql(data);
					done();
				});
		});

		it('It should NOT GET user reimbursements when user is unauthorized as manager.', (done) => {
			const authority = 1;
			const data = {
				reimbursements: [
					{
						_reimbursementId: 1,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 9,
						categoryName: 'Travel',
						purpose: 'Sample Purpose 1',
						totalCost: '1500.50',
						plannedDate: new Date('2021-01-29 12:00:00').toISOString(),
						status: 3,
						approvalDate: new Date('2021-01-29 11:48:37').toISOString(),
						rejectionDate: null,
						releaseDate: new Date('2021-01-29 11:52:33').toISOString(),
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:45:16').toISOString(),
					},
					{
						_reimbursementId: 2,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 8,
						categoryName: 'Rent or Lease',
						purpose: 'Sample Purpose 2',
						totalCost: '1500.00',
						plannedDate: new Date('2021-02-01 12:00:00').toISOString(),
						status: 0,
						approvalDate: null,
						rejectionDate: new Date('2021-01-29 11:50:20').toISOString(),
						releaseDate: null,
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:46:16').toISOString(),
					},
					{
						_reimbursementId: 3,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 10,
						categoryName: 'Utilities',
						purpose: 'Sample Purpose 3',
						totalCost: '790.50',
						plannedDate: new Date('2021-02-02 12:00:00').toISOString(),
						status: 1,
						approvalDate: null,
						rejectionDate: null,
						releaseDate: null,
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:48:03').toISOString(),
					},
				],
			};

			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/user/${authority}`)
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.not.be.eql(data);
					done();
				});
		});

		it('It should NOT GET user reimbursements when user is unauthorized as finance officer.', (done) => {
			const authority = 2;
			const data = {
				reimbursements: [
					{
						_reimbursementId: 1,
						employeeName: 'Kenneth Caro Karamihan',
						_categoryId: 9,
						categoryName: 'Travel',
						purpose: 'Sample Purpose 1',
						totalCost: '1500.50',
						plannedDate: new Date('2021-01-29 12:00:00').toISOString(),
						status: 3,
						approvalDate: new Date('2021-01-29 11:48:37').toISOString(),
						rejectionDate: null,
						releaseDate: new Date('2021-01-29 11:52:33').toISOString(),
						remarks: 'Sample Remarks',
						createdDate: new Date('2021-01-29 11:45:16').toISOString(),
					},
				],
			};

			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/user/${authority}`)
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.not.be.eql(data);
					done();
				});
		});

		it('It should NOT GET user reimbursements when user is unauthorized with invalid authority.', (done) => {
			const authority = 1;
			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/user/${authority}`)
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT GET user reimbursement items when user is unauthorized.', (done) => {
			const _reimbursementId = 1;
			const data = {
				rmbItems: [
					{
						_itemId: 1,
						item: 'Sample Item 1',
						qty: 1,
						cost: '1000.00',
					},
					{
						_itemId: 2,
						item: 'Sample Item 2',
						qty: 2,
						cost: '250.25',
					},
				],
			};
			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/${_reimbursementId}/items`)
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.not.be.eql(data);
					done();
				});
		});

		it('It should NOT GET user reimbursement receipts when user is unauthorized.', (done) => {
			const _reimbursementId = 1;
			chai.request(reimbursementsServer)
				.get(`/api/v1/reimbursements/${_reimbursementId}/receipts`)
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.not.have.property('rmbReceipts');
					done();
				});
		});

		it('It should NOT GET category list when user is unauthorized.', (done) => {
			const data = {
				rmbCategories: [
					{
						_categoryId: 1,
						categoryName: 'Advertising',
					},
					{
						_categoryId: 2,
						categoryName: 'Car & Truck Expenses',
					},
					{
						_categoryId: 3,
						categoryName: 'Contractors',
					},
					{
						_categoryId: 4,
						categoryName: 'Education & Training',
					},
					{
						_categoryId: 5,
						categoryName: 'Employee Benefits',
					},
					{
						_categoryId: 6,
						categoryName: 'Meals & Entertainment',
					},
					{
						_categoryId: 7,
						categoryName: 'Office Expenses & Postage',
					},
					{
						_categoryId: 8,
						categoryName: 'Rent or Lease',
					},
					{
						_categoryId: 9,
						categoryName: 'Travel',
					},
					{
						_categoryId: 10,
						categoryName: 'Utilities',
					},
				],
			};
			chai.request(reimbursementsServer)
				.get('/api/v1/reimbursements/categories')
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.not.be.eql(data);
					done();
				});
		});

		it('It should NOT POST new user reimbursement when user is unauthorized.', (done) => {
			const data = {
				newReimbursement: {
					_categoryId: 9,
					purpose: 'Fetch AWS Laptop',
					totalCost: '1300.00',
					plannedDate: '2021-04-26 04:00:00',
					remarks: '行ってきます',
				},
				newItems: [
					{
						item: 'Gas',
						qty: 1,
						cost: '1000.00',
					},
					{
						item: 'Toll Fee',
						qty: 2,
						cost: '150.00',
					},
				],
			};

			const gas = fs.readFileSync(path.join(__dirname, 'img', 'Gas Receipt.jpg'));
			const toll = fs.readFileSync(path.join(__dirname, 'img', 'Toll Receipt.jpg'));

			chai.request(reimbursementsServer)
				.post('/api/v1/reimbursements/new')
				.set('Authorization', jwtEmp || '')
				.field('Content-Type', 'multipart/form-data')
				.field('data', JSON.stringify(data))
				.attach('files', gas, 'Gas Receipt.jpg')
				.attach('files', toll, 'Toll Receipt.jpg')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT PUT user reimbursement when user is unauthorized.', (done) => {
			const _reimbursementId = 4;
			const data = {
				updatedReimbursement: {
					_categoryId: 6,
					purpose: 'Lunch Meeting',
					totalCost: '450.75',
					plannedDate: '2021-04-25 04:00:00',
					remarks: '食べましょう',
				},
				updatedItems: [
					{
						_itemId: 6,
						item: 'Food',
						qty: 3,
						cost: '100.00',
						isNew: 0,
						isRemove: 0,
					},
					{
						_itemId: 7,
						item: 'Toll Fee',
						qty: 2,
						cost: '150.00',
						isNew: 0,
						isRemove: 1,
					},
					{
						item: 'Drinks',
						qty: 2,
						cost: '50.25',
						isNew: 1,
						isRemove: 0,
					},
				],
				deletedReceipts: [5, 6],
			};

			const food = fs.readFileSync(path.join(__dirname, 'img', 'Food Receipt.jpg'));
			const rent = fs.readFileSync(path.join(__dirname, 'img', 'Drinks Receipt.jpg'));

			chai.request(reimbursementsServer)
				.put(`/api/v1/reimbursements/${_reimbursementId}`)
				.set('Authorization', jwtEmp || '')
				.field('Content-Type', 'multipart/form-data')
				.field('data', JSON.stringify(data))
				.attach('files', food, 'Food Receipt.jpg')
				.attach('files', rent, 'Rent Receipt.jpg')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT DELETE selected user reimbursement item when user is unauthorized.', (done) => {
			const _reimbursementId = 4;
			const _itemId = 6;
			chai.request(reimbursementsServer)
				.delete(`/api/v1/reimbursements/${_reimbursementId}/items/${_itemId}`)
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT DELETE selected user reimbursement receipts when user is unauthorized.', (done) => {
			const _reimbursementId = 4;
			const _receiptId = 7;
			chai.request(reimbursementsServer)
				.delete(`/api/v1/reimbursements/${_reimbursementId}/receipts/${_receiptId}`)
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT DELETE selected user reimbursement for cancellation when user is unauthorized.', (done) => {
			const _reimbursementId = 4;
			chai.request(reimbursementsServer)
				.delete(`/api/v1/reimbursements/${_reimbursementId}`)
				.set('Authorization', jwtEmp || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it("It should NOT PUT selected user reimbursement's status to approved when user is unauthorized.", (done) => {
			const _reimbursementId = 3;
			const statusFlag = 2;
			const data = {
				remarks: 'Sample Remarks Approved',
			};
			chai.request(reimbursementsServer)
				.put(`/api/v1/reimbursements/${_reimbursementId}/status/${statusFlag}`)
				.set('Authorization', jwtEmp || '')
				.send(data)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it("It should NOT PUT selected user reimbursement's status to rejected when user is unauthorized.", (done) => {
			const _reimbursementId = 3;
			const statusFlag = 0;
			const data = {
				remarks: 'Sample Remarks Rejected',
			};
			chai.request(reimbursementsServer)
				.put(`/api/v1/reimbursements/${_reimbursementId}/status/${statusFlag}`)
				.set('Authorization', jwtEmp || '')
				.send(data)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it("It should NOT PUT selected user reimbursement's status to released when user is unauthorized.", (done) => {
			const _reimbursementId = 3;
			const statusFlag = 3;
			const data = {
				remarks: 'Sample Remarks Released',
			};
			chai.request(reimbursementsServer)
				.put(`/api/v1/reimbursements/${_reimbursementId}/status/${statusFlag}`)
				.set('Authorization', jwtEmp || '')
				.send(data)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});
});
