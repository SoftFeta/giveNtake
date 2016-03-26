var express = require('express'),
    mongoose = require('mongoose');

//Express configuration
var app = express();
require('./app/config/express_conf.js')(app);

//Connect MongoDB Database
require('./app/config/mongoose_conf.js')();

//Open port
var port = 6894;
app.listen(port, function (err) {
    console.log('Listening on port ' + port + '...');
});
