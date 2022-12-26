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

const cart=require('../controller/user/cart')
router.get('/addToCart/:id',auth.isLogin,cart.addToCart)
router.get('/cart',auth.isLogin,cart.viewCart);
router.post('/cart',auth.isLogin,cart.deleteCart)
router.post('/decQty',cart.decQty)

const checkOut=require('../controller/user/checkout')
router.get('/checkOut',checkOut.viewCheckOut)
router.post('/saveAdd',checkOut.saveAdd);
router.get('/payment/:id',checkOut.paymentPage);
router.post('/placeOrder',checkOut.placeOrder);

module.exports = router;






















// ***********   MY API FOR REDIRECTING TO HOME PAGE  *******************
// let test= async function(String1,String2,String3,String4){
//     const userData=await User.findOne({email:String2})
//     if(userData){
//         String1.render('../view/user/forgotPassword.ejs',{success:String3})
//     }else{
//         String1.render('../view/user/forgotPassword.ejs',{error:String4})
//     }
// }

// router.post('/forgotPassword',async(req,res)=>{
//     try {
//         test(res,req.body.email,"ok",'error');
//     } catch (error) {
//         console.log(error);
//     }
// })