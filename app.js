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

const fileupload=require('express-fileupload');
app.use(fileupload({
    useTempFiles:true
}))


// TESTING PURPOSE

app.get('/test',(req,res)=>{
    res.render('test');
})
app.post('/test',async(req,res)=>{

})

// app.use(async(req,res,next)=>{
//     req.session.user_id="63a96d25fa3a241fa7161baf"
//     next()
// })
//TESTING PURPOSE

const adminRouter = require('./routes/admin');
app.use('/admin_panel', adminRouter);

const userRouter = require('./routes/user');
const { Result } = require('express-validator');
app.use('/', userRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log('Server started at ' + process.env.PORT);
})