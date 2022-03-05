const asyncHandler = require('express-async-handler')
 // @desc Get products
// @ route GET /api/products
// @access private
const Product = require('../models/productModel')
const getProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find()
    res.status(200).json(products)
}) 
// @desc Add a product
// @ route POST /api/products
// @access private
const addProduct = asyncHandler(async (req,res) =>{
    if(!req.body.product_name || !req.body.price){
        res.status(400)
        throw new Error('Please add a product name and a product price')
    }else{
        const {product_name, price} = req.body;
        const product = await Product.create({
          product_name,
          price
        })
        res.status(200).json(product)
    }
}) 
// @desc update a product
// @ route PUT /api/products
// @access private
const updateProduct = asyncHandler(async(req,res) =>{
    
    if(!req.body.product_name || !req.body.price){
      res.status(400)
      throw new Error('Please provide the price and the product name')
    }else{
        const {product_name, price} = req.body;
        const updatedproduct = await Product.findOneAndUpdate({product_name},{price},{new:true})
        if(!updatedproduct){
            res.status(404).json({msg:'The Product does not exist in our database'})
        }else{
            res.status(200).json(updatedproduct)
        }
        
    }
    
}) 
// @desc delete a  product
// @ route delete /api/products/:id
// @access private
const deleteProduct = asyncHandler(async(req,res) =>{
    if(!req.body.product_name){
        res.status(400)
        throw new Error('Please provide a product name')
    }else{
        const {product_name} = req.body
        const deleted = await Product.deleteOne({product_name})
        if(deleted.deletedCount === 0){
            res.status(404).json({msg:'The product does not exist in our database'})
        }else{
           res.status(200).json({msg:`${product_name} removed from the database`})
        }
        
    }
    
}) 

module.exports = {
    getProducts,
    updateProduct,
    addProduct,
    deleteProduct
}