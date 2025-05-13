const express = require('express');

const { addExpance, getAllExpances,  deleteExpance, downloadExpanceExcel } = require('../controllers/expanceController.js');

const { protect } = require('../middleware/authMiddleware.js'); 


const router = express.Router();

router.post('/add', protect, addExpance);

router.get('/get', protect, getAllExpances);

router.get('/downloadexcel', protect, downloadExpanceExcel);

router.delete('/:id', protect, deleteExpance);

module.exports = router;
