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

// POST /update  simple update of information
router.post('/add', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.domaine||!req.body.titre||!req.body.description||!req.body.lat||!req.body.lng||!req.body.etat||!req.body.ddd||!req.body.ddf) return res.sendStatus(401)
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

		models.Annonce.create({
			user: decoded.id,
			domaine: req.body.domaine,
			titre: req.body.titre,
			description: req.body.description,
			lat: req.body.lat,
			lng: req.body.lng,
			etat: req.body.etat,
			ddd: req.body.ddd,
			ddf: req.body.ddf
		}).then(function(response){
			res.header('token',token);
			res.redirect('/annonce/getMy/');
			
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
	if(!req.body.id||!req.body.domaine||!req.body.titre||!req.body.description||!req.body.lat||!req.body.lng||!req.body.etat||!req.body.ddd||!req.body.ddf) return res.sendStatus(401)
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

		models.Annonce.update({
			domaine: req.body.domaine,
			titre: req.body.titre,
			description: req.body.description,
			lat: req.body.lat,
			lng: req.body.lng,
			etat: req.body.etat,
			ddd: req.body.ddd,
			ddf: req.body.ddf
			}, {
		 	 where: {
		    user: decoded.id,
		    id: req.body.id
		  }
		}).then(function(response){
			res.header('token',token);
			res.redirect('/annonce/getMy/');
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update

// POST /delete gets urlencoded bodies
router.delete('/delete', urlencodedParser, function(req,res){

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
		models.Annonce.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	if (response==null) {
				resp = {status: 500, message: "Annonce not found"};
				return res.end(JSON.stringify(resp));
			}
			
			response.destroy();
			res.header('token',token);
			res.redirect(303,'/annonce/getMy/');

		});

	});//end jwt.verify

});//end post delete

// GET resto by id 
router.get('/getId/:id', function(req,res){

	var id=decodeURI(req.params.id);

	models.Annonce.findOne({
		where:{ id: id},
		include: [{ model: models.User, as: 'User'}, { model: models.Domaine, as: 'Domaine'}]
	}).then(function (annonceFound) {
		if (annonceFound==null) {
			res.json({status: 500, message: "Not coincidences"});
		}
		else{
			// Prepare output in JSON format
			response = { 
				status: 200, 
				id:annonceFound.id,
				domaine:annonceFound.Domaine.nom, 
				titre:annonceFound.titre, 
				description: annonceFound.description,  
				lat:annonceFound.lat, 
				lng:annonceFound.lng, 
				createAt: annonceFound.createdAt, 
				finalization: annonceFound.ddf,
				user: {
					id: annonceFound.User.id, 
					nom: annonceFound.User.nom, 
					prenom:annonceFound.User.prenom,
					email: annonceFound.User.email,  
					photo:annonceFound.User.photo
				}
   			};
   			res.setHeader('Content-Type', 'text/plain');
			res.end(JSON.stringify(response));
		}
			
				
	}).catch(function(err) { 
		console.log(err); 
	});

});

// GET resto by id user 
router.get('/getMy/', function(req,res){

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

	  models.Annonce.findAll({
		where:{ user: decoded.id},
		include: [{ model: models.Domaine, as: 'Domaine'}]
		}).then(function (annonceFound) {
			if (annonceFound==null) {
				res.json({status: 500, message: "Not coincidences"});
			}
			else{
				var a = Array();

				for (var i = 0; i < annonceFound.length; i++) {
					a.push({ 
						status: 200, 
						id:annonceFound[i].id,
						domaine:annonceFound[i].Domaine.nom, 
						titre:annonceFound[i].titre, 
						description: annonceFound[i].description,  
						lat:annonceFound[i].lat, 
						lng:annonceFound[i].lng, 
						createAt: annonceFound[i].createdAt, 
						finalization: annonceFound[i].ddf,
				
	   				});
				}
				
	   			res.setHeader('Content-Type', 'text/plain');
				res.end(JSON.stringify(a));
			}
				
					
		}).catch(function(err) { 
			console.log(err); 
		});



	});//End jwt.verify

});

// GET all annonces
router.get('/', function(req,res){

		models.Annonce.findAll({
			include: [{ model: models.User, as: 'User'}, { model: models.Domaine, as: 'Domaine'}]
		}).then(function (annonceFound) {
			if (annonceFound==null) {
				res.json({status: 500, message: "Not coincidences"});
			}
			else{
				// Prepare output in JSON format
				var a = Array();

				for (var i = 0; i < annonceFound.length; i++) {
					a.push({ 
						status: 200, 
						id:annonceFound[i].id,
						domaine:annonceFound[i].Domaine.nom, 
						titre:annonceFound[i].titre, 
						description: annonceFound[i].description,  
						lat:annonceFound[i].lat, 
						lng:annonceFound[i].lng, 
						createAt: annonceFound[i].createdAt, 
						finalization: annonceFound[i].ddf,
						user: {
							id: annonceFound[i].User.id, 
							nom: annonceFound[i].User.nom, 
							prenom:annonceFound[i].User.prenom,
							email: annonceFound[i].User.email,  
							photo:annonceFound[i].User.photo
						}
		   			});
				}
					
		   		res.setHeader('Content-Type', 'text/plain');
				res.end(JSON.stringify(a));
			}//End else
			
				
		}).catch(function(err) { 
			console.log(err); 
		});

});



// GET annonce by id 
router.get('/:id', function(req,res){
	var id=decodeURI(req.params.id);

	models.Annonce.findAll({
			where:{ domaine: id},
			include: [{ model: models.User, as: 'User'}, { model: models.Domaine, as: 'Domaine'}]
		}).then(function (annonceFound) {
			if (annonceFound==null) {
				res.json({status: 500, message: "Not coincidences"});
			}
			else{
				// Prepare output in JSON format
				var a = Array();

				for (var i = 0; i < annonceFound.length; i++) {
					a.push({ 
						status: 200, 
						id:annonceFound[i].id,
						domaine:annonceFound[i].Domaine.nom, 
						titre:annonceFound[i].titre, 
						description: annonceFound[i].description,  
						lat:annonceFound[i].lat, 
						lng:annonceFound[i].lng, 
						createAt: annonceFound[i].createdAt, 
						finalization: annonceFound[i].ddf,
						user: {
							id: annonceFound[i].User.id, 
							nom: annonceFound[i].User.nom, 
							prenom:annonceFound[i].User.prenom,
							email: annonceFound[i].User.email,  
							photo:annonceFound[i].User.photo
						}
		   			});
				}
		   		res.setHeader('Content-Type', 'text/plain');
				res.end(JSON.stringify(a));
			}
			
				
		}).catch(function(err) { 
				console.log(err); 
		});

});






module.exports = router;