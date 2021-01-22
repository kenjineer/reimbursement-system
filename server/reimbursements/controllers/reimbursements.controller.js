const axios = require('axios');
const fs = require('fs');
const path = require('path');
const util = require('util');
const Category = require('../models/category.model');
const Receipt = require('../models/receipt.model');
const Reimbursement = require('../models/reimbursement.model');
const ReimbursementItem = require('../models/item.model');
const User = require('../models/user.model');
const getAuthUser = require('../passport-config').getAuthUser;
const unlink = util.promisify(fs.unlink);

const PORT = process.env.PORT || 3002;
const URL = `http://localhost:${PORT}`;
const UPLOAD_DIR = path.join(__dirname, '..', 'assets', 'uploads');
const CATCH_ERR = { error_message: 'Cannot connect to database / System Error' };

// ROUTE /api/v1/reimbursements/user/:authority
// Get and return reimbursements by authority.
exports.getUserReimbursements = async (req, res) => {
	const user = getAuthUser();
	let reimbursements = [];

	try {
		if (req.params.authority === '0') {
			// Accessing Reimbursements as Regular Employee
			[reimbursements] = await Reimbursement.readReimbursementsEmp(user._userId);
		} else if (req.params.authority === '1') {
			// Accessing Reimbursements as Manager
			[reimbursements] = await Reimbursement.readReimbursementsMgr(user._userId);
		} else if (req.params.authority === '2') {
			// Accessing Reimbursements as Finance Officer
			[reimbursements] = await Reimbursement.readReimbursementsFin(user._userId);
		}

		// Response object
		const jsonRes = {
			reimbursements: reimbursements,
		};

		return res.status(200).send(jsonRes);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};

// ROUTE /api/v1/reimbursements/:_reimbursementId/items
// Get and return reimbursement items by _reimbursementId.
exports.getItems = async (req, res) => {
	try {
		// Get Items by _reimbursementId
		const [rmbItems] = await ReimbursementItem.readItems(req.params._reimbursementId);

		// Response object
		const jsonRes = {
			rmbItems: rmbItems,
		};

		return res.status(200).send(jsonRes);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};

// ROUTE /api/v1/reimbursements/:_reimbursementId/receipts
// Get and return reimbursement receipts by _reimbursementId.
exports.getReceipts = async (req, res) => {
	try {
		// Get Receipts by _reimbursementId
		const [rmbReceipts] = await Receipt.readReceipts(req.params._reimbursementId);

		// Response object
		const jsonRes = {
			rmbReceipts: rmbReceipts,
		};

		return res.status(200).send(jsonRes);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};

// ROUTE /api/v1/reimbursements/categories
// Get and return reimbursement categories.
exports.getCategories = async (req, res) => {
	try {
		// Get Categories
		const [rmbCategories] = await Category.readCategories();

		// Response object
		const jsonRes = {
			rmbCategories: rmbCategories,
		};

		return res.status(200).send(jsonRes);
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};

// ROUTE /api/v1/reimbursements/new
// File and create new user reimbursement.
exports.postNewReimbursement = async (req, res) => {
	const user = getAuthUser();
	const data = JSON.parse(req.body.data);

	try {
		// Get Manager by _devId
		const [manager] = await User.readManagerByDev(user._devId);

		// Create New Reimbursement
		const [reimbursement] = await Reimbursement.createReimbursement(
			user._userId,
			manager[0]._userId,
			data.newReimbursement._categoryId,
			data.newReimbursement.purpose,
			data.newReimbursement.totalCost,
			data.newReimbursement.plannedDate,
			data.newReimbursement.remarks
		);

		// Initialize promise arrays
		let create = [];
		let rmuploads = [];

		// Create New Reimbursement Items
		for (let newItem of data.newItems) {
			create.push(
				ReimbursementItem.createItem(
					reimbursement.insertId,
					newItem.item,
					newItem.qty,
					newItem.cost
				)
			);
		}

		// Read uploaded attachment filenames
		const filenames = fs.readdirSync(UPLOAD_DIR);

		// Create New Receipts
		for (let filename of filenames) {
			create.push(
				Receipt.createReceipt(
					reimbursement.insertId,
					'image/' + filename.slice(filename.indexOf('.') + 1),
					filename,
					fs.readFileSync(path.join(UPLOAD_DIR, filename))
				)
			);

			// Delete uploaded file from temporary folder
			rmuploads.push(unlink(path.join(UPLOAD_DIR, filename)));
		}

		// Run promises in array asyncronously
		if (create.length !== 0) await Promise.all(create);
		if (rmuploads.length !== 0) await Promise.all(rmuploads);

		// Return acknowledgement response
		return res.status(200).send();
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};

// ROUTE /api/v1/reimbursements/:_reimbursementId
// Update user reimbursement information.
exports.putReimbursement = async (req, res) => {
	const user = getAuthUser();
	const _reimbursementId = req.params._reimbursementId;
	const data = JSON.parse(req.body.data);

	try {
		// Initialize promise arrays
		let update = [];
		let rmuploads = [];

		// Update Reimbursement
		update.push(
			Reimbursement.updateReimbursement(
				data.updatedReimbursement._categoryId,
				data.updatedReimbursement.purpose,
				data.updatedReimbursement.totalCost,
				data.updatedReimbursement.plannedDate,
				data.updatedReimbursement.submittedDate,
				data.updatedReimbursement.remarks,
				_reimbursementId,
				user._userId
			)
		);

		// Create, Update and Delete Reimbursement Items
		for (let updatedItem of data.updatedItems) {
			if (updatedItem.isNew === 1) {
				// Create new Reimbursement Item
				update.push(
					ReimbursementItem.createItem(
						_reimbursementId,
						updatedItem.item,
						updatedItem.qty,
						updatedItem.cost
					)
				);
			} else if (updatedItem.isRemove === 0) {
				// Update Reimbursement Item
				update.push(
					ReimbursementItem.updateItem(
						updatedItem.item,
						updatedItem.qty,
						updatedItem.cost,
						updatedItem._itemId,
						_reimbursementId
					)
				);
			} else {
				// Request Deletion of Reimbursement Item
				// Call API DELETE /api/reimbursements/:_reimbursementId/items/_itemId
				update.push(
					axios.delete(
						`${URL}/api/reimbursement/${_reimbursementId}/items/${updatedItem._itemId}`,
						{
							headers: {
								Authorization: req.header('authorization'),
							},
						}
					)
				);
			}
		}

		// Request Deletion of Receipts
		for (let _receiptId of data.deletedReceipts) {
			// Call API DELETE /api/reimbursements/:_reimbursementId/receipts/:_receiptId
			update.push(
				axios.delete(
					`${URL}/api/reimbursement/${_reimbursementId}/receipts/${_receiptId}`,
					{
						headers: {
							Authorization: req.header('authorization'),
						},
					}
				)
			);
		}

		// Read uploaded attachment filenames
		const filenames = fs.readdirSync(UPLOAD_DIR);

		// Create New Receipts
		for (let filename of filenames) {
			update.push(
				Receipt.createReceipt(
					_reimbursementId,
					'image/' + filename.slice(filename.indexOf('.') + 1),
					filename,
					fs.readFileSync(path.join(UPLOAD_DIR, filename))
				)
			);

			// Delete uploaded file from temporary folder
			rmuploads.push(unlink(path.join(UPLOAD_DIR, filename)));
		}

		// Run promises in array asyncronously
		if (update.length !== 0) await Promise.all(update);
		if (rmuploads.length !== 0) await Promise.all(rmuploads);

		// Return acknowledgement response
		return res.status(200).send();
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};

// ROUTE /api/v1/reimbursements/:_reimbursementId
// Cancel/Delete user reimbursement.
exports.deleteReimbursement = async (req, res) => {
	try {
		// Delete Reimbursement Receipts by _reimbursementId
		await Receipt.deleteReceipts(req.query._reimbursementId);

		// Delete Reimbursement Items by _reimbursementId
		await ReimbursementItem.deleteItems(req.query._reimbursementId);

		// Delete Reimbursement by _reimbursementId
		await Reimbursement.deleteReimbursement(req.query._reimbursementId);

		// Return acknowledgement response
		return res.status(200).send();
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};

// ROUTE /api/reimbursements/:_reimbursementId/items/_itemId
// Delete user reimbursement item.
exports.deleteItem = async (req, res) => {
	try {
		// Delete Reimbursement Item by _reimbursementId and _itemId
		await ReimbursementItem.deleteItem(req.params._itemId, req.params._reimbursementId);

		// Return acknowledgement response
		return res.status(200).send();
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};

// ROUTE /api/reimbursements/:_reimbursementId/receipts/_receiptId
// Delete user reimbursement receipt.
exports.deleteReceipt = async (req, res) => {
	try {
		// Delete Reimbursement Receipt by _reimbursementId and _receiptId
		await Receipt.deleteReceipt(req.params._receiptId, req.params._reimbursementId);

		// Return acknowledgement response
		return res.status(200).send();
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};

// ROUTE /api/v1/reimbursements/:_reimbursementId/status/:statusFlag
// Approve, reject or release employee reimbursement.
exports.putReimbursementStatus = async (req, res) => {
	try {
		if (req.params.statusFlag === 2) {
			// Update Reimbursement Status to Approved by _reimbursementId
			await Reimbursement.updateReimbursementApprove(req.params._reimbursementId);
			await axios.put(`${URL}/api/v1/email/approval/${_reimbursementId}`, {
				headers: {
					Authorization: req.header('authorization'),
				},
			});
		} else if (req.params.statusFlag === 0) {
			// Update Reimbursement Status to Rejected by _reimbursementId
			await Reimbursement.updateReimbursementReject(req.params._reimbursementId);
			await axios.put(`${URL}/api/v1/email/rejection/${_reimbursementId}`, {
				headers: {
					Authorization: req.header('authorization'),
				},
			});
		} else if (req.params.statusFlag === 3) {
			// Update Reimbursement Status to Released by _reimbursementId
			await Reimbursement.updateReimbursementRelease(req.params._reimbursementId);
			await axios.put(`${URL}/api/v1/email/release/${_reimbursementId}`, {
				headers: {
					Authorization: req.header('authorization'),
				},
			});
		}

		// Return acknowledgement response
		return res.status(200).send();
	} catch (err) /* istanbul ignore next */ {
		console.log(err);
		return res.status(503).send(CATCH_ERR);
	}
};
