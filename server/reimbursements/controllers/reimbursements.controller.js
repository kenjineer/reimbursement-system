const axios = require('axios');
const fs = require('fs');
const path = require('path');
const util = require('util');
const Category = require('../models/category.model');
const Receipt = require('../models/receipt.model');
const Reimbursement = require('../models/reimbursement.model');
const ReimbursementItem = require('../models/reimbursementitem.model');
const User = require('../models/user.model');
const getAuthUser = require('../passport-config').getAuthUser;
const unlink = util.promisify(fs.unlink);

const PORT = process.env.PORT || 3002;
const URL = `http://localhost:${PORT}`;
const UPLOAD_DIR = path.join(__dirname, '..', 'assets', 'uploads');

exports.getUserReimbursements = async (req, res) => {
	const user = getAuthUser();

	try {
		const [reimbursements] = await Reimbursement.readReimbursements(user._userId);

		if (reimbursements.length === 0) {
			const jsonEmptyRes = {
				success: 0,
				message: 'No user reimbursement retrieved.',
				reimbursements: reimbursements,
			};

			return res.status(200).send(jsonEmptyRes);
		}

		const jsonRes = {
			success: 1,
			message: 'User reimbursements retrieved.',
			reimbursements: reimbursements,
		};

		return res.status(200).send(jsonRes);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.getReimbursementItems = async (req, res) => {
	const user = getAuthUser();

	try {
		const [reimbursementItems] = await ReimbursementItem.readReimbursementItems(
			req.params._reimbursementId,
			user._userId
		);

		if (reimbursementItems.length === 0) {
			const jsonEmptyRes = {
				success: 0,
				message: 'No user reimbursement item retrieved.',
				reimbursementItems: reimbursementItems,
			};

			return res.status(200).send(jsonEmptyRes);
		}

		const jsonRes = {
			success: 1,
			message: 'User reimbursement items retrieved.',
			reimbursementItems: reimbursementItems,
		};

		return res.status(200).send(jsonRes);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.getReceipts = async (req, res) => {
	const user = getAuthUser();

	try {
		const [receipts] = await Receipt.readReceipts(req.params._reimbursementId, user._userId);

		if (receipts.length === 0) {
			const jsonEmptyRes = {
				success: 0,
				message: 'No user reimbursement receipt retrieved.',
				receipts: receipts,
			};

			return res.status(200).send(jsonEmptyRes);
		}

		const jsonRes = {
			success: 1,
			message: 'User reimbursement receipts retrieved.',
			receipts: receipts,
		};

		return res.status(200).send(jsonRes);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.getCategories = async (req, res) => {
	try {
		const [categories] = await Category.readCategories();

		const jsonRes = {
			success: 1,
			message: 'Category list retrieved.',
			categories: categories,
		};

		return res.status(200).send(jsonRes);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.postNewReimbursement = async (req, res) => {
	const user = getAuthUser();
	const data = JSON.parse(req.body.data);

	try {
		const [manager] = await User.readManagerByDev(user._devId);
		if (manager[0]) {
			const [result] = await Reimbursement.createReimbursement(
				user._userId,
				manager[0]._userId,
				data.newReimbursement._categoryId,
				data.newReimbursement.purpose,
				data.newReimbursement.totalCost,
				data.newReimbursement.plannedDate,
				data.newReimbursement.remarks
			);
			const [reimbursement] = await Reimbursement.readSelectedReimbursements(
				result.insertId,
				user._userId
			);

			let create = [];
			let rmuploads = [];
			for (let newItem of data.newItems) {
				create.push(
					ReimbursementItem.createReimbursementItem(
						reimbursement[0]._reimbursementId,
						newItem.item,
						newItem.qty,
						newItem.cost
					)
				);
			}

			const filenames = fs.readdirSync(UPLOAD_DIR);
			for (let filename of filenames) {
				create.push(
					Receipt.createReceipt(
						reimbursement[0]._reimbursementId,
						'image/' + filename.slice(filename.indexOf('.') + 1),
						filename,
						fs.readFileSync(path.join(UPLOAD_DIR, filename))
					)
				);
				rmuploads.push(unlink(path.join(UPLOAD_DIR, filename)));
			}

			if (create.length !== 0) await Promise.all(create);
			if (rmuploads.length !== 0) await Promise.all(rmuploads);

			const jsonRes = {
				success: 1,
				message: 'New reimbursement created.',
			};

			return res.status(200).send(jsonRes);
		}
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.putReimbursement = async (req, res) => {
	const user = getAuthUser();
	const _reimbursementId = req.params._reimbursementId;
	const data = JSON.parse(req.body.data);

	try {
		const [reimbursement] = await Reimbursement.updateReimbursement(
			data.updatedReimbursement._categoryId,
			data.updatedReimbursement.purpose,
			data.updatedReimbursement.totalCost,
			data.updatedReimbursement.plannedDate,
			data.updatedReimbursement.submittedDate,
			data.updatedReimbursement.remarks,
			_reimbursementId,
			user._userId
		);

		let update = [];
		let rmuploads = [];
		for (let updatedItem of data.updatedItems) {
			if (updatedItem.isNew === 1) {
				update.push(
					ReimbursementItem.createReimbursementItem(
						_reimbursementId,
						updatedItem.item,
						updatedItem.qty,
						updatedItem.cost
					)
				);
			} else if (updatedItem.isRemove === 0) {
				update.push(
					ReimbursementItem.updateReimbursementItem(
						updatedItem.item,
						updatedItem.qty,
						updatedItem.cost,
						updatedItem._itemId,
						_reimbursementId
					)
				);
			} else {
				update.push(
					axios.delete(
						`${URL}/api/reimbursement/${_reimbursementId}/delete-item/${updatedItem._itemId}`,
						{
							headers: {
								Authorization: req.header('authorization'),
							},
						}
					)
				);
			}
		}

		for (let _receiptId of data.deletedReceipts) {
			update.push(
				axios.delete(
					`${URL}/api/reimbursement/${_reimbursementId}/delete-receipt/${_receiptId}`,
					{
						headers: {
							Authorization: req.header('authorization'),
						},
					}
				)
			);
		}

		const filenames = fs.readdirSync(UPLOAD_DIR);
		for (let filename of filenames) {
			update.push(
				Receipt.createReceipt(
					_reimbursementId,
					'image/' + filename.slice(filename.indexOf('.') + 1),
					filename,
					fs.readFileSync(path.join(UPLOAD_DIR, filename))
				)
			);
			rmuploads.push(unlink(path.join(UPLOAD_DIR, filename)));
		}

		if (update.length !== 0) await Promise.all(update);
		if (rmuploads.length !== 0) await Promise.all(rmuploads);

		const jsonRes = {
			success: 1,
			message: 'Updated reimbursement.',
			updatedReimbursement: reimbursement,
		};

		return res.status(200).send(jsonRes);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.deleteReimbursements = async (req, res) => {
	try {
		await Receipt.deleteReimbursementReceipts(req.query._reimbursementIds);
		await ReimbursementItem.deleteReimbursementItems(req.query._reimbursementIds);
		await Reimbursement.deleteReimbursements(req.query._reimbursementIds);

		const jsonRes = {
			success: 1,
			message: 'Pending reimbursements deleted.',
		};

		return res.status(200).send(jsonRes);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.deleteReimbursementItem = async (req, res) => {
	try {
		await ReimbursementItem.deleteReimbursementItem(
			req.params._itemId,
			req.params._reimbursementId
		);

		const jsonRes = {
			success: 1,
			message: `Reimbursement item with itemId (${req.params._itemId}) deleted.`,
		};

		return res.status(200).send(jsonRes);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.deleteReceipt = async (req, res) => {
	try {
		await Receipt.deleteReceipt(req.params._receiptId, req.params._reimbursementId);

		const jsonRes = {
			success: 1,
			message: `Receipt with receiptId (${req.params._receiptId}) deleted.`,
		};

		return res.status(200).send(jsonRes);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};
