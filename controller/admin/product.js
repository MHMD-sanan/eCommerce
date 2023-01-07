const Product=require('../../model/admin/product')
const Category=require('../../model/admin/category')

const product=async(req,res)=>{
    try {
        Product.find({}, (err, productdetails) => {
            if (err) {
                console.log(err);
            } else {
                Category.find({}, (err, categorydetails) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('../view/admi/product.ejs', { details: productdetails,category:categorydetails })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

const editProduct=async(req,res)=>{
    try {
        const id = req.query.id;
        const product= await Product.findById({ _id: id });
        const categoryDetails=await Category.find();
        if (product) {
            res.render('../view/admi/editProduct.ejs', { product,category:categoryDetails});   
        } else {
            res.redirect('/admin_panel/product');
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateProduct=async(req,res)=>{

    const file=req.files.image;
    let imagePath;
    await cloudinary.uploader.upload(file.tempFilePath,{folder:"Products"},(error,result)=>{
        imagePath=result.secure_url;
    });
    await Product.findByIdAndUpdate({_id:req.query.id},{$set:{
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        image:imagePath,
        price:req.body.price,
        quantity:req.body.quantity,
        color:req.body.color
    }})
    res.redirect('/admin_panel/product');
}


const cloudinary=require('../../utils/admin/cloudinary');
const insertProduct=async(req,res)=>{

    const file=req.files.image;
    let imagePath;
    await cloudinary.uploader.upload(file.tempFilePath,{folder:"Products"},(error,result)=>{
        imagePath=result.secure_url;
    });
    
    try {
        let product= new Product({
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            image:imagePath,
            price:req.body.price,
            quantity:req.body.quantity,
            color:req.body.color
        });
        product.save();
        res.redirect('/admin_panel/product');

    } catch (error) {
        console.log(error.message);
    }
}

const statusProduct=async(req,res)=>{
    try {
        const check=await Product.findById({_id:req.query.id});
        if(check.status==true){
            await Product.findByIdAndUpdate({ _id: req.query.id }, { $set: { status:false } });
        }else{
            await Product.findByIdAndUpdate({ _id: req.query.id }, { $set: { status:true} });
        }
        res.redirect('/admin_panel/product');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    product,insertProduct,updateProduct,statusProduct,editProduct
}