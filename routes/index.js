

var express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");


router.get('/',function(req,res){
    res.render('landing');
});


router.get('/register',function(req,res){
    res.render('register')
});
//show register form
router.post('/register',function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err) {
            req.flash("error",err.message);
            res.redirect('back')
        }
        else{
            passport.authenticate('local')(req,res,function(){
                req.flash("success","Ku soo dhawoow Bogga Dalxiis "+user.username);
                res.redirect('/campgrounds')
            })
        }
    })
});
// show login form

router.get('/login',function(req,res){
    res.render('login')
});

//post login
router.post('/login',passport.authenticate("local",{successRedirect:"/campgrounds",failureRedirect:"/login"}),function(req,res){
    req.flash("error",err.message)
    res.redirect('login')
});

//logout
router.get('/logout',function(req,res){
    req.logout();
    req.flash("success","waad ka baxday ciwaankaagii!")
    res.redirect('/campgrounds')
});



module.exports = router;