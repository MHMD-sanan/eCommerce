const Coupen=require('../../model/admin/coupen')

const coupen=async(req,res)=>{
    try {
        Coupen.find({}, (err, coupen) => {
            if (err) {
                console.log(err);
            } else {
                res.render('../view/admi/coupen.ejs', { details: coupen })
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

const insertCoupen=async(req,res)=>{
    try {
        new Coupen(req.body).save();
        res.redirect('/admin_panel/coupen')

    } catch (error) {
        console.log(error);
    }
}

const editCoupen=async(req,res)=>{
    try {
        const id=req.query.id;
        const coupenData= await Coupen.findById({_id:id});
        if(coupenData){
            res.render('../view/admi/editCoupen.ejs',{coupenData})
        }else{
            res.redirect('/admin_panel/coupen')
        }
    } catch (error) {
        console.log(error);
    }
}

const updateCoupen=async(req,res)=>{
    try {
        await Coupen.findByIdAndUpdate({_id:req.query.id},{$set:{
            code:req.body.code,
            discount:req.body.discount,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            minAmount:req.body.minAmount
        }});
        res.redirect('/admin_panel/coupen')
    } catch (error) {
        console.log(error);
    }
}

const statusCoupen=async(req,res)=>{
    try {
        const check=await Coupen.findById({_id:req.query.id});
        if(check.status==true){
            await Coupen.findByIdAndUpdate({ _id: req.query.id }, { $set: { status:false } });
        }else{
            await Coupen.findByIdAndUpdate({ _id: req.query.id }, { $set: { status:true} });
        }
        res.redirect('/admin_panel/coupen');
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    coupen,insertCoupen,editCoupen,updateCoupen,statusCoupen
}