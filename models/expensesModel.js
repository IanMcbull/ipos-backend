const mongoose = require('mongoose');
const moment = require('moment')
const expenseSchema = mongoose.Schema({
    expense_name:{
        type: String,
    },
    amount:{
        type:Number
    },
    timestamp:{
        type:String,
        default: () => moment().format("h:mm:ss a")
    },
    date:{
        type:String,
        default:()=>moment().format("L")
    },
    month:{
        type:String,
        default:() => moment().format('MMMM')
    }
})

module.exports = mongoose.model('expenses',expenseSchema);