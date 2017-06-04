//Node modules
var express    = require("express");
var cors = require('cors');

//Calling routes
var user = require('./routes/user.js');
var enterprise = require('./routes/enterprise.js');
var dossier = require('./routes/dossier.js');
var annonce = require('./routes/annonce.js');
var candidature = require('./routes/candidature.js');
var rate = require('./routes/rate.js');
//create application expres
var app = express();

//app.use(cors());

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


app.listen(3000);