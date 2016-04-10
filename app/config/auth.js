var passport = require('passport');

exports.authenticate = function (req, res, next) {
    var auth=passport.authenticate('local', function(err, user) {
        if (err) return next(err);
        if (!user) res.send({success:false});
        req.logIn(user, function(err) {
            if (err) return next(err);
            res.send({success:true, user:user});
        });
    });
    auth(req, res, next);
};

exports.requiresRole = function(role) {
    return function (req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            //Use res.writeHead instead of res.status
            //res.writeHead(403, {
            //    'Location': 'https://en.wikipedia.org/wiki/Andrzej_Duda'
            //});
            //res.end();
            res.writeHead(403, {'Content-Type': 'text/plain'});
            res.write("Meh!\n");
            res.end();
        } else {
            next();
        }
    }
};