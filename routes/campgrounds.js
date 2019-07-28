
var express = require('express'),
    router = express.Router(),
    Campground  = require('../models/campground'),
    methodOverride = require('method-override'),
    Comment     = require('../models/comment'),
    middleware = require("../middleware/index");



    router.use(methodOverride('_method'));
    
    router.get('/',function(req,res){
    var campAll = Campground.find({},function(err,camps){
        if(err){
            console.log("there is error ",err)
        }
        else{
            res.render('campground/campgrounds',{campgrounds:camps})
        }
    })
    
})

router.get('/new', middleware.isLoggedIn,function(req,res){

    res.render('campground/new');
});

router.post('/', middleware.isLoggedIn,function(req,res){
    //get data from form and add to campgrounds array

    var name = req.body.name;
    var gobol = req.body.gobol;
    var faalo = req.body.faalo;
    var url = req.body.image;
     var author={
        id : req.user._id,
        username : req.user.username }
    var newCamp = {name:name,gobol:gobol,image:url,faalo:faalo,author:author};
    
    //create a new campground and save to the database
    Campground.create(newCamp,function(err,newlyCamp){
        if(err){
            console.log("there is error ",err)
        }
        else{
            //add the author 
            newlyCamp.save();
            //console.log(newlyCamp)
            //redirect campgrounds page
            res.redirect('/campgrounds');
        }
    })
    //campgrounds.push({name:name,image:url});
    //res.redirect('/campgrounds');
    //redirect campgrounds page
     
});

// shows more info about the image.

router.get('/:id',function(req,res){
    //find the campground with provided ID
    //render show template
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err){
            console.log("there is an error ",err);
        }
        else{
            res.render('campground/show',{campground:foundCamp});
            //console.log("idgu waa: ",foundCamp._id)
        }
    });
   
});

//EDIT CAMPGROUNDS ROUTE

router.get('/:id/edit',middleware.CheckCampgroundOwernship,function(req,res){
        Campground.findById(req.params.id,function(err,camp){
                    res.render("campground/edit",{campground:camp});
        })
})


//UPDATE CAMPGROUNDS

router.put('/:id',middleware.CheckCampgroundOwernship,function(req,res){
    //find and update the campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamp){
        if(err){
            console.log("not updated the camp ",err)
            res.redirect("/campgrounds")
        }else{
            //console.log(updatedCamp)
            //res.send("you here")
            req.flash("success","xogtadii waxbaad ka bedeshay");
            res.redirect("/campgrounds/"+ req.params.id)
        }
    })
    //redirect somewhere(show page)

});

//Destroy Campground Route
router.delete("/:id",middleware.CheckCampgroundOwernship,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log("not deleted the camp",err)
            res.redirect("/campgrounds");
        }else{
            req.flash("success","xogtaadii waad tirtirtay");
            res.redirect("/campgrounds");
        }
    })
});



module.exports = router;