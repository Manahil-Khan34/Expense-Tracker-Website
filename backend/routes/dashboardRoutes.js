const express = require('express');

const {protect} = require('../middleware/authMiddleware.js');

const {getDashboardData} = require('../controllers/dashboardController.js');

const router = express.Router();

router.get('/get', protect, getDashboardData);

module.exports = router;