const login=async(req,res)=>{
    res.render('../view/admi/login.ejs')
}

const email="admin@gmail.com"
const password="123"
const loginVerification=(req,res)=>{
    try {
        if(req.body.email==email && req.body.password==password){
            req.session.adminEmail=req.body.email;
            res.redirect('/admin_panel');
        }else{
            res.render('../view/admi/login.ejs',{message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
    }
}

const loadAdmin=(req,res)=>{
    res.render('../view/admi/dashboard.ejs')
}

const logout=(req,res)=>{
    req.session.adminEmail=false;
    res.redirect('/admin_panel/login')
}

module.exports={
    login,loginVerification,loadAdmin,logout
}