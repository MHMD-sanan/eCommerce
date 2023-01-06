const Order=require('../../model/user/order')
exports.viewSales=async(req,res)=>{
    const orders=await Order.find({status:"Delivered"}).populate('user');
    res.render('../view/admi/sales.ejs',{orders})
}
