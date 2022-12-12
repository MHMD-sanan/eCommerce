const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/eCommerce');

mongoose.connection.on("connected",(err)=>{  
    if(err){
        console.log('error'); 
    }
    else{
        console.log("mongodb connected successfuly");
    }
})
