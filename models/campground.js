
var mongoose = require('mongoose');
//var Comment = require('./comment');


var campgroundSchema = new mongoose.Schema({
    name:String,
    gobol:String,
    image:String,
    faalo:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ],
});
var Campground = mongoose.model("campground",campgroundSchema);

module.exports = Campground;