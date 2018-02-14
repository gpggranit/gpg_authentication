var express = require('express');
var router = express.Router();
var odbc_connect = require('../db/odbc');

router.get('/representant/get_all', function(req, res) {
	
	var query_representants  = "SELECT * FROM F_Représentant";
    var representants = {};
    odbc_connect.query(query_representants, function (err, data) {
        if (err) {	//erreur de requete
        	console.log(err);
        	res.status(400).send( { error: 'error request getting all representants' });
        }else{
        	//test une donnée dans la requete
        	if(!data){
        		console.log('no data returned');
        		res.status(400).send( { error: 'no data returned' });
        	}else{
        		representants = JSON.parse(JSON.stringify(data));	//mise ne place du json
                
                console.log('get all representants');
                
                res.status(200).send(representants);     		
        	}       	
        }       
      });
});

module.exports = router;