var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;


//****** IMPORT FONCTION DE CONNEXION ODBC HF ***********
	var odbc_connect = require('./db/odbc');
//*******************************************************


var app = express();
	
	


//var users = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//**************************  VARIBLES DE SESSION   *************************************
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false }
 }));
//****************************************************************************************


//**************************  VARIBLES DE PASSPORT.JS  ***********************************

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy({ passReqToCallback : true, usernameField: 'username' },
	     function(req, username, password, done) {
	     
	        //We will come back to complete this
	  passport.use('local', new localStrategy({
	         passReqToCallback : true,
	         usernameField: 'username'
	     },
	  function(req, username, password, done){
	    console.log('called local');
	    console.log(username);
	    console.log(password);
	    var query_user  = "SELECT * FROM F_Utilisateur WHERE F_Utilisateur.Login = '"+username+"'";
	    console.log(query_user);
	    var user = {};
	    odbc_connect.query(query_user, function (err, data) {
	        if (err) console.log(err);
	        user = JSON.parse(JSON.stringify(data[0]));	//mise ne place du json
	        
	        console.log(user.USR_PASS);
	        if(password == user.USR_PASS){
	              console.log('match!')
	              done(null, user);
	            } else {
	            console.log('Incorrect username and password.')
	              done(null, false, { message: 'Incorrect username and password.' });
	            }
	        
	        
	      });
	  
	  }));
	     }
	  ));


passport.serializeUser(function(user, done) {
    done(null, user.USR_NUM);
 });
passport.deserializeUser(function(id, done) {
    console.log('called deserializeUser');
    var query_user  = "SELECT * FROM F_Utilisateur WHERE F_Utilisateur.USR_NUM = '"+id+"'";
    odbc_connect.query(query_user, function (err, data) {
    	console.log('called deserializeUser - pg');
    	if (err) console.log(err);
        
        user = JSON.parse(JSON.stringify(data[0]));	//mise ne place du json
        
        done(null, user);
        
        
      });
    

});

//****************************************************************************************



//**************** FICHIERS DE ROUTAGE  *****************

//	var index = require('./routes/index');
//	app.use('/', index);
	
	var auth = require('./routes/auth');
	app.use('/api', auth);

//*******************************************************




//app.use('/api/get_users', users);
//app.use('/api/get_config', config3d);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
