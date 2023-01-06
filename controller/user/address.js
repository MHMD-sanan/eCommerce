const { default: mongoose } = require("mongoose");
const User = require("../../model/user/userModel");

exports.saveAdd = async (req, res) => {
    try {
        isLogin = req.session.user_id;
        user = await User.findById(isLogin);
        const data = req.body;
        await user.addAdd(data);
        req.flash('message','New Address added succesfully')
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

exports.editAddress=async(req,res)=>{
    try {
        id=req.body.addId;
        test=await User.find({"_id":isLogin})
        data = await user.populate("cart.items.productId");
        const address=await User.aggregate([
            {$match:{"_id":mongoose.Types.ObjectId(isLogin)}},
            {$unwind:"$address"},
            {$match:{"address._id":mongoose.Types.ObjectId(id)}},
        ]);
        res.render('../view/user/partials/shop/editAddress.ejs',{ isLogin, cart: data.cart,address:address[0].address});
    } catch (error) {
        throw error
    }
}

exports.updateAddress=async(req,res)=>{
    try {
        await user.updateAddress(req.body);
        res.redirect('/checkOut')
    } catch (error) {
        throw error
    }
}