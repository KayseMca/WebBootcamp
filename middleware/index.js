var Comment = require("../models/comment"),
    Campground = require("../models/comment");

middlewareObj = {};

//check the campground's owner

middlewareObj.CheckCampgroundOwernship = function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
        
        Campground.findById(req.params.id,function(err,foundCamp){
            if(err){
                 console.log("not find camp to edit in the routes/campgrounds.ejs ",err);
                 res.redirect("back")
            }
            else{
                //does user own the campground
                //if(foundCamp.author.id.equals(req.user._id)){
                   return next()
                //}else{
                  //  req.flash("error","uma fasaxnid inaad masaxdo amase aad bedesho");
                    //res.redirect("back")
               // }
            }
        })
    }else{
        req.flash("error","fadlan marka hore ciwaankaaga geli!")
        res.redirect("back")
    }
};

middlewareObj.CheckCommentOwernship = function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
        
        Comment.findById(req.params.comment_id,function(err,foundCom){
            if(err){
                 console.log("not find camp to edit in the routes/campgrounds.ejs ",err);
                 res.redirect("back")
            }
            else{
                //does user own the 
                if(foundCom.author.id.equals(req.user._id)){
                   return next()
                }else{
                    req.flash("error","uma fasaxnid inaad masaxdo amase aad bedesho");
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error","fadlan marka hore ciwaankaaga geli!");
        res.redirect("back")
    }
}

//check if user is logged first
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","fadlan marka hore ciwaankaaga geli!")
    return res.redirect('/login')  
}

module.exports = middlewareObj;