var express = require('express');

module.exports = function(app) {
    var env = process.env.NODE_ENV || 'development';
    if ('development' == env) {
        app.set('views', 'app/views');
        app.set('view engine', 'jade')
    }
    app.use(express.static('public'));
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/register', function (req, res) {
        res.render('register');
    });
    app.get('/partials/:abc', function (req, res) {
        res.render('partials/'+req.params.abc);
    });
    app.get('/test', function (req, res) {
        res.send('Loaded');
    });
    app.post('/login', function(req, res, next){
        //Reserved
    });
};