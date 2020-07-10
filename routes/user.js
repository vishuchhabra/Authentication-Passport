const router = require('express').Router()


//login page
router.get('/login',(req, res)=>{
    res.send("Login here")
})


//Register page
router.get('/register',(req, res)=>{
    res.send("Register here")
})


module.exports = router