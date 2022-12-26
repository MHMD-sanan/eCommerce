const User=require('../../model/user/userModel')
exports.viewCheckOut=async(req,res)=>{
    try {
        const isLogin = req.session.user_id;
        const user=await User.findById(isLogin);
        user.populate("cart.items.productId")
            .then(data=>{
                res.render('../view/user/partials/shop/checkout.ejs', { isLogin,cart:data.cart,address:data.address})
            }).catch(err=>console.log(err));
    } catch (error) {
        console.log(error);
    }

}

exports.saveAdd=async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.session.user_id});
        const data=req.body;
        await user.addAdd(data);
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

exports.paymentPage=async(req,res)=>{
    try {
        addressId=req.params.id;
        const isLogin = req.session.user_id;
        const user=await User.findById(isLogin);
        user.populate("cart.items.productId")
            .then(data=>{
                res.render('../view/user/partials/shop/payment.ejs', { isLogin,cart:data.cart,address:data.address})
            }).catch(err=>console.log(err));
    } catch (error) {
        console.log(error);
    }
}

const Order=require('../../model/user/order');
exports.placeOrder=async(req,res)=>{
    try {
        console.log(req.body);
        const isLogin = req.session.user_id;
        const user=await User.findById(isLogin);
        const data=await user.populate("cart.items.productId");
        orderObj={
            user:isLogin,
            products:data.cart,
            address:addressId,
            payment:req.body.paymentMethode
        }
        const order=new Order(orderObj);   
        res.render('../view/user/partials/shop/thankyou.ejs')
    } catch (error) {
        console.log(error);
    }
}

