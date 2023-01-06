const Product = require("../../model/admin/product");
const User = require("../../model/user/userModel");

const eachProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    try {
        const isLogin=req.session.user_id;
        const cart=await User.findById(req.session.user_id);
        if(cart.length!=0 || cart!=null){
            res.render('../view/user/partials/shop/product.ejs', { product,isLogin,cart:cart.cart,error:req.flash('error'),success:req.flash('success') })
        }else{
            const error=null;
            const success=null;
            const isLogin=null;
            const cart=null;
            res.render('../view/user/partials/shop/product.ejs', { product,isLogin,cart,error,success});
            console.log("else worked inn product.js");
        }
    } catch (err) {
        const error=null;
        const success=null;
        const isLogin=null;
        const cart=null;
        res.render('../view/user/partials/shop/product.ejs', { product,isLogin,cart,error,success});
        console.log('catch worked in product.js');
    }
}
module.exports = {
    eachProduct
}