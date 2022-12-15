const express = require('express');
const auth = require('../middleware/user/auth')
const logout = require('../controller/user/logout');

const router = express.Router();

const signup = require('../controller/user/signup')
router.get('/user_signup', signup.loadSignup)
router.post('/user_signup', signup.insertUser)
router.post('/otp', signup.otpVerification)

const login = require('../controller/user/login')
router.get('/user_login', auth.isLogout, login.loadLogin)
router.post('/user_login', login.userverification);
router.get('/', login.loadHome)
router.get('/logout', logout.logout);

const forgotPassword=require('../controller/user/forgotpassword');
const { request } = require('express');
router.get('/forgotPassword',forgotPassword.loadEmail)
router.post('/forgotPassword',forgotPassword.sentOtp);
router.post('/otpVerified',forgotPassword.otpVerification);
router.post('/newPassword',forgotPassword.newPassword)

const User=require('../model/user/userModel')
const shop=require('../controller/user/shop');
router.get('/shop',shop.loadShop)


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

module.exports = router;
