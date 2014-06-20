/**
 * New node file
 */
var passport = require('passport');

exports.fbRedirect = function(req, res){
			console.log('Redirecting. . .');
			
		};
		
exports.fbCallback = function(req, res){
			passport.authenticate('facebook', { successRedirect: '/',
                failureRedirect: '/login' });
		};
