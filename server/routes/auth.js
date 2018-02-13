var express = require('express');
var router = express.Router();
var odbc = require('odbc')();	//connecteur odbc
var cn = "DSN=TEST_ODBC_HF;";	//variable de connexion

var result = null;

//middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});







odbc.open(cn, function (err) {
    if (err) {
    	result = err;
    	console.log(err);
    }
    odbc.query("select * from f_utilisateur", function (err, rows, moreResultSets) {
        if (err) {
        	result = err;
            console.log(err);
        }
        result = rows;
        console.log(rows);
    });    
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(result);
});

module.exports = router;
