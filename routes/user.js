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
 * @api {post} /user/login Request User Authentification Login
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} email Users email.
 * @apiParam {String} password Users secret word.
 *
 * @apiSuccess {Boolean} Status Request status.
 * @apiSuccess {String} Token JSON Web Token with users id.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Status": 200,
 *       "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInR5cGUiOjQsImlhdCI6MTQ5NjU4NTc1M30.cBL_vk-wEdaCCOQQspvJzdpx4a4ebCz6nXZwqy2WMgs"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 *
 *
 *@apiError InvalidCredentias If there is not define one of the parametres .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 *
 *@apiError InvalidUser If the User has a count bloqued or deleted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "User bloqued or deleted"
 *     }
 */

// POST /login 
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
		if (userFound==null) return res.status(404).send("User not found");

		if(userFound.type==7||userFound.type==8) return res.status(401).send("User bloqued or deleted");
		//create a token with user informationand with an hour of duration
			var token=jwt.sign({id: userFound.id, type: userFound.type}, 
				'gato');

			// Prepare output in JSON format
			 response = {status: 200, token:token};
  
			res.end(JSON.stringify(response));	
	}).catch(function(err) { 
		return res.status(500).send(err);
	});

});

/**
 * @api {post} /user/signup Request User Authentification Signup
 * @apiName Signup
 * @apiGroup User
 *
 * @apiParam {String} nom Lastname of the User.
 * @apiParam {String} prenom Firstname of the .User
 * @apiParam {String} email Users email
 * @apiParam {String} password Users secret word.
 * @apiParam {String} photo Users photo in format Base64.
 * @apiParam {Number} tel Users phone number.
 * @apiParam {Number} ville City ID.
 * @apiParam {Date} ddn Users birthday.
 * @apiParam {Number} type Type of count.
 *
 * @apiSuccess {Boolean} Status Request status.
 * @apiSuccess {String} Token JSON Web Token with users id.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Status": 200,
 *       "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInR5cGUiOjQsImlhdCI6MTQ5NjU4NTc1M30.cBL_vk-wEdaCCOQQspvJzdpx4a4ebCz6nXZwqy2WMgs"
 *     }
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
 * @apiError InvalidEmail If there other count with the same email.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Invalid Email
 *     {
 *       "error": "Invalid email"
 *     }
 */

// POST create a new user 
router.post('/signup', urlencodedParser, function (req, res) {
	
  //If there's no body parametres throw and error status
  if (!req.body) return res.sendStatus(401)
  //If one of the parametres is not defined throw and error status
  if(!req.body.nom||!req.body.prenom||!req.body.email||!req.body.password||!req.body.tel||!req.body.ville||!req.body.photo||!req.body.ddn||!req.body.type) return res.sendStatus(401)

  	var type = req.body.type;
  	console.log(req.body.ville);

  	var id;
  	var etat;
  	var token;
  	var enterprise;
  	var user;
  	var dossier;

  	if(type == 2){
  		etat = 1;
  	}
  	else{
  		etat = 0;
  	}

  	async.series([
		// fonction #1 for check that the users email is not than BD.
		function(callback) {
			//Search user by email
			models.User.findOne({

				where: { email: req.body.email }

			}).then(function (userFound) {

				if (userFound!=null) return res.status(500).send("Invalid email");
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
				ville_id: req.body.ville,
				ddn: req.body.ddn,
				type: type,
				etat: etat
			}).then(function(newUser){
				
				//create a token with user informationand 
				token = jwt.sign({id: newUser.id,type: newUser.type}, 'gato');
				id = newUser.id;
				user = newUser;

				callback();
				
			}).catch(function(err){ 
				return res.status(500).send(err);
			});//end newUser

		},// fonction #3 for create an empty dossier or empty enterprise.
		function(callback) {
			// If the user is a fournisseur
				if(type == 4 || type == 5){

					//Create a Dossier user
					var newDossier = models.Dossier.create({
						user: id,
						domaine: 1
					}).then(function(newDossier){
						dossier = newDossier;
						console.log(dossier);
					}).catch(function(err){ 
						return res.status(500).send(err);
					});//end newDossier

				}
				// If the user is a fournisseur is an enterprise
				if(type == 3 || type == 5){
					//Create a Dossier user
					var newEnterprise = models.Enterprise.create({
						user: id
					}).then(function(newEnterprise){
						enterprise = newEnterprise;
						console.log(enterprise);
					}).catch(function(err){ 
						return res.status(500).send(err);
					});//end newUser
				}
				callback();

		},],
		function(err, results) {
			if (err) return res.status(500).send(err);
	  		
			response = {status: 200, token:token, user: user, dossier: dossier, enterprise: enterprise };
			res.setHeader('Content-Type', 'text/plain');
			res.end(JSON.stringify(response));

	});//end Async
});

