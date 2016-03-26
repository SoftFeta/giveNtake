var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

//Express configuration
var app = express();
require('./app/config/express_conf.js')(app);

//Routing
require('./app/config/routes.js')(app);

//Connect MongoDB Database
require('./app/config/mongoose_conf.js')();

//Open port
var port = 6894;
app.listen(port, function (err) {
    console.log('Listening on port ' + port + '...');
});

//Log in
var Users = mongoose.model('Users');
passport.use(new localStrategy(
    function (username, password, done) {
        Users.findOne({userName: username}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }
));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (user) return done(err, user);
        else return done(null, false);
    });
});