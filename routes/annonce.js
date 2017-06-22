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
 * @api {post} /annonce/add Request for add a new annonce 
 * @apiHeader {String} token Users encripted key.
 * @apiName AnnonceAdd
 * @apiGroup Annonce
 *
 *
 * @apiParam {Number} domaine Domaine ID.
 * @apiParam {String} titre Title of the annonce.
 * @apiParam {String} descrition A description of the annonce
 * @apiParam {Double} lat Latitude of the project in the annonce.
 * @apiParam {Double} lng Longitude of the project in the annonce.
 * @apiParam {Number} etat Code of the annonce status.
 * @apiParam {Date}   ddn Date of publication.
 * @apiParam {Date}   ddn Date of expiration.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 *     [
 *		  {
 *		    "status": 200,
 *		    "id": 1,
 *		    "domaine": "IT",
 *		    "titre": "Developpeur Web",
 *		    "description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *		    "lat": "0.98798361241423",
 *		    "lng": "21.3212309120937",
 *		    "createAt": "2017-05-31T15:12:07.000Z",
 *		    "finalization": "2017-07-01T00:00:00.000Z"
 *		  }
 *		]
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

// POST /add  Adding new annonce
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
	  
	  if (err) return res.status(403).send(err.message);
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

/**
 * @api {post} /annonce/update Request for up to date an annonce 
 * @apiHeader {String} token Users encripted key.
 * @apiName AnnonceUpdate
 * @apiGroup Annonce
 *
 *
 * @apiParam {Number} id Annonce ID.
 * @apiParam {Number} domaine Domaine ID.
 * @apiParam {String} titre Title of the annonce.
 * @apiParam {String} descrition A description of the annonce
 * @apiParam {Double} lat Latitude of the project in the annonce.
 * @apiParam {Double} lng Longitude of the project in the annonce.
 * @apiParam {Number} etat Code of the annonce status.
 * @apiParam {Date}   ddn Date of publication.
 * @apiParam {Date}   ddn Date of expiration.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 *     [
 *		  {
 *		    "status": 200,
 *		    "id": 1,
 *		    "domaine": "IT",
 *		    "titre": "Developpeur Web",
 *		    "description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *		    "lat": "0.98798361241423",
 *		    "lng": "21.3212309120937",
 *		    "createAt": "2017-05-31T15:12:07.000Z",
 *		    "finalization": "2017-07-01T00:00:00.000Z"
 *		  }
 *		]
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
	if(!req.body.id||!req.body.domaine||!req.body.titre||!req.body.description||!req.body.lat||!req.body.lng||!req.body.etat||!req.body.ddd||!req.body.ddf) return res.sendStatus(401)
	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)

	//I take the token and i verify it. 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {

	  if (err) return res.status(403).send(err.message);
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

/**
 * @api {delete} /annonce/delete Request for delete an annonce 
 * @apiHeader {String} token Users encripted key.
 * @apiName AnnonceDelete
 * @apiGroup Annonce
 *
 *
 * @apiParam {Number} id Annonce ID.

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 *     [
 *		  {
 *		    "status": 200,
 *		    "id": 1,
 *		    "domaine": "IT",
 *		    "titre": "Developpeur Web",
 *		    "description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *		    "lat": "0.98798361241423",
 *		    "lng": "21.3212309120937",
 *		    "createAt": "2017-05-31T15:12:07.000Z",
 *		    "finalization": "2017-07-01T00:00:00.000Z"
 *		  }
 *		]
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
 *
 *
 * @apiError AnnonceNotFound The id of the Annonce was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Annonce not found"
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

		models.Annonce.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	
		 	if (response==null) return res.status(404).send("Annonce not found");
				
			response.destroy();
			res.header('token',token);
			res.redirect(303,'/annonce/getMy/');

		});

	});//end jwt.verify

});//end post delete

/**
 * @api {get} /annonce/getId/:id Request for get an annonce by id 
 * @apiHeader {String} token Users encripted key.
 * @apiName AnnonceGetId
 * @apiGroup Annonce
 *
 *
 * @apiParam {Number} id Annonce ID.
 *
 *
 * @apiSuccess {Boolean} Status Request status.
 * @apiSuccess {String} Token JSON Web Token with users id.
 * @apiSuccess {Number} id Annonce ID.
 * @apiSuccess {String} domaine Domaine name.
 * @apiSuccess {String} titre Title of the annonce.
 * @apiSuccess {String} descrition A description of the annonce
 * @apiSuccess {Double} lat Latitude of the project in the annonce.
 * @apiSuccess {Double} lng Longitude of the project in the annonce.
 * @apiSuccess {Date}   createdAt Date of publication.
 * @apiSuccess {Date}   finalization Date of expiration.
 * @apiSuccess {String} nom Lastname of the User.
 * @apiSuccess {String} prenom Firstname of the .User
 * @apiSuccess {String} email Users email.
 * @apiSuccess {String} photo Users photo in format Base64.
 * @apiSuccess {Number} tel Users phone number.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *    {
 *		  "status": 200,
 *		  "id": 1,
 *		  "domaine": "IT",
 *		  "titre": "Developpeur Web",
 * 		  "description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *		  "lat": "0.98798361241423",
 *		  "lng": "21.3212309120937",
 *		  "createAt": "2017-05-31T15:12:07.000Z",
 *		  "finalization": "2017-07-01T00:00:00.000Z",
 *		  "user": {
 *		    "id": 15,
 *		    "nom": "Marroquin",
 *		    "prenom": "Amanda",
 *		    "email": "amanda@gmail.com",
 *		    "photo": null
 *		  }
 *		}
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
 *
 *
 * @apiError AnnonceNotFound The id of the Annonce was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Annonce not found"
 *		}
 *
 */

