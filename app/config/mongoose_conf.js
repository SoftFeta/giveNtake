var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function () {
    mongoose.connect('dord.mynetgear.com:27017');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, "Connection error!"));
    db.once('open', function callback() {
        console.log("Connected successfully!");
    });

    var usersSchema = new mongoose.Schema({
        userName: String,
        firstName: String,
        lastName: String,
        salt: String,
        hashed_pwd: String,
        privilege: Number,
        status: Number
    });
    usersSchema.methods = {
        authenticate: function(pwToMatch) {
            return hashPassword(this.salt, pwToMatch) === this.hashed_pwd;
        }
    };
    var Users = mongoose.model('Users', usersSchema);
    Users.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt=createSalt();
            hash=hashPassword(salt, 'weAreNotFoieGras123');
            Users.create({
                userName: 'joeBloggs',
                firstName: 'Joe',
                lastName: 'Bloggs',
                salt: salt,
                hashed_pwd: hash,
                privilege: 0,
                status: 0
            });
        }
    });
    Users.findOne({}).exec(function (err, document) {
        var found = document.lastName;
        console.log(found);
    });

    var itemsSchema = new mongoose.Schema({
            pic: Buffer,
            giver: String,
            taker: String,
            clickTime: Date,
            trending: Boolean,
            newListing: Boolean,
            name: String,
            cat: String,
            neighbourhood: String,
            quantity: Number,
            desc: String,
            getTime: Date,
            status: Number
        },
        {
            autoIndex: true,
            timestamps: {createdAt: 'created_at'}
        });

    var Items = mongoose.model('Items', itemsSchema);

    var dummyClickTime=new Date("2016-03-28T01:00:00+01:00");
    var dummyGetTime=new Date("2016-03-28T01:00:00+01:00");
    Items.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Items.create({
                pic: '',
                giver: 'joeBloggs',
                taker: 'billLiu',
                clickTime: dummyClickTime,
                trending: true,
                newListing: true,
                name: 'A lump of metal',
                cat: 'book1',
                neighbourhood: 'psk',
                quantity: 15,
                desc: 'no description',
                getTime: dummyGetTime,
                status: 0
            });
        }
    });
};
function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPassword(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}

