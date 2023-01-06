const User = require('../../model/user/userModel')
const Product = require('../../model/admin/product');
const { default: mongoose } = require('mongoose');

exports.addToWishlist=async(req,res)=>{
    try {
        const isLogin = req.session.user_id;
        const user=await User.findById(isLogin);
        const product=await Product.findById(req.body.productId);
        const replay=await user.addToWishlist(product);
        if(replay=='exist'){
            req.flash('error',"Product already wishlisted");
        }else
            req.flash('success',"Product wishlisted");
        res.redirect('back')
    } catch (error) {
        throw error
    }
}

exports.viewWishList=async(req,res)=>{
   try {
    isLogin=req.session.user_id;
    user = await User.findById(isLogin);
    data = await user.populate("wishlist.productId");
    res.render('../view/user/partials/profile/wishlist.ejs',{isLogin,cart:data.cart,wishlist:data.wishlist})
   } catch (error) {
    throw error
   }
}

exports.deleteFromWishlist=async(req,res)=>{
    try {
        const isLogin=req.session.user_id;
        await User.findByIdAndUpdate(isLogin,
            {$pull:{wishlist:{productId:req.body.proId}}}
            );
        res.redirect('back');
    } catch (error) {
        throw error
    }
}

exports.moveToCart=async(req,res)=>{
    try {
        const isLogin=req.session.user_id;
        const user=await User.findById(isLogin);
        const product=await Product.findById(req.body.proId);
        await user.addToCart(product)
        await User.findByIdAndUpdate(isLogin,
            {$pull:{wishlist:{productId:req.body.proId}}}
        );
        res.redirect('back');

    } catch (error) {
        console.log(error);
    }
}