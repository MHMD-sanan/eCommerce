const User=require('../../model/user/userModel')

const isLogin=async(req,res,next)=>{
    try {
        if(req.session.user_id){
            const userData=await User.findById({_id:req.session.user_id});
            if(userData.status==true){
                next()
            }else{
                req.session.user_id=false
                res.redirect('/')
                }
            }else{
            res.redirect('/user_login')
        }
    } catch (error) {
        console.log(error)
    }    
}

const isLogout=async(req,res,next)=>{
    if(req.session.user_id){
        res.redirect('/');
    }else{
        next();
    }
}

module.exports={
    isLogin,
    isLogout
}