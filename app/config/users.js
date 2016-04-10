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
};