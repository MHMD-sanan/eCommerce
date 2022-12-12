const express = require('express');
var session = require('express-session')
const app = express();

require('./model/db')

//app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.get('/test',(req,res)=>{
    res.send(req.session);
})

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