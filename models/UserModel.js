const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type:String,
         required:[true,'Please add a name']
    },
    role:{
      type: String,
      required:[true, 'Please provide a user role']
    },
    password:{
        type:String,
         required:[true,'Please add a password']
    },
    usertype:{
        type:String,
        required:true,
        default:'Basic'
    },
    logincount:{
        type:Number,
        default:0
    }
},
{timestamps:true}
)
module.exports = mongoose.model('User',userSchema)