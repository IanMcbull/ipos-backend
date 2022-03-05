const express = require('express');
const router = express.Router();
const { getProducts,addProduct,updateProduct,deleteProduct} = require('../controllers/productsController')

//Routes and their handlers
router.route('/').get(getProducts).post(addProduct).delete(deleteProduct).put(updateProduct)


module.exports = router;