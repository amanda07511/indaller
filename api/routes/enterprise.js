/*
 TYPES OF USERS COUNT
1 - admin
2 - simple
3 - simple/enterprise
4 - fourniseur
5 - fourniseur/enter
6 - incomplete
7 - deleted
8 - blocked
*/

// Node_Modules
var express    = require("express");
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var async = require('async');
var Sequelize = require('sequelize');

// Getting the models
var models = require('../models/index');
// Routing
var router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// GET enterpise information by user id 
router.get('/get/', function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)
	//We get the token and we verify it 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  //If the token is incorrect we sent a error message
	  if (err) {
	  	response = { status: 401, erro:err.message };
	    return res.end(JSON.stringify(response));
	  }

	  var decoded = jwt.verify(token, 'gato');
	  console.log(decoded.type);
	  //If the user has other type of count send a unauthorized 
	  if(decoded.type!=3 && decoded.type!=5) return res.sendStatus(500)

	  //Search the user by the decoded id of the token
	  models.Enterprise.findOne({
  		where:{ user: decoded.id},
  		include: [{ model: models.Domaine, as: 'Domaine'}]
		}).then(function(enterpriseFound) {
	  		data = {
	  			id: enterpriseFound.id, 
	  			user: enterpriseFound.user, 
	  			nom: enterpriseFound.nom,
	  			domaine: enterpriseFound.Domaine.nom, 
	  			description: enterpriseFound.description, 
	  			lat: enterpriseFound.lat,
	  			lng: enterpriseFound.lng
			};

			//Send the information in format Json
			res.setHeader('Content-Type', 'text/plain');
			res.end(JSON.stringify(data));
		});

	});

});

// POST /update  simple update of information
router.post('/update', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.nom||!req.body.domaine||!req.body.description||!req.body.lat||!req.body.lng) return res.sendStatus(401)
	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)

	//I take the token and i verify it. 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  if (err) {
	  	response = { erro:err.message };
	    return res.end(JSON.stringify(response));
	  }
	  
	  var decoded = jwt.verify(token, 'gato');

		models.Enterprise.update({
			nom: req.body.nom,
		  	domaine: req.body.domaine,
			description: req.body.description,
			lat: req.body.lat,
			lng: req.body.lng
		}, {
		  where: {
		    user: decoded.id
		  }
		}).then(function(response){
			response = {
	      		response: "User  was correctly updated"
	   		};
			res.setHeader('Content-Type', 'text/plain');
			res.end(JSON.stringify(response));
			
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update

module.exports = router;