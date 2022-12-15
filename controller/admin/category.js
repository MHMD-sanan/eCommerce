const Category = require('../../model/admin/category')

const category = async (req, res) => {
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

const insertCategory = (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
            image: req.file.filename,
        })
        category.save();
        res.redirect('/admin_panel/category');
    } catch (error) {
        console.log(error.message);
    }
}

const editCategory = async (req, res) => {
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

const updateCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate({ _id: req.query.id }, { $set: { name: req.body.name, image: req.file.filename } });
        res.redirect('/admin_panel/category');
    } catch (error) {
        console.log(error.message);
    }
}

const statusCategory = async (req, res) => {
    try {
        const check=await Category.findById({_id:req.query.id});
        if(check.status==true){
            await Category.findByIdAndUpdate({ _id: req.query.id }, { $set: { status:false } });
        }else{
            await Category.findByIdAndUpdate({ _id: req.query.id }, { $set: { status:true} });
        }
        res.redirect('/admin_panel/category');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    statusCategory, updateCategory, editCategory, insertCategory, category
}