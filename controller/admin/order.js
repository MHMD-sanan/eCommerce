const Order=require('../../model/user/order')
exports.viewOrders=async(req,res)=>{
    const orders=await Order.find({}).populate('user');
    res.render('../view/admi/order.ejs',{orders})
}

exports.orderStatus=async(req,res)=>{
    try {
        await Order.findByIdAndUpdate(req.body.orderId,{$set:{status:req.body.status}});
        res.redirect('back');
    } catch (error) {
        throw error
    }
}