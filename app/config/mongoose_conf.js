var mongoose = require('mongoose'),
    usersModel = require('../models/Users'),
    itemsModel = require('../models/Items');

module.exports = function () {
    mongoose.connect('dord.mynetgear.com:27017');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, "Connection error!"));
    db.once('open', function callback() {
        console.log("Connected successfully!");
    });
    usersModel.createDefaultUsers();
    itemsModel.createDefaultItems();
};