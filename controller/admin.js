const User=require('../model/user/userModel')
const Category=require('../model/admin/category')
const Product=require('../model/admin/product')

const loadAdmin=(req,res)=>{
    res.render('../view/admi/dashboard.ejs')
}

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

const category=async(req,res)=>{
    try {
        Category.find({}, (err, userdetails) => {
            if (err) {
                console.log(err);
            } else {
                res.render('../view/admi/category.ejs', { details: userdetails })
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

const insertCategory=(req,res)=>{
    try {
        let category= new Category({
            name:req.body.name,
            image:req.file.filename,
        })
        category.save();
        res.redirect('/admin_panel/category');

    } catch (error) {
        console.log(error.message);
    }
}

const editCategory=async(req,res)=>{
    try {
        const id = req.query.id;
        const userData = await Category.findById({ _id: id });
        if (userData) {
            res.render('../view/admi/editCategory.ejs', { user: userData });
        } else {
            res.redirect('/admin_panel/category');
        }

    } catch (error) {
        console.log(error.message);
    }
}

const updateCategory=async(req,res)=>{
    try {
        await Category.findByIdAndUpdate({ _id: req.query.id }, { $set: { name: req.body.name, image: req.file.filename } });
        res.redirect('/admin_panel/category');
    } catch (error) {
        console.log(error.message);
    }
}

const deleteCategory=async(req,res)=>{
    try {
        await Category.findByIdAndDelete({_id:req.query.id});
        res.redirect('/admin_panel/category');
    } catch (error) {
        console.log(error.message);
    }
}

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
    await Product.findByIdAndUpdate({_id:req.query.id},{$set:{name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        image:req.file.filename,
        price:req.body.price,
        quantity:req.body.quantity
    }})
    res.redirect('/admin_panel/product');
}

const insertProduct=(req,res)=>{
    try {
        let product= new Product({
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            image:req.file.filename,
            price:req.body.price,
            quantity:req.body.quantity,
        })
        product.save();
        res.redirect('/admin_panel/product');

    } catch (error) {
        console.log(error.message);
    }
}

const deleteProduct=async(req,res)=>{
    try {
        await Product.findByIdAndDelete({_id:req.query.id});
        res.redirect('/admin_panel/product');
    } catch (error) {
        console.log(error.message);
    }
}

const coupen=(req,res)=>{
    try {
        res.render('../view/admi/coupen.ejs');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    loadAdmin,loadUser,updateUser,
    category,insertCategory,deleteCategory,editCategory,updateCategory,
    product,insertProduct,deleteProduct,editProduct,updateProduct,
    coupen
}