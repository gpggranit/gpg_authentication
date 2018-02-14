var express = require('express');
var router = express.Router();
var odbc_connect = require('../db/odbc');


// define the home page route
router.post('/auth', function(req, res) {
	//requete get utilisateur
	console.log(req.body);
	
	var username =  req.body.username;
	console.log(username);
	var password = req.body.password;
	console.log(password);
	var query_user  = "SELECT * FROM F_Utilisateur WHERE F_Utilisateur.Login = '"+username+"'";
    var user = {};
    odbc_connect.query(query_user, function (err, data) {
        if (err) {	//erreur de requete
        	console.log(err);
        	res.status(400).send( { error: 'error request getting user' });
        }else{
        	//test une donnée dans la requete
        	if(!data[0]){
        		console.log('erreur login');
        		res.status(400).send( { error: 'error login' });
        	}else{
        		user = JSON.parse(JSON.stringify(data[0]));	//mise ne place du json
                
                console.log(user.USR_PASS);
                if(password == user.USR_PASS){
                      console.log(user.Login+' connected!');
                      res.status(200).send(user);
                } else {
                	console.log('error password');
                	res.status(400).send( { error: 'error password' });
                }       		
        	}       	
        }       
      });
});


module.exports = router;
