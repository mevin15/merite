/* **** MODULES INCLUS **** */
var vm = require('vm');
var fs = require('fs');
var websocket = require('websocket');

/* **** FICHIERS JS INCLUS **** */
var clients 				= require('./../../modele/clients.js');
var traiterMessage			= require('./../../fonctionnalites/communication/serveur/traiterMessage.js');

module.exports = function(http_serveur){
	
	MonServeur = new websocket.server({
		httpServer: http_serveur
	}); //end instance websocket
	
	MonServeur.on('request', function(socket){
	var nouveauClient = socket.accept('echo-protocol', socket.origin);
	var id = clients.addClient(nouveauClient);
	
	console.log('Un nouveau client s\'est connecté, ID client : ' + id);
	
    nouveauClient.on('message', function(message) { //Un message est reçu
	console.log("Message en provenance du client "+ id + message.utf8Data);
	traiterMessage(message.utf8Data, id);
	}); //nouveauClient.on message
	
       // clients.listeClients[0].Element.sendUTF(msgString);
    });//end request
}//end module export