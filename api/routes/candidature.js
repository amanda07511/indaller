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
 * @api {post} /candidature/add Request for add a new candidature
 * @apiHeader {String} token Users encripted key.
 * @apiName CandidatureAdd
 * @apiGroup Candidature
 *
 *
 * @apiParam {Number} annonce Annonce ID.
 * @apiParam {String} message Text of the postulant.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *		  {
 *		    "Candidature submit success"
 *		  }
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

// POST /add New Candidature
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
	  
	  if (err) return res.status(403).send(err.message);
	  var decoded = jwt.verify(token, 'gato');

		models.Candidat.create({
			annonce : req.body.annonce,
			Candidat: decoded.id,
			message: req.body.message,
			status: 1
		}).then(function(response){
			res.status(200).send("Candidature submit success");
			
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post add

/**
 * @api {post} /candidature/update Request for up to date a candidature
 * @apiHeader {String} token Users encripted key.
 * @apiName CandidatureUpdate
 * @apiGroup Candidature
 *
 *
 * @apiParam {Number} annonce Annonce ID.
 * @apiParam {String} message Text of the postulant.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 *		  [
 * 			{
 *   			"status": 200,
 *   			"id": 1,
 *   			"message": "Bonjour, je suis interese dans ton project , je vodrais recevoir plus d'information pour vous faire un cotization",
 *   			"createAt": "2017-06-01T12:57:56.000Z",
 *  			"annonce": {
 *    			"id": 1,
 *     			"titre": "Developpeur Web",
 *     			"description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *     			"lat": "0.98798361241423",
 *     			"lng": "21.3212309120937",
 *     			"ddd": "2017-05-25T00:00:00.000Z",
 *     			"ddf": "2017-07-01T00:00:00.000Z"
 *   		}
 * 		]
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
	if(!req.body.id||!req.body.message) return res.sendStatus(401)
	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)

	//I take the token and i verify it. 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  
	  if (err) return res.status(403).send(err.message);
	  
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


/**
 * @api {post} /candidature/update Request for change a status of candidature
 * @apiHeader {String} token Users encripted key.
 * @apiName CandidatureUpdate
 * @apiGroup Candidature
 *
 *
 * @apiParam {Number} annonce Annonce ID.
 * @apiParam {Number} status Code status of the candidature.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 *		  {
 *		    "Candidature submit success"
 *		  }
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
	  
	  if (err) return res.status(403).send(err.message);
	  
	  var decoded = jwt.verify(token, 'gato');

		models.Candidat.update({
			status: req.body.status
			}, {
		 	 where: {
		    	id: req.body.id
		  }
		}).then(function(response){
			res.status(200).send("Candidature update success");
			
		}).catch(function(err) {
			response = { erro:err}; 
			res.end(JSON.stringify(response));
		});//end findOne;

	});//end jwt.verify

});//end post update



/**
 * @api {get} /candidature/get/:id Request for get a candidature by id 
 * @apiName CandidatureGetId
 * @apiGroup Candidature
 *
 *
 * @apiParam {Number} id Candidature ID.
 *
 *
 * @apiSuccess {Number} id Candidature ID.
 * @apiSuccess {String} message Text of the postulant.
 * @apiSuccess {Date}   createdAt Date of postulation.
 * @apiSuccess {Boolean} Status Request status.
 * @apiSuccess {String} nom Lastname of the User.
 * @apiSuccess {String} prenom Firstname of the .User
 * @apiSuccess {String} email Users email.
 * @apiSuccess {String} photo Users photo in format Base64.
 * @apiSuccess {Number} tel Users phone number.
 * @apiSuccess {String} domaine Domaine name.
 * @apiSuccess {String} titre Title of the annonce.
 * @apiSuccess {String} descrition A description of the annonce
 * @apiSuccess {Double} lat Latitude of the project in the annonce.
 * @apiSuccess {Double} lng Longitude of the project in the annonce.
 * @apiSuccess {Date}   finalization Date of expiration
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *		  {
 *		  "status": 200,
 *		  "id": 1,
 *		  "message": "Bonjour, je suis interese dans ton project , je vodrais recevoir plus d'information pour vous faire un cotization",
 *		  "createAt": "2017-06-01T12:57:56.000Z",
 *		  "user": {
 *		    "id": 53,
 *		    "nom": "Montparne",
 *		    "prenom": "Julie",
 *		    "email": "julie@gmail.com",
 *		    "photo": " "
 *		  },
 *		  "annonce": {
 *		    "id": 1,
 *		    "titre": "Developpeur Web",
 *		    "description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *		    "lat": "0.98798361241423",
 *		    "lng": "21.3212309120937",
 *		    "ddd": "2017-05-25T00:00:00.000Z",
 *		    "ddf": "2017-07-01T00:00:00.000Z"
 *		  }
 *		}
 *
 *
 *
 *
 * @apiError CandidatureNotFound The id of the Candidature was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Candidature not found"
 *		}
 *
 */


// GET candidature by id 
router.get('/get/:id', function(req,res){

	var id=decodeURI(req.params.id);

	models.Candidat.findOne({
		where:{ id: id},
		include: [{ model: models.User, as: 'User'}, { model: models.Annonce, as: 'Annonce'}]
	}).then(function (candidatFound) {

		if (candidatFound==null) return res.status(404).send("Candidature not found");

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

/**
 * @api {get} /candidature/getCandidatures/ Request for get candidatures by id user (Candidat)
 * @apiHeader {String} token Users encripted key.
 * @apiName CandidatureGetCandidats
 * @apiGroup Candidature
 *
 *
 * @apiSuccess {Number} id Candidature ID.
 * @apiSuccess {String} message Text of the postulant.
 * @apiSuccess {Date}   createdAt Date of postulation.
 * @apiSuccess {Boolean} Status Request status.
 * @apiSuccess {String} domaine Domaine name.
 * @apiSuccess {String} titre Title of the annonce.
 * @apiSuccess {String} descrition A description of the annonce
 * @apiSuccess {Double} lat Latitude of the project in the annonce.
 * @apiSuccess {Double} lng Longitude of the project in the annonce.
 * @apiSuccess {Date}   finalization Date of expiration
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *		  {
 *		  "status": 200,
 *		  "id": 1,
 *		  "message": "Bonjour, je suis interese dans ton project , je vodrais recevoir plus d'information pour vous faire un cotization",
 *		  "createAt": "2017-06-01T12:57:56.000Z",
 *		  "user": {
 *		    "id": 53,
 *		    "nom": "Montparne",
 *		    "prenom": "Julie",
 *		    "email": "julie@gmail.com",
 *		    "photo": " "
 *		  }
 *		}
 *
 *
 *
 *
 * @apiError CandidatureNotFound The id of the Candidature was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Candidature not found"
 *		}
 *
 */

// GET candidatures by id user (candidats)
router.get('/getCandidatures/', function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)
	//We get the token and we verify it 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
		
		//If the token is incorrect we sent a error message
	  if (err) return res.status(403).send(err.message);
	  var decoded = jwt.verify(token, 'gato');

	  models.Candidat.findAll({
		where:{ candidat: decoded.id},
		include: [{ model: models.Annonce, as: 'Annonce'}]
		}).then(function (candidatFound) {
			
			if (candidatFound==null) res.status(404).send("Candidature not found");
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

/**
 * @api {get} /candidature/getCandidat/:id Request for get candidatures by id annonce
 * @apiHeader {String} token Users encripted key.
 * @apiName CandidatureGetCandidatures
 * @apiGroup Candidature
 *
 *
 * @apiSuccess {Number} id Annonce ID.
 * @apiSuccess {String} message Text of the postulant.
 * @apiSuccess {Date}   createdAt Date of postulation.
 * @apiSuccess {Boolean} Status Request status.
 * @apiSuccess {String} nom Lastname of the User.
 * @apiSuccess {String} prenom Firstname of the .User
 * @apiSuccess {String} email Users email.
 * @apiSuccess {String} photo Users photo in format Base64.
 * @apiSuccess {Number} tel Users phone number.
 * @apiSuccess {String} domaine Domaine name.
 * @apiSuccess {String} titre Title of the annonce.
 * @apiSuccess {String} descrition A description of the annonce
 * @apiSuccess {Double} lat Latitude of the project in the annonce.
 * @apiSuccess {Double} lng Longitude of the project in the annonce.
 * @apiSuccess {Date}   finalization Date of expiration
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *		  {
 *		  "status": 200,
 *		  "id": 1,
 *		  "message": "Bonjour, je suis interese dans ton project , je vodrais recevoir plus d'information pour vous faire un cotization",
 *		  "createAt": "2017-06-01T12:57:56.000Z",
 *		  "user": {
 *		    "id": 53,
 *		    "nom": "Montparne",
 *		    "prenom": "Julie",
 *		    "email": "julie@gmail.com",
 *		    "photo": " "
 *		  },
 *		  "annonce": {
 *		    "id": 1,
 *		    "titre": "Developpeur Web",
 *		    "description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *		    "lat": "0.98798361241423",
 *		    "lng": "21.3212309120937",
 *		    "ddd": "2017-05-25T00:00:00.000Z",
 *		    "ddf": "2017-07-01T00:00:00.000Z"
 *		  }
 *		}
 *
 *
 *
 *
 * @apiError CandidatureNotFound The id of the Candidature was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Candidature not found"
 *		}
 *
 */

// GET candidatures by id anonce 
router.get('/getCandidat/:id', function(req,res){
	var id=decodeURI(req.params.id);

	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)
	//We get the token and we verify it 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
		//If the token is incorrect we sent a error message
	  if (err) return res.status(403).send(err.message);

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