/**
 * @api {get} /user/get Request User Information by id
 * @apiHeader {String} token Users encripted key.
 * @apiName UserGet
 * @apiGroup User
 *
 * @apiSuccess {String} id Users unique ID.
 * @apiSuccess {String} nom Lastname of the User.
 * @apiSuccess {String} prenom Firstname of the .User
 * @apiSuccess {String} email Users email.
 * @apiSuccess {String} photo Users photo in format Base64.
 * @apiSuccess {Number} tel Users phone number.
 * @apiSuccess {String} ville City name.
 * @apiSuccess {Date}   ddn Users birthday.
 * @apiSuccess {Number} type Type of count.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"id": 15,
 *			"nom": "Marroquin",
 *			"prenom": "Amanda",
 *			"email": "amanda@gmail.com",
 *			"photo": null,
 *			"tel": "768411809",
 *			"ville": "Ozan",
 *			"ddn": "1995-07-11T00:00:00.000Z",
 *  		"type": 5      
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
 */  

// GET user information by user id 
router.get('/get', function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)
	//We get the token and we verify it 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {

	  //If the token is incorrect we sent a error message
	  if (err) return res.status(403).send(err.message);

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
				ville: userFound.Ville,
				ddn: userFound.ddn,
				type: userFound.type 
			};

			//Send the information in format Json
			res.setHeader('Content-Type', 'text/plain');
			res.end(JSON.stringify(data));
		});

	});

});


/**
 * @api {get} /user/get/fournisseurs Request Users type fourniseurs
 * @apiGroup User
 *
 * @apiSuccess {String} titre title of the users portafolio.
 * @apiSuccess {String} description description of teh portafolio.
 * @apiSuccess {Object} user users information
 * @apiSuccess {Object} domaine domaine  information.

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *			{
 *		    "titre": "Environmental Tech",
 *			    "description": "facilitate 24/7 architectures",
 *			    "user": {
 *			      "id": 15,
 *			      "prenom": "Amanda",
 *			      "nom": "Marroquin",
 *			      "email": "amanda@gmail.com",
 *			      "password": "gato",
 *			      "tel": "768411809",
 *			      "photo": "https://robohash.org/assumendadoloresodit.jpg?size=150x150&set=set1",
 *			      "ville_id": 1,
 *			      "ddn": "1995-07-11T00:00:00.000Z",
 *			      "etat": true,
 *			      "type": 5,
 *			      "createdAt": "2017-05-11T00:00:00.000Z",
 *			      "updatedAt": "2017-05-11T00:00:00.000Z",
 *			      "Ville": {
 *			        "id": 1,
 *			        "ville_departement": "01",
 *			        "ville_nom": "OZAN",
 *			        "ville_nom_simple": "ozan",
 *			        "ville_nom_reel": "Ozan",
 *			        "ville_code_postal": "01190",
 *			        "ville_longitude_deg": 4.91667,
 *			        "ville_latitude_deg": 46.3833,
 *			        "createdAt": null,
 *			        "updatedAt": null
 *			      }
 *			    },
 *			    "domaine": {
 *			      "id": 19,
 *			      "nom": "Environnement - Nature - Nettoyage",
 *			      "createdAt": "2017-05-11T15:49:51.000Z",
 *			      "updatedAt": "2017-05-11T15:49:51.000Z"
 *			    }
 *			}    
 * 
 *		]
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
 * @apiError Fournisseur Not Found If theres any fournisseur
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Fourniseurs not found"
 * 		}
 */  

