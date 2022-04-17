const csvConverter = require('csvtojson')
const Product = require('../models/productModel');
// const connectDb = require('../config/db')
const convert = async(path)=>{
  const json = await csvConverter().fromFile(path)
  // const database = await connectDb(dbName)
   try {
     const response = await Product.insertMany(json)
     console.log(response)
     console.log(`Inserted: ${response.insertedCount} row`)
   } catch (error) {
     console.log(error)
   }  

}
module.exports = convert