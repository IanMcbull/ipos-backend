const mongoose = require('mongoose');
const moment = require('moment');
const salesSchema = mongoose.Schema({
    user:{
      type:String,
      required:true,
    },
    product_name:{
        type: String,
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number,
        default:0,
        required: true
    },
    day:{
      type: String,
      default: () => moment().format('dddd')
    },
    total:{
      type:String
    },
    timestamp:{
        type:String,
        default: () => moment().format("h:mm:ss a")
    },
    date:{
        type:String,
        default:()=> moment().format("L")
    },
    month:{
        type:String,
        default:() => moment().format('MMMM')
    }
})

module.exports = mongoose.model('sales',salesSchema);