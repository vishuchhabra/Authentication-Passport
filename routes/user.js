//express Router
const router = require('express').Router()

//user model
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

//login page
router.get('/login',(req, res)=>{
    res.render('login')
})


//Register page
router.get('/register',(req, res)=>{
    res.render('register.ejs')
})

//register handle
router.post('/register',(req, res)=>{

    const {name,email,password,password2}= req.body
    let errors =[]

    //check required filed 
    if(!name || !email || !password || !password2){
       errors.push({msg:'Please fill all fields.'}) 
    }
    if(password2 !==password){
        errors.push({msg:'Passwords does not match.'})
    }
    //check length 
    if(password.length <6){
        errors.push({msg:'Password should be at least 6 characters.'})
    }
    if(errors.length>0){
        res.render('register',{
           errors,
           name,
           email, 
           password,
           password2
        })
    }else{
        //validation passed
        const newUser = new User({
            name,email,password //ES6 new 
        })

        //Hash password
        bcrypt.genSalt(10,(err, salt)=>{
            bcrypt.hash(newUser.password,salt,(err, hash)=>{
                if(err) throw err;
                //set password to hash
                newUser.password = hash
            
                newUser.save((err, data)=>{
                if(err){
                    errors.push({msg:"E-Mail already exist..."})
                    res.render('register',{
                        errors,
                        name,
                        email, 
                        password,
                        password2
                     })
                }
                else{
                    req.flash('success_msg','Registered Successfully..')
                    res.redirect('login')
                }
            })

            })
        })
    }
})

//login handle
router.post('/login',(req, res,next)=>{

    passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/users/login',
    failureFlash:true})(req, res,next)

})

//logout handle

router.get('/logout',(req, res)=>{
    req.logOut();
    req.flash('success_msg','You are logged out')
    res.redirect('/users/login')
})


module.exports = router