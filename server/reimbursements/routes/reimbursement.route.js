const express = require('express');
const router = express.Router();

const upload = require('../multer-config');
const reimbursementController = require('../controllers/reimbursement.controller');

router.get('/reimbursement', reimbursementController.getUserReimbursements);

router.get('/reimbursements/:_reimbursementId');

router.post('/reimbursement/new-reimbursement', upload.array('file'));

router.patch('/reimbursement/:_reimbursementId/edit-reimbursement', upload.array('file'));

router.delete('/reimbursement/delete-reimbursement');

router.delete('/reimbursement/:_reimbursementId/delete-item/:_itemId');

router.delete('/reimbursement/:_reimbursementId/delete-receipt/:_receiptId');

module.exports = router;
