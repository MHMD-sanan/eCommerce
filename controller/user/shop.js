const Product=require('../../model/admin/product')

const loadShop=async(req,res)=>{
    const product=await Product.find({});
    res.render('../view/user/shop/shop.ejs',{details:product})
}

module.exports={
    loadShop
}