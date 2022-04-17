const asyncHandler = require("express-async-handler");
const moment = require('moment');
// @desc Get sales
// @ route GET /api/sales
// @access private
const Sale = require("../models/salesModel");
const User = require('../models/UserModel');
const Products = require('../models/productModel');
const getSales = asyncHandler(async (req, res) => {
  const sales = await Sale.find();
  res.status(200).json(sales);
});

// @desc Get sale
// @ route GET /api/sales/:id
// @access private
const getSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findOne({user:req.params.id});
  res.status(200).json(sale);
});
// @desc Add a sale
// @ route POST /api/sales
// @access private
const addSale = asyncHandler(async (req, res) => {
  if (!req.body.product_name || !req.body.price) {
    res.status(400);
    throw new Error("Please add a product name and a product price");
  } else {
    const { product_name, price,id, quantity, total, user } = req.body;
    const product =  await Products.findOne({product_name})
    if(product.quantity > 0){
      const product =  await Products.findOneAndUpdate({product_name},{$inc:{quantity:-quantity}},{new:true})
      console.log(product)
    }
    const sale = await Sale.create({
      product_name,
      price,
      user,
      total,
      id,
      quantity
    });
    res.status(200).json(sale);
  }
});
// @desc update a sale
// @ route PUT /api/sales/:id
// @access private
const updateSale = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Please provide a sale id");
  } else {
    const { id } = req.params;
    const update = req.body.update;
    const updatedSale = await Sale.findByIdAndUpdate({ _id: id }, { update },{new:true});
    const user = User.findById(req.user.id);
    if (!updatedSale) {
      res.status(404).json({ msg: "The Sale does not exist in our database" });
    } else {
      res.status(200).json(updatedSale);
    }
  }
});
// @desc delete a sale
// @ route delete /api/sale/:id
// @access private
const deleteSale = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Please provide a sale id");
  } else {
    const { id } = req.params;
    const deleted = await Sale.deleteOne({ _id: id });
    if (deleted.deletedCount === 0) {
      res
        .status(404)
        .json({ msg: "The product does not exist in our database" });
    } else {
      res
        .status(200)
        .json({ msg: `Sale removed from the database` });
    }
  }
});

//@desc Total sales
//@private
const totalSales = asyncHandler(async(req,res)=>{
    try {
      const totalSales = await Sale.find({date: moment().format("L")});
      res.json({sales:totalSales})
    } catch (error) {
      res.json({
        msg:'Unable to fetch sales'
      })      
    }
});

module.exports = {
  addSale,
  updateSale,
  getSales,
  getSale,
  deleteSale,
  totalSales
};
