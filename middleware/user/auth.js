const isLogin=async(req,res,next)=>{
    if(req.session.user_id){
        next();
    }else{
        res.redirect('/user_login')
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