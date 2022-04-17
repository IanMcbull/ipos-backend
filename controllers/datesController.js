const Sales = require('../models/UserModel')

const months = async()=>{
    const sales = await Sales.find()
    const months = sales.map(sale=>sale.month)
    return months
}
const time = async()=>{
    const sales = await Sales.find()
    const time = sales.map(sale=>sale.timestamp)
    return time
}
const day = async()=>{
    const sales = await Sales.find()
    const day = sales.map(sale=>sale.day)
    return day
}
module.exports = {
  months,
  time,
  day    
}
