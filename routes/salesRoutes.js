const express = require('express');
const router = express.Router();
const { getSales,updateSale,deleteSale,addSale, getSale,totalSales} = require('../controllers/salesController')
const {protect} = require('../middleware/authMiddleware')
//Routes and their handlers
router.route('/').get(getSales)
router.route('/addsale').post(addSale)
router.route('/total').get(totalSales)
router.route('/:id').get(protect,getSale).delete(protect,deleteSale).put(protect,updateSale)

module.exports = router;