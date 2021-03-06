define({ "api": [
  {
    "type": "post",
    "url": "/annonce/add",
    "title": "Request for add a new annonce",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "AnnonceAdd",
    "group": "Annonce",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Title of the annonce.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descrition",
            "description": "<p>A description of the annonce</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the project in the annonce.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the project in the annonce.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "etat",
            "description": "<p>Code of the annonce status.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "ddn",
            "description": "<p>Date of publication.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n    [\n\t\t  {\n\t\t    \"status\": 200,\n\t\t    \"id\": 1,\n\t\t    \"domaine\": \"IT\",\n\t\t    \"titre\": \"Developpeur Web\",\n\t\t    \"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n\t\t    \"lat\": \"0.98798361241423\",\n\t\t    \"lng\": \"21.3212309120937\",\n\t\t    \"createAt\": \"2017-05-31T15:12:07.000Z\",\n\t\t    \"finalization\": \"2017-07-01T00:00:00.000Z\"\n\t\t  }\n\t\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./annonce.js",
    "groupTitle": "Annonce"
  },
  {
    "type": "delete",
    "url": "/annonce/delete",
    "title": "Request for delete an annonce",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "AnnonceDelete",
    "group": "Annonce",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Annonce ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n    [\n\t\t  {\n\t\t    \"status\": 200,\n\t\t    \"id\": 1,\n\t\t    \"domaine\": \"IT\",\n\t\t    \"titre\": \"Developpeur Web\",\n\t\t    \"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n\t\t    \"lat\": \"0.98798361241423\",\n\t\t    \"lng\": \"21.3212309120937\",\n\t\t    \"createAt\": \"2017-05-31T15:12:07.000Z\",\n\t\t    \"finalization\": \"2017-07-01T00:00:00.000Z\"\n\t\t  }\n\t\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AnnonceNotFound",
            "description": "<p>The id of the Annonce was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Annonce not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./annonce.js",
    "groupTitle": "Annonce"
  },
  {
    "type": "get",
    "url": "/annonce/:id",
    "title": "Request for get annonces by domaine",
    "name": "AnnonceGet",
    "group": "Annonce",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Domaine ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Request status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>JSON Web Token with users id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Annonce ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Title of the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descrition",
            "description": "<p>A description of the annonce</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date of publication.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "finalization",
            "description": "<p>Date of expiration.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Firstname of the .User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Users photo in format Base64.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>Users phone number.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n  [{\n\t\t  \"status\": 200,\n\t\t  \"id\": 1,\n\t\t  \"domaine\": \"IT\",\n\t\t  \"titre\": \"Developpeur Web\",\n\t\t  \"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n\t\t  \"lat\": \"0.98798361241423\",\n\t\t  \"lng\": \"21.3212309120937\",\n\t\t  \"createAt\": \"2017-05-31T15:12:07.000Z\",\n\t\t  \"finalization\": \"2017-07-01T00:00:00.000Z\",\n\t\t  \"user\": {\n\t\t    \"id\": 15,\n\t\t    \"nom\": \"Marroquin\",\n\t\t    \"prenom\": \"Amanda\",\n\t\t    \"email\": \"amanda@gmail.com\",\n\t\t    \"photo\": null\n\t\t  }\n\t\t}\n\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AnnonceNotFound",
            "description": "<p>The id of the Annonce was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Annonce not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./annonce.js",
    "groupTitle": "Annonce"
  },
  {
    "type": "get",
    "url": "/annonce/",
    "title": "Request for get all annonces",
    "name": "AnnonceGetAll",
    "group": "Annonce",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Request status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>JSON Web Token with users id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Annonce ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Title of the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descrition",
            "description": "<p>A description of the annonce</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date of publication.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "finalization",
            "description": "<p>Date of expiration.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Firstname of the .User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Users photo in format Base64.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>Users phone number.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n  [{\n\t\t  \"status\": 200,\n\t\t  \"id\": 1,\n\t\t  \"domaine\": \"IT\",\n\t\t  \"titre\": \"Developpeur Web\",\n\t\t  \"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n\t\t  \"lat\": \"0.98798361241423\",\n\t\t  \"lng\": \"21.3212309120937\",\n\t\t  \"createAt\": \"2017-05-31T15:12:07.000Z\",\n\t\t  \"finalization\": \"2017-07-01T00:00:00.000Z\",\n\t\t  \"user\": {\n\t\t    \"id\": 15,\n\t\t    \"nom\": \"Marroquin\",\n\t\t    \"prenom\": \"Amanda\",\n\t\t    \"email\": \"amanda@gmail.com\",\n\t\t    \"photo\": null\n\t\t  }\n\t\t}\n\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AnnonceNotFound",
            "description": "<p>The id of the Annonce was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Annonce not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./annonce.js",
    "groupTitle": "Annonce"
  },
  {
    "type": "get",
    "url": "/annonce/getId/:id",
    "title": "Request for get an annonce by id",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "AnnonceGetId",
    "group": "Annonce",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Annonce ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Request status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>JSON Web Token with users id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Annonce ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Title of the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descrition",
            "description": "<p>A description of the annonce</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date of publication.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "finalization",
            "description": "<p>Date of expiration.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Firstname of the .User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Users photo in format Base64.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>Users phone number.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n   {\n\t\t  \"status\": 200,\n\t\t  \"id\": 1,\n\t\t  \"domaine\": \"IT\",\n\t\t  \"titre\": \"Developpeur Web\",\n\t\t  \"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n\t\t  \"lat\": \"0.98798361241423\",\n\t\t  \"lng\": \"21.3212309120937\",\n\t\t  \"createAt\": \"2017-05-31T15:12:07.000Z\",\n\t\t  \"finalization\": \"2017-07-01T00:00:00.000Z\",\n\t\t  \"user\": {\n\t\t    \"id\": 15,\n\t\t    \"nom\": \"Marroquin\",\n\t\t    \"prenom\": \"Amanda\",\n\t\t    \"email\": \"amanda@gmail.com\",\n\t\t    \"photo\": null\n\t\t  }\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AnnonceNotFound",
            "description": "<p>The id of the Annonce was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Annonce not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./annonce.js",
    "groupTitle": "Annonce"
  },
  {
    "type": "get",
    "url": "/annonce/getMy",
    "title": "Request for get annonces by users id",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "AnnonceGetMy",
    "group": "Annonce",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Request status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>JSON Web Token with users id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Annonce ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Title of the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descrition",
            "description": "<p>A description of the annonce</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date of publication.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "finalization",
            "description": "<p>Date of expiration.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n  [{\n\t\t  \"status\": 200,\n\t\t  \"id\": 1,\n\t\t  \"domaine\": \"IT\",\n\t\t  \"titre\": \"Developpeur Web\",\n\t\t  \"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n\t\t  \"lat\": \"0.98798361241423\",\n\t\t  \"lng\": \"21.3212309120937\",\n\t\t  \"createAt\": \"2017-05-31T15:12:07.000Z\",\n\t\t  \"finalization\": \"2017-07-01T00:00:00.000Z\",\n\t\t}\n\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AnnonceNotFound",
            "description": "<p>The id of the Annonce was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Annonce not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./annonce.js",
    "groupTitle": "Annonce"
  },
  {
    "type": "post",
    "url": "/annonce/update",
    "title": "Request for up to date an annonce",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "AnnonceUpdate",
    "group": "Annonce",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Annonce ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Title of the annonce.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descrition",
            "description": "<p>A description of the annonce</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the project in the annonce.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the project in the annonce.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "etat",
            "description": "<p>Code of the annonce status.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "ddn",
            "description": "<p>Date of publication.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n    [\n\t\t  {\n\t\t    \"status\": 200,\n\t\t    \"id\": 1,\n\t\t    \"domaine\": \"IT\",\n\t\t    \"titre\": \"Developpeur Web\",\n\t\t    \"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n\t\t    \"lat\": \"0.98798361241423\",\n\t\t    \"lng\": \"21.3212309120937\",\n\t\t    \"createAt\": \"2017-05-31T15:12:07.000Z\",\n\t\t    \"finalization\": \"2017-07-01T00:00:00.000Z\"\n\t\t  }\n\t\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./annonce.js",
    "groupTitle": "Annonce"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "C__Users_amanda_Documents_LP_Stage_repo_routes_doc_main_js",
    "groupTitle": "C__Users_amanda_Documents_LP_Stage_repo_routes_doc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/candidature/add",
    "title": "Request for add a new candidature",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "CandidatureAdd",
    "group": "Candidature",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "annonce",
            "description": "<p>Annonce ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Text of the postulant.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n\t\t  {\n\t\t    \"Candidature submit success\"\n\t\t  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./candidature.js",
    "groupTitle": "Candidature"
  },
  {
    "type": "get",
    "url": "/candidature/getCandidatures/",
    "title": "Request for get candidatures by id user (Candidat)",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "CandidatureGetCandidats",
    "group": "Candidature",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Candidature ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Text of the postulant.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date of postulation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Request status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Title of the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descrition",
            "description": "<p>A description of the annonce</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "finalization",
            "description": "<p>Date of expiration</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n\t\t  {\n\t\t  \"status\": 200,\n\t\t  \"id\": 1,\n\t\t  \"message\": \"Bonjour, je suis interese dans ton project , je vodrais recevoir plus d'information pour vous faire un cotization\",\n\t\t  \"createAt\": \"2017-06-01T12:57:56.000Z\",\n\t\t  \"user\": {\n\t\t    \"id\": 53,\n\t\t    \"nom\": \"Montparne\",\n\t\t    \"prenom\": \"Julie\",\n\t\t    \"email\": \"julie@gmail.com\",\n\t\t    \"photo\": \" \"\n\t\t  }\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CandidatureNotFound",
            "description": "<p>The id of the Candidature was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Candidature not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./candidature.js",
    "groupTitle": "Candidature"
  },
  {
    "type": "get",
    "url": "/candidature/getCandidat/:id",
    "title": "Request for get candidatures by id annonce",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "CandidatureGetCandidatures",
    "group": "Candidature",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Annonce ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Text of the postulant.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date of postulation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Request status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Firstname of the .User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Users photo in format Base64.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>Users phone number.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Title of the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descrition",
            "description": "<p>A description of the annonce</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "finalization",
            "description": "<p>Date of expiration</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n\t\t  {\n\t\t  \"status\": 200,\n\t\t  \"id\": 1,\n\t\t  \"message\": \"Bonjour, je suis interese dans ton project , je vodrais recevoir plus d'information pour vous faire un cotization\",\n\t\t  \"createAt\": \"2017-06-01T12:57:56.000Z\",\n\t\t  \"user\": {\n\t\t    \"id\": 53,\n\t\t    \"nom\": \"Montparne\",\n\t\t    \"prenom\": \"Julie\",\n\t\t    \"email\": \"julie@gmail.com\",\n\t\t    \"photo\": \" \"\n\t\t  },\n\t\t  \"annonce\": {\n\t\t    \"id\": 1,\n\t\t    \"titre\": \"Developpeur Web\",\n\t\t    \"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n\t\t    \"lat\": \"0.98798361241423\",\n\t\t    \"lng\": \"21.3212309120937\",\n\t\t    \"ddd\": \"2017-05-25T00:00:00.000Z\",\n\t\t    \"ddf\": \"2017-07-01T00:00:00.000Z\"\n\t\t  }\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CandidatureNotFound",
            "description": "<p>The id of the Candidature was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Candidature not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./candidature.js",
    "groupTitle": "Candidature"
  },
  {
    "type": "get",
    "url": "/candidature/get/:id",
    "title": "Request for get a candidature by id",
    "name": "CandidatureGetId",
    "group": "Candidature",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Candidature ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Candidature ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Text of the postulant.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date of postulation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Request status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Firstname of the .User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Users photo in format Base64.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>Users phone number.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Title of the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descrition",
            "description": "<p>A description of the annonce</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the project in the annonce.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "finalization",
            "description": "<p>Date of expiration</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n\t\t  {\n\t\t  \"status\": 200,\n\t\t  \"id\": 1,\n\t\t  \"message\": \"Bonjour, je suis interese dans ton project , je vodrais recevoir plus d'information pour vous faire un cotization\",\n\t\t  \"createAt\": \"2017-06-01T12:57:56.000Z\",\n\t\t  \"user\": {\n\t\t    \"id\": 53,\n\t\t    \"nom\": \"Montparne\",\n\t\t    \"prenom\": \"Julie\",\n\t\t    \"email\": \"julie@gmail.com\",\n\t\t    \"photo\": \" \"\n\t\t  },\n\t\t  \"annonce\": {\n\t\t    \"id\": 1,\n\t\t    \"titre\": \"Developpeur Web\",\n\t\t    \"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n\t\t    \"lat\": \"0.98798361241423\",\n\t\t    \"lng\": \"21.3212309120937\",\n\t\t    \"ddd\": \"2017-05-25T00:00:00.000Z\",\n\t\t    \"ddf\": \"2017-07-01T00:00:00.000Z\"\n\t\t  }\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CandidatureNotFound",
            "description": "<p>The id of the Candidature was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Candidature not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./candidature.js",
    "groupTitle": "Candidature"
  },
  {
    "type": "post",
    "url": "/candidature/update",
    "title": "Request for up to date a candidature",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "CandidatureUpdate",
    "group": "Candidature",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "annonce",
            "description": "<p>Annonce ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Text of the postulant.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n\t\t  [\n\t\t\t{\n  \t\t\t\"status\": 200,\n  \t\t\t\"id\": 1,\n  \t\t\t\"message\": \"Bonjour, je suis interese dans ton project , je vodrais recevoir plus d'information pour vous faire un cotization\",\n  \t\t\t\"createAt\": \"2017-06-01T12:57:56.000Z\",\n \t\t\t\"annonce\": {\n   \t\t\t\"id\": 1,\n    \t\t\t\"titre\": \"Developpeur Web\",\n    \t\t\t\"description\": \"On cherche un/une developpeur web pour la construction de site commertial.\",\n    \t\t\t\"lat\": \"0.98798361241423\",\n    \t\t\t\"lng\": \"21.3212309120937\",\n    \t\t\t\"ddd\": \"2017-05-25T00:00:00.000Z\",\n    \t\t\t\"ddf\": \"2017-07-01T00:00:00.000Z\"\n  \t\t}\n\t\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./candidature.js",
    "groupTitle": "Candidature"
  },
  {
    "type": "post",
    "url": "/candidature/update",
    "title": "Request for change a status of candidature",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "CandidatureUpdate",
    "group": "Candidature",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "annonce",
            "description": "<p>Annonce ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Code status of the candidature.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n\t\t  {\n\t\t    \"Candidature submit success\"\n\t\t  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./candidature.js",
    "groupTitle": "Candidature"
  },
  {
    "type": "post",
    "url": "/dossier/add/Certificat",
    "title": "Request for add a new certification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierAddCertificat",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Certification name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "certifiante",
            "description": "<p>Name of certification Authority.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "rendu",
            "description": "<p>Date of expedition.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<p>Date of expiration.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "post",
    "url": "/dossier/add/experiance",
    "title": "Request for add a new experiance",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierAddExperiance",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Work poste name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the tasks.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ville",
            "description": "<p>Ville ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "ddn",
            "description": "<p>Begining date.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "post",
    "url": "/dossier/add/formation",
    "title": "Request for add a new formation",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierAddFormation",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ecole",
            "description": "<p>Name of the institute of formation.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "diplome",
            "description": "<p>Name of the degree got</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ville",
            "description": "<p>Ville ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "ddn",
            "description": "<p>Begining date.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "delete",
    "url": "/dossier/delete/Certificat",
    "title": "Request delete certification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierDeleteCertificat",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Certification ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Certificat",
            "description": "<p>nNotFound The id of the Certificat was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Certificat not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "delete",
    "url": "/dossier/delete/experiance",
    "title": "Request for delet an experiance",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierDeleteExperiance",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Experiance ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExperiancenNotFound",
            "description": "<p>The id of the Experiance was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Experiance not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "delete",
    "url": "/dossier/delete/formation",
    "title": "Request deletee a formation",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierDeleteFormation",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Formation ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FormationNotFound",
            "description": "<p>The id of the Formation was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Formation not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "get",
    "url": "/dossier/",
    "title": "Request for get a dossier",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierGet",
    "group": "Dossier",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Dossier titre.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "formation",
            "description": "<p>Array of users trainings.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "experiance",
            "description": "<p>Array of users jobs experiance.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "certificat",
            "description": "<p>Array of users certifications.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n\t\t{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DossierNotFound",
            "description": "<p>The id of the Dossier was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Dossier not found\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "post",
    "url": "/dossier/update",
    "title": "Request for up to date the dossier",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierUpdate",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Certification name.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n\t\t{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "post",
    "url": "/dossier/update/Certificat",
    "title": "Request forup to date a certification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierUpdateCertificat",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Certification ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Certification name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "certifiante",
            "description": "<p>Name of certification Authority.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "rendu",
            "description": "<p>Date of expedition.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<p>Date of expiration.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "post",
    "url": "/dossier/update/experiance",
    "title": "Request for up to date an experiance",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierUpdateExperiance",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Experiance ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>Work poste name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the tasks.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ville",
            "description": "<p>Ville ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "ddn",
            "description": "<p>Begining date.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "post",
    "url": "/dossier/update/formation",
    "title": "Request forup to date a formation",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "DossierUpdateFormation",
    "group": "Dossier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Formation ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ecole",
            "description": "<p>Name of the institute of formation.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "domaine",
            "description": "<p>Domaine ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "diplome",
            "description": "<p>Name of the degree got</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ville",
            "description": "<p>Ville ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "ddn",
            "description": "<p>Begining date.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n{\n\n\n\t\t  \"dossier\": {\n\t\t    \"titre\": \"Develeppeur\"\n\t\t  },\n\t\t  \"formation\": [\n\t\t    {\n\t\t      \"id\": 4,\n\t\t      \"ecole\": \"IUT2\",\n\t\t      \"domaine\": \"Commerce - Immobilier\",\n\t\t      \"diplome\": \"BAC+3\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2016-03-07T00:00:00.000Z\",\n\t\t      \"ddf\": \"2017-01-09T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"experiance\": [\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Assistante Commerciale \",\n\t\t      \"description\": \"Conseil aux entreprises\",\n\t\t      \"ville\": \"Grenoble\",\n\t\t      \"ddd\": \"2014-12-05T00:00:00.000Z\",\n\t\t      \"ddf\": \"2015-01-05T00:00:00.000Z\"\n\t\t    }\n\t\t  ],\n\t\t  \"certificat\": [\n\t\t    {\n\t\t      \"id\": 2,\n\t\t      \"titre\": \"Certificat\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2017-05-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-05-19T00:00:00.000Z\"\n\t\t    },\n\t\t    {\n\t\t      \"id\": 1,\n\t\t      \"titre\": \"Certification en commerce international\",\n\t\t      \"certifiante\": \"ABC\",\n\t\t      \"rendu\": \"2016-07-01T00:00:00.000Z\",\n\t\t      \"expiration\": \"2017-01-01T00:00:00.000Z\"\n\t\t    }\n\t\t  ]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dossier.js",
    "groupTitle": "Dossier"
  },
  {
    "type": "get",
    "url": "/enterprise/get",
    "title": "Request Enterprise Information by User id",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "Enterprise_Get",
    "group": "Enterprise",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Enterprise unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Enterprice name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domain",
            "description": "<p>Name of enterprises domaine</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>A little description of the enterprise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the enterprise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the enterprise.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\t\t\t\"id\": 3,\n\t\t  \t\"user\": 15,\n\t\t  \t\"nom\": \"HelloYou!\",\n\t\t  \t\"domaine\": \"Commerce - Immobilier\",\n\t\t  \t\"description\": \"Enterprise dedicated to do things..\",\n\t\t  \t\"lat\": \"1.878757647647\",\n\t\t  \t\"lng\": \"-0.987597648653685376\"     \n\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUser",
            "description": "<p>The User don't have the privileges for chage his count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 500 Invalid User\n    {\n      \"error\": \"Invalid User\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./enterprise.js",
    "groupTitle": "Enterprise"
  },
  {
    "type": "post",
    "url": "/enterprise/update",
    "title": "Request for up to date Enterprise Information",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "Enterprise_Update",
    "group": "Enterprise",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Enterprice name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "domain",
            "description": "<p>Name of enterprises domaine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>A little description of the enterprise.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of the enterprise.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of the enterprise.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n    {\n\t\t\t\"id\": 3,\n\t\t  \t\"user\": 15,\n\t\t  \t\"nom\": \"HelloYou!\",\n\t\t  \t\"domaine\": \"Commerce - Immobilier\",\n\t\t  \t\"description\": \"Enterprise dedicated to do things..\",\n\t\t  \t\"lat\": \"1.878757647647\",\n\t\t  \t\"lng\": \"-0.987597648653685376\"     \n\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./enterprise.js",
    "groupTitle": "Enterprise"
  },
  {
    "type": "post",
    "url": "/rate/add",
    "title": "Request for add a new rate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "RateAdd",
    "group": "Rating",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pour",
            "description": "<p>User ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "raiting",
            "description": "<p>Note given to the user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n    {\n\t\t\"Rate success commit\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rate.js",
    "groupTitle": "Rating"
  },
  {
    "type": "delete",
    "url": "/rate/delete",
    "title": "Request for delete a rate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "RateDelete",
    "group": "Rating",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Rate ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n[\n\t\t{\n  \t\t\"status\": 200,\n  \t\t\"id\": 2,\n  \t\t\"rate\": 5,\n  \t\t\"createAt\": \"2017-06-04T12:13:32.000Z\",\n  \t\t\"pour\": {\n    \t\t\t\"id\": 15,\n  \t\t\t\"nom\": \"Marroquin\",\n    \t\t\t\"prenom\": \"Amanda\",\n    \t\t\t\"email\": \"amanda@gmail.com\",\n    \t\t\t\"photo\": null\n  \t\t}\n \t}\n\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rate.js",
    "groupTitle": "Rating"
  },
  {
    "type": "post",
    "url": "/rate/update",
    "title": "Request for up to date a rate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "RateUpdate",
    "group": "Rating",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pour",
            "description": "<p>User ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "raiting",
            "description": "<p>Note given to the user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 303 Redirect\n[\n\t\t{\n  \t\t\"status\": 200,\n  \t\t\"id\": 2,\n  \t\t\"rate\": 5,\n  \t\t\"createAt\": \"2017-06-04T12:13:32.000Z\",\n  \t\t\"pour\": {\n    \t\t\t\"id\": 15,\n  \t\t\t\"nom\": \"Marroquin\",\n    \t\t\t\"prenom\": \"Amanda\",\n    \t\t\t\"email\": \"amanda@gmail.com\",\n    \t\t\t\"photo\": null\n  \t\t}\n \t}\n\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rate.js",
    "groupTitle": "Rating"
  },
  {
    "type": "get",
    "url": "/rate/getRates",
    "title": "Request for get rates of a user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          },
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users id.</p>"
          }
        ]
      }
    },
    "name": "RateUpdate",
    "group": "Rating",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status of request.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Rate ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rate",
            "description": "<p>Note given to the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date of creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "de",
            "description": "<p>User information, how gives the rate.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n[\n\t\t{\n  \t\t\"status\": 200,\n  \t\t\"id\": 2,\n  \t\t\"rate\": 5,\n  \t\t\"createAt\": \"2017-06-04T12:13:32.000Z\",\n  \t\t\"pour\": {\n    \t\t\t\"id\": 53,\n  \t\t\t\"nom\": \"Montparne\",\n    \t\t\t\"prenom\": \"Julie\",\n    \t\t\t\"email\": \"julie@gmail.com\",\n    \t\t\t\"photo\": null\n  \t\t}\n \t}\n\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RateNotFound",
            "description": "<p>If theres not coincidences</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Rate not Found\n    {\n      \"error\": \"Rate not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rate.js",
    "groupTitle": "Rating"
  },
  {
    "type": "get",
    "url": "/rate/MyRates",
    "title": "Request for get rates that the user do",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "RateUpdate",
    "group": "Rating",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status of request.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Rate ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rate",
            "description": "<p>Note given to the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date of creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "de",
            "description": "<p>User information, how gives the rate.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Success\n[\n\t\t{\n  \t\t\"status\": 200,\n  \t\t\"id\": 2,\n  \t\t\"rate\": 5,\n  \t\t\"createAt\": \"2017-06-04T12:13:32.000Z\",\n  \t\t\"pour\": {\n    \t\t\t\"id\": 53,\n  \t\t\t\"nom\": \"Montparne\",\n    \t\t\t\"prenom\": \"Julie\",\n    \t\t\t\"email\": \"julie@gmail.com\",\n    \t\t\t\"photo\": null\n  \t\t}\n \t}\n\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RateNotFound",
            "description": "<p>If theres not coincidences</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Rate not Found\n    {\n      \"error\": \"Rate not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rate.js",
    "groupTitle": "Rating"
  },
  {
    "type": "get",
    "url": "/user/domaines",
    "title": "Request get all domaines",
    "name": "DomainesGet",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Domaine unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Name of the Domaine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    \t[\n\t\t\t  {\n\t\t\t    \"id\": 1,\n\t\t\t    \"nom\": \"Agriculture\"\n\t\t\t  },\n\t\t\t  {\n\t\t\t    \"id\": 2,\n\t\t\t    \"nom\": \"Agroalimentaire - Alimentation\"\n\t\t\t  },\n\t\t\t  {\n\t\t\t    \"id\": 3,\n\t\t\t    \"nom\": \"Animaux\"\n\t\t\t  }\n\t\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DomaineNotFound",
            "description": "<p>if there any domaine in data base</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Foud\n    {\n      \"error\": \"Domaines not Found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/get/fournisseurs",
    "title": "Request Users type fourniseurs",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titre",
            "description": "<p>title of the users portafolio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of teh portafolio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>users information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "domaine",
            "description": "<p>domaine  information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    [\n\t\t\t{\n\t\t    \"titre\": \"Environmental Tech\",\n\t\t\t    \"description\": \"facilitate 24/7 architectures\",\n\t\t\t    \"user\": {\n\t\t\t      \"id\": 15,\n\t\t\t      \"prenom\": \"Amanda\",\n\t\t\t      \"nom\": \"Marroquin\",\n\t\t\t      \"email\": \"amanda@gmail.com\",\n\t\t\t      \"password\": \"gato\",\n\t\t\t      \"tel\": \"768411809\",\n\t\t\t      \"photo\": \"https://robohash.org/assumendadoloresodit.jpg?size=150x150&set=set1\",\n\t\t\t      \"ville_id\": 1,\n\t\t\t      \"ddn\": \"1995-07-11T00:00:00.000Z\",\n\t\t\t      \"etat\": true,\n\t\t\t      \"type\": 5,\n\t\t\t      \"createdAt\": \"2017-05-11T00:00:00.000Z\",\n\t\t\t      \"updatedAt\": \"2017-05-11T00:00:00.000Z\",\n\t\t\t      \"Ville\": {\n\t\t\t        \"id\": 1,\n\t\t\t        \"ville_departement\": \"01\",\n\t\t\t        \"ville_nom\": \"OZAN\",\n\t\t\t        \"ville_nom_simple\": \"ozan\",\n\t\t\t        \"ville_nom_reel\": \"Ozan\",\n\t\t\t        \"ville_code_postal\": \"01190\",\n\t\t\t        \"ville_longitude_deg\": 4.91667,\n\t\t\t        \"ville_latitude_deg\": 46.3833,\n\t\t\t        \"createdAt\": null,\n\t\t\t        \"updatedAt\": null\n\t\t\t      }\n\t\t\t    },\n\t\t\t    \"domaine\": {\n\t\t\t      \"id\": 19,\n\t\t\t      \"nom\": \"Environnement - Nature - Nettoyage\",\n\t\t\t      \"createdAt\": \"2017-05-11T15:49:51.000Z\",\n\t\t\t      \"updatedAt\": \"2017-05-11T15:49:51.000Z\"\n\t\t\t    }\n\t\t\t}    \n\n\t\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Fournisseur",
            "description": "<p>Not Found If theres any fournisseur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Fourniseurs not found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User",
    "name": "GetUserGetFournisseurs"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "Request User Authentification Login",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users secret word.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Request status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>JSON Web Token with users id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"Status\": 200,\n  \"Token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInR5cGUiOjQsImlhdCI6MTQ5NjU4NTc1M30.cBL_vk-wEdaCCOQQspvJzdpx4a4ebCz6nXZwqy2WMgs\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUser",
            "description": "<p>If the User has a count bloqued or deleted.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"User bloqued or deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/signup",
    "title": "Request User Authentification Signup",
    "name": "Signup",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Firstname of the .User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users secret word.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Users photo in format Base64.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>Users phone number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ville",
            "description": "<p>City ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "ddn",
            "description": "<p>Users birthday.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>Type of count.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Request status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>JSON Web Token with users id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"Status\": 200,\n  \"Token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInR5cGUiOjQsImlhdCI6MTQ5NjU4NTc1M30.cBL_vk-wEdaCCOQQspvJzdpx4a4ebCz6nXZwqy2WMgs\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>If there other count with the same email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Invalid Email\n{\n  \"error\": \"Invalid email\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/block",
    "title": "Request for block a users count",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "UserBlock",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"Status\": 200,\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/delete",
    "title": "Request for delete a count",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "UserDelete",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"Status\": 200,\n  \"Token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInR5cGUiOjQsImlhdCI6MTQ5NjU4NTc1M30.cBL_vk-wEdaCCOQQspvJzdpx4a4ebCz6nXZwqy2WMgs\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/get",
    "title": "Request User Information by id",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "UserGet",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Firstname of the .User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Users photo in format Base64.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>Users phone number.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ville",
            "description": "<p>City name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "ddn",
            "description": "<p>Users birthday.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>Type of count.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\t\t\t\"id\": 15,\n\t\t\t\"nom\": \"Marroquin\",\n\t\t\t\"prenom\": \"Amanda\",\n\t\t\t\"email\": \"amanda@gmail.com\",\n\t\t\t\"photo\": null,\n\t\t\t\"tel\": \"768411809\",\n\t\t\t\"ville\": \"Ozan\",\n\t\t\t\"ddn\": \"1995-07-11T00:00:00.000Z\",\n \t\t\"type\": 5      \n\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/update",
    "title": "Request Update User Information",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "UserUpdate",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>Firstname of the .User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Users photo in format Base64.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>Users phone number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ville",
            "description": "<p>City ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "ddn",
            "description": "<p>Users birthday.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\t\t\t\"response\":\"User  was correctly updated\"   \n\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/change",
    "title": "Request for chage type of count",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users encripted key.</p>"
          }
        ]
      }
    },
    "name": "UserUpdate",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"Status\": 200,\n  \"Token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInR5cGUiOjQsImlhdCI6MTQ5NjU4NTc1M30.cBL_vk-wEdaCCOQQspvJzdpx4a4ebCz6nXZwqy2WMgs\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>If the token sended is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUser",
            "description": "<p>The User don't have the privileges for chage his count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid Token\n    {\n      \"error\": \"invalid signature\"\n\t\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 403 Invalid User\n    {\n      \"error\": \"Invalid User\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/ville/:id",
    "title": "Request get villes by code postal",
    "name": "VillesGet",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>firts numbers of code postal.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Ville unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Name of the Ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "cp",
            "description": "<p>Code postal of the ville</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    \t[\n\t\t\t{\n\t\t   \t\t\"status\": 200,\n\t\t   \t\t\"id\": 14353,\n\t\t   \t\t\"nom\": \"Saint-Martin-d'Hères\",\n\t\t   \t\t\"cp\": \"38400\"\n\t\t \t}\n\t\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentias",
            "description": "<p>If there is not define one of the parametres .</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "VilleNotFound",
            "description": "<p>if there no coincidences whit the code postal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Foud\n    {\n      \"error\": \"Ville not Found\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  }
] });
