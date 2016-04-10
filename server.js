var express = require('express');

//Express configuration
var app = express();
require('./app/config/express_conf.js')(app);

//Routing
require('./app/config/routes.js')(app);

//Connect MongoDB Database
require('./app/config/mongoose_conf.js')();

//Log in
require('./app/config/passport_conf.js')();

//Open port
var port = 6894;
app.listen(port, function (err) {
    console.log('Listening on port ' + port + '...');
});
