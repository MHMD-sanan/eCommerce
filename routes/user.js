const express = require('express');
const auth = require('../middleware/user/auth')
const router = express.Router();

const signup = require('../controller/user/signup')
router.get('/user_signup',auth.isLogout, signup.loadSignup)
router.post('/user_signup', signup.insertUser)
router.post('/otp', signup.otpVerification)

const login = require('../controller/user/login')
const logout = require('../controller/user/logout');
router.get('/user_login', auth.isLogout, login.loadLogin)
router.post('/user_login', login.userverification);
router.get('/', login.loadHome);
router.get('/logout', logout.logout);

const forgotPassword=require('../controller/user/forgotpassword');
const { request } = require('express');
router.get('/forgotPassword',auth.isLogout,forgotPassword.loadEmail)
router.post('/forgotPassword',forgotPassword.sentOtp);
router.post('/otpVerified',forgotPassword.otpVerification);
router.post('/newPassword',forgotPassword.newPassword)

const shop=require('../controller/user/shop');
router.get('/shop',shop.loadShop)

const product=require('../controller/user/product')
router.get('/product/:id',product.eachProduct)

const cart=require('../controller/user/cart');
router.get('/addToCart/:id',auth.isLogin,cart.addToCart);
router.get('/incQty/:id',cart.incQty);
router.get('/cart',auth.isLogin,cart.viewCart);
router.post('/cart',auth.isLogin,cart.deleteCart);
router.post('/decQty',cart.decQty);

const address=require('../controller/user/address');
router.post('/saveAdd',address.saveAdd);
router.post('/editAddress',address.editAddress);
router.post('/updateAdd',address.updateAddress);

const checkOut=require('../controller/user/checkout')
router.get('/checkOut',checkOut.viewCheckOut);
router.post('/payment',checkOut.paymentPage);
router.post('/placeOrder',checkOut.placeOrder);
router.get('/payPalSuccess',checkOut.payPal);
router.get('/error',checkOut.cancelPaypal);
router.get('/success',checkOut.success);

const coupon=require('../controller/user/coupon');
router.post('/coupon',coupon.applyCoupon);

const profile=require('../controller/user/profile');
router.get('/profile',profile.viewProfile);
router.post('/userUpdate',profile.userUpdate);
router.get('/address',profile.address);
router.post('/editAddress2',profile.editAddress2);
router.post('/updateAdd2',profile.updateAddress2);
router.post('/deleteAddress',profile.removeAddress);
router.get('/orders',profile.orders);
router.post('/cancelOrder',profile.cancelOrder);

const wishlist=require('../controller/user/wishlist');
router.post('/wishList',auth.isLogin,wishlist.addToWishlist);
router.get('/wishlist',wishlist.viewWishList);
router.post('/deleteFromWishlist',wishlist.deleteFromWishlist);
router.post('/moveToCart',wishlist.moveToCart);

// router.get('/create-checkout-session',(req,res)=>{
//     res.render('test')
// })
const stripe=require('../controller/user/stripe');
router.post('/create-checkout-session',stripe.payment);



module.exports = router;


