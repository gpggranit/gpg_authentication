var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

/* GET home page. */
router.get("/", function(req,res,next){
    res.sendFile(path.join(__dirname, '../views/index.html'));
 });

router.post('/',
	     passport.authenticate('local', {
	         successRedirect: '/',
	         failureRedirect: '/'
	     })
	  );

module.exports = router;
