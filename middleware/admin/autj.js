const isLogin=async(req,res,next)=>{
    if(req.session.adminEmail){
        next();
    }else{
        res.redirect('/admin_panel/login')
    }
}

const isLogout=async(req,res,next)=>{
    if(req.session.adminEmail){
        res.redirect('/admin_panel');
    }else{
        next()
    }
}

module.exports={
    isLogin,
    isLogout
}