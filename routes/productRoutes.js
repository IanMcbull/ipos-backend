const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')

const { getProducts,getProduct,addProduct,updateProduct,deleteProduct,uploadData} = require('../controllers/productsController')

//Routes and their handlers
router.route('/').get(getProducts).post(addProduct).delete(deleteProduct).put(updateProduct)
router.route('/product').post(getProduct)
router.route('/upload').post(upload.single('file'),uploadData)
module.exports = router;