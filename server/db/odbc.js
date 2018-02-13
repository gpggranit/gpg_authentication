var odbc = require('odbc')();	//connecteur odbc
var cn = "DSN=TEST_ODBC_HF;";	//variable de connexion

console.log("Connexion odbc");
odbc.open(cn, function (err) {
  if (err) return console.log(err);
});
module.exports = odbc;