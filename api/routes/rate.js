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

// POST /add new rate
router.post('/add', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.pour||!req.body.rating) return res.sendStatus(401)
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
	  if(decoded.id == req.body.pour ) return res.sendStatus(403)

		models.Rating.create({
			de : decoded.id,
			pour: req.body.pour,
			rating: req.body.rating
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
	if(!req.body.pour||!req.body.rating) return res.sendStatus(401)
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

		models.Rating.update({
			rating: req.body.rating
			}, {
		 	 where: {
		    de: decoded.id,
		    pour: req.body.pour
		  }
		}).then(function(response){
			res.header('token',token);
			res.redirect('/rate/MyRates/');

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
		models.Rating.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	if (response==null) {
				resp = {status: 500, message: "experiance not found"};
				return res.end(JSON.stringify(resp));
			}
			if (response.de!=decoded.id) return res.sendStatus(401) 
			
			response.destroy();
			res.header('token',token);
			res.redirect(303,'/rate/MyRates/');
		});

	});//end jwt.verify

});//end post delete

// GET candidatures by id user (candidats)
router.get('/getRates/', function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')||!req.get('id')) return res.sendStatus(401)
	//We get the token and we verify it 
	var token = req.get('token');
	var id = req.get('id');
	jwt.verify(token, 'gato', function(err, decoded) {
		//If the token is incorrect we sent a error message
	  if (err) {
	  	response = { status: 401, erro:err.message };
	    return res.end(JSON.stringify(response));
	  }
	  var decoded = jwt.verify(token, 'gato');

	  models.Rating.findAll({
		where:{ pour: id},
		include: [{ model: models.User, as: 'De'}]
		}).then(function (ratingFound) {
			if (ratingFound==null) {
				res.json({status: 500, message: "Not coincidences"});
			}
			else{

				var a = Array();

				for (var i = 0; i < ratingFound.length; i++) {
					a.push({ 
						status: 200, 
						id: ratingFound[i].id,
						rate: ratingFound[i].rating, 
						createAt: ratingFound[i].createdAt, 
						de: {
							id: ratingFound[i].De.id, 
							nom: ratingFound[i].De.nom, 
							prenom: ratingFound[i].De.prenom,
							email: ratingFound[i].De.email,  
							photo: ratingFound[i].De.photo
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
router.get('/MyRates/', function(req,res){

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

	  models.Rating.findAll({
		where:{ de: decoded.id},
		include: [{ model: models.User, as: 'Pour'}]
		}).then(function (ratingFound) {
			if (ratingFound==null) {
				res.json({status: 500, message: "Not coincidences"});
			}
			else{

				var a = Array();

				for (var i = 0; i < ratingFound.length; i++) {
					a.push({ 
						status: 200, 
						id: ratingFound[i].id,
						rate: ratingFound[i].rating, 
						createAt: ratingFound[i].createdAt, 
						pour: {
							id: ratingFound[i].Pour.id, 
							nom: ratingFound[i].Pour.nom, 
							prenom: ratingFound[i].Pour.prenom,
							email: ratingFound[i].Pour.email,  
							photo: ratingFound[i].Pour.photo
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