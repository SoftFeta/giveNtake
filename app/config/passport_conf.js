var mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    Users = mongoose.model('Users');

module.exports = function() {
    passport.use(new localStrategy(
        function (username, password, done) {
            Users.findOne({userName: username}).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        }
    ));
    passport.serializeUser(function (user, done) {
        if (user) done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Users.findById({'_id':id}, function (err, user) {
            if (user) return done(err, user);
            else return done(null, false);
        });
    });
};