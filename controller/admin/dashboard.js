const Order = require('../../model/user/order');
const User = require('../../model/user/userModel');
exports.loadAdmin=async(req,res)=>{
    try {
        const test=await Order.aggregate([
            {
                $match:{"status":"Delivered"}
            },
            {
               $group: {
                  _id: null,
                  total: { $sum: "$products.totalPrice" }
               }
            }
        ]);        
        users=await User.count();
        orders=await Order.count();
        const placed=await Order.find({status:"Placed"}).count();
        const shipped=await Order.find({status:"Shipped"}).count();
        const delivered=await Order.find({status:"Delivered"}).count();
        const cancelled=await Order.find({status:"Cancelled"}).count();

        const piechart=await Order.aggregate([
            {
                $project:{
                    month:{$month:"$date"}
                }
            }
        ]);
        res.render('../view/admi/dashboard.ejs',{totalSale:test[0].total,totalUsers:users,orders:orders,placed,shipped,delivered,cancelled,piechart});

    } catch (error) {
        const totalSale=0;
        const placed=0
        const shipped=0
        const delivered=0
        const cancelled=0
        const piechart=0
        res.render('../view/admi/dashboard.ejs',{totalSale,totalUsers:users,orders:orders,placed,shipped,delivered,cancelled,piechart});
    }
}