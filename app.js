const express = require('express');
const app = express();
require('./utils/comm/db');
const path=require('path');
require('dotenv').config();

const session=require('./utils/comm/session');
app.use(session.session);
app.use(session.cache);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use('/public', express.static(__dirname + '/public'));

const flash=require('connect-flash');
app.use(flash());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

// TESTING PURPOSE

// app.get('/test',(req,res)=>{
//     res.render('test');
// })
// const SECRET_KEY="sk_test_51MMVFLSIGyvNbThFKeQUs3d9AzoJkwTHFaQN97BXxSxnuzKMGa95rAUiRPbwTabeQjcTkC8AB5LB6EwWg0nB7XkO00bo2ZBkhA";
// const stripe=require('stripe')(SECRET_KEY);
// app.post('/test',async(req,res)=>{
//     if(req.body.payment=='COD'){
//         console.log('this is cod');
//     }else if(req.body.payment=='Card'){
//         console.log('this is card');
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             mode: "payment",

//             line_items:[
//                 {
//                     price_data:{
//                         currency:'usd',
//                         product_data:{
//                             name:"Order Total",
//                         },
//                         unit_amount:1000*100,
//                     },
//                     quantity:1,
//                 }
//             ],
//             success_url:"http://localhost:3000/success",
//             cancel_url: 'http://localhost:3000/error',
//           })
//            res.json({ url: session.url });
//     }else{
//         console.log('this is paypal');
//     }
// })

// app.use(async(req,res,next)=>{
//     req.session.user_id="63a96d25fa3a241fa7161baf"
//     next()
// })
//TESTING PURPOSE

const adminRouter = require('./routes/admin');
app.use('/admin_panel', adminRouter);

const userRouter = require('./routes/user');
app.use('/', userRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log('Server started at ' + process.env.PORT);
})