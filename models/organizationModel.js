const mongoose = require('mongoose');
const orgSchema = mongoose.Schema({
    organization_name:{
        type:String,
         required:[true,'Please add a name']
    },
    password:{
        type:String,
         required:[true,'Please add a password']
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},
{timestamps:true}
)
module.exports = mongoose.model('Organization',orgSchema)