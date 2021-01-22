const express = require('express');
const router = express.Router();

const upload = require('../multer-config');
const reimbursementsController = require('../controllers/reimbursements.controller');

router.get('/reimbursements/user/:authority', reimbursementsController.getUserReimbursements);

router.get('/reimbursements/:_reimbursementId/items', reimbursementsController.getItems);

router.get('/reimbursements/:_reimbursementId/receipts', reimbursementsController.getReceipts);

router.get('/reimbursements/categories', reimbursementsController.getCategories);

router.post(
	'/reimbursements/new',
	upload.array('files'),
	reimbursementsController.postNewReimbursement
);

router.put(
	'/reimbursements/:_reimbursementId',
	upload.array('files'),
	reimbursementsController.putReimbursement
);

router.delete('/reimbursements/:_reimbursementId', reimbursementsController.deleteReimbursement);

router.delete(
	'/reimbursements/:_reimbursementId/items/:_itemId',
	reimbursementsController.deleteItem
);

router.delete(
	'/reimbursements/:_reimbursementId/receipts/:_receiptId',
	reimbursementsController.deleteReceipt
);

router.put(
	'reimbursements/:_reimbursementId/status/:statusFlag',
	reimbursementsController.putReimbursementStatus
);

module.exports = router;
