const express = require('express');
const auth = require('../middleware/user/auth')
const router = express.Router();

const signup = require('../controller/user/signup')
router.get('/user_signup',auth.isLogout, signup.loadSignup)
router.post('/user_signup',auth.isLogout,signup.insertUser)
router.post('/otp',auth.isLogout,signup.otpVerification)

const login = require('../controller/user/login')
const logout = require('../controller/user/logout');
router.get('/user_login', auth.isLogout, login.loadLogin)
router.post('/user_login',auth.isLogout,login.userverification);
router.get('/', login.loadHome);
router.get('/logout',logout.logout);

const forgotPassword=require('../controller/user/forgotpassword');
const { request } = require('express');
router.get('/forgotPassword',auth.isLogout,forgotPassword.loadEmail)
router.post('/forgotPassword',auth.isLogout,forgotPassword.sentOtp);
router.post('/otpVerified',auth.isLogout,forgotPassword.otpVerification);
router.post('/newPassword',auth.isLogout,forgotPassword.newPassword)

const shop=require('../controller/user/shop');
router.get('/shop',shop.loadShop)

const product=require('../controller/user/product')
router.get('/product/:id',product.eachProduct)

const cart=require('../controller/user/cart');
router.get('/addToCart/:id',auth.isLogin,cart.addToCart);
router.get('/incQty/:id',auth.isLogin,cart.incQty);
router.get('/cart',auth.isLogin,cart.viewCart);
router.post('/cart',auth.isLogin,cart.deleteCart);
router.post('/decQty',auth.isLogin,cart.decQty);

const address=require('../controller/user/address');
router.post('/saveAdd',auth.isLogin,address.saveAdd);
router.post('/editAddress',auth.isLogin,address.editAddress);
router.post('/updateAdd',auth.isLogin,address.updateAddress);

const checkOut=require('../controller/user/checkout')
router.get('/checkOut',auth.isLogin,checkOut.viewCheckOut);
router.post('/payment',auth.isLogin,checkOut.paymentPage);
// router.post('/placeOrder',auth.isLogin,checkOut.placeOrder);
router.get('/error',auth.isLogin,checkOut.cancelPaypal);
router.get('/success',auth.isLogin,checkOut.success);
router.post('/create-checkout-session',checkOut.payment);

const coupon=require('../controller/user/coupon');
router.post('/coupon',auth.isLogin,coupon.applyCoupon);

const profile=require('../controller/user/profile');
router.get('/profile',auth.isLogin,profile.viewProfile);
router.post('/userUpdate',auth.isLogin,profile.userUpdate);
router.get('/address',auth.isLogin,profile.address);
router.post('/editAddress2',auth.isLogin,profile.editAddress2);
router.post('/updateAdd2',auth.isLogin,profile.updateAddress2);
router.post('/deleteAddress',auth.isLogin,profile.removeAddress);
router.get('/orders',auth.isLogin,profile.orders);
router.post('/cancelOrder',auth.isLogin,profile.cancelOrder);

const wishlist=require('../controller/user/wishlist');
router.post('/wishList',auth.isLogin,wishlist.addToWishlist);
router.get('/wishlist',auth.isLogin,wishlist.viewWishList);
router.post('/deleteFromWishlist',auth.isLogin,wishlist.deleteFromWishlist);
router.post('/moveToCart',auth.isLogin,wishlist.moveToCart);

module.exports = router;


