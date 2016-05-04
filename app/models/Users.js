var mongoose = require('mongoose'),
    encrypt = require('../config/encryption');

//Define Users schema and model
var usersSchema = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    salt: String,
    hashed_pwd: String,
    roles: [String],
    status: Number
});
usersSchema.methods = {
    authenticate: function (pwToMatch) {
        return encrypt.hashPassword(this.salt, pwToMatch) === this.hashed_pwd;
    }
};

var Users = mongoose.model('Users', usersSchema);

//Function to be exported
function createDefaultUsers() {
    Users.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'weAreNotFoieGras123');
            Users.create({
                userName: 'joeBloggs',
                firstName: 'Joe',
                lastName: 'Bloggs',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin', 'user'],
                status: 0
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'xenialXerus1604');
            Users.create({
                userName: 'hughCheung',
                firstName: 'Hugh',
                lastName: 'Cheung',
                salt: salt,
                hashed_pwd: hash,
                roles: ['user'],
                status: 0
            });
            console.log("Default users created!");
        }
    });
    //Users.findOne({}).exec(function (err, document) {
    //    if (!err) {
    //        var found = document.lastName;
    //        console.log(found);
    //    }
    //});
}

//Export function
exports.createDefaultUsers = createDefaultUsers;