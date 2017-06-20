//Utilisation du module express
var express = require('express')
var app = express()

//On récupère le module http pour envoyer une reponse à une requete
var objet_http = require('http');

//On récupère le module fs pour lire un fichier
var objet_fs = require('fs');

//On récupère le module url pour savoir l'url demandé en requete
var objet_url = require('url');

//On inclut le fichier SocketClient.js
var vm = require('vm');

//On inclut le constructeur SocketServeur()
var content = objet_fs.readFileSync('../js/serveur/SocketClient.js')
vm.runInThisContext(content);

//On inclut la gestion des Sockets
content = objet_fs.readFileSync('../js/serveur/GestionSockets1.js')
vm.runInThisContext(content);


//On créer la réponse à la requete du site
var http_serveur = objet_http.createServer(function(req, res) {
	var page = objet_url.parse(req.url).pathname;
	console.log(page);
	if (page == '/'){
			objet_fs.readFile('../html/index.html', 'utf-8', function(error, content) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(content);
			});
		}

	if (page == '/admin2017'){
			objet_fs.readFile('../html/admin2017.html', 'utf-8', function(error, content) {
			res.writeHead(200, {"Content-Type": "text/html"});
			resend(content);
			});
		}

	if (page == '/client.js'){
		objet_fs.readFile('client.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);
			});
	}

	if (page == '/Ligne.js'){
		objet_fs.readFile('../js/objets/Ligne.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);
			});
	}
	if (page == '/Bouton.js'){
		objet_fs.readFile('../js/objets/Bouton.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);
			});
	}
	if (page == '/Tableau.js'){
		objet_fs.readFile('../js/objets/Tableau.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);
			});
	}
	if (page == '/Cadre.js'){
		objet_fs.readFile('../js/objets/Cadre.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);
			});
	}
	if (page == '/Nsocket.js'){
		objet_fs.readFile('../js/objets/Nsocket.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);
			});
	}
	if (page == '/socket.io.js'){
		objet_fs.readFile('../../node_modules/socket.io-client/dist/socket.io.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);
			});
	}
	
	if (page == '/cssFunction.js'){
		objet_fs.readFile('cssFunction.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);
			});
	}
	
	if (page == '/mail3.png'){
			objet_fs.readFile('../img/mail3.png', 'binary', function(error, content) {

	 res.writeHead(200, {"Content-Type": "image/png"});
			res.write(content, "binary");
			res.end();
			});
	}

if (page == '/trash5.png'){
			objet_fs.readFile('../img/trash5.png', 'binary', function(error, content) {

	 res.writeHead(200, {"Content-Type": "image/png"});
			res.write(content, "binary");
			res.end();
			});
	}
	
	
});
				
//On récupère le module socket pour rester connecté avec la page html
var objet_socket = require('socket.io').listen(http_serveur);

objet_socket.sockets.on('connection', function (socket, pseudo) {
		var nouvelleSocket = new Socket_Client();
		
		socket.on('nouveau_client', function (pseudo) {
		nouvelleSocket.pseudo = pseudo;
		nouvelleSocket.Element = socket;
		console.log(pseudo + " vient de se connecter");
		clients.push(nouvelleSocket);
		nouvelleSocket.position = clients.length;
		socket.emit('message', 'bonjour' + pseudo);
		});
		
		socket.on('disconnect', function () {
		//var index = clients.indexOf(nouvelleSocket.Element);
		//clients.splice(index, 1);
		//delete nouvelleSocket;
		});
		
		socket.on('nouveau_message', function (mms) {
		clients[0].emit('message', mms);
		});
		

		socket.on('rec_cible', function(rec_cible){
			/*debug*/ //console.log("rec_cible à enregistrer=" + rec_cible);
			nouvelleSocket.rec_cible.push(rec_cible);

		});
		socket.on('rec_en_tete', function(rec_en_tete){
			/*debug*/ //console.log("socket.on('rec_en_tete', function(rec_en_tete)" + "   rec_en_tete =" + rec_en_tete);
			nouvelleSocket.rec_en_tete.push(rec_en_tete);
		});
		socket.on('rec_contenu', function(rec_contenu){
			/*debug*/ //console.log("socket.on('rec_contenu', function(rec_contenu)" + "   rec_contenu =" + rec_contenu);
			nouvelleSocket.rec_contenu.push(rec_contenu);
			Message_a_transmettre();
		});

		
		socket.on('creer_cible', function(creer_cible){
			/*debug*/ //console.log("socket.on('creer_cible', function(creer_cible)" + "   creer_cible =" + creer_cible);
			nouvelleSocket.creer_cible.push(creer_cible);
		});
		socket.on('creer_en_tete', function(creer_en_tete){
			/*debug*/ //console.log("socket.on('creer_en_tete', function(creer_en_tete)" + "   creer_en_tete =" + creer_en_tete);
			nouvelleSocket.creer_en_tete.push(creer_en_tete);
		});
		socket.on('creer_contenu', function(creer_contenu){
			/*debug*/ //console.log("socket.on('creer_contenu', function(creer_contenu)" + "   creer_contenu =" + creer_contenu);
			nouvelleSocket.creer_contenu.push(creer_contenu);
			Message_a_transmettre();
			});

});


http_serveur.listen(8080);
