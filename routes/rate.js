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


/**
 * @api {post} /rate/add Request for add a new rate
 * @apiHeader {String} token Users encripted key.
 * @apiName RateAdd
 * @apiGroup Rating
 *
 *
 * @apiParam {Number} pour User ID.
 * @apiParam {Number} raiting Note given to the user.

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *     {
 *		"Rate success commit"
 * 		}
 *
 *
 *
 * @apiError InvalidCredentias If there is not define one of the parametres .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 *
 * @apiError InvalidToken If the token sended is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Invalid Token
 *     {
 *       "error": "invalid signature"
 *		}
 *
 */ 

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
	  if (err) return res.status(403).send(err.message);
	  
	  var decoded = jwt.verify(token, 'gato');
	  if(decoded.id == req.body.pour ) return res.status(403).send("Invalid Request");

		models.Rating.create({
			de : decoded.id,
			pour: req.body.pour,
			rating: req.body.rating
		}).then(function(response){
			res.res.status(200).send("Rate success commit");
			
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post add


/**
 * @api {post} /rate/update Request for up to date a rate
 * @apiHeader {String} token Users encripted key.
 * @apiName RateUpdate
 * @apiGroup Rating
 *
 *
 * @apiParam {Number} pour User ID.
 * @apiParam {Number} raiting Note given to the user.

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * [
 * 		{
 *   		"status": 200,
 *   		"id": 2,
 *   		"rate": 5,
 *   		"createAt": "2017-06-04T12:13:32.000Z",
 *   		"pour": {
 *     			"id": 15,
 *   			"nom": "Marroquin",
 *     			"prenom": "Amanda",
 *     			"email": "amanda@gmail.com",
 *     			"photo": null
 *   		}
 *  	}
 * 	]
 *
 *
 *
 * @apiError InvalidCredentias If there is not define one of the parametres .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 *
 * @apiError InvalidToken If the token sended is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Invalid Token
 *     {
 *       "error": "invalid signature"
 *		}
 *
 */ 
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
	  
	  if (err) return res.status(403).send(err.message);
	  
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



/**
 * @api {delete} /rate/delete Request for delete a rate
 * @apiHeader {String} token Users encripted key.
 * @apiName RateDelete
 * @apiGroup Rating
 *
 *
 * @apiParam {Number} id Rate ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * [
 * 		{
 *   		"status": 200,
 *   		"id": 2,
 *   		"rate": 5,
 *   		"createAt": "2017-06-04T12:13:32.000Z",
 *   		"pour": {
 *     			"id": 15,
 *   			"nom": "Marroquin",
 *     			"prenom": "Amanda",
 *     			"email": "amanda@gmail.com",
 *     			"photo": null
 *   		}
 *  	}
 * 	]
 *
 *
 *
 * @apiError InvalidCredentias If there is not define one of the parametres .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 *
 * @apiError InvalidToken If the token sended is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Invalid Token
 *     {
 *       "error": "invalid signature"
 *		}
 *
 */ 
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
	  
	  	if (err) return res.status(403).send(err.message);	 
		
		models.Rating.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	if (response==null) return res.status(404).send("Rate not found");
			
			if (response.de!=decoded.id) return res.sendStatus(401) 
			
			response.destroy();
			res.header('token',token);
			res.redirect(303,'/rate/MyRates/');
		});

	});//end jwt.verify

});//end post delete


/**
 * @api {get} /rate/getRates Request for get rates of a user
 * @apiHeader {String} token Users encripted key.
 * @apiHeader {Number} id Users id.
 * @apiName RateUpdate
 * @apiGroup Rating
 *
 *
 * @apiSuccess {Number} status Status of request.
 * @apiSuccess {Number} id Rate ID.
 * @apiSuccess {Number} rate Note given to the user.
 * @apiSuccess {Date} createdAt Date of creation.
 * @apiSuccess {Object} de User information, how gives the rate.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 * [
 * 		{
 *   		"status": 200,
 *   		"id": 2,
 *   		"rate": 5,
 *   		"createAt": "2017-06-04T12:13:32.000Z",
 *   		"pour": {
 *     			"id": 53,
 *   			"nom": "Montparne",
 *     			"prenom": "Julie",
 *     			"email": "julie@gmail.com",
 *     			"photo": null
 *   		}
 *  	}
 * 	]
 *
 *
 *
 * @apiError InvalidCredentias If there is not define one of the parametres .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 *
 * @apiError InvalidToken If the token sended is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Invalid Token
 *     {
 *       "error": "invalid signature"
 *		}
 *
 * @apiError RateNotFound If theres not coincidences 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Rate not Found
 *     {
 *       "error": "Rate not found"
 *		}
 *
 */ 
// GET candidatures by id user (candidats)
router.get('/getRates/', function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')||!req.get('id')) return res.sendStatus(401)
	//We get the token and we verify it 
	var token = req.get('token');
	var id = req.get('id');
	jwt.verify(token, 'gato', function(err, decoded) {
		//If the token is incorrect we sent a error message
	  if (err) return res.status(403).send(err.message);

	  var decoded = jwt.verify(token, 'gato');

	  models.Rating.findAll({
		where:{ pour: id},
		include: [{ model: models.User, as: 'De'}]
		}).then(function (ratingFound) {
			
			if (ratingFound==null) return res.status(404).send("Rate not found");
			
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


/**
 * @api {get} /rate/MyRates Request for get rates that the user do
 * @apiHeader {String} token Users encripted key.
 * @apiName RateUpdate
 * @apiGroup Rating
 *
 *
 * @apiSuccess {Number} status Status of request.
 * @apiSuccess {Number} id Rate ID.
 * @apiSuccess {Number} rate Note given to the user.
 * @apiSuccess {Date} createdAt Date of creation.
 * @apiSuccess {Object} de User information, how gives the rate.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 * [
 * 		{
 *   		"status": 200,
 *   		"id": 2,
 *   		"rate": 5,
 *   		"createAt": "2017-06-04T12:13:32.000Z",
 *   		"pour": {
 *     			"id": 53,
 *   			"nom": "Montparne",
 *     			"prenom": "Julie",
 *     			"email": "julie@gmail.com",
 *     			"photo": null
 *   		}
 *  	}
 * 	]
 *
 *
 *
 * @apiError InvalidCredentias If there is not define one of the parametres .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 *
 * @apiError InvalidToken If the token sended is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Invalid Token
 *     {
 *       "error": "invalid signature"
 *		}
 *
 * @apiError RateNotFound If theres not coincidences 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Rate not Found
 *     {
 *       "error": "Rate not found"
 *		}
 *
 */ 
// GET candidatures by id user (candidats)
router.get('/MyRates/', function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)
	//We get the token and we verify it 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
		//If the token is incorrect we sent a error message
	  if (err) return res.status(403).send(err.message);
	  var decoded = jwt.verify(token, 'gato');

	  models.Rating.findAll({
		where:{ de: decoded.id},
		include: [{ model: models.User, as: 'Pour'}]
		}).then(function (ratingFound) {
			if (ratingFound==null) return res.status(4034).send("Rating not found");
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