const Product=require('../../model/admin/product')
const Category=require('../../model/admin/category');
const User=require('../../model/user/userModel')

const loadShop=async(req,res)=>{
    var search='';
    if(req.query.search){
        search=req.query.search
    }

    var page=1;
    if(req.query.page){
        page=req.query.page;
    }

    let sort;
    if(req.query.sort=="asort"){
        sort={price:-1}
    }else if(req.query.sort=="dsort"){
        sort={price:1}
    }else{
        sort={}
    }

    let filter;
    if(req.query.category){
        filter={category:req.query.category}
    }else{
        filter={}
    }
    
    const limit=12;
    const product=await Product.find({
        status:"true",
        $or:[
            {name:{$regex:'.*'+search+'.*',$options:'i'}},
            {category:{$regex:'.*'+search+'.*',$options:'i'}}
        ]
    }).limit(limit*1).skip((page-1)*limit).sort(sort).find(filter).exec();

    const count=await Product.find({
        status:"true",
    }).countDocuments();

    var test=parseInt(page)
    var max=Math.ceil(count/limit)
    var next=test+1;
    if(next>max){
        next=max
    }
    var prvs=test-1;
    if(prvs<1){
        prvs=1
    }
    const categoryDetails=await Category.find();
    try {
        const isLogin=req.session.user_id;
        const cart=await User.findById(req.session.user_id);
        if(cart){
            res.render('../view/user/partials/shop/shop.ejs',{
                details:product,totalPages:Math.ceil(count/limit),
                currentPage:page,next,prvs,page,isLogin,
                category:categoryDetails,cart:cart.cart
            })
        }else{
            const cart=null;const isLogin=null;
            res.render('../view/user/partials/shop/shop.ejs',{
                details:product,totalPages:Math.ceil(count/limit),
                currentPage:page,next,prvs,page,isLogin,category:categoryDetails,cart
            })
        }
    } catch (error) {
        const cart=null;const isLogin=null;
        res.render('../view/user/partials/shop/shop.ejs',{
            details:product,totalPages:Math.ceil(count/limit),
            currentPage:page,next,prvs,page,isLogin,category:categoryDetails,cart
        })
        console.log('catch block worked in shope.js');
    }
}

module.exports={
    loadShop
}