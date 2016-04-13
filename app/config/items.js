var mongoose = require('mongoose'),
    Items = mongoose.model('Items');

exports.getItems = function (req, res, next) {
    Items.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.createItem = function (req, res, next) {
    console.log("Wowowow");
    var itemData = req.body;
    console.log("Mehmehmeh");
    Items.create(itemData, function (err, item) {
        if (err) {
            console.log("Hohoho");
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send();
    });
};