// GET fournisseurs by id 
router.get('/get/fournisseur', function(req,res){


	models.Dossier.findAll({
  		include: [{ model: models.User, as: 'User', include: [{model: models.Ville, as: 'Ville'}] },{ model: models.Domaine, as: 'Domaine'}]
  	}).then(function (userFound) {

		if (userFound.length==0) return res.status(404).send("User not found");

		else{
			var a = Array();

				for (var i = 0; i < userFound.length; i++) {
					a.push({ 
						titre: userFound[i].titre,
						description: userFound[i].description,
						user: userFound[i].User,
						domaine : userFound[i].Domaine

	   				});
				}
				
	   			res.setHeader('Content-Type', 'text/plain');
				res.end(JSON.stringify(a));
		}
			
				
	}).catch(function(err) { 
		console.log(err); 
	});

});

/**
 * @api {post} /user/update Request Update User Information 
 * @apiHeader {String} token Users encripted key.
 * @apiName UserUpdate
 * @apiGroup User
 *
 * @apiParam {String} nom Lastname of the User.
 * @apiParam {String} prenom Firstname of the .User
 * @apiParam {String} email Users email.
 * @apiParam {String} photo Users photo in format Base64.
 * @apiParam {Number} tel Users phone number.
 * @apiParam {Number} ville City ID.
 * @apiParam {Date} ddn Users birthday.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"response":"User  was correctly updated"   
 * 
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
 */  

// POST /update  simple update of information
router.post('/update', urlencodedParser, function(req,res){

	//If there's no body parametres throw and error status
	if (!req.body) return res.sendStatus(401)
	//If one of the parametres is not defined throw and error status
	if(!req.body.nom||!req.body.prenom||!req.body.tel||!req.body.ville||!req.body.photo||!req.body.ddn) return res.sendStatus(401)
	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)

	//I take the token and i verify it. 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {

	  if (err) return res.status(403).send(err.message);
	  var decoded = jwt.verify(token, 'gato');

		models.User.update({
		  	nom: req.body.nom,
			prenom: req.body.prenom,
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
			return res.status(500).send(err);
		});//end findOne;

	});//end jwt.verify

});//end post update

/**
 * @api {post} /user/change Request for chage type of count 
 * @apiHeader {String} token Users encripted key.
 * @apiName UserUpdate
 * @apiGroup User
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Status": 200,
 *       "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInR5cGUiOjQsImlhdCI6MTQ5NjU4NTc1M30.cBL_vk-wEdaCCOQQspvJzdpx4a4ebCz6nXZwqy2WMgs"
 *     }
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
 * @apiError InvalidUser The User don't have the privileges for chage his count
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Invalid User
 *     {
 *       "error": "Invalid User"
 *		}
 */ 


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
	  
	  if (err) return res.status(500).send(err.message);
	  decoded = jwt.verify(token, 'gato');
	  
	  if(decoded.type!=2&&decoded.type!=3) return res.status(403).send("Invalid User");

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
			return res.status(403).send(err);
		});//end findOne;

	});//end jwt.verify

});//end post update

/**
 * @api {post} /user/delete Request for delete a count 
 * @apiHeader {String} token Users encripted key.
 * @apiName UserDelete
 * @apiGroup User
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Status": 200,
 *       "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInR5cGUiOjQsImlhdCI6MTQ5NjU4NTc1M30.cBL_vk-wEdaCCOQQspvJzdpx4a4ebCz6nXZwqy2WMgs"
 *     }
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
 */

// POST /change  client change profil to type fournisseur  
router.post('/delete', urlencodedParser, function(req,res){

	//If header token is not defined throw and error status
	if(!req.get('token')) return res.sendStatus(401)

	//I take the token and i verify it. 
	var token=req.get('token');
	jwt.verify(token, 'gato', function(err, decoded) {
	  
	  if (err) return res.status(403).send(err.message);
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
			return res.status(500).send(err);
		});//end findOne;

	});//end jwt.verify

});//end post update


/**
 * @api {post} /user/block Request for block a users count
 * @apiHeader {String} token Users encripted key.
 * @apiName UserBlock
 * @apiGroup User
 *
 * @apiParam {String} email Users email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Status": 200,
 *      }
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
 */
// POST /block block an user count 
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
	  
	  if (err) return res.status(403).send(err);
	  
	  var decoded = jwt.verify(token, 'gato');
	  if(userFound.type==1) return res.status(403).send("Invalid user");

		models.User.update({
		  	type: 8
		}, {
		  where: {
		    email: req.body.email
		  }
		}).then(function(response){
				
			res.sendStatus(200)
			
		}).catch(function(err) {
			return res.status(403).send(err.message);
		});//end findOne;

	});//end jwt.verify

});//end post update

