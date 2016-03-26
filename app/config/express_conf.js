var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app) {
    var env = process.env.NODE_ENV || 'development';
    if ('development' == env) {
        app.set('views', 'app/views');
        app.set('view engine', 'jade');
        app.use(cookieParser());
        app.use(bodyParser());
        app.use(session({secret: 'artichokes and asparagus'}));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(express.static('public'));
    }
};