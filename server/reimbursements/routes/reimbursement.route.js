const express = require('express');
const router = express.Router();

const reimbursementController = require('../controllers/reimbursement.controller');

router.get('/reimbursement', reimbursementController.getUserReimbursements);

module.exports = router;
