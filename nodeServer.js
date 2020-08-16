const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session')

const app = express()

app.use(session({
    secret:'keyboard cat',
    saveUninitialized:true,
    resave: false
}))

app.use((req,res,next)=>{
    if(!(req.session.views)){
        req.session.views={}
    }
    const pathname = parseurl(req).pathname
    req.session.views[pathname]=(req.session.views[pathname] || 0)+1
    next()
})
app.get('/foo',(req,res,next)=>{res.send(`total view ${req.session.views['/foo']}`)})
app.get('/bar',(req,res,next)=>{res.send(`total view ${req.session.views['/bar']}`)})
app.listen(3000,console.log('apps running on port 3000'))