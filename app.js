
var express     = require('express'),
    bodyParser  = require('body-parser'),
    flash       = require("connect-flash"),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    //SeedDB      = require('./seeds'),
    Comment     = require('./models/comment'),
    localStrategy= require('passport-local'),
    passport    = require('passport'),
    cookieSession= require('cookie-session'),
    User        = require('./models/user'),
    passport    =require('passport'),
    methodOverride = require('method-override'),
    keys        = require("./keys/keys")
    app         = express();

var expressSanitizer = require("express-sanitizer");

var commentsRoutes = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
//deleting all datas in database
//SeedDB();
var key = keys.database;
var PORT = process.env.PORT || 5500;

//"mongodb://localhost/dalxiisDB"
mongoose.connect( process.env.MONGO_URI ||"mongodb+srv://kayse:000@cluster0-dotip.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
app.use(expressSanitizer());

  

//passport configuration
app.use(require("express-session")({//kullanıcı bir session baslatıgında kullanıcı için benzersiz bir kimlik belirlenerek sunucunda bilgilerin saklanması sağlanır.
    secret:"danood ilaa daalaco iyo gaashamo dusheed",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// ciwaanka marka uu galo qofku in nav-ka(login singout) aanu khalad ka iman(ila intuu ka baxayo qofku inuu xogtiisa ii hayo)
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

mongoose.set('useFindAndModify', false);

//routes
app.use(indexRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);




app.listen(PORT,console.log('the Server has started.. port:5500'))