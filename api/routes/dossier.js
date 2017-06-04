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

// GET complete dossier by user id 
router.get('/get/', function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)
	
	var dossier;
	var experiance = Array();
	var certificat = Array();
	var formation = Array();
	var complet;
	var idUser;

	//We get the token and we verify it 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  //If the token is incorrect we sent a error message
	  if (err) {
	  	response = { status: 401, erro:err.message };
	    return res.end(JSON.stringify(response));
	  }
	  var decoded = jwt.verify(token, 'gato');
	  //If the user has other type of count send a unauthorized 
	  if(decoded.type!=4 && decoded.type!=5) return res.sendStatus(500)

	  async.series([
		// fonction #1 get the dossier
		function(callback) {
			//Search dossier by user's id
			models.Dossier.findOne({
				where:{
					user: decoded.id
				}
			}).then(function (dossierFound) {
				if (dossierFound==null) {
					res.json({status: 500, message: "Invalid_id"});
					return callback(new Error('Invalid_id'));
				}
				idUser = dossierFound.user;
				dossier= {
					titre : dossierFound.titre
				} 

				callback();
			}).catch(function(err) { 
				console.log(err); 
			});//end findOne

		},
		// fonction #2 select  formations 
		function(callback) {
			//Search formations by idUser
			models.Formation.findAll({
				where:{ user: idUser },
				include: [{ model: models.Ville, as: 'Ville'}, { model: models.Domaine, as: 'Domaine'}]
			}).then(function (formationFound) {
				 var f = {};
				 for (var i = 0; i < formationFound.length; i++) {
				 	
				 	formation.push({
				 		id: formationFound[i].id,
						ecole : formationFound[i].ecole,
						domaine : formationFound[i].Domaine.nom,
						diplome : formationFound[i].diplome,
						ville : formationFound[i].Ville.ville_nom_reel,
						ddd : formationFound[i].ddd,
						ddf : formationFound[i].ddf
					}); 
					
				 }

				callback();
			}).catch(function(err) { 
				console.log(err); 
			});//end findOne

		},
		// fonction #3 select experiance
		function(callback) {
			//Search experiance by user id
				models.Experiance.findAll({
				where:{ user: idUser },
				include: [{ model: models.Ville, as: 'Ville'}]
			}).then(function (experianceFound) {
				
				for (var i = 0; i < experianceFound.length; i++) {
					
					experiance.push({
						id: experianceFound[i].id,
						titre : experianceFound[i].titre,
						enterpise :experianceFound[i].enterpise,
						description : experianceFound[i].description,
						ville : experianceFound[i].Ville.ville_nom_reel,
						ddd : experianceFound[i].ddd,
						ddf : experianceFound[i].ddf
					});
				}
				
				callback();
			}).catch(function(err) { 
				console.log(err); 
			});//end findOne

		},
		// fonction #4 select certificat
		function(callback) {
			//Search certificat by user id
			models.certificat.findAll({
				where:{ user: idUser },
			}).then(function (certificatFound) {
				for (var i = certificatFound.length - 1; i >= 0; i--) {
					
					certificat.push({
						id: certificatFound[i].id,
						titre : certificatFound[i].titre,
						certifiante : certificatFound[i].certifiante,
						rendu : certificatFound[i].rendu,
						expiration : certificatFound[i].expiration
					}); 
				}
				
				callback();
			}).catch(function(err) { 
				console.log(err); 
			});//end findOne

		},
		],
		function(err, results) {
			if (err) return (err);
			complet = {
				dossier: dossier,
				formation: formation,
				experiance: experiance,
				certificat: certificat
			}
	  		res.end(JSON.stringify(complet));
	});//end Async


	});
});

