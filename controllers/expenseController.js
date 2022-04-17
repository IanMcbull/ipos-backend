const Expense = require("../models/expensesModel");
const asyncHandler = require("express-async-handler");
const moment = require("moment");

//@desc Add a new Expense
//@Private
const addExpense = asyncHandler(async (req, res) => {
  try {
    await Expense.create({
      expense_name: req.body.expense_name,
      amount: req.body.amount,
    });
    res.status(201).json({
      msg: "Expense Added",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
});

const totalExpenses = asyncHandler(async (req, res) => {
  try {
    const expenses = await Expense.find({ date: moment().format("L") });
    
    res.json({
      expenses,
    });
  } catch (error) {
    res.json({
      msg: "Unable to fetch expenses",
    });
  }
});

const expenses = asyncHandler(async (req, res) => {
    try {
      const expenses = await Expense.find();
      
      res.json({
        expenses,
      });
    } catch (error) {
      res.json({
        msg: "Unable to fetch expenses",
      });
    }
  });
  


module.exports = {
  addExpense,
  expenses,
  totalExpenses,
};
