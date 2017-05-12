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

// POST /login gets urlencoded bodies
router.post('/login', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.email||!req.body.password) return res.sendStatus(401)

	models.User.findOne({
		where:{
			email: req.body.email,
			password: req.body.password
		}
	}).then(function (userFound) {
		if (userFound==null) {
			return res.json({status: 500, message: "Invalid_credentials"});
		}
		if(userFound.type==7||userFound.type==8) return res.sendStatus(401)
		//create a token with user informationand with an hour of duration
			var token=jwt.sign({id: userFound.id, type: userFound.type}, 
				'gato');

			// Prepare output in JSON format
			 response = {status: 200, token:token};
  
			res.end(JSON.stringify(response));	
	}).catch(function(err) { 
		console.log(err); 
	});

});



// POST create a new user 
router.post('/signup', urlencodedParser, function (req, res) {
	
  //If there's no body parametres throw and error status
  if (!req.body) return res.sendStatus(401)
  //If one of the parametres is not defined throw and error status
  if(!req.body.nom||!req.body.prenom||!req.body.email||!req.body.password||!req.body.tel||!req.body.ville||!req.body.photo||!req.body.ddn||!req.body.type) return res.sendStatus(401)

  	async.series([
		// fonction #1 for check that the users email is not than BD.
		function(callback) {
			//Search user by email
			models.User.findOne({
				where:{
					email: req.body.email
				}
			}).then(function (userFound) {
				if (userFound!=null) {
					res.json({status: 500, message: "Invalid_email"});
					return callback(new Error('Invalid email'));
				}
				callback();
			}).catch(function(err) { 
				console.log(err); 
			});//end findOne

		},
		// fonction #2 create a simple count 
		function(callback) {
			//Create a new user
			var newUser = models.User.create({
				nom: req.body.nom,
				prenom: req.body.prenom,
				email: req.body.email,
				password: req.body.password,
				photo: req.body.photo,
				tel: req.body.tel,
				ville: req.body.ville,
				ddn: req.body.ddn,
				type: req.body.type
			}).then(function(newUser){
				
				//create a token with user informationand 
				var token = jwt.sign({id: newUser.id,type: newUser.type}, 'gato');
				
				// Prepare output in JSON format
				response = {status: 200, token:token};
				res.setHeader('Content-Type', 'text/plain');
				res.end(JSON.stringify(response));
				
				callback();
			}).catch(function(err){ 
				console.log(err); 
			});//end newUser

		},],
		function(err, results) {
			if (err) return (err);
	  		res.end();
	});//end Async
});

// GET user information by user id 
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

	  //Search the user by the decoded id of the token
	  models.User.findOne({
  		where:{ id: decoded.id},
  		include: [{ model: models.Ville, as: 'Ville'}]
		}).then(function(userFound) {
	  		data = {
	  			id: userFound.id, 
	  			nom: userFound.nom, 
	  			prenom: userFound.prenom, 
	  			email: userFound.email, 
	  			photo: userFound.photo,
	  			tel: userFound.tel,
				ville_id: userFound.Ville.ville_nom_reel,
				ddn: userFound.ddn,
				type: userFound.type 
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
	if(!req.body.nom||!req.body.prenom||!req.body.password||!req.body.tel||!req.body.ville||!req.body.photo||!req.body.ddn) return res.sendStatus(401)
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

		models.User.update({
		  	nom: req.body.nom,
			prenom: req.body.prenom,
			password: req.body.password,
			photo: req.body.photo,
			tel: req.body.tel,
			ville_id: req.body.ville,
			ddn: req.body.ddn
		}, {
		  where: {
		    id: decoded.id
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

// POST /change  client change profil to type fournisseur  
router.post('/change', urlencodedParser, function(req,res){

	var decoded

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.type) return res.sendStatus(401)
	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)

	//I take the token and i verify it. 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  if (err) {
	  	response = { status:500, erro:err.message };
	    return res.end(JSON.stringify(response));
	  }
	  
	  decoded = jwt.verify(token, 'gato');
	  console.log(decoded.type);
	  if(decoded.type!=2&&decoded.type!=3) return res.sendStatus(401)

		models.User.update({
		  	type: req.body.type
		}, {
		  where: {
		    id: decoded.id
		  }
		}).then(function(response){
			//create a new token with the new information
			var token = jwt.sign({id: decoded.id,type: req.body.type}, 'gato');
				
			// Prepare output in JSON format
			response = {status: 200, token:token};
			res.setHeader('Content-Type', 'text/plain');
			res.end(JSON.stringify(response));
			
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update


// POST /change  client change profil to type fournisseur  
router.post('/delete', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
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

		models.User.update({
		  	type: 7
		}, {
		  where: {
		    id: decoded.id
		  }
		}).then(function(response){
			//create a new token with the new information
			var token = jwt.sign({id: decoded.id,type: 7}, 'gato');
				
			// Prepare output in JSON format
			response = {status: 200, token:token};
			res.setHeader('Content-Type', 'text/plain');
			res.end(JSON.stringify(response));
			
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update

// POST /change  client change profil to type fournisseur  
router.post('/block', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.email) return res.sendStatus(401)
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
	  if(userFound.type==1) return res.sendStatus(401)

		models.User.update({
		  	type: 8
		}, {
		  where: {
		    email: req.body.email
		  }
		}).then(function(response){
				
			// Prepare output in JSON format
			response = {status: 200};
			res.setHeader('Content-Type', 'text/plain');
			res.end(JSON.stringify(response));
			
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update




module.exports = router;