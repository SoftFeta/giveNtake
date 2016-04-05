var auth = require('./auth');

module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index');
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
    app.post('/register_submit', function (req, res, next) {
        //reserved
    });
};