const express = require('express');

const { addIncome, getAllIncomes,  deleteIncome, downloadIncomeExcel } = require('../controllers/incomeController.js');

const { protect } = require('../middleware/authMiddleware.js'); 


const router = express.Router();

router.post('/add', protect, addIncome);

router.get('/get', protect, getAllIncomes);

router.get('/downloadexcel', protect, downloadIncomeExcel);

router.delete('/:id', protect, deleteIncome);

module.exports = router;
