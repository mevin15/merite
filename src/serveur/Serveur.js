/* **** MODULES INCLUS **** */
var express	= require('express'); 		var app = express();
var http	= require('http');
var fs		= require('fs');
var url		= require('url');
var vm		= require('vm');

/* **** FICHIERS JS INCLUS **** */
var requetes		 = require('./js/requetes.js');
var fonctionsServeur = require('./../fonctionnalites/communication/fonctionsServeur.js');

//Serveur http
var http_serveur = http.createServer(function(req, res) {
	var page = url.parse(req.url).pathname;
	console.log("Le serveur recoit une requête url :  " + page);
	requetes(page, req, res, fs);
	});//end function
http_serveur.listen(8080);
	
//Lancement des sockets
fonctionsServeur(http_serveur);