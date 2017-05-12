//Node modules
var express    = require("express");
var cors = require('cors');

//Calling routes
var user = require('./routes/user.js');
var enterprise = require('./routes/enterprise.js');
var dossier = require('./routes/dossier.js');
//create application expres
var app = express();

app.use(cors());

//Routes
app.use('/user', user);
app.use('/enterprise', enterprise);
app.use('/dossier', dossier);

//If the direction is not found
app.use(function(req, res) {
	res.setHeader("Content-Type", "text/plain");
	res.send('La page demandée n\'existe pas');
});


app.listen(3000);