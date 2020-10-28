const express = require('express');
const dashboard = require('../dashboard');
const router = express.Router();

const dashboardController = require('../controllers/dashboard.controller');

router.get(
	'/dashboard',
	dashboard.passport.authenticate('jwt', { session: false }),
	dashboardController.getDashboard
);

module.exports = router;
