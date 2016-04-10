var auth = require('./auth'),
    users = require('./users');

module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
    app.get('/register', function (req, res) {
        res.render('register');
    });
    app.get('/submit', function (req, res) {
        res.render('submit');
    });
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
    app.get('/api/users', users.getUsers);
    app.post('/api/users', users.createUser);
};