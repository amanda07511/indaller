/*
 TYPES OF CANDIDATURES
1 - in progress
2 - cancel
3 - bloqued
4 - accepte
5 - decline
6 - expire
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
	if(!req.body.annonce||!req.body.message) return res.sendStatus(401)
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

		models.Candidat.create({
			annonce : req.body.annonce,
			Candidat: decoded.id,
			message: req.body.message,
			status: 1
		}).then(function(response){
			res.sendStatus(200);
			
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
	if(!req.body.id||!req.body.message) return res.sendStatus(401)
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

		models.Candidat.update({
			message: req.body.message
			}, {
		 	 where: {
		    Candidat: decoded.id,
		    id: req.body.id
		  }
		}).then(function(response){
			res.header('token',token);
			res.redirect('/candidature/getCandidatures/');

		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update

// POST /update  simple update of information
router.post('/change', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.id||!req.body.status) return res.sendStatus(401)
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

		models.Candidat.update({
			status: req.body.status
			}, {
		 	 where: {
		    	id: req.body.id
		  }
		}).then(function(response){
			res.sendStatus(200);
			
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update


// GET candidature by id 
router.get('/get/:id', function(req,res){

	var id=decodeURI(req.params.id);

	models.Candidat.findOne({
		where:{ id: id},
		include: [{ model: models.User, as: 'User'}, { model: models.Annonce, as: 'Annonce'}]
	}).then(function (candidatFound) {
		if (candidatFound==null) {
			res.json({status: 500, message: "Not coincidences"});
		}
		else{
			// Prepare output in JSON format
			response = { 
				status: 200, 
				id: candidatFound.id,
				message: candidatFound.message, 
				createAt: candidatFound.createdAt, 
				user: {
					id: candidatFound.User.id, 
					nom: candidatFound.User.nom, 
					prenom:candidatFound.User.prenom,
					email: candidatFound.User.email,  
					photo: candidatFound.User.photo
				},
				annonce: {
					id: candidatFound.Annonce.id, 
					titre: candidatFound.Annonce.titre, 
					description:candidatFound.Annonce.description,
					lat: candidatFound.Annonce.lat,
					lng: candidatFound.Annonce.lng,
					ddd: candidatFound.Annonce.ddd,
					ddf: candidatFound.Annonce.ddf
				}
   			};
   			res.setHeader('Content-Type', 'text/plain');
			res.end(JSON.stringify(response));
		}
			
				
	}).catch(function(err) { 
		console.log(err); 
	});

});

// GET candidatures by id user (candidats)
router.get('/getCandidatures/', function(req,res){

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

	  models.Candidat.findAll({
		where:{ candidat: decoded.id},
		include: [{ model: models.Annonce, as: 'Annonce'}]
		}).then(function (candidatFound) {
			if (candidatFound==null) {
				res.json({status: 500, message: "Not coincidences"});
			}
			else{
				var a = Array();

				for (var i = 0; i < candidatFound.length; i++) {
					a.push({ 
						status: 200, 
						id: candidatFound[i].id,
						message: candidatFound[i].message, 
						createAt: candidatFound[i].createdAt, 
						annonce: {
							id: candidatFound[i].Annonce.id, 
							titre: candidatFound[i].Annonce.titre, 
							description:candidatFound[i].Annonce.description,
							lat: candidatFound[i].Annonce.lat,
							lng: candidatFound[i].Annonce.lng,
							ddd: candidatFound[i].Annonce.ddd,
							ddf: candidatFound[i].Annonce.ddf
						}
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

// GET candidatures by id user (candidats)
router.get('/getCandidat/:id', function(req,res){
	var id=decodeURI(req.params.id);

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

	  models.Candidat.findAll({
		where:{ annonce: id},
		include: [{ model: models.User, as: 'User'},{ model: models.Annonce, as: 'Annonce'}]
		}).then(function (candidatFound) {
			if (candidatFound==null) {
				res.json({status: 500, message: "Not coincidences"});
			}
			else{
				var a = Array();

				for (var i = 0; i < candidatFound.length; i++) {
					a.push({ 
						status: 200, 
						id: candidatFound[i].id,
						message: candidatFound[i].message, 
						createAt: candidatFound[i].createdAt,
						user: {
							id: candidatFound[i].User.id, 
							nom: candidatFound[i].User.nom, 
							prenom:candidatFound[i].User.prenom,
							email: candidatFound[i].User.email,  
							photo: candidatFound[i].User.photo
						}, 
						annonce: {
							id: candidatFound[i].Annonce.id, 
							titre: candidatFound[i].Annonce.titre, 
							description:candidatFound[i].Annonce.description,
							lat: candidatFound[i].Annonce.lat,
							lng: candidatFound[i].Annonce.lng,
							ddd: candidatFound[i].Annonce.ddd,
							ddf: candidatFound[i].Annonce.ddf
						}

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


module.exports = router;