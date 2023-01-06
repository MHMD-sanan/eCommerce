const mongoose=require('mongoose');

const coupenSchema=new mongoose.Schema({
    code:String,
    discount:Number,
    status:{
        type:Boolean,
        default:true
    },
    startDate:Date,
    endDate:Date,
    maxQty:Number,
    cap:Number
})

const Coupen=mongoose.model('Coupen',coupenSchema)

module.exports=Coupen;