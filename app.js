const express = require('express');
const app = express();
require('./utils/comm/db')
const session=require('./utils/comm/session')
const path=require('path');
require('dotenv').config();

app.use(session.session)
app.use(session.cache);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'));

app.use('/public', express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(async(req,res,next)=>{
    req.session.user_id="63a2d81965ddac101cad31de"
    next()
})


const adminRouter = require('./routes/admin')
app.use('/admin_panel', adminRouter);

const userRouter = require('./routes/user')
app.use('/', userRouter)


app.get('/test',(req,res)=>{
    res.render('test.ejs')
})
app.post('/test',(req,res)=>{
    
    console.log("api called");
    console.log(req.body);
    res.json({
        name:req.body.name,
        password:req.body.password
    });
})


app.listen(process.env.PORT, (req, res) => {
    console.log('Server started at ' + process.env.PORT);
})