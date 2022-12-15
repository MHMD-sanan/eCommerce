const User=require('../../model/user/userModel')

const loadUser=(req,res)=>{
    try {
        User.find({}, (err, userdetails) => {
            if (err) {
                console.log(err);
            } else {
                res.render('../view/admi/users.ejs', { details: userdetails })
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const check=await User.findById({_id:req.query.id});
        if(check.status==true){
            await User.findByIdAndUpdate({ _id: req.query.id }, { $set: { status:false } });
        }else{
            await User.findByIdAndUpdate({ _id: req.query.id }, { $set: { status:true} });
        }
        res.redirect('/admin_panel/users');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    loadUser,updateUser
}