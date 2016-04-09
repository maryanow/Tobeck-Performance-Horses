'use strict';

var passport = require('passport'),
    mongoose = require('mongoose'),
    Admin = mongoose.model('Admin');

/*
 *  Signin after passport authentication
 */
exports.signin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    })(req, res, next);
};

/*
 *  Signout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/*
*   Register root user
*/
exports.register = function(req, res) {
    Admin.findOne({}, function(err, exists) {
        if (err) {
            res.status(400).send(err);
        }
        if (exists) {
            res.status(400).send({
                message: 'Admin already exists.'
            });
        }
        else {
            var newAdmin = new Admin(req.body);

            newAdmin.provider = 'local';

            newAdmin.save(function(err) {
                if (err) {
                    return res.status(400).send(err);
                }
            });

            res.sendStatus(200);
        }
    });
}