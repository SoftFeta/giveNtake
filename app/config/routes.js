var auth = require('./auth'),
    users = require('./users'),
    items = require('./items');

module.exports = function(app) {

    app.get('/', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
    //app.get('/register', function (req, res) {
    //    res.render('register');
    //});
    //app.get('/submit', function (req, res) {
    //    res.render('submit');
    //});
    app.get('/partials/:abc', function (req, res) {
        res.render('partials/' + req.params.abc);
    });
    app.get('/test', function (req, res) {
        res.send('Loaded');
    });
    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });
    //app.get('/accounts', auth.requiresRole('admin'), function (req, res) {
    //    res.render('accounts');
    //});
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.post('/api/items', items.createItem);
    //app.get('/search', function (req, res) {
    //    res.render('search');
    //});
    //app.get('/current', function (req, res) {
    //});
    //app.get('/profile', function (req, res) {
    //});
    app.post('/upload', function (req, res) {
        //reserved
    })

    app.get('*', function (req, res) {
        res.redirect('/');
    });
};