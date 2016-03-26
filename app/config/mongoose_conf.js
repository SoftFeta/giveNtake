var mongoose = require('mongoose');

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
};