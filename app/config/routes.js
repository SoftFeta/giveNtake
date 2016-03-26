var passport = require('passport');

module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/register', function (req, res) {
        res.render('register');
    });
    app.get('/partials/:abc', function (req, res) {
        res.render('partials/' + req.params.abc);
    });
    app.get('/test', function (req, res) {
        res.send('Loaded');
    });
    app.post('/login', function (req, res, next) {
        var auth=passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) res.send({success:false});
            req.logIn(user, function(err) {
                if (err) return next(err);
                res.send({success:true, user:user});
            });
        });
        auth(req, res, next);
    });
};