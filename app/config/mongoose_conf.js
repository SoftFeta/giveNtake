var mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

module.exports = function() {
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
    Users.findOne({}).exec(function (err, document) {
        var found = document.lastName;
        console.log(found);
    });

    var Items = mongoose.model('Items', usersSchema);

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

    passport.use(new localStrategy(
        function (username, password, done) {
            Users.findOne({userName: username}).exec(function (err, document) {
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
            done(err, user);
        });
    });
}