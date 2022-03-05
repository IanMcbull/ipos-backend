const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    product_name:{
        type: String,
        required: [true, 'Please add a product name']
    },
    price:{
        type:Number,
        required: [true, 'Please add a price']
    },
    popularity:{
        type: Number,
        default:0
    }
},{
    timestamps:true
})

module.exports = mongoose.model('products',productSchema);