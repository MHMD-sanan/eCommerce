const express=require('express');
const router=express.Router();



const userController=require('../controller/user');

router.get('/',userController.loadHome)

router.get('/user_signup',userController.loadSignup)
router.post('/user_signup',userController.insertUser)

router.get('/user_login',userController.loadLogin)
router.post('/user_login', userController.userverification);

router.post('/otp',userController.otpVerification)

module.exports=router;