// POST /add  create a new  formation instance
router.post('/add/formation', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.ecole||!req.body.domaine||!req.body.diplome||!req.body.ville||!req.body.ddd||!req.body.ddf) return res.sendStatus(401)
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

		models.Formation.create({
			ecole: req.body.ecole,
			domaine: req.body.domaine,
			diplome: req.body.diplome,
			ville: req.body.ville,
			ddd: req.body.ddd,
			ddf: req.body.ddf,
			user: decoded.id
		}).then(function(response){
			res.header('token',token);
			res.redirect('http://localhost:3000/dossier/get/');
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post add

// POST /update  simple update of information
router.post('/add/experiance', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.titre||!req.body.description||!req.body.ville||!req.body.ddd||!req.body.ddf) return res.sendStatus(401)
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

		models.Experiance.create({
			titre: req.body.titre,
			description: req.body.description,
			ville: req.body.ville,
			ddd: req.body.ddd,
			ddf: req.body.ddf,
			user: decoded.id
		}).then(function(response){
			res.header('token',token);
			res.redirect('http://localhost:3000/dossier/get/');
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post add

// POST /add add a new certificat
router.post('/add/certificat', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.titre||!req.body.certifiante||!req.body.ddd||!req.body.ddf) return res.sendStatus(401)
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

		models.certificat.create({
			titre: req.body.titre,
			certifiante: req.body.certifiante,
			rendu: req.body.ddd,
			expiration: req.body.ddf,
			user: decoded.id
		}).then(function(response){
			res.header('token',token);
			res.redirect('/dossier/get/');
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post add

// POST /update  simple update of information
router.post('/update', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.titre) return res.sendStatus(401)
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

		models.Dossier.update({
			titre: req.body.titre
		}, {
		  where: {
		    user: decoded.id
		  }
		}).then(function(response){
			res.header('token',token);
			res.redirect('/dossier/get/');
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update

// POST /update  simple update of information
router.post('/update/formation', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.id||!req.body.ecole||!req.body.domaine||!req.body.diplome||!req.body.ville||!req.body.ddd||!req.body.ddf) return res.sendStatus(401)
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

		models.Formation.update({
			ecole: req.body.ecole,
			domaine: req.body.domaine,
			diplome: req.body.diplome,
			ville: req.body.ville,
			ddd: req.body.ddd,
			ddf: req.body.ddf
		}, {
		  where: {
		    user: decoded.id,
		    id: req.body.id
		  }
		}).then(function(response){
			res.header('token',token);
			res.redirect('/dossier/get/');
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update

// POST /update  simple update of information
router.post('/update/experiance', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.id||!req.body.titre||!req.body.description||!req.body.ville||!req.body.ddd||!req.body.ddf) return res.sendStatus(401)
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

		models.Experiance.update({
			titre: req.body.titre,
			description: req.body.description,
			ville: req.body.ville,
			ddd: req.body.ddd,
			ddf: req.body.ddf
		}, {
		  where: {
		    user: decoded.id,
		    id: req.body.id
		  }
		}).then(function(response){
			res.header('token',token);
			res.redirect('/dossier/get/');
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update

// POST /update  simple update of information
router.post('/update/certificat', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.id||!req.body.titre||!req.body.certifiante||!req.body.ddd||!req.body.ddf) return res.sendStatus(401)
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

		models.certificat.update({
			titre: req.body.titre,
			certifiante: req.body.certifiante,
			rendu: req.body.ddd,
			expiration: req.body.ddf
		}, {
		  where: {
		    user: decoded.id,
		    id: req.body.id
		  }
		}).then(function(response){
			res.header('token',token);
			res.redirect('/dossier/get/');
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update

// POST /delete gets urlencoded bodies
router.delete('/delete/formation', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
  	if(!req.body.id) return res.sendStatus(401)
  	//If header token is not defined throw and error status
  	if(!req.get('token')) return res.sendStatus(401)

	//I take the token and i verify it. 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  if (err) {
	  	response = { erro:err.message };
	    return res.end(JSON.stringify(response));
	  }	 
		models.Formation.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	if (response==null) {
				resp = {status: 500, message: "formation not found"};
				return res.end(JSON.stringify(resp));
			}
			
			response.destroy();
			res.header('token',token);
			res.redirect(303,'/dossier/get/');
	
		});

	});//end jwt.verify

});//end post delete

// POST /delete gets urlencoded bodies
router.delete('/delete/experiance', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
  	if(!req.body.id) return res.sendStatus(401)
  	//If header token is not defined throw and error status
  	if(!req.get('token')) return res.sendStatus(401)

	//I take the token and i verify it. 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  if (err) {
	  	response = { erro:err.message };
	    return res.end(JSON.stringify(response));
	  }	 
		models.Experiance.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	if (response==null) {
				resp = {status: 500, message: "experiance not found"};
				return res.end(JSON.stringify(resp));
			}
			
			response.destroy();
			res.header('token',token);
			res.redirect(303,'/dossier/get/');
		});

	});//end jwt.verify

});//end post delete

// POST /delete gets urlencoded bodies
router.delete('/delete/certificat', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
  	if(!req.body.id) return res.sendStatus(401)
  	//If header token is not defined throw and error status
  	if(!req.get('token')) return res.sendStatus(401)

	//I take the token and i verify it. 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  if (err) {
	  	response = { erro:err.message };
	    return res.end(JSON.stringify(response));
	  }	 
		models.certificat.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	if (response==null) {
				resp = {status: 500, message: "certificat not found"};
				return res.end(JSON.stringify(resp));
			}
			
				response.destroy();
				res.header('token',token);
				res.redirect(303,'/dossier/get/');
			});

	});//end jwt.verify

});//end post delete			

module.exports = router;