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
        addressId = req.body.addressId;talPrice=req.body.totalPrice;
        data = await user.populate("cart.items.productId");
        res.render('../view/user/partials/shop/payment.ejs', { isLogin, cart: data.cart, address:address});
    } catch (error) {
        console.log(error);
    }
}

const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', 
    'client_id':process.env.CLIENT_ID,
    'client_secret':process.env.CLIENT_SECRET
});
const Order = require('../../model/user/order');
exports.placeOrder = async (req, res) => {
    try {
        const products=await User.findById(isLogin);
        orderObj = {
            user: isLogin,
            products: products.cart,
            address: addressId,
            payment: req.body.paymentMethode,
        }
        const order = new Order(orderObj);
        order.save();
        await User.findByIdAndUpdate(isLogin, { $unset: { cart: "" }});
        if (req.body.paymentMethode == 'COD') {
            const data = await user.populate("cart.items.productId");
            // res.render('../view/user/partials/shop/thankyou.ejs',{isLogin,cart:data.cart});
            res.redirect('/success');
        }else if(req.body.paymentMethode== 'Card'){
            console.log('this is card payment');
        }
         else {
            var create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:3000/payPalSuccess",
                    "cancel_url": "http://localhost:3000/error"
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "shoe",
                            "sku": "002",
                            "price": totalPrice,
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total":totalPrice
                    },
                    "description": "This is the payment description."
                }]
            };
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    console.log('Crate payment Responce');
                    payment=payment.links.filter((data)=>data.rel=='approval_url')[0]
                    redirect_url=payment.href;
                    res.redirect(redirect_url);
                }
            });  
            
        }
    } catch (error) {
        console.log(error);
    }
}

exports.payPal=async(req,res)=>{
    try {
        const payerId=req.query.PayerID;
        const paymentId=req.query.paymentId;
        console.log(paymentId);
        const execute_payment_json={
            'payer_id':payerId,
            'transactions':[{
                'amount':{
                    'currency':'USD',
                    'total':totalPrice
                }
            }]
        };
        paypal.payment.execute(paymentId,execute_payment_json,function(error,payment){
            if (error) {
                console.log(error);
            } else {
                // console.log(JSON.stringify(payment));
                res.render('../view/user/partials/shop/thankyou.ejs',{isLogin,cart:data.cart});
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.success=async(req,res)=>{
    try {
        const isLogin = req.session.user_id;
        const user = await User.findById(isLogin);
        const data = await user.populate("cart.items.productId");
        res.render('../view/user/partials/shop/thankyou.ejs',{isLogin,cart:data.cart});
    } catch (error) {
        console.log(error);
    }
}

exports.cancelPaypal=async(req,res)=>{

    res.send('something went wrong');
}

