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
 * @api {get} /dossier/ Request for get a dossier
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierGet
 * @apiGroup Dossier
 *
 *
 * @apiSuccess {String} titre Dossier titre.
 * @apiSuccess {Object} formation Array of users trainings.
 * @apiSuccess {Object} experiance Array of users jobs experiance.
 * @apiSuccess {Object} certificat Array of users certifications.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *		{
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
 *		}
 *
 *
 * @apiError DossierNotFound The id of the Dossier was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Dossier not found"
 *		}
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
	  if (err) return res.status(403).send(err.message);

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
				if (dossierFound==null) return res.status(404).send("Dossier not found");

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


/**
 * @api {post} /dossier/add/formation Request for add a new formation 
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierAddFormation
 * @apiGroup Dossier
 *
 *
 * @apiParam {String} ecole Name of the institute of formation.
 * @apiParam {Number} domaine Domaine ID.
 * @apiParam {String} diplome Name of the degree got
 * @apiParam {Number} ville Ville ID.
 * @apiParam {Date}   ddn Begining date.
 * @apiParam {Date}   ddn Finish date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * {
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
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
 */ 

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
	  
	  if (err) return res.status(403).send(err.message);
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


/**
 * @api {post} /dossier/add/experiance Request for add a new experiance 
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierAddExperiance
 * @apiGroup Dossier
 *
 *
 * @apiParam {String} titre Work poste name.
 * @apiParam {String} description Description of the tasks.
 * @apiParam {Number} ville Ville ID.
 * @apiParam {Date}   ddn Begining date.
 * @apiParam {Date}   ddn Finish date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * {
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
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
 */ 

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
	  
	  if (err) return res.status(403).send(err.message);
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


/**
 * @api {post} /dossier/add/Certificat Request for add a new certification 
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierAddCertificat
 * @apiGroup Dossier
 *
 *
 * @apiParam {String} titre Certification name.
 * @apiParam {String} certifiante Name of certification Authority.
 * @apiParam {Date}   rendu Date of expedition.
 * @apiParam {Date}   expiration Date of expiration.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * {
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
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
 */ 

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
	  
	  if (err) return res.status(403).send(err.message);
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

/**
 * @api {post} /dossier/update Request for up to date the dossier
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierUpdate
 * @apiGroup Dossier
 *
 *
 * @apiParam {String} titre Certification name.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 *		{
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
 *		}
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
 * @apiError InvalidCredentias If there is not define one of the parametres .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 *
 */

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
	  
	  if (err) return res.status(403).send(err.message);
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


/**
 * @api {post} /dossier/update/formation Request forup to date a formation 
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierUpdateFormation
 * @apiGroup Dossier
 *
 *
 * @apiParam {Number} id Formation ID.
 * @apiParam {String} ecole Name of the institute of formation.
 * @apiParam {Number} domaine Domaine ID.
 * @apiParam {String} diplome Name of the degree got
 * @apiParam {Number} ville Ville ID.
 * @apiParam {Date}   ddn Begining date.
 * @apiParam {Date}   ddn Finish date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * {
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
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
 */ 
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
	  
	  if (err) return res.status(403).send(err.message);
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

/**
 * @api {post} /dossier/update/experiance Request for up to date an experiance 
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierUpdateExperiance
 * @apiGroup Dossier
 *
 *
 * @apiParam {Number} id Experiance ID.
 * @apiParam {String} titre Work poste name.
 * @apiParam {String} description Description of the tasks.
 * @apiParam {Number} ville Ville ID.
 * @apiParam {Date}   ddn Begining date.
 * @apiParam {Date}   ddn Finish date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * {
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
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
 */ 
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
	  
	  if (err) return res.status(403).send(err.message);
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


