const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
//EJS
app.use(expressLayouts)
app.set('view engine','ejs')
const PORT = process.env.PORT  || 4000

//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/user'))


//server listening
app.listen(PORT,console.log(`Server listening on port ${PORT}`))