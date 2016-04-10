var mongoose = require('mongoose'),
    encrypt = require('./encryption');

exports.getUsers = function(req, res) {
    res.status(400);
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.salt = encrypt.createSalt();
    userData.hashed_password=encrypt.hashPassword(userData.salt, userData.password);
};