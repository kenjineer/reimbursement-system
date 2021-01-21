const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account.controller');

router.get('/account', accountController.getUserAccount);

router.put('/account', accountController.putUserAccount);

module.exports = router;
