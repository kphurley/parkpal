'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var chalk = require('chalk');
module.exports = function (app, db) {

    var User = db.model('user');

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        profileFields: ['id', 'first_name', 'last_name', 'email']
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        console.log(chalk.yellow("accessToken"), accessToken)
        console.log(chalk.yellow("refreshToken"), refreshToken)
        console.log(chalk.yellow("profile"), profile)
        User.findOne({
                where: {
                    facebook_id: profile.id
                }
            })
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return User.create({
                        email: profile.emails[0].value,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        facebook_id: profile.id
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook', { 
        scope: ['email', 'public_profile'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
