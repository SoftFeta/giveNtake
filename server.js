var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

var app = express();

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.set('views', 'app/views');
    app.set('view engine', 'jade')
}

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/register', function (req, res) {
    res.render('register');
});

app.get('/partials/:abc', function (req, res) {
    res.render('partials/'+req.params.abc);
});

app.get('/test', function (req, res) {
    res.send('Loaded');
});

//Connect MongoDB Database
mongoose.connect('dord.mynetgear.com:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error!"));
db.once('open', function callback() {
    console.log("Connected successfully!");
});
var usersSchema = mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    privilege: Number,
    status: Number
});
var Users = mongoose.model('Users', usersSchema);
Users.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
        Users.create({
            userName: 'joeBloggs',
            firstName: 'Joe',
            lastName: 'Bloggs',
            privilege: 0,
            status: 0
        })
    }
});
Users.findOne({}).exec(function(err, document) {
    var found=document.lastName;
    console.log(found);
});
passport.use(new localStrategy(
    function() {

    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//Open port
var port = 6894;
app.listen(port, function (err) {
    console.log('Listening on port ' + port + '...');
});
