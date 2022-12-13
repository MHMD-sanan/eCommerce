const express=require('express');
const router=express.Router();



const auth=require('../middleware/user/auth')
const userController=require('../controller/user');

router.get('/user_signup',userController.loadSignup)
router.post('/user_signup',userController.insertUser)

router.get('/user_login',auth.isLogout,userController.loadLogin)
router.post('/user_login', userController.userverification);

router.get('/',auth.isLogin,userController.loadHome)

router.post('/otp',userController.otpVerification)

router.get('/logout',userController.logout);

module.exports=router;