/**
 * @api {get} /user/ville/:id Request get villes by code postal
 * @apiName VillesGet
 * @apiGroup User
 *
 * @apiParam {String} id firts numbers of code postal.
 *
 * @apiSuccess {Integer} id Ville unique ID.
 * @apiSuccess {String} nom Name of the Ville.
 * @apiSuccess {Integer} cp Code postal of the ville

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     	[
 *			{
 *		   		"status": 200,
 *		   		"id": 14353,
 *		   		"nom": "Saint-Martin-d'Hères",
 *		   		"cp": "38400"
 *		 	}
 *		]
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
 * @apiError VilleNotFound if there no coincidences whit the code postal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Foud
 *     {
 *       "error": "Ville not Found"
 * 		}
 */  
// GET get villes by code postal
router.get('/ville/:id', function(req,res){

	
	if (!req.params.id) return res.status(401);
	var id=decodeURI(req.params.id)+'%';

	models.Ville.findAll({
		where: { ville_code_postal: {
          		like: id } 
    	}
	}).then(function (villeFound) {

		if (villeFound.length==0) return res.status(404).send("Ville not found");

		else{
			var a = Array();

				for (var i = 0; i < villeFound.length; i++) {
					a.push({ 
						status: 200,
						id: villeFound[i].id, 
						nom: villeFound[i].ville_nom_reel,
						cp: villeFound[i].ville_code_postal
	   				});
				}
				
	   			res.setHeader('Content-Type', 'text/plain');
				res.end(JSON.stringify(a));
		}
			
				
	}).catch(function(err) { 
		console.log(err); 
	});

});

router.get('/villeNom/:nom', function(req,res){

	
	if (!req.params.nom) return res.status(401);
	var nom=decodeURI(req.params.nom)+'%';

	models.Ville.findAll({
		where: { ville_nom_reel: {
          		like: nom } 
    	}
	}).then(function (villeFound) {

		if (villeFound.length==0) return res.status(404).send("Ville not found");

		else{
			var a = Array();

				for (var i = 0; i < villeFound.length; i++) {
					a.push({ 
						status: 200,
						id: villeFound[i].id, 
						nom: villeFound[i].ville_nom_reel,
						cp: villeFound[i].ville_code_postal
	   				});
				}
				
	   			res.setHeader('Content-Type', 'text/plain');
				res.end(JSON.stringify(a));
		}
			
				
	}).catch(function(err) { 
		console.log(err); 
	});

});

router.get('/villes/', function(req,res){

	models.Ville.findAll().then(function (villeFound) {

		if (villeFound.length==0) return res.status(404).send("Ville not found");

		else{
			var a = Array();

				for (var i = 0; i < villeFound.length; i++) {
					a.push({ 
						id: villeFound[i].id, 
						nom: villeFound[i].ville_nom_reel
	   				});
				}
				
	   			res.setHeader('Content-Type', 'text/plain');
				res.end(JSON.stringify(a));
		}
			
				
	}).catch(function(err) { 
		return res.status(500).send(err);
	});

});

/**
 * @api {get} /user/domaines Request get all domaines
 * @apiName DomainesGet
 * @apiGroup User
 *
 *
 * @apiSuccess {Integer} id Domaine unique ID.
 * @apiSuccess {String} nom Name of the Domaine.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     	[
 *			  {
 *			    "id": 1,
 *			    "nom": "Agriculture"
 *			  },
 *			  {
 *			    "id": 2,
 *			    "nom": "Agroalimentaire - Alimentation"
 *			  },
 *			  {
 *			    "id": 3,
 *			    "nom": "Animaux"
 *			  }
 *		]
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
 * @apiError DomaineNotFound if there any domaine in data base
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Foud
 *     {
 *       "error": "Domaines not Found"
 * 		}
 */

// GET domaines 
router.get('/domaines/', function(req,res){


	models.Domaine.findAll().then(function (villeFound) {

		if (villeFound.length==0) return res.status(404).send("Domaine not found");

		else{
			var a = Array();

				for (var i = 0; i < villeFound.length; i++) {
					a.push({ 
						id: villeFound[i].id,
						nom: villeFound[i].nom
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