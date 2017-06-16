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

/**
 * @api {get} /enterprise/get Request Enterprise Information by User id
 * @apiHeader {String} token Users encripted key.
 * @apiName Enterprise Get
 * @apiGroup Enterprise
 *
 * @apiSuccess {Number} id Enterprise unique ID.
 * @apiSuccess {Number} user User unique ID.
 * @apiSuccess {String} nom Enterprice name.
 * @apiSuccess {String} domain Name of enterprises domaine
 * @apiSuccess {String} description A little description of the enterprise.
 * @apiSuccess {Double} lat Latitude of the enterprise.
 * @apiSuccess {Double} lng Longitude of the enterprise.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"id": 3,
 *		  	"user": 15,
 *		  	"nom": "HelloYou!",
 *		  	"domaine": "Commerce - Immobilier",
 *		  	"description": "Enterprise dedicated to do things..",
 *		  	"lat": "1.878757647647",
 *		  	"lng": "-0.987597648653685376"     
 * 
 *		}
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
 * 		}
 *
 *
 *
 * @apiError InvalidUser The User don't have the privileges for chage his count
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Invalid User
 *     {
 *       "error": "Invalid User"
 *		}
 *
 *
 */  

// GET enterpise information by user id 
router.get('/get/', function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)
	//We get the token and we verify it 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  //If the token is incorrect we sent a error message
	  if (err) return res.status(403).send(err.message);

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

/**
 * @api {post} /enterprise/update Request for up to date Enterprise Information 
 * @apiHeader {String} token Users encripted key.
 * @apiName Enterprise Update
 * @apiGroup Enterprise
 *
 * @apiParam  {String} nom Enterprice name.
 * @apiParam  {String} domain Name of enterprises domaine
 * @apiParam  {String} description A little description of the enterprise.
 * @apiParam  {Double} lat Latitude of the enterprise.
 * @apiParam  {Double} lng Longitude of the enterprise.

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 *     {
 *			"id": 3,
 *		  	"user": 15,
 *		  	"nom": "HelloYou!",
 *		  	"domaine": "Commerce - Immobilier",
 *		  	"description": "Enterprise dedicated to do things..",
 *		  	"lat": "1.878757647647",
 *		  	"lng": "-0.987597648653685376"     
 * 
 *		}
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
 * 		}
 *
 *
 *
 */ 

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
	  if (err) return res.status(403).send(err.message);
	  
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
			req.method = 'GET';
			res.header('token',token);
			res.redirect('/enterprise/get/');
			
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update

module.exports = router;