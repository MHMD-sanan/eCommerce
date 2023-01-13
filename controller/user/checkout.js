const User = require('../../model/user/userModel')
exports.viewCheckOut = async (req, res) => {
    try {
        isLogin = req.session.user_id;
        user = await User.findById(isLogin);
        user.populate("cart.items.productId")
            .then(data => {
                res.render('../view/user/partials/shop/checkout.ejs', { isLogin, cart: data.cart, address: data.address,error:req.flash('error'),success:req.flash('success')})
            }).catch(err => console.log(err));
    } catch (error) {
        console.log(error);
    }
}

exports.paymentPage = async (req, res) => {
    address={
        name:req.body.name,
        home:req.body.home,
        state:req.body.state,
        pincode:req.body.pincode,
        mobile_num:req.body.mobile_num
    }
    try {
        addressId = req.body.addressId;
        totalPrice=req.body.totalPrice;
        data = await user.populate("cart.items.productId");
        res.render('../view/user/partials/shop/payment.ejs', { isLogin, cart: data.cart, address:address});
    } catch (error) {
        console.log(error);
    }
}

const Order = require('../../model/user/order');
const Razorpay = require('razorpay');
exports.payment=async(req,res)=>{
    console.log('fetch call');
    paymentMethode=req.body.payment;
    try {
        if(req.body.payment=="COD"){
            res.json({
                success:false,
                url:"http://localhost:4000/success"
            })
        }else if(req.body.payment=="online"){
            var instance = new Razorpay({
                key_id: 'rzp_test_2xERoSusyd4f84',
                key_secret: 'HmXhicCwdmxPICFO7gdn4vS2',
              });
            let order=await instance.orders.create({
                amount: totalPrice,  // amount in the smallest currency unit
                currency: "INR",
                receipt: "rcp1"
            });
            res.json({
                success:true,
                url:"http://localhost:4000/success",
                amount:totalPrice
            });
        }else{

        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.success=async(req,res)=>{
    try {
        const isLogin = req.session.user_id;
        const user=await User.findById(isLogin);
        orderObj = {
            user: isLogin,
            products: user.cart,
            address: addressId,
            payment: paymentMethode,
        }
        const order = new Order(orderObj);
        order.save();
        await User.findByIdAndUpdate(isLogin, { $unset: { cart: "" }});
        const data = await user.populate("cart.items.productId");
        res.render('../view/user/partials/shop/thankyou.ejs',{isLogin,cart:data.cart});
    } catch (error) {
        console.log(error);
    }
}

exports.cancelPaypal=async(req,res)=>{
    const isLogin = req.session.user_id;
    const user=await User.findById(isLogin);
    const data = await user.populate("cart.items.productId");
    res.render('../view/user/partials/shop/error.ejs',{isLogin,cart:data.cart});
}

