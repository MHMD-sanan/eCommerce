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
    res.render('test.ejs');
});
app.post('/test',(req,res)=>{
    res.json({
        message:"Server Sent Hello"
    });
});
//TESTING PURPOSE

const adminRouter = require('./routes/admin');
app.use('/admin_panel', adminRouter);

const userRouter = require('./routes/user');
app.use('/', userRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log('Server started at ' + process.env.PORT);
})