
var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
    text:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"cser"
        },
        username:String
    }
});
var Comment = mongoose.model("comment",commentSchema);

module.exports = Comment;