const express = require('express');
const app = express();
require('./utils/comm/db')
const session=require('./utils/comm/session')

app.use(session.session)
app.use(session.cache);

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