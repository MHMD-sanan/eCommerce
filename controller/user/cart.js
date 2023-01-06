const User = require('../../model/user/userModel')
const Product = require('../../model/admin/product');

const addToCart = async (req, res) => {
    isLogin = req.session.user_id;
    const user=await User.findById(isLogin);
    const product=await Product.findById(req.params.id);
    user.addToCart(product)
    .then((data)=>{
        res.json({status:data.cart.items.length});
    }).catch(err=>{
        console.log(err);
    })
}

const incQty = async (req, res) => {
    const isLogin = req.session.user_id;
    const user=await User.findById(isLogin);
    const product=await Product.findById(req.params.id);
    user.addToCart(product)
    .then((data)=>{
        res.json(
            {
                totalPrice:data.cart.totalPrice
            }
        );
    }).catch(err=>{
        console.log(err);
    })
}

const decQty=async (req,res)=>{
    try {
        const isLogin = req.session.user_id;
        const user=await User.findById(isLogin);
        const product=await Product.findById(req.body.id)
        user.decQty(product);
        res.redirect("back");

    } catch (error) {
        console.log(error);
    }
}

const viewCart = async (req, res) => {
    const isLogin = req.session.user_id;
    const test=await User.findById(isLogin);
    test
    .populate("cart.items.productId")
    .then(data=>{
        res.render('../view/user/partials/shop/cart.ejs', { isLogin,cart:data.cart })
    })
    .catch(err=>console.log(err));
}

const deleteCart=async(req,res)=>{
    const isLogin = req.session.user_id;
    const test=await User.findById(isLogin);
    test.removeFromCart(req.body.proId)
    .then(() => {
        res.redirect('back');
    }).catch(err => console.log(err));
}

module.exports = {
    addToCart, viewCart,deleteCart,decQty,incQty

}






































// if(exits){
//     await Cart.updateOne({userid:userId},{$push:{product:productId}})
//     res.redirect('back');

// }else{
//     let cart=new Cart({
//         userid:userId,
//         product:productId
//     })

//     cart.save()
//     res.redirect('back')
// }

//pushing cart to db
    // try {
    //     const userId=req.session.user_id;
    //     const pro=await Product.findById(req.body.id)

    //     await User.findByIdAndUpdate({_id:userId},
    //         {$push:{"cart.items":{productId:pro._id,qty:1}},
    //         $set:{"cart.totalPrice":pro.price }
    //     })

    // } catch (error) {
    //     console.log(error);
    // }















