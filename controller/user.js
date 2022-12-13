const mailer=require('../utils/otp')
const User=require('../model/user/userModel')


const loadSignup=(req,res)=>{
    res.render('../view/user/signup.ejs')
}

const loadLogin=(req,res)=>{

        res.render('../view/user/login.ejs')
}

const insertUser = async (req, res) => {
    try {
        userData=req.body;
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (email === user.email) {
            res.render('../view/user/signup.ejs', { error: "Email Already Exits" });
        }
    } catch (error) {
        
        let mailDetails={
            from:'muhammedsanan14@gmail.com',
            to:req.body.email,
            subject:'User Verification',
            html:`<p>Your OTP is ${mailer.OTP}</p>`,
        };
        mailer.mailTransporter.sendMail(mailDetails,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.render('../view/user/otp.ejs');
                console.log("OTP mailed");
            }
        })

        // res.redirect('/otp')
        //user1.save();
       // res.render('../view/user/signup.ejs', { succ: "Registration Success Please Sign In" });
    }
}

const otpVerification=async(req,res)=>{
    try {
        if(req.body.otp==mailer.OTP){
            const user1=new User(userData);
            user1.save();
        
            res.redirect('/user_login');
            // res.render('../view/user/signup.ejs', { succ: "Registration Success Please Sign In" });
        }else{
            res.render('../view/user/otp.ejs', { error: "Invalid OTP" });
        }
    } catch (err) {
        console.log(err);
    }
}

const userverification = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email:req.body.email});
        if(user){
            if(password === user.password) {

                req.session.user_id=user._id;
                res.redirect('/')
            } else {
                res.render('../view/user/login.ejs', { wrong: "Invalid Credentials" });
            }
        } else {
            res.render('../view/user/login.ejs', { wrong: "User Not Found" });
        }
    } catch (error) {
        console.log(error.message);
        res.render('../view/user/login.ejs', { wrong: "User Not Found" });
    }
}

const loadHome=(req,res)=>{

        res.render('../view/user/home.ejs')
}

const logout=async (req,res)=>{
    req.session.user_id=false;
    res.redirect('/user_login');
}

module.exports={
    loadHome,
    loadSignup,
    loadLogin,
    insertUser,
    userverification,
    otpVerification,
    logout
}