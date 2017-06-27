const http = require('http');
const serveur = http.createServer(function(requete, reponse) {});

const port = 1234;

serveur.listen(port, function() {
    console.log((new Date()) + " Le serveur écoute le port " + port + ".");
});

const ServeurWebSocket = require('websocket').server;
const serveurWS = new ServeurWebSocket ({
    httpServer: serveur
});

var total = 0;
var clients = {};

serveurWS.on('request', function(r){
    var connexion = r.accept('echo-protocol', r.origin);
    let id = total++;
    // Store the connection method so we can loop through & contact all clients
    clients[id] = connexion;
    console.log((new Date()) + " Connexion acceptée [" + id + "]");

    // Create event listener
    connexion.on('message', function(message) {

	// The string message that was sent to us
	var mot = message.utf8Data;

	// Loop through all clients
	for(var i in clients){
            // Send a message to the client with the message

	    if(i == id){
		
	    }else{
		console.log("Diffusion de " + id + " vers " + i);
		clients[i].sendUTF(mot);
	    }
	}
	
    });

    connexion.on('close', function(reasonCode, description) {
	delete clients[id];
	console.log((new Date()) + " Client " + id + " à l'adresse " + connexion.remoteAddress + " déconnecté.");
    });
});
