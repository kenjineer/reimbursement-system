const express = require('express');
const router = express.Router();

const upload = require('../multer-config');
const reimbursementController = require('../controllers/reimbursement.controller');

router.get('/reimbursement', reimbursementController.getUserReimbursements);

router.get(
	'/reimbursement/:_reimbursementId/reimbursement-items',
	reimbursementController.getReimbursementItems
);

router.get('/reimbursement/:_reimbursementId/receipts', reimbursementController.getReceipts);

router.post(
	'/reimbursement/new-reimbursement',
	upload.array('files'),
	reimbursementController.postNewReimbursement
);

router.put(
	'/reimbursement/:_reimbursementId/edit-reimbursement',
	upload.array('files'),
	reimbursementController.putReimbursement
);

router.delete('/reimbursement/delete-reimbursement', reimbursementController.deleteReimbursements);

router.delete(
	'/reimbursement/:_reimbursementId/delete-item/:_itemId',
	reimbursementController.deleteReimbursementItem
);

router.delete(
	'/reimbursement/:_reimbursementId/delete-receipt/:_receiptId',
	reimbursementController.deleteReceipt
);

module.exports = router;
