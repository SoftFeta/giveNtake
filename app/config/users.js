var mongoose = require('mongoose'),
    encrypt = require('./encryption'),
    Users = mongoose.model('Users');

exports.getUsers = function (req, res, next) {
    Users.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.salt = encrypt.createSalt();
    userData.hashed_password = encrypt.hashPassword(userData.salt, userData.password);
    Users.create(userData, function(err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                //Gees, thanks Google and Stack Overflow
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        req.logIn(user, function(err) {
            if (err) {return next(err);}
            res.send(user);
        });
    })
};