// GET Annonce by id 
router.get('/getId/:id', function(req,res){

	var id=decodeURI(req.params.id);

	models.Annonce.findOne({
		where:{ id: id},
		include: [{ model: models.User, as: 'User'}, { model: models.Domaine, as: 'Domaine'}]
	}).then(function (annonceFound) {

		if (annonceFound==null) return res.status(404).send("Annonce not found");

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
					photo:annonceFound.User.photo,
					tel:annonceFound.User.tel
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
 * @api {get} /annonce/getMy Request for get annonces by users id 
 * @apiHeader {String} token Users encripted key.
 * @apiName AnnonceGetMy
 * @apiGroup Annonce
 *
 *
 *
 *
 * @apiSuccess {Boolean} Status Request status.
 * @apiSuccess {String} Token JSON Web Token with users id.
 * @apiSuccess {Number} id Annonce ID.
 * @apiSuccess {String} domaine Domaine name.
 * @apiSuccess {String} titre Title of the annonce.
 * @apiSuccess {String} descrition A description of the annonce
 * @apiSuccess {Double} lat Latitude of the project in the annonce.
 * @apiSuccess {Double} lng Longitude of the project in the annonce.
 * @apiSuccess {Date}   createdAt Date of publication.
 * @apiSuccess {Date}   finalization Date of expiration.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *   [{
 *		  "status": 200,
 *		  "id": 1,
 *		  "domaine": "IT",
 *		  "titre": "Developpeur Web",
 * 		  "description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *		  "lat": "0.98798361241423",
 *		  "lng": "21.3212309120937",
 *		  "createAt": "2017-05-31T15:12:07.000Z",
 *		  "finalization": "2017-07-01T00:00:00.000Z",
 *		}
 *	]
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
 *
 *
 * @apiError AnnonceNotFound The id of the Annonce was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Annonce not found"
 *		}
 *
 */

// GET resto by id user 
router.get('/getMy/', function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)
	//We get the token and we verify it 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
		//If the token is incorrect we sent a error message
	  if (err) return res.status(403).send(err.message);
	  var decoded = jwt.verify(token, 'gato');

	  models.Annonce.findAll({
		where:{ user: decoded.id},
		include: [{ model: models.Domaine, as: 'Domaine'}]
		}).then(function (annonceFound) {
			
			if (annonceFound==null) return res.status(404).send("Annonce not Found");
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

/**
 * @api {get} /annonce/ Request for get all annonces
 * @apiName AnnonceGetAll
 * @apiGroup Annonce
 *
 *
 * @apiSuccess {Boolean} Status Request status.
 * @apiSuccess {String} Token JSON Web Token with users id.
 * @apiSuccess {Number} id Annonce ID.
 * @apiSuccess {String} domaine Domaine name.
 * @apiSuccess {String} titre Title of the annonce.
 * @apiSuccess {String} descrition A description of the annonce
 * @apiSuccess {Double} lat Latitude of the project in the annonce.
 * @apiSuccess {Double} lng Longitude of the project in the annonce.
 * @apiSuccess {Date}   createdAt Date of publication.
 * @apiSuccess {Date}   finalization Date of expiration.
 * @apiSuccess {String} nom Lastname of the User.
 * @apiSuccess {String} prenom Firstname of the .User
 * @apiSuccess {String} email Users email.
 * @apiSuccess {String} photo Users photo in format Base64.
 * @apiSuccess {Number} tel Users phone number.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *   [{
 *		  "status": 200,
 *		  "id": 1,
 *		  "domaine": "IT",
 *		  "titre": "Developpeur Web",
 * 		  "description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *		  "lat": "0.98798361241423",
 *		  "lng": "21.3212309120937",
 *		  "createAt": "2017-05-31T15:12:07.000Z",
 *		  "finalization": "2017-07-01T00:00:00.000Z",
 *		  "user": {
 *		    "id": 15,
 *		    "nom": "Marroquin",
 *		    "prenom": "Amanda",
 *		    "email": "amanda@gmail.com",
 *		    "photo": null
 *		  }
 *		}
 *	]
 *
 *
 *
 * @apiError AnnonceNotFound The id of the Annonce was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Annonce not found"
 *		}
 *
 */

// GET all annonces
router.get('/', function(req,res){

		models.Annonce.findAll({
			include: [{ model: models.User, as: 'User'}, { model: models.Domaine, as: 'Domaine'}]
		}).then(function (annonceFound) {
			
			if (annonceFound==null)  return res.status(404).send("Annonce not Found");

			else{
				// Prepare output in JSON format
				var a = Array();

				for (var i = 0; i < annonceFound.length; i++) {
					a.push({ 
						status: 200, 
						id:annonceFound[i].id,
						titre:annonceFound[i].titre, 
						description: annonceFound[i].description,  
						lat:annonceFound[i].lat, 
						lng:annonceFound[i].lng, 
						createAt: annonceFound[i].createdAt, 
						finalization: annonceFound[i].ddf,
						user: annonceFound[i].User,
						domaine : annonceFound[i].Domaine
		   			});
				}
					
		   		res.setHeader('Content-Type', 'text/plain');
				res.end(JSON.stringify(a));
			}//End else
			
				
		}).catch(function(err) { 
			console.log(err); 
		});

});

/**
 * @api {get} /annonce/:id Request for get annonces by domaine
 * @apiName AnnonceGet
 * @apiGroup Annonce
 *
 * @apiParam {Number} id Domaine ID.
 *
 * @apiSuccess {Boolean} Status Request status.
 * @apiSuccess {String} Token JSON Web Token with users id.
 * @apiSuccess {Number} id Annonce ID.
 * @apiSuccess {String} domaine Domaine name.
 * @apiSuccess {String} titre Title of the annonce.
 * @apiSuccess {String} descrition A description of the annonce
 * @apiSuccess {Double} lat Latitude of the project in the annonce.
 * @apiSuccess {Double} lng Longitude of the project in the annonce.
 * @apiSuccess {Date}   createdAt Date of publication.
 * @apiSuccess {Date}   finalization Date of expiration.
 * @apiSuccess {String} nom Lastname of the User.
 * @apiSuccess {String} prenom Firstname of the .User
 * @apiSuccess {String} email Users email.
 * @apiSuccess {String} photo Users photo in format Base64.
 * @apiSuccess {Number} tel Users phone number.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *   [{
 *		  "status": 200,
 *		  "id": 1,
 *		  "domaine": "IT",
 *		  "titre": "Developpeur Web",
 * 		  "description": "On cherche un/une developpeur web pour la construction de site commertial.",
 *		  "lat": "0.98798361241423",
 *		  "lng": "21.3212309120937",
 *		  "createAt": "2017-05-31T15:12:07.000Z",
 *		  "finalization": "2017-07-01T00:00:00.000Z",
 *		  "user": {
 *		    "id": 15,
 *		    "nom": "Marroquin",
 *		    "prenom": "Amanda",
 *		    "email": "amanda@gmail.com",
 *		    "photo": null
 *		  }
 *		}
 *	]
 *
 *
 *
 * @apiError AnnonceNotFound The id of the Annonce was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Annonce not found"
 *		}
 *
 */

// GET annonce by id 
router.get('/:id', function(req,res){
	var id=decodeURI(req.params.id);

	models.Annonce.findAll({
			where:{ domaine: id},
			include: [{ model: models.User, as: 'User'}, { model: models.Domaine, as: 'Domaine'}]
		}).then(function (annonceFound) {

			if (annonceFound==null) return res.status(404).send("Annonce not Found");

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