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
    userData.hashed_pwd = encrypt.hashPassword(userData.salt, userData.password);
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

exports.updateUser=function(req, res) {
    var userUpdates = req.body;
    req.user.firstName=userUpdates.firstName;
    req.user.lastName=userUpdates.lastName;
    req.user.userName=userUpdates.userName;
    if (userUpdates.password != undefined && userUpdates.password.length >= 12) {
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPassword(req.user.salt, userUpdates.password);
    }
    req.user.save(function(err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(req.user);
    })
};