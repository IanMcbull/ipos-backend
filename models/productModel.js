const mongoose = require('mongoose');
const { v4: uuidv4, v4 } = require('uuid');
const productSchema = mongoose.Schema({
    _id:{
      type:String,
      default:uuidv4
    },
    product_name:{
        type: String,
        required: [true, 'Please add a product name']
    },
    price:{
        type:Number || String,
        default:0,
       required: [true, 'Please add a price']
    },
    quantity:{
        type: Number,
        default:0
    }
},{
    timestamps:true
})

module.exports = mongoose.model('products',productSchema);