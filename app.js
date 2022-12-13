const express = require('express');
const app = express();

require('./utils/db')

const session=require('express-session');
const cookie=require('cookie-parser')
app.use(session({
    secret:'anyrandomkeyalubfdjjsjd',
    saveUninitialized:true,
    cookie:{maxAge:3000000},
    resave:false
}))
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});



app.set('view engine', 'ejs')
app.use('/public', express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const adminRouter = require('./routes/admin')
app.use('/admin_panel', adminRouter);

const userRouter = require('./routes/user')
app.use('/', userRouter)

const port = 3000;
app.listen(port, (req, res) => {
    console.log('Server started at ' + port);
})