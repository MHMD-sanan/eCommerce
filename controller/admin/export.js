const ejs=require('ejs');
var pdf = require('html-pdf');
const fs=require('fs');
const path=require('path');
const Order = require('../../model/user/order');
const { response } = require('express');
const exceljs=require('exceljs');

exports.exportsales=async(req,res)=>{
    try {
        if(req.body.format=='pdf'){
            const orders=await Order.find({"status":"Delivered",date:{$gte:req.body.from,$lte:req.body.to}}).populate('user');
            const data={
                orders:orders
            }
            const filePathName=path.resolve(__dirname,'../../view/admi/pdf.ejs');
            const htmlString=fs.readFileSync(filePathName).toString();
            var options = { format: 'Letter' };
            const ejsData=ejs.render(htmlString,data);
            pdf.create(ejsData,{
                childProcessOptions: {
                  env: {
                    OPENSSL_CONF: '/dev/null',
                  },
                }
            }).toFile('Sales_Report.pdf',(err,response)=>{
                if(err) console.log(err);
                const filePath=path.resolve(__dirname,'../../Sales_Report.pdf');
                fs.readFile(filePath,(err,file)=>{
                    if(err){
                        console.log(err);
                        return res.status(500).send('something went wrong');
                    }
                    res.setHeader('Content-Type','application/pdf');
                    res.setHeader('Content-Deposition','attachment;filename="Sales_Report.pdf"');
                    res.send(file);
                })
            })
        }else{
            const workbook=new exceljs.Workbook();
            const worksheet=workbook.addWorksheet('Sales Report');
        
            worksheet.columns=[
                {header:"Date",key:'Date'},
                {header:"Customer",key:'name'},
                {header:"Payment",key:'payment'},
                {header:"Items",key:'items'},
                {header:"Total",key:'total'},
            ];
            
            const salesData=await Order.find({status:"Delivered"}).populate('user');
            salesData.forEach((order)=>{
                const date = order.date;
                const isoString = date.toISOString();
                const newDate = isoString.split('T')[0];
                order.Date=newDate;
                order.name=order.user.name;
                order.payment=order.payment;
                order.items=order.products.items.length;
                order.total=order.products.totalPrice;
                worksheet.addRow(order);
            });
            worksheet.getRow(1).eachCell((cell)=>{
                cell.font={bold:true};
            });
         
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheatml.sheet'
            );
        
            res.setHeader('Content-Disposition',`attachment; filename=sales_Report.xlsx`);
        
            return workbook.xlsx.write(res).then(()=>{
                res.status(200);
            });
        }
    } catch (error) {
        throw error
    }
}

