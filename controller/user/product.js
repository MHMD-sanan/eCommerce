const Product = require("../../model/admin/product");
const User = require("../../model/user/userModel");

const eachProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    try {
        const isLogin=req.session.user_id;
        const cart=await User.findById(req.session.user_id);
        if(cart){
            res.render('../view/user/partials/shop/product.ejs', { product,isLogin,cart:cart.cart })
        }else{
            const isLogin=null;
            const cart=null;
            res.render('../view/user/partials/shop/product.ejs', { product,isLogin,cart});
            console.log("else worked inn product.js");
        }
    } catch (error) {
        const isLogin=null;
        const cart=null;
        res.render('../view/user/partials/shop/product.ejs', { product,isLogin,cart});
        console.log('catch worked in product.js');
    }
}
module.exports = {
    eachProduct
}