const asyncHandler = require('express-async-handler')
// @desc Get products
// @ route GET /api/products
// @access private
const getProducts = asyncHandler(async(req,res) =>{
    res.status(200).json({msg:'Get products'})
}) 
// @desc Add a product
// @ route POST /api/products
// @access private
const addProduct = asyncHandler(async (req,res) =>{
    if(!req.body.productname){
        res.status(400)
        throw new Error('Please add a product name')
    }else{
        res.status(200).json({msg:'Add a product'})
    }
}) 
// @desc update a product
// @ route PUT /api/products
// @access private
const updateProduct = asyncHandler(async(req,res) =>{
    res.status(200).json({msg:`Update  a product: ${req.params.id}`})
}) 
// @desc delete a  product
// @ route delete /api/products/:id
// @access private
const deleteProduct = asyncHandler(async(req,res) =>{
    res.status(200).json({msg:`Delete a product: ${req.params.id}`})
}) 

module.exports = {
    getProducts,
    updateProduct,
    addProduct,
    deleteProduct
}