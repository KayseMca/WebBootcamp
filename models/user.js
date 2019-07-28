
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
    name:String,
    username: String,
    password:String
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('user',userSchema)
module.exports = User;