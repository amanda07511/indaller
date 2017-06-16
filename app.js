//Node modules
var express = require("express");
var cors	= require('cors');
var path	= require('path');
var opn 	= require('opn');

//Calling routes
var user 		= require('./routes/user.js');
var enterprise 	= require('./routes/enterprise.js');
var dossier 	= require('./routes/dossier.js');
var annonce 	= require('./routes/annonce.js');
var candidature = require('./routes/candidature.js');
var rate 		= require('./routes/rate.js');


//create application expres
var app = express();
app.set('port', (process.env.PORT || 34385));

// views is directory for all template files
app.set('views', __dirname + '/routes/doc');
app.set('view engine', 'ejs');

app.use(cors());

app.get('/',function(req,res){
	"Hello word"
});

//Routes
app.use('/user', user);
app.use('/enterprise', enterprise);
app.use('/dossier', dossier);
app.use('/annonce', annonce);
app.use('/candidature', candidature);
app.use('/rate', rate);

//If the direction is not found
app.use(function( req, res) {
  res.sendStatus(404);

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
