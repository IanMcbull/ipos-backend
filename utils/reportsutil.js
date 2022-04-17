const Sale = require('../models/salesModel');
const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

// Finding sales by day
const daysales = []; 
days.forEach(async(day)=>{
    const sales = await Sale.find({day})
    if(sales.length === 0){
        daysales.push(0)
    }else{
       const total = sales.reduce((acc,curr)=>{
           return acc+=parseInt(curr)
        },0)
        daysales.push(total)
    }
})
// Finding sales by month
const monthsales = months.map(async month => {
    const sales = await Sale.find({month})
    return sales
}
)

module.exports = {
    daysales,
    monthsales
}