const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const convert = require('../utils/convert');
const connectDb = require('../config/db');
// @desc Get products
// @ route GET /api/products
// @access private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// @desc Get product
// @ route GET /api/products/:product_name
// @access private
const getProduct = asyncHandler(async (req, res) => {
  const { product_name} = req.body
  const product = await Product.findOne({product_name});
  if(!product){
    res.status(404).json({msg:'The product does not exist in the database.'})
  }else{
    res.status(200).json(product);
  }
  
});
// @desc Add a product
// @ route POST /api/products
// @access private
const addProduct = asyncHandler(async (req, res) => {
  if (!req.body.product_name || !req.body.price) {
    res.status(400);
    throw new Error("Please add a product name and a product price");
  } else {
    const { product_name, price,quantity ,_id} = req.body;
    const product = await Product.create({
      _id,
      product_name,
      price,
      quantity
    });
    res.status(200).json(product);
  }
});
// @desc update a product
// @ route PUT /api/products/
// @access private
const updateProduct = asyncHandler(async (req, res) => {
    const { _id, price,quantity} = req.body;
    const updatedproduct = await Product.findByIdAndUpdate(_id ,
      { price,quantity},
      { new: true }  
    )
    res.status(200).json({
      msg:'Product Updated',
      updatedproduct
    })
    // if (!updatedproduct) {
    //   res
    //     .status(404)
    //     .json({ msg: "The Product does not exist in our database" });
    // } else {
    //   res.status(200).json(updatedproduct);
    // }
});
// @desc delete a  product
// @ route delete /api/products/:product_name
// @access private
const deleteProduct = asyncHandler(async (req, res) => {
  if (!req.body._id) {
    res.status(400);
    throw new Error("Please provide a product name");
  } else {
    const { _id, dbName } = req.body;
    const database = await connectDb(dbName)
    const deleted = await Product.deleteOne({ _id });
    if (deleted.deletedCount === 0) {
      res
        .status(404)
        .json({ msg: "The product does not exist in our database" });
    } else {
      res
        .status(200)
        .json({ msg: `Item${_id} removed from the database` });
    }
  }
});

// @desc upload data  product
// @ route delete /api/products/upload
// @access private
const uploadData  = asyncHandler((req,res)=>{
  convert(req.file.path)
  res.json({
        msg:'Database Updated'
      })
})


module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  addProduct,
  uploadData,
  deleteProduct,
};
