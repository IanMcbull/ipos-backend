const express = require('express');
const router = express.Router();
const {addExpense,totalExpenses, expenses} = require('../controllers/expenseController')

router.route('/addExpense').post(addExpense)
router.route('/').get(expenses)
router.route('/total').get(totalExpenses)
module.exports = router;