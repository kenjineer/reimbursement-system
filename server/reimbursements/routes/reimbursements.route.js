const express = require('express');
const router = express.Router();

const upload = require('../multer-config');
const reimbursementsController = require('../controllers/reimbursements.controller');

router.get('/reimbursements', reimbursementsController.getUserReimbursements);

router.get(
	'/reimbursements/:_reimbursementId/reimbursement-items',
	reimbursementsController.getReimbursementItems
);

router.get('/reimbursements/:_reimbursementId/receipts', reimbursementsController.getReceipts);

router.get('/reimbursements/categories', reimbursementsController.getCategories);

router.post(
	'/reimbursements/new-reimbursement',
	upload.array('files'),
	reimbursementsController.postNewReimbursement
);

router.put(
	'/reimbursements/:_reimbursementId/edit-reimbursement',
	upload.array('files'),
	reimbursementsController.putReimbursement
);

router.delete(
	'/reimbursements/delete-reimbursement',
	reimbursementsController.deleteReimbursements
);

router.delete(
	'/reimbursements/:_reimbursementId/delete-item/:_itemId',
	reimbursementsController.deleteReimbursementItem
);

router.delete(
	'/reimbursements/:_reimbursementId/delete-receipt/:_receiptId',
	reimbursementsController.deleteReceipt
);

module.exports = router;
