const mongoose=require('mongoose');
const User=require('./userModel');
const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    products:{},
    address:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    payment:String,
    status:{
        type:String,
        default:"Placed"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Order=mongoose.model('Order',orderSchema)
module.exports=Order;