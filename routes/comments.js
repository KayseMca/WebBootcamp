
var express = require('express'),
    router = express.Router({mergeParams:true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");


    router.get('/new',middleware.isLoggedIn,function(req,res){
    // find campground by ID
    Campground.findById(req.params.id,function(err,camp){
        if(err) console.log("not found camp to comment ",err)
        else{
            res.render("comments/new",{campground:camp});
        }
    });
    
});



// post to comments

router.post('/',middleware.isLoggedIn,function(req,res){
    //look up campground using ID
    Campground.findById(req.params.id,function(err,camp){
        if(err) console.log("error to post comment in campground ",err)
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err) console.log("not create a comment", err)
                else{
                    // add this campground for the new comment
                    //add username and id  to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success","Faallo cusub baad ku dartay")
                    res.redirect('/campgrounds/'+ camp._id)
                }
            });
        }
    })
    //create a new comment
    //connect new comment to campground
    //redirect campground show page
});


//Comment edit 

router.get("/:comment_id/edit",middleware.CheckCommentOwernship,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundCom){
        if(err) res.redirect("back")
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundCom})
        }
    })
});

//Comment Update(PUT)

router.put("/:comment_id",middleware.CheckCommentOwernship,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundCom){
        if(err) res.redirect("back")
        else{
            req.flash("success","Faaladaaddii waad cusboonaysiisay");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//Delete The Comnent
router.delete("/:comment_id",middleware.CheckCommentOwernship,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,foundCamp){
        if(err) res.redirect("back")
        else{
            req.flash("success","Faaladaaddii waad tirtirtay");
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
});


module.exports = router;