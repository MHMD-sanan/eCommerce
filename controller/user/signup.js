const User = require('../../model/user/userModel');
const mailer = require('../../utils/user/otp');

const loadSignup = (req, res) => {
    res.render('../view/user/partials/login/signup.ejs')
}

const insertUser = async (req, res) => {
    try {
        userData = req.body;
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (email === user.email) {
            res.render('../view/user/partials/login/signup.ejs', { error: "Email Already Exits" });
        }
    } catch (error) {

        let mailDetails = {
            from: 'muhammedsanan14@gmail.com',
            to: req.body.email,
            subject: 'User Verification',
            html: `<p>Your OTP is ${mailer.OTP}</p>`,
        };
        mailer.mailTransporter.sendMail(mailDetails, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render('../view/user/partials/login/otp.ejs'); 
                console.log("OTP mailed");
            }
        })
    }
}

const otpVerification = async (req, res) => {
    try {
        if (req.body.otp == mailer.OTP) {
            const user1 = new User(userData);
            user1.save();
            res.redirect('/user_login');
        } else {
            res.render('../view/user/otp.ejs', { error: "Invalid OTP" });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports={
    loadSignup,insertUser,otpVerification
}