/**
 * @api {post} /dossier/update/Certificat Request forup to date a certification 
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierUpdateCertificat
 * @apiGroup Dossier
 *
 *
 * @apiParam {Number} id Certification ID.
 * @apiParam {String} titre Certification name.
 * @apiParam {String} certifiante Name of certification Authority.
 * @apiParam {Date}   rendu Date of expedition.
 * @apiParam {Date}   expiration Date of expiration.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * {
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
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
 */ 
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
	  
	  if (err) return res.status(403).send(err.message);
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


/**
 * @api {delete} /dossier/delete/formation Request deletee a formation 
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierDeleteFormation
 * @apiGroup Dossier
 *
 *
 * @apiParam {Number} id Formation ID.

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * {
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
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
 * @apiError FormationNotFound The id of the Formation was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Formation not found"
 *		}
 *
 */ 
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
	  
	  	if (err) return res.status(403).send(err.message);	 
	
		models.Formation.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	if (response==null) return res.status(404).send("Formation not found");
			
			response.destroy();
			res.header('token',token);
			res.redirect(303,'/dossier/get/');
	
		});

	});//end jwt.verify

});//end post delete

/**
 * @api {delete} /dossier/delete/experiance Request for delet an experiance 
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierDeleteExperiance
 * @apiGroup Dossier
 *
 *
 * @apiParam {Number} id Experiance ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * {
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
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
 * @apiError ExperiancenNotFound The id of the Experiance was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Experiance not found"
 *		}
 *
 */ 
 */ 
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
	  
	  	if (err) return res.status(403).send(err.message);	 
		
		models.Experiance.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	if (response==null) return res.status(404).send("Experiance not found");
			
			response.destroy();
			res.header('token',token);
			res.redirect(303,'/dossier/get/');
		});

	});//end jwt.verify

});//end post delete

/**
 * @api {delete} /dossier/delete/Certificat Request delete certification 
 * @apiHeader {String} token Users encripted key.
 * @apiName DossierDeleteCertificat
 * @apiGroup Dossier
 *
 *
 * @apiParam {Number} id Certification ID.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 303 Redirect
 * {
 *
 *
 *		  "dossier": {
 *		    "titre": "Develeppeur"
 *		  },
 * 		  "formation": [
 *		    {
 *		      "id": 4,
 *		      "ecole": "IUT2",
 *		      "domaine": "Commerce - Immobilier",
 *		      "diplome": "BAC+3",
 *		      "ville": "Grenoble",
 *		      "ddd": "2016-03-07T00:00:00.000Z",
 *		      "ddf": "2017-01-09T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "experiance": [
 *		    {
 *		      "id": 1,
 *		      "titre": "Assistante Commerciale ",
 *		      "description": "Conseil aux entreprises",
 *		      "ville": "Grenoble",
 *		      "ddd": "2014-12-05T00:00:00.000Z",
 *		      "ddf": "2015-01-05T00:00:00.000Z"
 *		    }
 *		  ],
 *		  "certificat": [
 *		    {
 *		      "id": 2,
 *		      "titre": "Certificat",
 *		      "certifiante": "ABC",
 *		      "rendu": "2017-05-01T00:00:00.000Z",
 *		      "expiration": "2017-05-19T00:00:00.000Z"
 *		    },
 *		    {
 *		      "id": 1,
 *		      "titre": "Certification en commerce international",
 * 		      "certifiante": "ABC",
 *		      "rendu": "2016-07-01T00:00:00.000Z",
 *		      "expiration": "2017-01-01T00:00:00.000Z"
 *		    }
 *		  ]
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
 * @apiError Certificat nNotFound The id of the Certificat was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Certificat not found"
 *		}
 *
 */ 
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
	  
	  	if (err) return res.status(403).send(err.message); 
		
		models.certificat.find({
		 	where: { id: req.body.id } 
		 }).then(function(response){
		 	if (response==null) return res.status(404).send("Certificat not found");
			
				response.destroy();
				res.header('token',token);
				res.redirect(303,'/dossier/get/');
			});

	});//end jwt.verify

});//end post delete			

module.exports = router;