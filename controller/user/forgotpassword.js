const User=require('../../model/user/userModel');
const forgotMailer=require('../../utils/user/passwordOtp')

const loadEmail=async(req,res)=>{
    res.render('../view/user/partials/forgotPassword/forgotPassword.ejs')
}

let userData;
const sentOtp=async(req,res)=>{
    try {
        userData=await User.findOne({email:req.body.email});
        if(userData){
            let mailDetails = {
                from: 'muhammedsanan14@gmail.com',
                to: req.body.email,
                subject: 'Forgot password',
                html: `<p>Your OTP to reset your password id ${forgotMailer.OTP}</p>`,
            };
            forgotMailer.mailTransporter.sendMail(mailDetails, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("OTP mailed");
                    res.render('../view/user/partials/forgotPassword/otp.ejs')
                }
            })
        }else{
            res.render('../view/user/partials/forgotPassword/forgotPassword.ejs',{error:"Email Not Found"})
        }
    } catch (error) {
        console.log(error);
    }
}

const otpVerification = async (req, res) => {
    try {
        if (req.body.otp == forgotMailer.OTP) {
            res.render('../view/user/partials/forgotPassword/newPassword.ejs')
        } else {
            res.render('../view/user/partials/forgotPassword/otp.ejs', { error: "Invalid OTP" });
        }
    } catch (err) {
        console.log(err);
    }
}

const newPassword=async(req,res)=>{
    try {
        console.log(userData._id);
        console.log(req.body.password);
        await User.findByIdAndUpdate({_id:userData._id},{$set:{password:req.body.password}});
        // res.render('../view/user/login.ejs',{success:"Your Password changed successfully"});
        res.redirect('/user_login');
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    loadEmail,sentOtp,otpVerification,newPassword
}