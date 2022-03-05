const express = require('express');
const router = express.Router();
const { getProducts,addProduct,updateProduct,deleteProduct} = require('../controllers/productsController')

//Routes and their handlers
router.route('/').get(getProducts).post(addProduct)
router.route('/:id').delete(deleteProduct).put(updateProduct)


module.exports = router;