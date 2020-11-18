const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const reimbursementServer = require('../app');
const db = require('../db/db.config');
const loginServerUrl = 'http://localhost:3000';
const resetId = path.join(__dirname, 'sql', 'resetId.sql');

chai.should();
chai.use(chaiHttp);

let jwt;
let jwtNoData;

describe('Reimbursement API', () => {
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

		after(async (done) => {
			await db.execute(resetId);
			done();
		});

		before((done) => {
			const credentials = {
				username: 'bert',
				password: 'bert',
			};

			chai.request(loginServerUrl)
				.post('/api/login')
				.send(credentials)
				.end((err, res) => {
					if (err) {
						console.log(err);
					} else {
						jwtNoData = res.body.jwt.token;
					}

					done();
				});
		});

		it('It should GET user reimbursements when user is authorized.', (done) => {
			chai.request(reimbursementServer)
				.get('/api/reimbursement')
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = 'User reimbursements retrieved.';

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					res.body.reimbursements.should.not.be.eql([]);
					done();
				});
		});

		it('It should NOT GET user reimbursements when user is authorized.', (done) => {
			chai.request(reimbursementServer)
				.get('/api/reimbursement')
				.set('Authorization', jwtNoData)
				.end((err, res) => {
					const reqMsg = 'No user reimbursement retrieved.';

					res.should.have.status(200);
					res.body.success.should.be.eql(0);
					res.body.message.should.be.eql(reqMsg);
					res.body.reimbursements.should.be.eql([]);
					done();
				});
		});

		it('It should GET user reimbursement items when user is authorized.', (done) => {
			const _reimbursementId = 1;
			chai.request(reimbursementServer)
				.get(`/api/reimbursement/${_reimbursementId}/reimbursement-items`)
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = 'User reimbursement items retrieved.';

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					res.body.reimbursementItems.should.not.be.eql([]);
					done();
				});
		});

		it('It should NOT GET user reimbursement items when user is authorized.', (done) => {
			const _reimbursementId = 0;
			chai.request(reimbursementServer)
				.get(`/api/reimbursement/${_reimbursementId}/reimbursement-items`)
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = 'No user reimbursement item retrieved.';

					res.should.have.status(200);
					res.body.success.should.be.eql(0);
					res.body.message.should.be.eql(reqMsg);
					res.body.reimbursementItems.should.be.eql([]);
					done();
				});
		});

		it('It should GET user reimbursement receipts when user is authorized.', (done) => {
			const _reimbursementId = 1;
			chai.request(reimbursementServer)
				.get(`/api/reimbursement/${_reimbursementId}/receipts`)
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = 'User reimbursement receipts retrieved.';

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					res.body.receipts.should.not.be.eql([]);
					done();
				});
		});

		it('It should NOT GET user reimbursement receipts when user is authorized.', (done) => {
			const _reimbursementId = 0;
			chai.request(reimbursementServer)
				.get(`/api/reimbursement/${_reimbursementId}/receipts`)
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = 'No user reimbursement receipt retrieved.';

					res.should.have.status(200);
					res.body.success.should.be.eql(0);
					res.body.message.should.be.eql(reqMsg);
					res.body.receipts.should.be.eql([]);
					done();
				});
		});

		it('It should POST new user reimbursement when user is authorized.', (done) => {
			const info = {
				newReimbursement: {
					_categoryId: 9,
					purpose: 'Fetch AWS Laptop',
					totalCost: 1300.0,
					plannedDate: '2020-11-30 08:00:00',
					remarks: '( ͡• ͜ʖ ͡• ))',
				},
				newItems: [
					{
						item: 'Gas',
						qty: 1,
						cost: 1000,
					},
					{
						item: 'Toll Fee',
						qty: 1,
						cost: 1000,
					},
				],
			};

			const gas = fs.readFileSync(path.join(__dirname, 'img', 'Gas Receipt.jpg'));
			const toll = fs.readFileSync(path.join(__dirname, 'img', 'Toll Receipt.jpg'));

			chai.request(reimbursementServer)
				.post('/api/reimbursement/new-reimbursement')
				.set('Authorization', jwt)
				.field('Content-Type', 'multipart/form-data')
				.field('data', JSON.stringify(info))
				.attach('files', gas, 'Gas Receipt.jpg')
				.attach('files', toll, 'Toll Receipt.jpg')
				.end((err, res) => {
					const reqMsg = 'New reimbursement created.';

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					done();
				});
		});

		it('It should PUT user reimbursement when user is authorized.', (done) => {
			const _reimbursementId = 2;
			const info = {
				updatedReimbursement: {
					_categoryId: 8,
					purpose: 'Quarantine',
					totalCost: 10000.0,
					plannedDate: '2020-12-01 08:00:00',
					submittedDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
					remarks: '┗( T﹏T )┛',
				},
				updatedItems: [
					{
						_itemId: 3,
						item: 'Gas',
						qty: 1,
						cost: 1000.0,
						isRemove: 1,
						isNew: 0,
					},
					{
						_itemId: 4,
						item: 'Food',
						qty: 1,
						cost: 1000.0,
						isRemove: 0,
						isNew: 0,
					},
					{
						item: 'Rent',
						qty: 1,
						cost: 9000.0,
						isRemove: 0,
						isNew: 1,
					},
				],
				deletedReceipts: [3, 4],
			};

			const food = fs.readFileSync(path.join(__dirname, 'img', 'Gas Receipt.jpg'));
			const rent = fs.readFileSync(path.join(__dirname, 'img', 'Toll Receipt.jpg'));

			chai.request(reimbursementServer)
				.put(`/api/reimbursement/${_reimbursementId}/edit-reimbursement`)
				.set('Authorization', jwt)
				.field('Content-Type', 'multipart/form-data')
				.field('data', JSON.stringify(info))
				.attach('files', food, 'Food Receipt.jpg')
				.attach('files', rent, 'Rent Receipt.jpg')
				.end((err, res) => {
					const reqMsg = 'Updated reimbursement.';

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					done();
				});
		});

		it('It should DELETE selected user reimbursement item when user is authorized.', (done) => {
			const _reimbursementId = 2;
			const _itemId = 4;
			chai.request(reimbursementServer)
				.delete(`/api/reimbursement/${_reimbursementId}/delete-item/${_itemId}`)
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = `Reimbursement item with itemId (${_itemId}) deleted.`;

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					done();
				});
		});

		it('It should DELETE selected user reimbursement item when user is authorized.', (done) => {
			const _reimbursementId = 2;
			const _itemId = 5;
			chai.request(reimbursementServer)
				.delete(`/api/reimbursement/${_reimbursementId}/delete-item/${_itemId}`)
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = `Reimbursement item with itemId (${_itemId}) deleted.`;

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					done();
				});
		});

		it('It should DELETE selected user reimbursement receipts when user is authorized.', (done) => {
			const _reimbursementId = 2;
			const _receiptId = 3;
			chai.request(reimbursementServer)
				.delete(`/api/reimbursement/${_reimbursementId}/delete-receipt/${_receiptId}`)
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = `Receipt with receiptId (${_receiptId}) deleted.`;

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					done();
				});
		});

		it('It should DELETE selected user reimbursement receipts when user is authorized.', (done) => {
			const _reimbursementId = 2;
			const _receiptId = 4;
			chai.request(reimbursementServer)
				.delete(`/api/reimbursement/${_reimbursementId}/delete-receipt/${_receiptId}`)
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = `Receipt with receiptId (${_receiptId}) deleted.`;

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
					done();
				});
		});

		it('It should DELETE selected user reimbursements when user is authorized.', (done) => {
			const _reimbursementId = 2;
			chai.request(reimbursementServer)
				.delete(
					`/api/reimbursement/delete-reimbursement?_reimbursementIds=${_reimbursementId}`
				)
				.set('Authorization', jwt)
				.end((err, res) => {
					const reqMsg = 'Pending reimbursements deleted.';

					res.should.have.status(200);
					res.body.success.should.be.eql(1);
					res.body.message.should.be.eql(reqMsg);
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
			chai.request(reimbursementServer)
				.get('/api/reimbursement')
				.set('Authorization', jwt || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT GET user reimbursement items when user is unauthorized.', (done) => {
			const _reimbursementId = 1;
			chai.request(reimbursementServer)
				.get(`/api/reimbursement/${_reimbursementId}/reimbursement-items`)
				.set('Authorization', jwt || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT GET user reimbursement receipts when user is unauthorized.', (done) => {
			const _reimbursementId = 1;
			chai.request(reimbursementServer)
				.get(`/api/reimbursement/${_reimbursementId}/receipts`)
				.set('Authorization', jwt || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT POST new user reimbursement when user is unauthorized.', (done) => {
			const info = {
				newReimbursement: {
					_categoryId: 9,
					purpose: 'Fetch AWS Laptop',
					totalCost: 1300.0,
					plannedDate: '2020-11-30 08:00:00',
					remarks: '( ͡• ͜ʖ ͡• ))',
				},
				newItems: [
					{
						item: 'Gas',
						qty: 1,
						cost: 1000,
					},
					{
						item: 'Toll Fee',
						qty: 1,
						cost: 1000,
					},
				],
			};

			const gas = fs.readFileSync(path.join(__dirname, 'img', 'Gas Receipt.jpg'));
			const toll = fs.readFileSync(path.join(__dirname, 'img', 'Toll Receipt.jpg'));

			chai.request(reimbursementServer)
				.post('/api/reimbursement/new-reimbursement')
				.set('Authorization', jwt || '')
				.field('Content-Type', 'multipart/form-data')
				.field('data', JSON.stringify(info))
				.attach('files', gas, 'Gas Receipt.jpg')
				.attach('files', toll, 'Toll Receipt.jpg')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT PUT user reimbursement when user is unauthorized.', (done) => {
			const _reimbursementId = 2;
			const info = {
				updatedReimbursement: {
					_categoryId: 8,
					purpose: 'Quarantine',
					totalCost: 10000.0,
					plannedDate: '2020-12-01 08:00:00',
					submittedDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
					remarks: '┗( T﹏T )┛',
				},
				updatedItems: [
					{
						_itemId: 3,
						item: 'Gas',
						qty: 1,
						cost: 1000.0,
						isRemove: 1,
						isNew: 0,
					},
					{
						_itemId: 4,
						item: 'Food',
						qty: 1,
						cost: 1000.0,
						isRemove: 0,
						isNew: 0,
					},
					{
						item: 'Rent',
						qty: 1,
						cost: 9000.0,
						isRemove: 0,
						isNew: 1,
					},
				],
				deletedReceipts: [3, 4],
			};

			const food = fs.readFileSync(path.join(__dirname, 'img', 'Gas Receipt.jpg'));
			const rent = fs.readFileSync(path.join(__dirname, 'img', 'Toll Receipt.jpg'));

			chai.request(reimbursementServer)
				.put(`/api/reimbursement/${_reimbursementId}/edit-reimbursement`)
				.set('Authorization', jwt || '')
				.field('Content-Type', 'multipart/form-data')
				.field('data', JSON.stringify(info))
				.attach('files', food, 'Food Receipt.jpg')
				.attach('files', rent, 'Rent Receipt.jpg')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT DELETE selected user reimbursement item when user is unauthorized.', (done) => {
			const _reimbursementId = 2;
			const _itemId = 3;
			chai.request(reimbursementServer)
				.delete(`/api/reimbursement/${_reimbursementId}/delete-item/${_itemId}`)
				.set('Authorization', jwt || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT DELETE selected user reimbursement receipts when user is unauthorized.', (done) => {
			const _reimbursementId = 2;
			const _receiptId = 3;
			chai.request(reimbursementServer)
				.delete(`/api/reimbursement/${_reimbursementId}/delete-item/${_receiptId}`)
				.set('Authorization', jwt || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});

		it('It should NOT DELETE selected user reimbursements when user is unauthorized.', (done) => {
			const _reimbursementId = 2;
			chai.request(reimbursementServer)
				.delete(
					`/api/reimbursement/delete-reimbursement?_reimbursementIds=${_reimbursementId}`
				)
				.set('Authorization', jwt || '')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});
});
