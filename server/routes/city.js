var express = require('express');
var router = express.Router();
var odbc_connect = require('../db/odbc');

router.get('/city/get_all', function(req, res) {
	
	var query_cdpville  = "SELECT * FROM F_CdpVille";
    var cdpville = {};
    odbc_connect.query(query_cdpville, function (err, data) {
        if (err) {	//erreur de requete
        	console.log(err);
        	res.status(400).send( { error: 'error request getting all citys' });
        }else{
        	//test une donnée dans la requete
        	if(!data){
        		console.log('no data returned');
        		res.status(400).send( { error: 'no data returned' });
        	}else{
        		cdpville = JSON.parse(JSON.stringify(data));	//mise ne place du json
                
                console.log('get all citys');
                
                res.status(200).send(cdpville);     		
        	}       	
        }       
      });
});

module.exports = router;