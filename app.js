const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {connectionDB} = require('./config/key')
const flash  = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()
//passport config
require('./config/passport')(passport)
//EJS
app.use(expressLayouts)
app.set('view engine','ejs')
 
//bodyparser
app.use(express.urlencoded({extended:false}))

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
//passport middlwares
app.use(passport.initialize())
app.use(passport.session())


//connect flash
app.use(flash())

//global vars
app.use((req, res ,next)=>{
    res.locals.success_msg = req.flash('success_msg') //res.local exist only life time of the request
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})


//connecting the DB
connectionDB()

//Routes
app.use('/',require('./routes/index')) 
app.use('/users',require('./routes/user'))


//server listening
const PORT = process.env.PORT  || 4000
app.listen(PORT,console.log(`Server listening on port ${PORT}`))