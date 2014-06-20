var express = require('express')
, app = express()
, nconf = require('nconf')
, passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy
;

/* configuration setup */
nconf.argv().env().file({file: './config/config.json'});

var data = require('./lib/data')(nconf.get('DBURL'));

passport.use(new FacebookStrategy({
	clientID: nconf.get('FBAPPID'),
	clientSecret: nconf.get('FBSECRET'),
	callbackURL: "/auth/facebook/callback"
}, function(accessToken, refreshToken, profile, done){
	data.getUser(profile.emails[0].value, true, function(user){
		console.log(user);
		if (user._id && !user.email){ // we have a new user
			user.lastName = profile.name.familyName;
			user.firstName = profile.name.givenName;
			user.email = profile.emails[0].value;
			user.profile = profile;
			data.saveUser(user, function(result){
				done(null, user);
			});
		}
		else if (user._id) done(null, user);
		else done(user, null); //"user" will be the error
	});
}));

passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});

	passport.deserializeUser(function(userid, done) {
	    data.getUserById(userid, function(user){
	    	done(null, user);
	    });
	});

app.use(express.cookieParser());
app.use(express.session({secret: 'fiddlesticks'}));
app.use(passport.initialize());
app.use(passport.session());
/* routes */

app.set('view engine', 'jade');

app.get("/", function(req, res){
    res.render('home');
});

app.get("/login", function(req, res){
	res.render('login');
});

app.get("/auth/facebook", passport.authenticate('facebook', {scope: 'email'}));

app.get("/auth/facebook/callback", passport.authenticate('facebook',
		 { successRedirect: '/',
    failureRedirect: '/login' }));

app.get("/partials/:tpl", function(req, res){
    res.render('partials/' + req.params.tpl);
});

app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT || 8000);