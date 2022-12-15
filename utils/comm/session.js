const Session=require('express-session');
const cookie=require('cookie-parser')
const cache=(req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
}

const session=Session({
    secret:'anyrandomkeyalubfdjjsjd',
    saveUninitialized:true,
    cookie:{maxAge:3000000},
    resave:false
})

module.exports={
    cache,session
}