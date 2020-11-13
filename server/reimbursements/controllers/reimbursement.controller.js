const axios = require('axios');
const fs = require('fs');
const Receipt = require('../models/receipt.model');
const Reimbursement = require('../models/reimbursement.model');
const ReimbursementItem = require('../models/reimbursementitem.model');
const User = require('../models/user.model');
const getAuthUser = require('../passport-config').getAuthUser;

const PORT = process.env.PORT || 3002;
const URL = `http://localhost:${PORT}`;
const UPLOAD_DIR = path.join(__dirname, 'assets', 'uploads');

exports.getUserReimbursements = async (req, res) => {
	const user = getAuthUser();

	try {
		const [reimbursements] = await Reimbursement.readReimbursements(user._userId);

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
	try {
		const [reimbursementItems] = await ReimbursementItem.readReimbursementItems(
			req.params._reimbursementId
		);

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
	try {
		const [receipts] = await Receipt.readReceipts(req.params._reimbursementId);

		const jsonRes = {
			success: 1,
			message: 'User receipts retrieved.',
			receipts: receipts,
		};

		return res.status(200).send(jsonRes);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.postNewReimbursement = async (req, res) => {
	const user = getAuthUser();

	try {
		const [manager] = await User.readManagerByDev(user._devId);

		if (manager[0]) {
			const [reimbursement] = await Reimbursement.createReimbursement(
				user._userId,
				manager[0]._userId,
				req.body.newReimbursement._categoryId,
				req.body.newReimbursement.purpose,
				req.body.newReimbursement.totalCost,
				req.body.newReimbursement.plannedDate,
				req.body.newReimbursement.remarks
			);

			let create = [];
			for (newItem of req.body.newItems) {
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
			for (filename of filenames) {
				create.push(
					Receipt.createReceipt(
						reimbursement[0]._reimbursementId,
						filename,
						fs.readFileSync(`${UPLOAD_DIR}${filename}`, 'binary')
					)
				);
			}

			if (create.length !== 0) await Promise.all(create);

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

exports.patchReimbursement = async (req, res) => {
	const user = getAuthUser();
	const _reimbursementId = req.params._reimbursementId;

	try {
		const [reimbursement] = await Reimbursement.updateReimbursement(
			req.body.updatedReimbursement._categoryId,
			req.body.updatedReimbursement.purpose,
			req.body.updatedReimbursement.totalCost,
			req.body.updatedReimbursement.plannedDate,
			req.body.updatedReimbursement.submittedDate,
			req.body.updatedReimbursement.remarks,
			_reimbursementId,
			user._userId
		);

		let update = [];
		for (updatedItem of req.body.updatedItems) {
			if (updatedItem.isRemove == 0) {
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
						`${URL}/api/reimbursement/${_reimbursementId}/delete-item/${updatedItem._itemId}`
					)
				);
			}
		}

		for (_receiptId of req.body.deletedReceipts) {
			update.push(
				axios.delete(
					`${URL}/api/reimbursement/${_reimbursementId}/delete-receipt/${_receiptId}`
				)
			);
		}

		const filenames = fs.readdirSync(UPLOAD_DIR);
		for (filename of filenames) {
			update.push(
				Receipt.createReceipt(
					_reimbursementId,
					filename,
					fs.readFileSync(`${UPLOAD_DIR}${filename}`, 'binary')
				)
			);
		}

		if (update.length !== 0) await Promise.all(update);

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
