const express = require('express');
const router = express.Router();

const emailController = require('../controllers/email.controller');

router.post('/email/approval/:_reimbursementId', emailController.postApprovalEmail);

router.post('/email/rejection/:_reimbursementId', emailController.postRejectionEmail);

router.post('/email/release/:_reimbursementId', emailController.postReleaseEmail);

module.exports = router;
